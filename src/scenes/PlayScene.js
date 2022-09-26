import BaseScene from "./BaseScene";


// TODO
// 1. 토끼가 날아다닐 바닥(구름)을 깐다.
// 2. 버튼을 누르면 토끼가 앞으로 나아가게 한다.
// 3. 특정한 버튼을 누르면 토끼가 데구르르 구르게 한다.
// 4. 특정한 버튼을 누르면 토끼가 날아오르게 한다.
// 5. 랜덤한 위치에 나타난 아이템을 획득하면 게임 종료

class PlayScene extends BaseScene {

    constructor(config) {
    super('PlayScene', config);
    }


    create() {
        super.create();
    }

    update() {

    }
}

export default PlayScene;