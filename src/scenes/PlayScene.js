import BaseScene from "./BaseScene";


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
    }


    create() {
        super.create();
    }

    update() {

    }
}

export default PlayScene;