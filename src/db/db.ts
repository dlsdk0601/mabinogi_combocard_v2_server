import { join } from "path";

export interface ComboCard {
  pk: number;
  name: string;
  englishName: string;
  path: string;
}

/*
 * DB 를 셋팅하면 개발기(local 컴퓨터)에 DB 셋팅을 해야하거나,
 * 최소한 DOCKER 라도 다운 받아져야하는데, 이거는 셋팅이 된다면 DB 연결 진행
 * */

class DB {
  readonly combocards: ComboCard[] = [
    {
      pk: 1,
      name: "다운 어택",
      englishName: "downAttack",
      path: "/api/asset/downAttack.png",
    },
    {
      pk: 2,
      name: "돌진",
      englishName: "assault",
      path: "/api/asset/assault.png",
    },
    {
      pk: 3,
      name: "디펜스",
      englishName: "defense",
      path: "/api/asset/defense.png",
    },
    {
      pk: 4,
      name: "랜스 차지",
      englishName: "lanceCharge",
      path: "/api/asset/lanceCharge.png",
    },
    {
      pk: 5,
      name: "레인지 컴뱃 마스터리",
      englishName: "rangedCombatMastery",
      path: "/api/asset/rangedCombatMastery.png",
    },
    {
      pk: 6,
      name: "매그넘 샷",
      englishName: "magnumshot",
      path: "/api/asset/magnumshot.png",
    },
    {
      pk: 7,
      name: "스매시",
      englishName: "smash",
      path: "/api/asset/smash.png",
    },
    {
      pk: 8,
      name: "윈드밀",
      englishName: "windMill",
      path: "/api/asset/windMill.png",
    },
    {
      pk: 9,
      name: "카운터 어택",
      englishName: "counterAttack",
      path: "/api/asset/counterAttack.png",
    },
    {
      pk: 10,
      name: "컴뱃 마스터리",
      englishName: "combatMastery",
      path: "/api/asset/combatMastery.png",
    },
    {
      pk: 11,
      name: "크래시 샷",
      englishName: "crashShot",
      path: "/api/asset/crashShot.png",
    },
    {
      pk: 12,
      name: "라이트닝로드",
      englishName: "lightningRoad",
      path: "/api/asset/lightningRoad.png",
    },
    {
      pk: 13,
      name: "라이트닝볼트",
      englishName: "lightningbolt",
      path: "/api/asset/lightningbolt.png",
    },
    {
      pk: 14,
      name: "썬더",
      englishName: "thunder",
      path: "/api/asset/thunder.png",
    },
    {
      pk: 15,
      name: "아이스 스피어",
      englishName: "iceSpear",
      path: "/api/asset/iceSpear.png",
    },
    {
      pk: 16,
      name: "아이스볼트",
      englishName: "iceBolt",
      path: "/api/asset/iceBolt.png",
    },
    {
      pk: 17,
      name: "파이어볼",
      englishName: "fireball",
      path: "/api/asset/fireball.png",
    },
    {
      pk: 1,
      name: "파이어볼트",
      englishName: "firebolt",
      path: "/api/asset/firebolt.png",
    },
    {
      pk: 18,
      name: "샌드 버스트",
      englishName: "sandBurst",
      path: "/api/asset/sandBurst.png",
    },
    {
      pk: 19,
      name: "워터 캐논",
      englishName: "waterCannon",
      path: "/api/asset/waterCannon.png",
    },
    {
      pk: 20,
      name: "플레이머",
      englishName: "flame",
      path: "/api/asset/flame.png",
    },
    {
      pk: 21,
      name: "연속기: 대쉬 펀치",
      englishName: "dashpunch",
      path: "/api/asset/dashpunch.png",
    },
    {
      pk: 22,
      name: "연속기: 스크류 어퍼",
      englishName: "screwupper",
      path: "/api/asset/screwupper.png",
    },
    {
      pk: 23,
      name: "연속기: 파운딩",
      englishName: "pounding",
      path: "/api/asset/pounding.png",
    },
    {
      pk: 24,
      name: "4막: 질투의 화신",
      englishName: "marionetteWindmill",
      path: "/api/asset/marionetteWindmill.png",
    },
    {
      pk: 25,
      name: "6막: 유혹의 올가미",
      englishName: "marionetteSpiral",
      path: "/api/asset/marionetteSpiral.png",
    },
    {
      pk: 26,
      name: "슈팅 러쉬",
      englishName: "shootingRush",
      path: "/api/asset/shootingRush.png",
    },
    {
      pk: 27,
      name: "크로스 버스터",
      englishName: "crossBuster",
      path: "/api/asset/crossBuster.png",
    },
    {
      pk: 28,
      name: "수리검 돌진",
      englishName: "shurikenCharging",
      path: "/api/asset/shurikenCharging.png",
    },
    {
      pk: 29,
      name: "수리검 폭풍",
      englishName: "shurikenStorm",
      path: "/api/asset/shurikenStorm.png",
    },
    {
      pk: 30,
      name: "데스 마커",
      englishName: "deathMarker",
      path: "/api/asset/deathMarker.png",
    },
    {
      pk: 31,
      name: "스피닝 슬래시",
      englishName: "chainSpinningSlash",
      path: "/api/asset/chainSpinningSlash.png",
    },
  ];

  // 이미지도 aws 에 올리는게 좋으나 아직 DB 도 없고 어드민도 없어서 static 파일을 그냥 보낸다.
  getImagePath(filename: string) {
    return join(__dirname, "..", "images", filename);
  }
}

export const db = new DB();
