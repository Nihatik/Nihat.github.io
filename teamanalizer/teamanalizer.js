import { pokemonPointsData } from "../pokemonPointsBase.js";



var tierList = ['LC', 'NFE', 'RU', 'UU', 'OU', 'Ubers', 'AG']

const currentTeam = new Proxy(['', '', '', '', '', ''], {
    set(target, property, value) {
        target[property] = value;
        currentTeamVisualUpdate();
        const savedTeams = [...currentTeam];
        localStorage.setItem("savedTeam", JSON.stringify(savedTeams));
        return true;
    }
});

var currentPokemonIndex = 0;

var movesForPoints = ['Baton Pass', 'Last Respects', 'Roar', 'Whirlwind', 'Dragon Tail']

const state = { currentSystem: 'points' };

export const settings = new Proxy(state, {
    set(target, property, value) {
        if (target[property] !== value) {
            target[property] = value;
            teamTierValueVisualUpdate();
            localStorage.setItem("savedSystem", state.currentSystem);
        }
        console.log('Изменено значение currentSystem:', value);
        return true;
    }
});

var searchInput = document.querySelector("#searchInput")
document.onload = onLoad();





function teamTierValueVisualUpdate() {

    let pokemonPickBtns = document.querySelectorAll(".pokemon-pick-btn");
    let i = 0;
    let totalMin = 0;
    let totalMax = 0;
    let totalTier = 'LC';
    currentTeam.forEach(pokemon => {
        if (pokemon != '') {
            let buttonToUpdate = pokemonPickBtns[i];
            if (state.currentSystem == 'points') {
                if (pokemon.pointsHa) {
                    totalMax += pokemon.pointsHa
                    buttonToUpdate.querySelector('.pokemon-pick-tier').textContent = pokemon.points + ' (' + pokemon.pointsHa + ')';
                } else {
                    totalMin += pokemon.points
                    totalMax += pokemon.points
                    buttonToUpdate.querySelector('.pokemon-pick-tier').textContent = pokemon.points;
                }
            }
            if (state.currentSystem == 'tiers') {
                if (tierList.indexOf(totalTier) < tierList.indexOf(pokemon.tier)) {
                    totalTier = pokemon.tier
                }
                buttonToUpdate.querySelector('.pokemon-pick-tier').textContent = pokemon.tier;
            }
        }
        i += 1;
    });
    if (state.currentSystem == 'points') {
        document.querySelector('#current-team-tier-value').textContent = 'Current Team ' + totalMin + ' (' + totalMax + ')'
    } else if (state.currentSystem == 'tiers') {
        document.querySelector('#current-team-tier-value').textContent = 'Current Team ' + totalTier
    }
    console.log("Team has been updated:", currentTeam);
}

function onLoad() {
    searchInput = document.querySelector("#searchInput")
    searchInput.focus();
    state.currentSystem = localStorage.getItem("savedSystem")

    const savedTeam = JSON.parse(localStorage.getItem("savedTeam")) || [];
    console.log(savedTeam)
    savedTeam.forEach((pokemon, index) => {
        if (index < currentTeam.length) {
            currentTeam[index] = pokemon; // Использование Proxy для вызова set
        }
    });

    console.log(currentTeam)

    const itemOptions = document.querySelector('#itemOptions');

    pokemonPointsData.forEach(pokemon => {
        const pokemonName = pokemon.name;

        let li = document.createElement('li');
        li.setAttribute('data-value', pokemonName);
        createPokemonIcon(pokemon, li);

        let label = document.createElement('label');
        label.textContent = pokemonName;
        li.appendChild(label);

        itemOptions.appendChild(li);
        li.style.display = 'none';

        li.addEventListener('click', function () {
            currentTeam[currentPokemonIndex] = getPokemonFromBaseByName(li.getAttribute('data-value'));
            console.log(currentTeam);
            if (currentPokemonIndex < 5) {
                currentPickedPokemonNumberChange(currentPokemonIndex + 1);
            }

            document.getElementById('searchInput').value = '';
            document.getElementById('itemOptions').classList.remove('active');
        });
    });

    let pokemonPickBtns = document.querySelectorAll(".pokemon-pick-btn");
    pokemonPickBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            currentPickedPokemonNumberChange(parseInt(this.getAttribute('num')));
            searchInput.select();
        });
    });
}

document.getElementById('searchInput').addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();
    const items = document.querySelectorAll('#itemOptions li');

    items.forEach(item => {
        if (item.getAttribute('data-value').toLowerCase().startsWith(searchValue)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });

    const hasVisibleItems = Array.from(items).some(item => item.style.display === '');
    document.getElementById('itemOptions').classList.toggle('active', hasVisibleItems);
});

function getPokemonFromBaseByName(pokemonName) {
    let filters = [];
    filters.push(pokemon => pokemon.name == pokemonName);
    let results = filterPokemon(pokemonPointsData, filters);
    return results[0];
}

function createPokemonIcon(pokemon, object) {
    let div = document.createElement('div');
    div.classList = "pokemon-icon";
    let sprite = document.createElement('span');
    sprite.style.width = '40px';
    sprite.style.height = '30px';
    sprite.style.backgroundImage = 'url("https://play.pokemonshowdown.com/sprites/pokemonicons-sheet.png?v16")';
    sprite.style.display = "inline-block";
    sprite.style.backgroundRepeat = 'no-repeat';

    let filters = [];
    let pokemonNameBase = pokemon.name;
    filters.push(pokemon => pokemon.name == pokemonNameBase);
    let pokemonDataIconLoc = filterPokemon(pokemonPointsData, filters);

    if (pokemonDataIconLoc[0].iconLoc) {
        sprite.style.backgroundPosition = pokemonDataIconLoc[0].iconLoc;
    } else {
        let dex_number = +pokemon.num;
        let first = dex_number % 12 * 40;
        let second = Math.floor(dex_number / 12) * 30;
        sprite.style.backgroundPosition = '-' + first.toString() + 'px' + ' -' + second.toString() + 'px';
    }

    sprite.style.backgroundColor = 'transparent';
    div.appendChild(sprite);
    object.appendChild(div);
}

function updatePokemonIcon(pokemon, spriteObject) {
    let sprite = spriteObject;
    if (pokemon.iconLoc) {
        sprite.style.backgroundPosition = pokemon.iconLoc;
    } else {
        let dex_number = +pokemon.num;
        let first = dex_number % 12 * 40;
        let second = Math.floor(dex_number / 12) * 30;
        sprite.style.backgroundPosition = '-' + first.toString() + 'px' + ' -' + second.toString() + 'px';
    }
}

function filterPokemon(pokemonArray, filters) {
    return pokemonArray.filter(pokemon => {
        for (const filter of filters) {
            if (!filter(pokemon)) {
                return false;
            }
        }
        return true;
    });
}

function currentPickedPokemonNumberChange(index) {
    let pokemonPickBtns = document.querySelectorAll(".pokemon-pick-btn");
    console.log(index);
    if (pokemonPickBtns[currentPokemonIndex].classList.contains('current-picked-btn')) {
        pokemonPickBtns[currentPokemonIndex].classList.toggle('current-picked-btn');
    }
    pokemonPickBtns[index].classList.toggle('current-picked-btn');
    currentPokemonIndex = index;
}

function currentTeamVisualUpdate() {
    let pokemonPickBtns = document.querySelectorAll(".pokemon-pick-btn");
    let i = 0;
    currentTeam.forEach(pokemon => {
        if (pokemon != '') {
            let buttonToUpdate = pokemonPickBtns[i];
            buttonToUpdate.querySelector('.pokemon-pick-name').textContent = pokemon.name;
            teamTierValueVisualUpdate();
            updatePokemonIcon(pokemon, buttonToUpdate.querySelector('span'));
        }
        i += 1;
    });
    updateAdditionalInfoForTeam()
    console.log("Team has been updated:", currentTeam);
}


function updateAdditionalInfoForTeam() {
    let text = '';
    if (state.currentSystem == 'points') {
        text += "Возможные атаки за балл: <br>"
        currentTeam.forEach(pokemon => {
            if (pokemon != '') {
                movesForPoints.forEach(moveName => {
                    if (pokemon.learnset.includes(moveName.toLowerCase().replace(' ', ''))) {
                        text += pokemon.name + ' - ' + moveName + '<br>';
                    }
                })
            }
        });
        document.querySelector('#description-text-menu').style.fontSize = '14px'
        document.querySelector('#description-text-menu').style.fontWeight = '100'
    }
    else if (state.currentSystem == 'tiers') {
        text += "Mono/Dual Type <br> Ubers UU <br>  Doubles OU <br> Doubles Uber <br> "
        document.querySelector('#description-text-menu').style.fontSize = '18px'
        document.querySelector('#description-text-menu').style.fontWeight = '900'
    }
    document.querySelector('#description-text-menu').innerHTML = text;
}