export interface ComboCard {
  pk: number;
  name: string;
  englishName: string;
  path: string;
  downloadPath: string;
}

export interface Manager {
  pk: number;
  name: string;
  id: string;
  password: string;
}

/*
 * DB 를 셋팅하면 개발기(local 컴퓨터)에 DB 셋팅을 해야하거나,
 * 최소한 DOCKER 라도 다운 받아져야하는데, 이거는 셋팅이 된다면 DB 연결 진행
 * */

class DB {
  readonly comboCards: ComboCard[] = [
    {
      pk: 1,
      name: "다운 어택",
      englishName: "downAttack",
      path: "/api/asset/downAttack.jpg",
      downloadPath: "/api/asset/download/downAttack.jpg",
    },
    {
      pk: 2,
      name: "돌진",
      englishName: "assault",
      path: "/api/asset/assault.jpg",
      downloadPath: "/api/asset/download/assault.jpg",
    },
    {
      pk: 3,
      name: "디펜스",
      englishName: "defense",
      path: "/api/asset/defense.jpg",
      downloadPath: "/api/asset/download/defense.jpg",
    },
    {
      pk: 4,
      name: "랜스 차지",
      englishName: "lanceCharge",
      path: "/api/asset/lanceCharge.jpg",
      downloadPath: "/api/asset/download/lanceCharge.jpg",
    },
    {
      pk: 5,
      name: "레인지 컴뱃 마스터리",
      englishName: "rangedCombatMastery",
      path: "/api/asset/rangedCombatMastery.jpg",
      downloadPath: "/api/asset/download/rangedCombatMastery.jpg",
    },
    {
      pk: 6,
      name: "매그넘 샷",
      englishName: "magnumshot",
      path: "/api/asset/magnumshot.jpg",
      downloadPath: "/api/asset/download/magnumshot.jpg",
    },
    {
      pk: 7,
      name: "스매시",
      englishName: "smash",
      path: "/api/asset/smash.jpg",
      downloadPath: "/api/asset/download/smash.jpg",
    },
    {
      pk: 8,
      name: "윈드밀",
      englishName: "windMill",
      path: "/api/asset/windMill.jpg",
      downloadPath: "/api/asset/download/windMill.jpg",
    },
    {
      pk: 9,
      name: "카운터 어택",
      englishName: "counterAttack",
      path: "/api/asset/counterAttack.jpg",
      downloadPath: "/api/asset/download/counterAttack.jpg",
    },
    {
      pk: 10,
      name: "컴뱃 마스터리",
      englishName: "combatMastery",
      path: "/api/asset/combatMastery.jpg",
      downloadPath: "/api/asset/download/combatMastery.jpg",
    },
    {
      pk: 11,
      name: "크래시 샷",
      englishName: "crashShot",
      path: "/api/asset/crashShot.jpg",
      downloadPath: "/api/asset/download/crashShot.jpg",
    },
    {
      pk: 12,
      name: "라이트닝로드",
      englishName: "lightningRoad",
      path: "/api/asset/lightningRoad.jpg",
      downloadPath: "/api/asset/download/lightningRoad.jpg",
    },
    {
      pk: 13,
      name: "라이트닝볼트",
      englishName: "lightningbolt",
      path: "/api/asset/lightningbolt.jpg",
      downloadPath: "/api/asset/download/lightningbolt.jpg",
    },
    {
      pk: 14,
      name: "썬더",
      englishName: "thunder",
      path: "/api/asset/thunder.jpg",
      downloadPath: "/api/asset/download/thunder.jpg",
    },
    {
      pk: 15,
      name: "아이스 스피어",
      englishName: "iceSpear",
      path: "/api/asset/iceSpear.jpg",
      downloadPath: "/api/asset/download/iceSpear.jpg",
    },
    {
      pk: 16,
      name: "아이스볼트",
      englishName: "iceBolt",
      path: "/api/asset/iceBolt.jpg",
      downloadPath: "/api/asset/download/iceBolt.jpg",
    },
    {
      pk: 17,
      name: "파이어볼",
      englishName: "fireball",
      path: "/api/asset/fireball.jpg",
      downloadPath: "/api/asset/download/fireball.jpg",
    },
    {
      pk: 1,
      name: "파이어볼트",
      englishName: "firebolt",
      path: "/api/asset/firebolt.jpg",
      downloadPath: "/api/asset/download/firebolt.jpg",
    },
    {
      pk: 18,
      name: "샌드 버스트",
      englishName: "sandBurst",
      path: "/api/asset/sandBurst.jpg",
      downloadPath: "/api/asset/download/sandBurst.jpg",
    },
    {
      pk: 19,
      name: "워터 캐논",
      englishName: "waterCannon",
      path: "/api/asset/waterCannon.jpg",
      downloadPath: "/api/asset/download/waterCannon.jpg",
    },
    {
      pk: 20,
      name: "플레이머",
      englishName: "flame",
      path: "/api/asset/flame.jpg",
      downloadPath: "/api/asset/download/flame.jpg",
    },
    {
      pk: 21,
      name: "연속기: 대쉬 펀치",
      englishName: "dashpunch",
      path: "/api/asset/dashpunch.jpg",
      downloadPath: "/api/asset/download/dashpunch.jpg",
    },
    {
      pk: 22,
      name: "연속기: 스크류 어퍼",
      englishName: "screwupper",
      path: "/api/asset/screwupper.jpg",
      downloadPath: "/api/asset/download/screwupper.jpg",
    },
    {
      pk: 23,
      name: "연속기: 파운딩",
      englishName: "pounding",
      path: "/api/asset/pounding.jpg",
      downloadPath: "/api/asset/download/pounding.jpg",
    },
    {
      pk: 24,
      name: "4막: 질투의 화신",
      englishName: "marionetteWindmill",
      path: "/api/asset/marionetteWindmill.jpg",
      downloadPath: "/api/asset/download/marionetteWindmill.jpg",
    },
    {
      pk: 25,
      name: "6막: 유혹의 올가미",
      englishName: "marionetteSpiral",
      path: "/api/asset/marionetteSpiral.jpg",
      downloadPath: "/api/asset/download/marionetteSpiral.jpg",
    },
    {
      pk: 26,
      name: "슈팅 러쉬",
      englishName: "shootingRush",
      path: "/api/asset/shootingRush.jpg",
      downloadPath: "/api/asset/download/shootingRush.jpg",
    },
    {
      pk: 27,
      name: "크로스 버스터",
      englishName: "crossBuster",
      path: "/api/asset/crossBuster.jpg",
      downloadPath: "/api/asset/download/crossBuster.jpg",
    },
    {
      pk: 28,
      name: "수리검 돌진",
      englishName: "shurikenCharging",
      path: "/api/asset/shurikenCharging.jpg",
      downloadPath: "/api/asset/download/shurikenCharging.jpg",
    },
    {
      pk: 29,
      name: "수리검 폭풍",
      englishName: "shurikenStorm",
      path: "/api/asset/shurikenStorm.jpg",
      downloadPath: "/api/asset/download/shurikenStorm.jpg",
    },
    {
      pk: 30,
      name: "데스 마커",
      englishName: "deathMarker",
      path: "/api/asset/deathMarker.jpg",
      downloadPath: "/api/asset/download/deathMarker.jpg",
    },
    {
      pk: 31,
      name: "스피닝 슬래시",
      englishName: "chainSpinningSlash",
      path: "/api/asset/chainSpinningSlash.jpg",
      downloadPath: "/api/asset/download/chainSpinningSlash.jpg",
    },
  ];

  readonly managers: Manager[] = [{ pk: 1, name: "manager", id: "manager", password: "1234" }];
}

export const db = new DB();
