// 메뉴 씬은 페이저 필요없이 베이스 씬을 부모로 쓴다
import BaseScene from "./BaseScene";

class MenuScene extends BaseScene {
    //constructor는 해당 클래스의 소유
    constructor(config) {
        //super는 부모클래스의 constructor
        //즉 부모클래스가 자신의 생성자를 만들 때는 자식이 쓴다는 마인드로 지정할 것
        super('MenuScene', config);

        //부모인 Base씬이 쓸 메뉴 변수들
        this.menu = [
            {scene: 'PlayScene', text: 'Play'},
            {scene: 'ScoreScene', text: 'Score'},
            {scene: null, text: 'Exit'},
        ];
    }

    create() {
        //super - 부모 클래스의 create메서드 호출
        super.create();
        //this - 자기 클래스의 createMenu메서드 호출
        this.createMenu(this.menu, this.setupMenuEvents.bind(this));
    };

    
    setupMenuEvents(menuItem) {
        const textGO = menuItem.textGO;
        //부모 Base씬에서 map돌리면서 새롭게 할당해준 textGO에 인터렉티브 효과 적용
        textGO.setInteractive();

        // setInteractive의 구체적인 설정
        // 마우스 올렸을 때, 뗐을 때 색깔
        textGO.on('pointerover', () => {
            textGO.setStyle({fill: '#ff0'});
        });

        textGO.on('pointerout', () => {
            textGO.setStyle({fill: '#fff'});
        });
        // 마우스로 눌렀을 때
        textGO.on('pointerup', () => {
            menuItem.scene && this.scene.start(menuItem.scene);
        
            if(menuItem.text === 'Exit'){
                this.game.destroy(true);
            }
        });
        

    }


}


export default MenuScene;