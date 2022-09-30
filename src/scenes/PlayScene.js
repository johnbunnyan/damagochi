import BaseScene from "./BaseScene";
const CLOUDS_TO_RENDER = 4;


// TODO
// 1. 토끼가 날아다닐 바닥(구름)을 깐다.
    // - 근데 토끼가 오른쪽으로 움직이면 구름이 왼쪽으로 이동하고 그걸 반복해서 돌린다.
// 2. 버튼을 누르면 토끼가 오른쪽으로 나아가게 한다.
// 3. 특정한 버튼을 누르면 토끼가 데구르르 구르게 한다.
    // - 구르면서 이동하는 속도가 증가한다.
// 4. 특정한 버튼을 누르면 토끼가 날아오르게 한다.
// 5. 랜덤한 위치에 나타난 아이템을 획득하면 게임 종료
    // - 목표 개수가 랜덤으로 제시

class PlayScene extends BaseScene {

    constructor(config) {
    super('PlayScene', config);

    this.cropWidth = 1000;
    this.cropHeight = 1000;
    }


    create() {
        super.create();

        this.createPlayBunny();
        this.createCloud();
        
        this.createColliders();

        this.handleInputs();

//1-2)토끼 애니메이션
        this.anims.create({
            key: 'walk',
            frames:this.anims.generateFrameNumbers('bunny', 
            {start:8, end:13}),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'boost',
            frames:this.anims.generateFrameNumbers('bunny', 
            {start:33, end:39}),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'fly',
            frames:this.anims.generateFrameNumbers('bunnyFly', 
            {start:40, end:40}),
            frameRate: 7,
            repeat: -1
        });


        this.bunny.play('walk');

    }

    update() {
        this.recycleClouds();

    }


// 1-1)토끼 띄워놓고
    createPlayBunny(){
        this.bunny = this.physics.add.sprite(this.config.startPosition.x+100, this.config.startPosition.y-260, 'bunny')
        .setScale(1.5)
        .setOrigin(0);

        this.bunny
        .setCrop(0,20,200,120);

        //기본 중력
        this.bunny.body.gravity.y = 600;
        //캔버스 바운더리 (설정안하면 캔버스 밖으로 사라짐)
        this.bunny.setCollideWorldBounds(true);

    }

    createCloud(){
        this.clouds = this.physics.add.group();

        for(let i = 0; i< CLOUDS_TO_RENDER; i++){
            const cloud = this.clouds.create(100,700,'cloud')
            .setImmovable(true)
            .setScale(0.3)
            // .setCrop(10,200,900,900)
            .setBodySize(850,490)
            .setOrigin(0,1);

            this.placeCloud(cloud);
        }

        this.clouds.setVelocityX(-200);
    }

    placeCloud(cloud){
        const rightMostX = this.getRightMostCloud();

        const ranDomXDist = Phaser.Math.Between(300, 700);
        cloud.x = rightMostX + ranDomXDist;
    }

    getRightMostCloud(){
        let rightMostX = 0;
        this.clouds.getChildren().forEach(function(cloud) {
            rightMostX = Math.max(cloud.x, rightMostX);
        })
        return rightMostX;
    }



    createColliders(){
        this.physics.add.collider(this.bunny,this.clouds,this.landing.bind(this),null);
    }

    landing(){
        console.log(this.bunny)
        this.bunny.body.velocity.y -= 500;
        this.bunny.body.velocity.x = 5;
        this.bunny.setTint(0xf0f07a);
        this.time.addEvent({
            delay:1000,
            callback:()=>{
                this.bunny.setTint(0xffffff);
            },
        loop:false
    })
    }





       //🛠 (작업중)
       speedManage(){
        if(this.bunny.anims.currentAnim.key == 'walk'){
            this.bunny.setVelocityX += 200;
        }
        else if(this.bunny.anims.currentAnim.key == 'boost'){
            this.bunny.setVelocityX -= 200;
        }
    }


    handleInputs(){
    

            this.input.keyboard.on('keydown-'+'A',()=>{
            this.bunny.setFlipX(true);
            this.bunny.body.velocity.x = - 200;
        });

           this.input.keyboard.on('keydown-'+'D',()=>{
            this.bunny.setFlipX(false);
            this.bunny.body.velocity.x = + 200;
        });

        this.input.keyboard.on('keydown-'+'S',()=>{
            this.bunny.body.velocity.x = 0;
        });

        this.input.keyboard.on('keydown-'+'SPACE',()=>{
            this.bunny.body.velocity.y =-300;
            this.bunny
            .setCrop(57,8,100,120)
            .setBodySize(50,120)
            .play('fly');
        });
        this.input.keyboard.on('keydown-'+'E',()=>{
            if(this.bunny.anims.currentAnim.key == 'walk'){
                this.bunny.play('boost');
            this.speedManage();
            }
            else if(this.bunny.anims.currentAnim.key == 'boost'){
                this.bunny.play('walk');
                this.speedManage();
            }
  
        });
    }






    // 업데이트
    recycleClouds(){
        this.clouds.getChildren().forEach(cloud => {
            if(cloud.getBounds().right <= 0){
                this.placeCloud(cloud); 
            }
        })
    }

}

export default PlayScene;