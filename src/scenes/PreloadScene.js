import Phaser from 'phaser';

//객체 지향적으로 개발한다.
//      자식클래스              부모클래스
class PreloadScene extends Phaser.Scene {
    
    constructor(){
        //super키워드로 부모클래스 생성자 호출
        //phaser에서는 일종의 해당 클래스 key로 역할
        super('PreloadScene');
    }

    //에셋 불러오기
    preload() {
        this.load.image('background', 'assets/background.png');
        
        this.load.image('me', 'assets/me.png');

        // this.load.spritesheet('me', 'assets/me.png',{
        //     frameHeight: 16,
        //     frameHeight:16
        // });
        // this.load.spritesheet('icons', 'assets/icons.png',{
        //     frameHeight: 16,
        //     frameHeight:16
        // });

    };


    //여기서 시작할 씬이랑 연결해주는 메서드 작성
    //이 메서드가 호출됨으로써 Preload씬의 소임은 끝
    //다른 어떤 씬.js 파일에서도 호출될 일이 없다. 
    create() {
    // this == PreloadScene
        this.scene.start('MenuScene');
    };

}

export default PreloadScene;