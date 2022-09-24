import BaseScene from "./BaseScene"

class ScoreScene extends BaseScene {
    // 부모 클래스의 변수를 가져다 쓰기 위해 파라미터로 받기
    constructor(config) {
        // super에 부모에서 config객체 받고,canGoBack 속성 추가
        //🔥 부모 클래스의 변수를 아래 this.screenCenter처럼 쓸 수 있는 거라면
        // super에서 config를 받는 작업을 하는 이유는 무엇인가?
        super('ScoreScene', {...config, canGoBack: true});
    }

    create() {
        super.create();

        const bestScore = localStorage.getItem('bestScore');
                // this == Base
        this.add.text(...this.screenCenter, `Best Score: ${bestScore || 0}`, this.fontOptions)
        .setOrigin(0.5);

    }
}

export default ScoreScene;