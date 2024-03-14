import { random } from "./randomLogic.js";

export function selectEnemyMonster(monsters, enemyMonsterSpan) {
    let randomMonster = random(0, monsters.length - 1);
    enemyMonsterSpan.innerHTML = monsters[randomMonster].name;
}