import Phaser from 'phaser';

// Preload 씬 제외 모든 씬의 부모가 되는 클래스
// index.js 에서 임포트되지 않고 자식 씬들 만들때만
// 일단 create() 라는 메서드를 자식들이 공통으로 사용
class BaseScene extends Phaser.Scene {

    constructor(key,config) {
        super(key);
        // index.js에서 설정한 config 상속받아 변수할당
        // 해당 클래스에서 메서드 구현할 때 쓸 변수들 constructor내부에서 선언 및 할당
        this.config = config;
        this.screenCenter = [config.width / 2, config.height / 2];
        
        this.fontSize = 34;
        this.lineHeight = 42;
        this.titleText = `Bunny's Journey`;
        this.titleOptions = {fontSize: `50px`, fill: '#fff'};
        this.fontOptions = {fontSize: `${this.fontSize}px`, fill: '#fff'};

    }
    
    create() {
        // 씬 배경화면
        // index.js 씬 배열에서 Preload씬이 먼저 초기화되면 해당 씬에서 로드한 에셋 키 이름으로 접근 가능
        this.add.image(-400, -400, 'background').setOrigin(0);

        // 기본 컴포넌트 호출부
        this.createBunny();
        this.createTitle();
        this.createBackButton();

        // 1. 뒤로가기 버튼
        if(this.config.canGoBack) {
            const backButton = this.add.sprite(this.config.width - 10, this.config.height-10, 'icons')
            .setOrigin(1)
            .setScale(2)
            .setInteractive()

        // 2. 버튼 눌렀을 때 이벤트 -> 뒤로가기 == 메뉴 씬으로 이동
            backButton.on('pointerup', () => {
                this.scene.start('MenuScene');
            })
        }
    }

    createBunny() {
        this.bunny = this.physics.add.sprite(this.config.startPosition.x+100, this.config.startPosition.y-250, 'bunny')
        .setScale(1.5)
        .setOrigin(0);

        // 위에 글자 제거 + 기울이기
       this.bunny
       .setCrop(0,15,200,135)
       .setAngle(20);
    }

    createTitle() {
        this.title = this.add.text(this.config.width-150, this.config.height-540,this.titleText,this.titleOptions).setOrigin(1,1);

    }


    createBackButton() {
        this.backButton = this.physics.add.sprite(this.config.startPosition.x+480, this.config.startPosition.y+230, 'backButton')
        .setScale(3)
        .setOrigin(0);


        // 💫(해결) 뒤로가기 버튼 애니메이션으로 고정 출력할 수 있으나 성능에 문제가 있을 듯 하다!
        this.anims.create({
            key:'backButton',
            frames:this.anims.generateFrameNumbers('backButton',{
                start:1,
                 end: 23
            }),
            frameRate:4,
            repeat:-1
        })
    
        this.backButton.play('backButton');
    }

    //메뉴 중앙에 띄울 메뉴 텍스트들
    //메뉴의 텍스트 정보 자체, 클릭했을 때 이벤트는 메뉴씬에서 받아오고
    //베이스에서 하는 일은 그 기능을 실행하는 것
    createMenu(menu, setupMenuEvents) {
        // 아래 반복문에서 사용, 마지막 메뉴 라인의 y위치 갱신용
        let lastMenuPositionY = 0;

        menu.forEach(menuItem => {
            const menuPosition = [this.screenCenter[0], this.screenCenter[1]+lastMenuPositionY];
            // 여기서 menuItem에 새롭게 추가된 변수(위치랑 폰트옵션 적용된 텍스트들) 
            menuItem.textGO = this.add.text(...menuPosition, menuItem.text, this.fontOptions)
            .setOrigin(0.5,1);
            
            // 아래에 추가될 텍스트 위치     라인사이 간격
            lastMenuPositionY += this.lineHeight;
            setupMenuEvents(menuItem);
        });
    }

};

export default BaseScene;