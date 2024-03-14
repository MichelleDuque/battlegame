const selectAttackSection = document.querySelector('#select-attack');
const restartSection = document.querySelector('#restart');
const monsterButton = document.querySelector('#monster-button');
const earthButton = document.querySelector('#earth-button');
restartSection.style.display = 'none';
const fireButton = document.querySelector('#fire-button');
const waterButton = document.querySelector('#water-button');
const restartButton = document.querySelector('#restart-button');

const selectMonsterSection = document.querySelector('#select-monster');
const playerMonsterSpan = document.querySelector('#player-monster');

const enemyMonsterSpan = document.querySelector('#enemy-monster');

const playerLivesSpan = document.querySelector('#player-lives');
const enemyLivesSpan = document.querySelector('#enemy-lives');

const messagesSection = document.querySelector('#result');
const playerAttacksDiv = document.querySelector('#player-attacks-list');
const enemyAttacksDiv = document.querySelector('#enemy-attacks-list');
const cardsContainer = document.querySelector("#cards-container");

let monsters = [];
let playerAttack;
let enemyAttack;
let monsterOption;
let graveltuskInput;
let dreadscaleInput;
let frostbiteInput;
let nightshadeInput;
let venomspineInput;
let thunderhideInput;
let playerLives = 3;
let enemyLives = 3;

class Monster {
    constructor(name, image, life) {
        this.name = name;
        this.image = image;
        this.life = life;
        this.attacks = [];
    }
}

let graveltusk = new Monster('Graveltusk', './images/Graveltusk.svg', 5);
let dreadscale = new Monster('Dreadscale', './images/Dreadscale.svg', 5);
let frostbite = new Monster('Frostbite', './images/Frostbite.svg', 5);
let nightshade = new Monster('Nightshade', './images/Nightshade.svg', 5);
let thunderhide= new Monster('Thunderhide', './images/Thunderhide.svg', 5);
let venomspine= new Monster('Venomspine', './images/Venomspine.svg', 5);

graveltusk.attacks.push(
    { name: "💧", id: "water-button" },
    { name: "💧", id: "water-button" },
    { name: "💧", id: "water-button" },
    { name: "🔥", id: "fire-button" },
    { name: "🍀", id: "earth-button" }
);

dreadscale.attacks.push(
    { name: "🍀", id: "earth-button" },
    { name: "🍀", id: "earth-button" },
    { name: "🍀", id: "earth-button" },
    { name: "💧", id: "water-button" },
    { name: "🔥", id: "fire-button" }
);

frostbite.attacks.push(
    { name: "🔥", id: "fire-button" },
    { name: "🔥", id: "fire-button" },
    { name: "🔥", id: "fire-button" },
    { name: "💧", id: "water-button" },
    { name: "🍀", id: "earth-button" }
);

nightshade.attacks.push(
    { name: "🔥", id: "fire-button" },
    { name: "🔥", id: "fire-button" },
    { name: "🔥", id: "fire-button" },
    { name: "💧", id: "water-button" },
    { name: "🍀", id: "earth-button" }
);

thunderhide.attacks.push(
    { name: "🔥", id: "fire-button" },
    { name: "🔥", id: "fire-button" },
    { name: "💧", id: "water-button" },
    { name: "💧", id: "water-button" },
    { name: "🍀", id: "earth-button" }
);

venomspine.attacks.push(
    { name: "💧", id: "water-button" },
    { name: "💧", id: "water-button" },
    { name: "💧", id: "water-button" },
    { name: "🔥", id: "fire-button" },
    { name: "🍀", id: "earth-button" }
);

monsters.push(graveltusk, dreadscale, frostbite, nightshade, thunderhide, venomspine);

function startGame() {
    selectAttackSection.style.display = 'none';

    monsters.forEach((monster) => {
        monsterOption = `
        <input type="radio" name="monster" id=${monster.name}>
        <label class="monster-card" for=${monster.name}>
            <p>${monster.name}</p>
            <img src=${monster.image} alt=${monster.name}>
        </label>
        `;
        cardsContainer.innerHTML += monsterOption;

        graveltuskInput = document.querySelector('#Graveltusk');
        dreadscaleInput = document.querySelector('#Dreadscale');
        frostbiteInput = document.querySelector('#Frostbite');
        nightshadeInput = document.querySelector("#Nightshade");
        thunderhideInput = document.querySelector("#Thunderhide");
        venomspineInput = document.querySelector("#VenomspineInput")

    });

    monsterButton.addEventListener('click', selectPlayerMonster);
    fireButton.addEventListener('click', fireAttack);
    waterButton.addEventListener('click', waterAttack);
    earthButton.addEventListener('click', earthAttack);
    restartButton.addEventListener('click', restartGame);
}

function selectPlayerMonster() {
    selectMonsterSection.style.display = 'none';
    selectAttackSection.style.display = 'flex';

    if (graveltuskInput.checked) {
        playerMonsterSpan.innerHTML = graveltuskInput.id;
    } else if (dreadscaleInput.checked) {
        playerMonsterSpan.innerHTML = dreadscaleInput.id;
    } else if (frostbiteInput.checked) {
        playerMonsterSpan.innerHTML = frostbiteInput.id;
    } else if (thunderhideInput.checked) {
        playerMonsterSpan.innerHTML = thunderhideInput.id;
    }else if (venomspineInput.checked) {
        playerMonsterSpan.innerHTML = venomspineInput.id;
    }else if (nightshadeInput.checked) {
        playerMonsterSpan.innerHTML = nightshadeInput.id;
    }else {
        alert('Select a monster');
    }

    selectEnemyMonster();
}

function selectEnemyMonster() {
    let randomMonster = random(0, monsters.length - 1);
    enemyMonsterSpan.innerHTML = monsters[randomMonster].name;
}

function fireAttack() {
    playerAttack = 'FIRE';
    randomEnemyAttack();
}

function waterAttack() {
    playerAttack = 'WATER';
    randomEnemyAttack();
}

function earthAttack() {
    playerAttack = 'EARTH';
    randomEnemyAttack();
}

function randomEnemyAttack() {
    let randomAttack = random(1, 3);

    if (randomAttack === 1) {
        enemyAttack = 'FIRE';
    } else if (randomAttack === 2) {
        enemyAttack = 'WATER';
    } else {
        enemyAttack = 'EARTH';
    }

    combat();
}

function combat() {
    if (enemyAttack === playerAttack) {
        createMessage("DRAW");
    } else if (playerAttack === 'FIRE' && enemyAttack === 'EARTH') {
        createMessage("YOU WON");
        enemyLives--;
        enemyLivesSpan.innerHTML = enemyLives;
    } else if (playerAttack === 'WATER' && enemyAttack === 'FIRE') {
        createMessage("YOU WON");
        enemyLives--;
        enemyLivesSpan.innerHTML = enemyLives;
    } else if (playerAttack === 'EARTH' && enemyAttack === 'WATER') {
        createMessage("YOU WON");
        enemyLives--;
        enemyLivesSpan.innerHTML = enemyLives;
    } else {
        createMessage("YOU LOST");
        playerLives--;
        playerLivesSpan.innerHTML = playerLives;
    }

    checkLives();
}

function checkLives() {
    if (enemyLives === 0) {
        createFinalMessage("CONGRATULATIONS! You won :)");
    } else if (playerLives === 0) {
        createFinalMessage('Sorry, you lost :(');
    }
}

function createMessage(result) {
    let newPlayerAttack = document.createElement('p');
    let newEnemyAttack = document.createElement('p');

    messagesSection.innerHTML = result;
    newPlayerAttack.innerHTML = playerAttack;
    newEnemyAttack.innerHTML = enemyAttack;

    playerAttacksDiv.appendChild(newPlayerAttack);
    enemyAttacksDiv.appendChild(newEnemyAttack);
}

function createFinalMessage(finalResult) {
    messagesSection.innerHTML = finalResult;

    fireButton.disabled = true;
    waterButton.disabled = true;
    earthButton.disabled = true;

    restartSection.style.display = "block";
}

function restartGame() {
    location.reload();
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('load', startGame);
