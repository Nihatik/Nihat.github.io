import { playerPokemons } from '../main.js';
import { filterPokemon, capitalizeFirstLetter } from './Utils.js';
import { pokemonPointsData } from '../pokemonPointsBase.js';
import { allPokemons, allItems, allMoves, allTypes } from '../teambuilderBase.js';
import { pokemonLoad } from './PokemonUtils.js';
import { updateVisualTeam, teamPokemonUpdate } from './TeamUtils.js';

export { createResults, filterResults, createMovesResults, createItemsResults }

var imgSource = '../img/';


var searchFilters = {types: [], category: ""};
// Cache for DOM elements
const searchTab = document.querySelector("#SearchTab ul");

// Cache for frequently used Pokemon data
const pokemonCache = new Map();

function getPokemonInfo(pokemon) {
    const key = pokemon.name.replace(/\s/g, '').replace(/-/g, '').replace(/%/g, '').replace('.', '').replace("'", '').toLowerCase();
    if (!pokemonCache.has(key)) {
        pokemonCache.set(key, allPokemons[key]);
    }
    return pokemonCache.get(key);
}

function createPokemonResultElement(pokemon) {
    const pokemonInfo = getPokemonInfo(pokemon);
    const li = document.createElement('li');
    li.classList.add('result');

    const a = document.createElement('a');

    // Create icon
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
    } else {
        const dex_number = +pokemonInfo.num;
        const first = dex_number % 12 * 40;
        const second = Math.floor(dex_number / 12) * 30;
        divPokemonIcon.style.backgroundPosition = `-${first}px -${second}px`;
    }
    divPokemonIcon.style.backgroundColor = 'transparent';
    divIcon.appendChild(divPokemonIcon);

    // Create name
    const divName = document.createElement('div');
    divName.classList.add('result-pokemon-name');
    divName.textContent = pokemonInfo.name;

    // Create types
    const divTypes = document.createElement('div');
    divTypes.classList.add('result-pokemon-types');
    pokemonInfo.types.forEach(type => {
        const imgType = document.createElement('img');
        imgType.src = imgSource + type.toLowerCase() + '_type.png';
        divTypes.appendChild(imgType);
    });

    // Create abilities
    const divAbilities = document.createElement('div');
    divAbilities.classList.add('result-pokemon-abilities');
    for (let i = 0; i < 2; i++) {
        const pAbility = document.createElement('p');
        pAbility.textContent = pokemonInfo.abilities[i];
        divAbilities.appendChild(pAbility);
    }

    // Create hidden abilities
    const divHA = document.createElement('div');
    divHA.classList.add('result-pokemon-ha');
    for (let i = 0; i < 2; i++) {
        const pHA = document.createElement('p');
        pHA.textContent = i === 0 ? pokemonInfo.abilities.H : pokemonInfo.abilities.S;
        divHA.appendChild(pHA);
    }

    // Create BST
    const divBST = document.createElement('div');
    divBST.classList.add('result-pokemon-bst');
    divBST.textContent = Object.values(pokemonInfo.baseStats).reduce((total, stat) => total + stat, 0);

    // Append all elements
    a.appendChild(divIcon);
    a.appendChild(divName);
    a.appendChild(divTypes);
    a.appendChild(divAbilities);
    a.appendChild(divHA);

    // Add stats
    for (let i = 0; i < 6; i++) {
        const divStat = document.createElement('div');
        divStat.classList.add('result-pokemon-stat');
        divStat.textContent = pokemonInfo.baseStats[Object.keys(pokemonInfo.baseStats)[i]];
        a.appendChild(divStat);
    }
    a.appendChild(divBST);
    // Add click handler
    let buttons = document.querySelectorAll('.pokemon-pick-btn');
    a.setAttribute('data-name', pokemon.name);
    a.onclick = () => {
        const picked = $("#pokemon-picked-btn");
        let num = picked.attr("num");
        let object = buttons[num];

        console.log(num, "NUM");
        const basePokemon = getPokemonInfo(pokemon);

        pokemonLoad(num, basePokemon, object);
        updateVisualTeam(playerPokemons[num], num, object);
        teamPokemonUpdate(playerPokemons[num], num, object);

        picked.attr("id", "pokemon-picked-btn");
        picked.removeClass("new-pokemon-btn");
        $(".new-pokemon-btn").css("display", "none");
        $(".new-pokemon-btn").first().css("display", "flex");
    };

    li.appendChild(a);
    li.classList.add("result-show");
    return li;
}

function createResults(filter = null) {
    console.log("NEWRESULTS!!")
    const results = searchTab.querySelectorAll('.result');
    results.forEach(result => {
        if ((result.querySelector('a') || result.querySelector('h3')) && !result.querySelector('.current-result')) {
            result.remove();
        }
    });

    const minPointValue = filter ? -1 : 2;

    const pokemonByPoints = new Map();
    for (let i = 6; i > minPointValue; i--) {
        const filters = [pokemon => pokemon.points === i];
        if (filter) {
            filters.push(filter);
        }
        const pokemons = filterPokemon(pokemonPointsData, filters);
        if (pokemons.length > 0) {
            pokemonByPoints.set(i, pokemons);
        }
    }

    // Create result elements
    pokemonByPoints.forEach((pokemons, points) => {
        // Add points header
        const headerLi = document.createElement('li');
        headerLi.classList.add('result');
        const h3 = document.createElement('h3');
        h3.textContent = points;
        headerLi.appendChild(h3);
        searchTab.appendChild(headerLi);

        pokemons.forEach(pokemon => {
            const resultElement = createPokemonResultElement(pokemon);
            searchTab.appendChild(resultElement);
        });
    });
    createFilterResults();
}

function filterResults(filter = null) {
    const filters = filter ? [filter] : [];

    const allElements = document.querySelectorAll('#SearchTab ul .result');

    const searchText = document.querySelector("#search-input").value;

    allElements.forEach(el => {
        const aTag = el.querySelector('a');
        if (!aTag) return;


        const resultName = aTag.getAttribute('data-name');
        const normalizedName = resultName.replace(/\s|[-.%']/g, '').toLowerCase();
        
        if (normalizedName.includes(searchText.replace(/\s|[-.%']/g, '').toLowerCase())) {
            el.classList.toggle("result-show", true);
        } else {
            el.classList.remove("result-show");
        }
        if (searchFilters.types.length > 0){
            aTag.querySelectorAll('.result-pokemon-types img').forEach(img => {
                console.log(img.src.split('/').pop().split('_')[0].toLowerCase());
                if (!searchFilters.types.some(type => 
                    type.toLowerCase() === img.src.split('/').pop().split('_')[0].toLowerCase())) {
                    el.classList.remove("result-show");
                }                
            });
        }
    });
}

function createMovesResults(filter = null, moveNum) {
    searchTab.innerHTML = '';

    const filters = filter ? [filter] : [];
    const filteredMoves = Object.entries(allMoves).reduce((acc, [key, move]) => {
        if (filters.every(f =>
            key.startsWith(f.replace(' ', '').toLowerCase()) ||
            key.includes(f.replace(' ', '').toLowerCase())
        )) {
            acc[key] = move;
        }
        return acc;
    }, {});

    // Add moves header
    const headerLi = document.createElement('li');
    headerLi.classList.add('result');
    const h3 = document.createElement('h3');
    h3.textContent = 'Moves';
    headerLi.appendChild(h3);
    searchTab.appendChild(headerLi);

    console.log($("#pokemon-picked-btn").attr("num"));
    const foundPokemon = pokemonPointsData.find(pokemon => pokemon.name === playerPokemons[$("#pokemon-picked-btn").attr("num")].name);
    const normalizedLearnset = new Set(
        foundPokemon.learnset.map(m => m.toLowerCase().replace(/\s+/g, '').replace('-', ''))
    );
    createActiveFilters();
    // Create move elements
    Object.entries(filteredMoves).forEach(([key, move]) => {
        const normalizedMove = key.toLowerCase().replace(/\s+/g, '').replace('-', '');
        if (!normalizedLearnset.has(normalizedMove)) return;

        const li = document.createElement('li');
        li.classList.add('result');
        const a = document.createElement('a');

        // Create move name
        const divName = document.createElement('div');
        divName.classList.add('result-pokemon-name');
        divName.textContent = move.name;

        // Create move description
        const divDesc = document.createElement('div');
        divDesc.classList.add('result-move-desc');
        divDesc.textContent = move.shortDesc;

        // Create move type
        const divTypes = document.createElement('div');
        divTypes.classList.add('result-move-type');
        const imgType = document.createElement('img');
        imgType.src = imgSource + move.type.toLowerCase() + '_type.png';
        divTypes.appendChild(imgType);

        // Create move stats
        const stats = [
            { class: 'result-move-cat', value: move.category },
            { class: 'result-move-power', value: move.basePower },
            { class: 'result-move-acc', value: move.accuracy === true ? '-' : move.accuracy },
            { class: 'result-move-pp', value: move.pp }
        ];

        a.appendChild(divName);
        a.appendChild(divTypes);
        a.appendChild(divDesc);

        stats.forEach(({ class: className, value }) => {
            const div = document.createElement('div');
            div.classList.add(className);
            div.textContent = value;
            a.appendChild(div);
        });

        // Append all elements

        // Add click handler
        a.onclick = () => {
            const picked = $("#pokemon-picked-btn");
            let num = picked.attr("num");
            let object = document.querySelectorAll('.pokemon-pick-btn')[num];
            playerPokemons[num].moves[moveNum] = move;
            updateVisualTeam(playerPokemons[num], num, object);
            teamPokemonUpdate(playerPokemons[num], num, object);
            let nextMoveNum = parseInt(moveNum) < 3 ? parseInt(moveNum) + 1 : 0;
            document.querySelectorAll('.team-pokemon-moves')[num].querySelectorAll('span')[nextMoveNum].querySelector('input').focus();
        };

        a.setAttribute('data-name', move.name);
        li.appendChild(a);
        li.classList.add("result-show");
        searchTab.appendChild(li);
    });
    createFilterResults();
}

function createItemsResults(filter = null) {
    searchTab.innerHTML = '';

    const filters = filter ? [filter] : [];
    const filteredItems = Object.entries(allItems).reduce((acc, [key, item]) => {
        if (key.startsWith('tr')) return acc;
        if (filters.every(f =>
            key.startsWith(f.replace(' ', '').toLowerCase()) ||
            key.includes(f.replace(' ', '').toLowerCase())
        )) {
            acc[key] = item;
        }
        return acc;
    }, {});

    // Create item elements
    Object.entries(filteredItems).forEach(([key, item]) => {
        const li = document.createElement('li');
        li.classList.add('result');
        const a = document.createElement('a');

        // Create item icon
        const divIcon = document.createElement('div');
        divIcon.classList.add('result-pokemon-icon');
        const divPokemonIcon = document.createElement('div');
        divPokemonIcon.classList.add('pokemon-icon');

        const firstCord = -(item.spritenum % 16 * 24);
        const secondCord = -(Math.floor(item.spritenum / 16) * 24);

        divPokemonIcon.style = `
            width: 24px;
            height: 24px;
            background: url(${imgSource}/itemicons-sheet.png) no-repeat ${firstCord}px ${secondCord}px transparent;
        `;

        divIcon.appendChild(divPokemonIcon);

        // Create item name and description
        const divName = document.createElement('div');
        divName.classList.add('result-pokemon-name');
        divName.textContent = item.name;

        const divDesc = document.createElement('div');
        divDesc.classList.add('result-item-desc');
        divDesc.textContent = item.desc;

        // Append all elements
        a.appendChild(divIcon);
        a.appendChild(divName);
        a.appendChild(divDesc);

        // Add click handler
        a.onclick = () => {
            
            const picked = $("#pokemon-picked-btn");
            let num = picked.attr("num");
            let object = document.querySelectorAll('.pokemon-pick-btn')[num];
            playerPokemons[num].item = item;
            updateVisualTeam(playerPokemons[num], num, object);
            teamPokemonUpdate(playerPokemons[num], num, object);
            document.querySelectorAll('.team-pokemon-moves')[num].querySelector('input').focus();
        };

        li.appendChild(a);
        a.setAttribute('data-name', item.name);
        li.classList.add("result-show");
        searchTab.appendChild(li);
    });
}

function createActiveFilters() {
    const activeFilters = document.createElement('div');
    activeFilters.classList.add('active-filters');

    console.log( "SEARCH FILTERS: ", searchFilters);
    searchFilters.types.forEach(type => {
        const filterItem = document.createElement('div');
        filterItem.classList.add('active-filter');
        filterItem.innerHTML = 
            "<img src='" + imgSource + type.toLowerCase() + "_type.png' />" +
            "<span>" + type + "</span>";

        filterItem.onclick = () =>{
            searchFilters.types.pop(type);
            $("#search-input").focus();
            filterResults(null,num,object);
        }
        activeFilters.appendChild(filterItem);
    });

    searchTab.appendChild(activeFilters);
}

function createFilterResults() {

    Object.entries(allTypes).forEach(([key, type]) => {
        let typeName = capitalizeFirstLetter(key);
        const li = document.createElement('li');
        li.classList.add('result');
        const a = document.createElement('a');
    
        const divName = document.createElement('div');
        divName.classList.add('result-pokemon-name');
        divName.textContent = typeName;
    
        const divDesc = document.createElement('div');
        divDesc.classList.add('result-move-desc');
        divDesc.textContent = 'Adds ' + typeName + ' type filter to search';
    
        const divTypes = document.createElement('div');
        divTypes.classList.add('result-move-type');
        const imgType = document.createElement('img');
        imgType.src = imgSource + typeName.toLowerCase() + '_type.png';
        divTypes.appendChild(imgType);
    
        a.appendChild(divTypes);
        a.appendChild(divName);
        a.appendChild(divDesc);
        a.onclick = () => {
            searchFilters.types.push(typeName);
            $("#search-input").value = "";
            $("#search-input").focus();
        };
    
        a.setAttribute('data-name', typeName + 'type');
        li.appendChild(a);
        searchTab.appendChild(li);
    });
}

function getPokemonIcon(pokemon) {
    // Implement icon URL generation based on pokemon data
    return `/images/pokemon/icons/${pokemon.num}.png`;
} 