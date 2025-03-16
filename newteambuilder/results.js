import { pokemonPointsData } from "../pokemonPointsBase.js";

var imgSource = '../img/';

import { allPokemons, allItems, allAbilities, allMoves } from '../teambuilderBase.js';

import { filterPokemon, pokemonLoad, updateVisualTeam, playerPokemons, teamPokemonUpdate} from './script.js';



function createResults(filter = null, num = null, object = null) {
    let minPointValue = 3
    const container = document.querySelector("#PokemonsTab");
    let results = container.querySelectorAll('.result');
    results.forEach(function (result) {
        if ((result.querySelector('a') || result.querySelector('h3')) && !result.querySelector('.current-result')) {
            result.remove();
        }
    });
    if (filter) {
        minPointValue = -1
    }


    for (let i = 6; i > minPointValue; i--) {
        const filters = [];
        filters.push(pokemon => pokemon.points == i);
        if (filter) {
            filters.push(filter);
        }
        let pokemons = filterPokemon(pokemonPointsData, filters)
        if (pokemons.length != 0) {
            var li = document.createElement('li');
            li.classList.add('result');
            let h3 = document.createElement('h3')
            h3.textContent = i;
            li.appendChild(h3)
            container.appendChild(li);
        }

        for (let pokemon of pokemons) {
            const pokemonInfo = allPokemons[pokemon.name.replace(/\s/g, '').replace(/-/g, '').replace(/%/g, '').replace('.', '').replace("'", '').toLowerCase()];
            const li = document.createElement('li');
            li.classList.add('result');

            const a = document.createElement('a');

            const divIcon = document.createElement('div');
            divIcon.classList.add('result-pokemon-icon');

            const divPokemonIcon = document.createElement('div');
            divPokemonIcon.classList.add('pokemon-icon');
            divPokemonIcon.style.width = '40px';
            divPokemonIcon.style.height = '30px';
            divPokemonIcon.style.backgroundImage = 'url("../img/pokemonicon.png")';
            divPokemonIcon.style.backgroundRepeat = 'no-repeat';

            if (pokemon.iconLoc) {
                divPokemonIcon.style.backgroundPosition = pokemon.iconLoc;
            }
            else {
                let dex_number = +pokemonInfo.num;
                let first = dex_number % 12 * 40;
                let second = Math.floor(dex_number / 12) * 30;

                divPokemonIcon.style.backgroundPosition = '-' + first.toString() + 'px' + ' -' + second.toString() + 'px';
            }
            divPokemonIcon.style.backgroundColor = 'transparent';


            divIcon.appendChild(divPokemonIcon);

            const divName = document.createElement('div');
            divName.classList.add('result-pokemon-name');
            divName.textContent = pokemonInfo.name;

            const divTypes = document.createElement('div');
            divTypes.classList.add('result-pokemon-types');

            pokemonInfo.types.forEach(function (type) {
                const imgType = document.createElement('img');
                imgType.src = imgSource + type.toLowerCase() + '_type.png';
                divTypes.appendChild(imgType);
            });

            const divAbilities = document.createElement('div');
            divAbilities.classList.add('result-pokemon-abilities');
            for (let i = 0; i < 2; i++) {
                const pAbility = document.createElement('p');
                pAbility.textContent = pokemonInfo.abilities[i]
                divAbilities.appendChild(pAbility);
            }

            const divHA = document.createElement('div');
            divHA.classList.add('result-pokemon-ha');
            for (let i = 0; i < 2; i++) {
                const pHA = document.createElement('p');
                if (i == 0) {
                    pHA.textContent = pokemonInfo.abilities.H
                }
                else {
                    pHA.textContent = pokemonInfo.abilities.S
                }
                divHA.appendChild(pHA);
            }

            const divBST = document.createElement('div');
            divBST.classList.add('result-pokemon-bst');
            divBST.textContent = Object.values(pokemonInfo.baseStats).reduce((total, stat) => total + stat, 0);

            a.appendChild(divIcon);
            a.appendChild(divName);
            a.appendChild(divTypes);
            a.appendChild(divAbilities);
            a.appendChild(divHA);

            for (let i = 0; i < 6; i++) {
                const divStat = document.createElement('div');
                divStat.classList.add('result-pokemon-stat');
                divStat.textContent = pokemonInfo.baseStats[Object.keys(pokemonInfo.baseStats)[i]];
                a.appendChild(divStat);
            }
            a.appendChild(divBST);
            a.setAttribute('data-name', pokemon.name)
            a.onclick = function () {
                const pokemonName = this.getAttribute('data-name');
                let basePokemon = allPokemons[pokemonName.replace(/\s/g, '').replace(/-/g, '').replace(/%/g, '').replace('.', '').replace("'", '').toLowerCase()]
                pokemonLoad(num, basePokemon, object)
                updateVisualTeam(playerPokemons[num], num, object)
                teamPokemonUpdate(playerPokemons[num], num, object)
                console.log("NUMBER: " + num)
            };

            li.appendChild(a);
            li.classList.add("result-show");

            document.querySelector('#PokemonsTab').appendChild(li);
        }
    }
}
function filterResults(filter = null, num = null, object = null) {
    const filters = [];
    if (filter) {
        filters.push(filter);
    }

    let pokemons = filterPokemon(pokemonPointsData, filters);

    document.querySelectorAll('.result-show').forEach(el => el.classList.remove('result-show'));

    for (let pokemon of pokemons) {
        const pokemonName = pokemon.name
            .replace(/\s|[-.%']/g, '')
            .toLowerCase();
        const pokemonInfo = allPokemons[pokemonName];
        if (!pokemonInfo) continue;

        console.log(pokemonInfo.name);
        const element = document.querySelector(`[data-name="${pokemonInfo.name}"]`);
        if (element) {
            const parentLi = element.closest('li');
            if (parentLi) {
                parentLi.classList.add('result-show');
            }
        }
    }
}



function createMovesResults(filter = null, num = null, object = null, moveNum) {
    var results = document.querySelector('#MovesTab');
    results.innerHTML = '';

    console.log(num)
    const filters = [];
    if (filter) {
        filters.push(filter);
    }
    const filteredMoves = Object.keys(allMoves).reduce((acc, key) => {
        if (filters.every(filter => key.startsWith(filter.replace(' ', '').toLowerCase()) || key.includes(filter.replace(' ', '').toLowerCase()))) {
            acc[key] = allMoves[key];
        }
        return acc;
    }, {});

    var li = document.createElement('li');
    li.classList.add('result');
    let h3 = document.createElement('h3')
    h3.textContent = 'Moves';
    li.appendChild(h3)
    document.querySelector('#MovesTab').appendChild(li);

    var foundPokemon = pokemonPointsData.find(function (pokemon) {
        return pokemon.name === playerPokemons[num].name;
    });
    for (let move of Object.keys(filteredMoves)) {
    
        const normalizedLearnset = foundPokemon.learnset.map(m => m.toLowerCase().replace(/\s+/g, '').replace('-', ''));
        const normalizedMove = move.toLowerCase().replace(/\s+/g, '').replace('-', '');
    
        if (normalizedLearnset.includes(normalizedMove)) {
            move = allMoves[move];
            
            const li = document.createElement('li');
            li.classList.add('result');
            const a = document.createElement('a');

            const divName = document.createElement('div');
            divName.classList.add('result-pokemon-name');
            divName.textContent = move.name;

            const divDesc = document.createElement('div');
            divDesc.classList.add('result-move-desc')
            divDesc.textContent = move.shortDesc

            const divTypes = document.createElement('div');
            divTypes.classList.add('result-move-type');

            const imgType = document.createElement('img');
            imgType.src = imgSource + move.type.toLowerCase() + '_type.png';
            divTypes.appendChild(imgType);

            let divPower = document.createElement('div');
            divPower.classList.add('result-move-power');
            divPower.textContent = move.basePower

            let divPP = document.createElement('div');
            divPP.classList.add('result-move-pp');
            divPP.textContent = move.pp

            let divAcc = document.createElement('div');
            divAcc.classList.add('result-move-acc');
            if (move.accuracy == true) {
                divAcc.textContent = '-'
            }
            else {
                divAcc.textContent = move.accuracy
            }

            let divCat = document.createElement('div');
            divCat.classList.add('result-move-cat');
            divCat.textContent = move.category

            a.appendChild(divName);
            a.appendChild(divTypes)
            a.appendChild(divCat);
            a.appendChild(divPower);
            a.appendChild(divAcc);
            a.appendChild(divPP);
            a.appendChild(divDesc)

            a.setAttribute('data-name', move.name)
            a.onclick = function () {
                let moveName = this.getAttribute('data-name');
                playerPokemons[num].moves[moveNum] = allMoves[moveName.replace(' ', '').replace('-', '').toLowerCase()];
                updateVisualTeam(playerPokemons[num], num, object)
                teamPokemonUpdate(playerPokemons[num], num, object)
                let moves = document.querySelectorAll('.moves span');
                if (moves[moveNum + 1]) {
                    moves[moveNum + 1].querySelector('input').focus();
                }
            };

            li.appendChild(a);

            document.querySelector('#MovesTab').appendChild(li);
        }
    }
}

function createItemsResults(filter = null, num = null, object = null) {
    return;
    const container = document.querySelector("#ItemsTab");
    var results = document.querySelectorAll('.teambuilder-results ul .result');
    results.forEach(function (result) {
        if ((result.querySelector('a') || result.querySelector('h3')) && !result.querySelector('.current-result')) {
            result.remove();
        }
    });
    const filters = [];
    if (filter) {
        filters.push(filter);
    }
    const filteredItems = Object.keys(allItems).reduce((acc, key) => {
        if (filters.every(filter => allItems[key].name.toLowerCase().replace(' ', '').startsWith(filter.replace(' ', '').toLowerCase()) || allItems[key].name.toLowerCase().replace(' ', '').includes(filter.replace(' ', '').toLowerCase()))) {
            acc[key] = allItems[key];
        }
        return acc;
    }, {});


    var li = document.createElement('li');
    li.classList.add('result');
    let h3 = document.createElement('h3')
    h3.textContent = 'Items';
    li.appendChild(h3)
    container.appendChild(li);

    for (let item of Object.keys(filteredItems)) {
        if(!item.startsWith("tr")){
            item = allItems[item]
            const li = document.createElement('li');
            li.classList.add('result');
    
            const a = document.createElement('a');
    
            const divIcon = document.createElement('div');
            divIcon.classList.add('result-pokemon-icon');
    
            const divPokemonIcon = document.createElement('div');
            divPokemonIcon.classList.add('pokemon-icon');
    
            let firstCord = -(item.spritenum % 16 * 24)
            let secondCord = -(Math.floor(item.spritenum / 16) * 24)
    
            divPokemonIcon.style.width = '24px';
            divPokemonIcon.style.height = '24px';
            divPokemonIcon.style.backgroundImage = 'url(' + imgSource + '/itemicons-sheet.png)';
            divPokemonIcon.style.backgroundRepeat = 'no-repeat';
    
            divPokemonIcon.style.backgroundPosition = firstCord + 'px ' + secondCord + 'px';
    
            divPokemonIcon.style.backgroundColor = 'transparent';
    
            divIcon.appendChild(divPokemonIcon);
    
            const divName = document.createElement('div');
            divName.classList.add('result-pokemon-name');
            divName.textContent = item.name;
    
            const divDesc = document.createElement('div');
            divDesc.classList.add('result-item-desc')
            divDesc.textContent = item.desc
    
            a.appendChild(divIcon);
            a.appendChild(divName);
            a.appendChild(divDesc)
    
            a.setAttribute('data-name', item.name)
            a.onclick = function () {
                let itemName = this.getAttribute('data-name');
                playerPokemons[num].item = allItems[itemName.replace(' ', '').replace('-', '').toLowerCase()];
                updateVisualTeam(playerPokemons[num], num, object)
                teamPokemonUpdate(playerPokemons[num], num, object)
                document.querySelectorAll('.moves span')[0].querySelector('input').focus();
            };
    
            li.appendChild(a);
    
            container.appendChild(li);
        }
    }
}


export {createResults, createMovesResults, createItemsResults, filterResults}
