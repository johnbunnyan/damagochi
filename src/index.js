import Phaser from 'phaser';

// 아래에 씬 가져오기
import PreloadScene from './scenes/PreloadScene';
import MenuScene from './scenes/MenuScene';
import ScoreScene from './scenes/ScoreScene';
import PlayScene from './scenes/PlayScene';

//전체 환경 설정 -> SHARED_CONFIG에 객체로 담길 변수들
const WIDTH = 600;
const HEIGHT = 600;
const ME_POSTION = {
    x: WIDTH * 0.1,
    y: HEIGHT / 2
};

const SHARED_CONFIG = {
    width: WIDTH,
    height: HEIGHT,
    startPosition: ME_POSTION
}

//씬 정리 및 초기화
//씬 구성 순서는 보통 Preload -> Menu -> 기타 씬 순
//일단 Preload 씬 구성하고 그 다음 Base -> Menu 순으로 씬 구성하기!
const Scenes = [PreloadScene,MenuScene, ScoreScene, PlayScene];  
const createScene = Scene => new Scene(SHARED_CONFIG);
const initScenes = () => Scenes.map(createScene);

//최종 설정 객체구성
const config = {
    type: Phaser.AUTO,
    ...SHARED_CONFIG,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
        }
    },
    scene: initScenes()
}

//게임 실행
new Phaser.Game(config);