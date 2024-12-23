window.onload = onLoad;

var imgSource = '../img/';

import { allPokemons, allItems, allAbilities, allMoves } from '../teambuilderBase.js';

import { pokemonPointsData } from '../pokemonPointsBase.js'

import {loadBuilds, loadBuildResults} from './builds.js';

import {savedTeamsUpdate} from './teams.js';

function openTab(tabIndex, tabButton) {
    let i, tablinks;
    const boxes = document.querySelector('.tab-container-in');
    
    boxes.style.left = -tabIndex * 100 + '%';

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active-tab", "");
    }

    const tabitems = document.getElementsByClassName("tab-item");
    for (let i = 0; i < tabitems.length; i++) {
        tabitems[i].className = tabitems[i].className.replace(" active-tab", "");
    }

    tabButton.classList.add("active-tab");

    const tabId = tabButton.id + 'Tab';
    const tabContent = document.getElementById(tabId);
    
    if (tabContent) {
        const allTabs = document.querySelectorAll('.tab-container-in > .tab');
        allTabs.forEach(tab => tab.classList.remove("active-tab"));

        tabContent.classList.add("active-tab");
    } else {
        console.error(`Элемент с id '${tabId}' не найден`);
    }
}


function openTab2(evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent2");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks2");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function openPokemonTab(tabIndex, tabButton){
    let i, tablinks;
    const boxes = document.querySelector('#current-pokemon-info-in');
    boxes.style.top = -tabIndex * 100 + '%';
    tablinks = document.querySelectorAll(".pokemon-pick-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active-tab", "");
    }
    tabButton.classList.add("active-tab")
    tablinks.forEach(function (button) {
        if (button.id === "pokemon-picked-btn") {
            button.id = '';
        }
    });
    tabButton.id = "pokemon-picked-btn";
    let pokemon = playerPokemons[tabIndex]
    var findedPokemon = pokemonPointsData.find(function (item) {
        return item.name === pokemon.name && item.num === pokemon.num;
    });
    loadBuildResults(pokemon, tabIndex, tabButton)
    createMovesResults(null, num, object, 0);
    console.log('q')
}

 
var playerPokemons = [
    { name: "Mewtwo", abilities: { 0: 'Overgrow', H: 'Chlorophyll' }, ability: { name: 'Overgrow', onModifyAtkPriority: 5, onModifySpAPriority: 5, flags: {}, rating: 2 }, baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, color: "Green", eggGroups: ['Monster', 'Grass'], evos: ['Ivysaur'], evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, genderRatio: { M: 0.875, F: 0.125 }, heightm: 0.7, hp: 231, item: {}, ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }, level: 100, moves: [{}, {}, {}, {}], nature: "Bashful", num: 150, stats: { hp: 231, atk: 134, def: 134, spa: 166, spd: 166, spe: 134 }, status: null, tier: "LC", types: ['Grass', 'Poison'], weightkg: 6.9 },
    { name: "Arceus", abilities: { 0: 'Overgrow', H: 'Chlorophyll' }, ability: { name: 'Overgrow', onModifyAtkPriority: 5, onModifySpAPriority: 5, flags: {}, rating: 2 }, baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, color: "Green", eggGroups: ['Monster', 'Grass'], evos: ['Ivysaur'], evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, genderRatio: { M: 0.875, F: 0.125 }, heightm: 0.7, hp: 231, item: {}, ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }, level: 100, moves: [{}, {}, {}, {}], nature: "Bashful", num: 493, stats: { hp: 231, atk: 134, def: 134, spa: 166, spd: 166, spe: 134 }, status: null, tier: "LC", types: ['Grass', 'Poison'], weightkg: 6.9 },
    { name: "Beedrill", abilities: { 0: 'Overgrow', H: 'Chlorophyll' }, ability: { name: 'Overgrow', onModifyAtkPriority: 5, onModifySpAPriority: 5, flags: {}, rating: 2 }, baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, color: "Green", eggGroups: ['Monster', 'Grass'], evos: ['Ivysaur'], evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, genderRatio: { M: 0.875, F: 0.125 }, heightm: 0.7, hp: 231, item: {}, ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }, level: 100, moves: [{}, {}, {}, {}], nature: "Bashful", num: 15, stats: { hp: 231, atk: 134, def: 134, spa: 166, spd: 166, spe: 134 }, status: null, tier: "LC", types: ['Grass', 'Poison'], weightkg: 6.9 },
    { name: "Melmetal", abilities: { 0: 'Overgrow', H: 'Chlorophyll' }, ability: { name: 'Overgrow', onModifyAtkPriority: 5, onModifySpAPriority: 5, flags: {}, rating: 2 }, baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, color: "Green", eggGroups: ['Monster', 'Grass'], evos: ['Ivysaur'], evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, genderRatio: { M: 0.875, F: 0.125 }, heightm: 0.7, hp: 231, item: {}, ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }, level: 100, moves: [{}, {}, {}, {}], nature: "Bashful", num: 809, stats: { hp: 231, atk: 134, def: 134, spa: 166, spd: 166, spe: 134 }, status: null, tier: "LC", types: ['Grass', 'Poison'], weightkg: 6.9 },
    { name: "Vivillon", abilities: { 0: 'Overgrow', H: 'Chlorophyll' }, ability: { name: 'Overgrow', onModifyAtkPriority: 5, onModifySpAPriority: 5, flags: {}, rating: 2 }, baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, color: "Green", eggGroups: ['Monster', 'Grass'], evos: ['Ivysaur'], evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, genderRatio: { M: 0.875, F: 0.125 }, heightm: 0.7, hp: 231, item: {}, ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }, level: 100, moves: [{}, {}, {}, {}], nature: "Bashful", num: 666, stats: { hp: 231, atk: 134, def: 134, spa: 166, spd: 166, spe: 134 }, status: null, tier: "LC", types: ['Grass', 'Poison'], weightkg: 6.9 },
    { name: "Pikachu", abilities: { 0: 'Overgrow', H: 'Chlorophyll' }, ability: { name: 'Overgrow', onModifyAtkPriority: 5, onModifySpAPriority: 5, flags: {}, rating: 2 }, baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, color: "Green", eggGroups: ['Monster', 'Grass'], evos: ['Ivysaur'], evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, genderRatio: { M: 0.875, F: 0.125 }, heightm: 0.7, hp: 231, item: {}, ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }, level: 100, moves: [{}, {}, {}, {}], nature: "Bashful", num: 25, stats: { hp: 231, atk: 134, def: 134, spa: 166, spd: 166, spe: 134 }, status: null, tier: "LC", types: ['Grass', 'Poison'], weightkg: 6.9 }
];



const typeEffectiveness = {
    normal: { normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1, rock: 0.5, ghost: 0, dragon: 1, dark: 1, steel: 0.5, fairy: 1 },
    fire: { normal: 1, fire: 0.5, water: 0.5, electric: 1, grass: 2, ice: 2, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 2, rock: 0.5, ghost: 1, dragon: 0.5, dark: 1, steel: 2, fairy: 1 },
    water: { normal: 1, fire: 2, water: 0.5, electric: 1, grass: 0.5, ice: 1, fighting: 1, poison: 1, ground: 2, flying: 1, psychic: 1, bug: 1, rock: 2, ghost: 1, dragon: 0.5, dark: 1, steel: 1, fairy: 1 },
    grass: { normal: 1, fire: 0.5, water: 2, electric: 1, grass: 0.5, ice: 1, fighting: 1, poison: 0.5, ground: 2, flying: 0.5, psychic: 1, bug: 0.5, rock: 2, ghost: 1, dragon: 0.5, dark: 1, steel: 0.5, fairy: 1 },
    electric: { normal: 1, fire: 1, water: 2, electric: 0.5, grass: 0.5, ice: 1, fighting: 1, poison: 1, ground: 0, flying: 2, psychic: 1, bug: 1, rock: 1, ghost: 1, dragon: 0.5, dark: 1, steel: 1, fairy: 1 },
    ice: { normal: 1, fire: 0.5, water: 0.5, electric: 1, grass: 2, ice: 0.5, fighting: 1, poison: 1, ground: 2, flying: 2, psychic: 1, bug: 1, rock: 1, ghost: 1, dragon: 2, dark: 1, steel: 0.5, fairy: 1 },
    fighting: { normal: 2, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 1, poison: 0.5, ground: 1, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dragon: 1, dark: 2, steel: 2, fairy: 0.5 },
    poison: { normal: 1, fire: 1, water: 1, electric: 1, grass: 2, ice: 1, fighting: 1, poison: 0.5, ground: 0.5, flying: 1, psychic: 1, bug: 1, rock: 0.5, ghost: 0.5, dragon: 1, dark: 1, steel: 0, fairy: 2 },
    ground: { normal: 1, fire: 2, water: 1, electric: 2, grass: 0.5, ice: 1, fighting: 1, poison: 2, ground: 1, flying: 0, psychic: 1, bug: 0.5, rock: 2, ghost: 1, dragon: 1, dark: 1, steel: 2, fairy: 1 },
    flying: { normal: 1, fire: 1, water: 1, electric: 0.5, grass: 2, ice: 1, fighting: 2, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 2, rock: 0.5, ghost: 1, dragon: 1, dark: 1, steel: 0.5, fairy: 1 },
    psychic: { normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 2, poison: 2, ground: 1, flying: 1, psychic: 0.5, bug: 1, rock: 1, ghost: 1, dragon: 1, dark: 0, steel: 0.5, fairy: 1 },
    bug: { normal: 1, fire: 0.5, water: 1, electric: 1, grass: 2, ice: 1, fighting: 0.5, poison: 0.5, ground: 1, flying: 0.5, psychic: 2, bug: 1, rock: 1, ghost: 0.5, dragon: 1, dark: 2, steel: 0.5, fairy: 0.5 },
    rock: { normal: 1, fire: 2, water: 1, electric: 1, grass: 1, ice: 2, fighting: 0.5, poison: 1, ground: 0.5, flying: 2, psychic: 1, bug: 2, rock: 1, ghost: 1, dragon: 1, dark: 1, steel: 0.5, fairy: 1 },
    ghost: { normal: 0, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 2, bug: 1, rock: 1, ghost: 2, dragon: 1, dark: 0.5, steel: 1, fairy: 1 },
    dragon: { normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1, rock: 1, ghost: 1, dragon: 2, dark: 1, steel: 0.5, fairy: 0 },
    dark: { normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 0.5, poison: 1, ground: 1, flying: 1, psychic: 2, bug: 1, rock: 1, ghost: 2, dragon: 1, dark: 0.5, steel: 1, fairy: 0.5 },
    steel: { normal: 1, fire: 0.5, water: 0.5, electric: 0.5, grass: 1, ice: 2, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1, rock: 2, ghost: 1, dragon: 1, dark: 1, steel: 0.5, fairy: 2 },
    fairy: { normal: 1, fire: 0.5, water: 1, electric: 1, grass: 1, ice: 1, fighting: 2, poison: 0.5, ground: 1, flying: 1, psychic: 1, bug: 1, rock: 1, ghost: 1, dragon: 2, dark: 2, steel: 0.5, fairy: 1 },
};




var natures = {
    "Adamant": { boosted: "atk", reduced: "spa" },
    "Bashful": {},
    "Bold": { boosted: "def", reduced: "atk" },
    "Brave": { boosted: "atk", reduced: "spe" },
    "Calm": { boosted: "spd", reduced: "atk" },
    "Careful": { boosted: "spd", reduced: "spa" },
    "Docile": {},
    "Gentle": { boosted: "spd", reduced: "def" },
    "Hardy": {},
    "Hasty": { boosted: "spe", reduced: "def" },
    "Impish": { boosted: "def", reduced: "spa" },
    "Jolly": { boosted: "spe", reduced: "spa" },
    "Lax": { boosted: "def", reduced: "spd" },
    "Lonely": { boosted: "atk", reduced: "def" },
    "Mild": { boosted: "spa", reduced: "def" },
    "Modest": { boosted: "spa", reduced: "atk" },
    "Naive": { boosted: "spe", reduced: "spd" },
    "Naughty": { boosted: "atk", reduced: "spd" },
    "Quiet": { boosted: "spa", reduced: "spe" },
    "Quirky": {},
    "Rash": { boosted: "spa", reduced: "spd" },
    "Relaxed": { boosted: "def", reduced: "spe" },
    "Sassy": { boosted: "spd", reduced: "spe" },
    "Serious": {},
    "Timid": { boosted: "spe", reduced: "atk" }
};

var movesForPoints = ['Whirlwind', 'Roar', 'Baton Pass']

export {pokemonStatsLoad, movesForPoints, playerPokemons, updateVisualTeam, teamPokemonUpdate as teamCurPokemonChange};

function presentInfoUpdate(opponent = null) {
    var buttons = document.querySelectorAll('.pokemon-pick-btn');
    /* if (document.getElementById("playerteam-input-text").value) {
        submitPokePaste(playerPokemons, document.getElementById("playerteam-input-text").value);
    } */
    for (var i = 0; i < 6; i++) {
        if (playerPokemons[i].types) {
            console.log('ff')
            updateVisualTeam(playerPokemons[i], i, buttons[i])
            teamPokemonUpdate(playerPokemons[i], i);
        }
    }
}

function checkToSpace(text) {
    var textWords = text.split(' ');
    var newText = '';
    for (var z = 0; z < textWords.length; z++) {
        newText += textWords[z];
        if (textWords[z + 1]) {
            newText += ' ';
        }
    }
    return newText
}

function pokemonsParam(team) {
    team.forEach(function (pokemon) {
        if (pokemon.name) {
            var pokebase = allPokemons[pokemon.name.replace(/\s/g, '').replace(/-/g, '').replace(/'/, '').toLowerCase()];
            for (var key in pokebase) {
                if (pokebase.hasOwnProperty(key)) {
                    pokemon[key] = pokebase[key];
                }
            }
        }
    });
}

function movesParam(team) {
    team.forEach(function (pokemon) {
        if (pokemon.moves) {
            pokemon.moves.forEach(function (move) {
                var movebase = allMoves[move.name.replace(/\s/g, '').replace(/-/g, '').replace(/'/, '').toLowerCase()];
                for (var key in movebase) {
                    if (movebase.hasOwnProperty(key)) {
                        move[key] = movebase[key];
                    }
                }
                move.pp += ((move.pp / 5) * 3)
                move.currentPP = move.pp
            });
        }
    });
}

function itemsParam(team) {
    team.forEach(function (pokemon) {
        if (pokemon.item) {
            var itembase = allItems[pokemon.item.name.replace(/\s/g, '').replace(/-/g, '').replace(/'/, '').toLowerCase()];
            for (var key in itembase) {
                if (itembase.hasOwnProperty(key)) {
                    pokemon.item[key] = itembase[key];
                }
            }
        }
    });
}

function abilitiesParam(team) {
    team.forEach(function (pokemon) {
        if (pokemon.ability) {
            var abilitybase = allAbilities[pokemon.ability.name.replace(/\s/g, '').replace(/-/g, '').replace(/'/, '').toLowerCase()];
            for (var key in abilitybase) {
                if (abilitybase.hasOwnProperty(key)) {
                    pokemon.ability[key] = abilitybase[key];
                }
            }
        }
    });
}


function pokemonStatsLoad(team) {
    var level = 100;
    team.forEach(function (pokemon) {
        if (!pokemon.name) {
            return
        }
        var baseStats = pokemon.baseStats
        var ivs = pokemon.ivs

        if (!pokemon.stats) {
            pokemon.stats = {}
        }

        pokemon.stats.hp = ((2 * baseStats.hp + ivs.hp) / 100 * level) + 10 + level;



        pokemon.stats.atk = ((2 * baseStats.atk) / 100 * level) + 5 + ivs.atk;
        pokemon.stats.def = ((2 * baseStats.def) / 100 * level) + 5 + ivs.def;
        pokemon.stats.spa = ((2 * baseStats.spa) / 100 * level) + 5 + ivs.spa;
        pokemon.stats.spd = ((2 * baseStats.spd) / 100 * level) + 5 + ivs.spd;
        pokemon.stats.spe = ((2 * baseStats.spe) / 100 * level) + 5 + ivs.spe;


        if (!pokemon.evs) {
            pokemon.evs = {
                hp: 0,
                atk: 0,
                def: 0,
                spa: 0,
                spd: 0,
                spe: 0
            }
            var keys = Object.keys(pokemon.evs);

            var randomIndex1 = Math.floor(Math.random() * keys.length);
            var randomIndex2;
            do {
                randomIndex2 = Math.floor(Math.random() * keys.length);
            } while (randomIndex1 === randomIndex2);

            var randomIndex3;
            do {
                randomIndex3 = Math.floor(Math.random() * keys.length);
            } while (randomIndex1 === randomIndex3 || randomIndex2 === randomIndex3);

            pokemon.evs[keys[randomIndex1]] = 252;
            pokemon.evs[keys[randomIndex2]] = 252;
            pokemon.evs[keys[randomIndex3]] = 4;
        }

        pokemon.stats.hp += pokemon.evs.hp / 4;
        pokemon.stats.atk += pokemon.evs.atk / 4;
        pokemon.stats.def += pokemon.evs.def / 4;
        pokemon.stats.spa += pokemon.evs.spa / 4;
        pokemon.stats.spd += pokemon.evs.spd / 4;
        pokemon.stats.spe += pokemon.evs.spe / 4;

        if (!pokemon.nature) {
            var natureKeys = Object.keys(natures);

            var randomKeyIndex = Math.floor(Math.random() * natureKeys.length);
            var randomNatureKey = natureKeys[randomKeyIndex];

            pokemon.nature = randomNatureKey;
        }
        var nature = pokemon.nature;

        if (nature && natures[nature]) {
            var boostedStat = natures[nature].boosted;
            var reducedStat = natures[nature].reduced;

            if (boostedStat) {
                pokemon.stats[boostedStat] *= 1.1;
            }
            if (reducedStat) {
                pokemon.stats[reducedStat] *= 0.9;
            }
        }


        pokemon.stats.hp = Math.floor(pokemon.stats.hp);
        pokemon.stats.atk = Math.floor(pokemon.stats.atk);
        pokemon.stats.def = Math.floor(pokemon.stats.def);
        pokemon.stats.spa = Math.floor(pokemon.stats.spa);
        pokemon.stats.spd = Math.floor(pokemon.stats.spd);
        pokemon.stats.spe = Math.floor(pokemon.stats.spe);

        pokemon.hp = pokemon.stats.hp;

        pokemon.status = null;
    })

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

function pokemonToBaseValues(pokemon) {
    pokemon.moves = [{}, {}, {}, {}];
    pokemon.stats = {};
    pokemon.boosts = {
        atk: 0,
        def: 0,
        spa: 0,
        spd: 0,
        spe: 0,
    };
    pokemon.level = 100;
    pokemon.evs = {
        hp: 0,
        atk: 0,
        def: 0,
        spa: 0,
        spd: 0,
        spe: 0,
    }
    pokemon.ivs = {
        hp: 31,
        atk: 31,
        def: 31,
        spa: 31,
        spd: 31,
        spe: 31,
    }
    pokemon.item = {}
    pokemon.ability = {}
    pokemon.nature = 'Bashful';
}

function submitPokePaste(team, inputText) {
    var pastes = inputText.split(/\n\s*\n/);
    var j = 0;
    var a = 0;
    for (var i = 0; i < pastes.length; i++) {
        var lines = pastes[i].split('\n');
        if (team[j] && lines[0] != '') {
            team[j] = {}
            team[j].moves = [{}, {}, {}, {}];
            team[j].stats = {};
            team[j].boosts = {
                atk: 0,
                def: 0,
                spa: 0,
                spd: 0,
                spe: 0,
            };
            team[j].level = 100;
            team[j].evs = {
                hp: 0,
                atk: 0,
                def: 0,
                spa: 0,
                spd: 0,
                spe: 0,
            }
            team[j].ivs = {
                hp: 31,
                atk: 31,
                def: 31,
                spa: 31,
                spd: 31,
                spe: 31,
            }
            team[j].item = {}
            team[j].ability = {}
            for (var c = 0; c < lines.length; c++) {
                var line = lines[c];
                var words = line.split(' ');
                if (c == 0) {
                    team[j].name = words[0];
                    if (words[1] != '@' && !(words[1].includes('('))) {
                        team[j].name += ' ' + words[1];
                    }
                }

                if (line.includes('@')) {
                    for (var b = 0; b < words.length; b++) {
                        if (words[b].includes('@')) {

                            team[j].item.name = words[b + 1] + ' ' + words[b + 2].replace(/\s/g, '') + ' ' + words[b + 3].replace(/\s/g, '');
                            team[j].item.name = checkToSpace(team[j].item.name);
                        }
                    }
                }

                if (line.includes('Nature')) {
                    team[j].nature = words[0];
                }

                if (line.includes('Ability: ')) {
                    team[j].ability.name = words[1];
                    team[j].ability.name += ' ' + words[2].replace(/\s/g, '');
                    team[j].ability.name += ' ' + words[3].replace(/\s/g, '');
                    team[j].ability.name = checkToSpace(team[j].ability.name);
                    a++;
                    if (a == 4) {
                        a = 0;
                    }
                }

                if (line.includes('EVs:')) {
                    for (var b = 0; b < words.length; b++) {
                        if (words[b].includes('HP')) {
                            team[j].evs.hp = parseInt(words[b - 1]);
                        }
                        else if (words[b].includes('Atk')) {
                            team[j].evs.atk = parseInt(words[b - 1]);
                        }
                        else if (words[b].includes('Def')) {
                            team[j].evs.def = parseInt(words[b - 1]);
                        }
                        else if (words[b].includes('SpA')) {
                            team[j].evs.spa = parseInt(words[b - 1]);
                        }
                        else if (words[b].includes('SpD')) {
                            team[j].evs.spd = parseInt(words[b - 1]);
                        }
                        else if (words[b].includes('Spe')) {
                            team[j].evs.spe = parseInt(words[b - 1]);
                        }
                    }
                }


                if (line.includes('-')) {
                    team[j].moves[a].name = words[1];
                    team[j].moves[a].name += ' ' + words[2].replace(/\s/g, '');
                    team[j].moves[a].name += ' ' + words[3].replace(/\s/g, '');
                    team[j].moves[a].name = checkToSpace(team[j].moves[a].name);
                    a++;
                    if (a == 4) {
                        a = 0;
                    }
                }

            }
        }
        j++;
    }

    pokemonsParam(team)
    pokemonStatsLoad(team);
    movesParam(team);
    itemsParam(team);
    abilitiesParam(team);
}

function calculateTeamPointsValue(team, pokemon = null) {
    let teamPointsValue = 0
    if (team) {
        team.forEach(function (pokemon) {
            if (pokemon.name) {
                let pokemonOtherForm = null
                let findedPokemon = null
                if (pokemon.otherFormes) {
                    pokemonOtherForm = allPokemons[pokemon.otherFormes[0].replace(/\s/g, '').replace(/-/g, '').replace(/%/g, '').replace('.', '').replace("'", '').toLowerCase()];
                }
                if (pokemonOtherForm && pokemonOtherForm.requiredItem && pokemonOtherForm.requiredItem == pokemon.item.name) {
                    findedPokemon = pokemonPointsData.find(function (item) {
                        return item.name === pokemon.otherFormes[0] && item.num === pokemon.num;
                    });
                }
                else if (pokemon.item.itemUser && pokemon.item.itemUser == pokemon.name) {
                    if (pokemon.item.megaStone) {
                        findedPokemon = pokemonPointsData.find(function (item) {
                            return item.name === pokemon.item.megaStone && item.num === pokemon.num;
                        });
                    } else {
                        findedPokemon = pokemonPointsData.find(function (item) {
                            return item.name === pokemon.item.itemUser[0] && item.num === pokemon.num;
                        });
                    }
                }
                else {
                    findedPokemon = pokemonPointsData.find(function (item) {
                        return item.name === pokemon.name && item.num === pokemon.num;
                    });
                }
                if (pokemon.ability.name == pokemon.abilities.H && findedPokemon.pointsHa) {
                    teamPointsValue += findedPokemon.pointsHa
                }
                else {
                    /* teamPointsValue += findedPokemon.points */
                }



                if (pokemon.moves) {
                    pokemon.moves.forEach(function (move) {
                        if (move.name) {
                            if (movesForPoints.includes(move.name)) {
                                teamPointsValue += 1;
                            }
                        }
                    })
                }
            }
        })
    }
    else {
        if (pokemon.name) {
            let pokemonOtherForm = null
            let findedPokemon = null
            if (pokemon.otherFormes) {
                pokemonOtherForm = allPokemons[pokemon.otherFormes[0].replace(/\s/g, '').replace(/-/g, '').replace(/%/g, '').replace('.', '').replace("'", '').toLowerCase()];
            }
            if (pokemonOtherForm && pokemonOtherForm.requiredItem && pokemonOtherForm.requiredItem == pokemon.item.name) {
                findedPokemon = pokemonPointsData.find(function (item) {
                    return item.name === pokemon.otherFormes[0] && item.num === pokemon.num;
                });
            }
            else if (pokemon.item.itemUser && pokemon.item.itemUser == pokemon.name) {
                if (pokemon.item.megaStone) {
                    findedPokemon = pokemonPointsData.find(function (item) {
                        return item.name === pokemon.item.megaStone && item.num === pokemon.num;
                    });
                } else {
                    findedPokemon = pokemonPointsData.find(function (item) {
                        return item.name === pokemon.item.itemUser[0] && item.num === pokemon.num;
                    });
                }
            }
            else {
                findedPokemon = pokemonPointsData.find(function (item) {
                    return item.name === pokemon.name && item.num === pokemon.num;
                });
            }
            if (pokemon.ability.name == pokemon.abilities.H && findedPokemon.pointsHa) {
                teamPointsValue += findedPokemon.pointsHa
            }
            else {
                teamPointsValue += findedPokemon.points
            }



            if (pokemon.moves) {
                pokemon.moves.forEach(function (move) {
                    if (move.name) {
                        if (movesForPoints.includes(move.name)) {
                            teamPointsValue += 1;
                        }
                    }
                })
            }
        }
    }
    return teamPointsValue;
}

function updateVisualTeam(pokemon, num = null, object = null) {
    let thisPokemonTab = document.querySelectorAll(".team-pokemon-tab")[num]

    var teamPointsValue = calculateTeamPointsValue(playerPokemons);

    document.getElementById('team-points-value').textContent = 'Points: ' + teamPointsValue;

    let sprite = object.querySelector('.pokemon-icon span')

    sprite.style.width = '40px';
    sprite.style.height = '30px';
    sprite.style.backgroundImage = 'url("https://play.pokemonshowdown.com/sprites/ыs-sheet.png?v16")';
    sprite.style.backgroundRepeat = 'no-repeat';
    let filters = []
    let pokemonNameBase = pokemon.name
    filters.push(pokemon => pokemon.name == pokemonNameBase);
    let pokemonDataIconLoc = filterPokemon(pokemonPointsData, filters)
    if (pokemonDataIconLoc[0].iconLoc) {
        sprite.style.backgroundPosition = pokemonDataIconLoc[0].iconLoc;
    }
    else {
        let dex_number = +pokemon.num;
        let first = dex_number % 12 * 40;
        let second = Math.floor(dex_number / 12) * 30;

        sprite.style.backgroundPosition = '-' + first.toString() + 'px' + ' -' + second.toString() + 'px';
    }
    sprite.style.backgroundColor = 'transparent';

    let objectLabel = object.querySelector('label')
    let pokemonName = objectLabel;
    pokemonName.textContent = pokemon.name;
    if (pokemon.baseSpecies) {
        pokemonName.textContent = pokemon.baseSpecies
    }
    object.onclick = function () {
        openPokemonTab(num, this)
    }
}



function onLoad() {

    $('#teamsbutton').on('click', function(e) {
        e.preventDefault();
        $('#left-panel').toggleClass('left-panel-active');
        $('#center-panel').toggleClass('center-panel-active');
      })

    Array.from(document.getElementsByClassName("tablinks")).forEach(function (tabLink) {
        tabLink.onclick = function (event) {
            openTab(tabLink.getAttribute("num"), tabLink);
        };
    });

    Array.from(document.getElementsByClassName("pokemon-pick-btn")).forEach(function (tabLink) {
        tabLink.onclick = function (event) {
            openPokemonTab(tabLink.getAttribute("num"), tabLink);
        };
    });

    document.querySelector(".defaultOpen").click();

    /* 
          document.getElementById('pokepaste-save').onclick = function(){
              var playerteamInput = document.getElementById('pokepaste');
              var teambuilderResultsUl = document.querySelector('.teambuilder-results ul')
              var teambuilderResults = document.querySelector('.teambuilder-results')
              playerteamInput.style.display = "none";
              teambuilderResultsUl.style.display = 'flex'
              teambuilderResults.style.overflowY = 'scroll';
              playerteamInput.scrollTop = 0;
              presentInfoUpdate();
          } */


    const mc = new Hammer(document.body);
/*       const swipeMenu = document.querySelector('.teams').classList
 */      const activeClassMenu = 'teams--show'

    mc.on("swipeleft swiperight", function (ev) {

        if (ev.type === "swipeleft") {
            swipeMenu.remove(activeClassMenu)
        } else {
            swipeMenu.add(activeClassMenu)
        }
    })

    savedTeamsUpdate()
    document.getElementById('pastebutton').onclick = function () {
        var playerteamInput = document.getElementById('pokepaste');
        var teambuilderResultsUl = document.querySelector('.teambuilder-results ul')
        var teambuilderResults = document.querySelector('.teambuilder-results')
        if (playerteamInput.style.display === "flex") {
            playerteamInput.style.display = "none";
            teambuilderResultsUl.style.display = 'flex'
            teambuilderResults.style.overflowY = 'scroll';
            playerteamInput.scrollTop = 0;
        } else {
            playerteamInput.style.display = "flex";
            teambuilderResultsUl.style.display = 'none'
            teambuilderResults.style.overflowY = 'hidden';
            teambuilderResults.scrollTop = 0;
        }
    }
    document.getElementById('saveteambutton').onclick = function () {
        saveTeam();
    }
    var buttons = document.querySelectorAll('.pokemon-pick-btn');
    createResults(null, 0, buttons[0])
    presentInfoUpdate();
    openPokemonTab(0, buttons[0])
    

    document.getElementById("closeTeamsMenu").onclick = function() {
        let teamsMenu = document.getElementById("left-panel")
        console.log('g')
        teamsMenu.style.transform = 'translateX(-320px)';
    }
}

function teamPokemonUpdate(pokemon, num = null, object = null) {
    /* teamTypesDefenseUpdate(playerPokemons) */
    if (document.getElementById('build-button')) {
        document.getElementById('build-button').remove()
    }
    var findedPokemon = pokemonPointsData.find(function (item) {
        return item.name === pokemon.name && item.num === pokemon.num;
    });
    loadBuilds(findedPokemon);
    
    createMovesResults(null, num, object, 0);

    /*       document.getElementById('current-pokemon-points').textContent = calculateTeamPointsValue(null, pokemon)
     */
    /* returnPokePaste(playerPokemons) */
    let activePokemon = playerPokemons[num]

    var results = document.querySelectorAll('.result')

    var buttons = document.querySelectorAll('.pokemon-pick-btn');
    buttons.forEach(function (button) {
        if (button.id === "pokemon-picked-btn") {
            button.id = '';
        }
    });
    if (!object) {
        if (num) {
            object = buttons[num];
        }
        else {
            object = buttons[0];
        }
    }

    object.classList.add('current-pokemon-choice');

    let infoPokemon = document.querySelectorAll('.team-pokemon-tab')[num]

    var div = infoPokemon.querySelector('.team-pokemon-sprite div');
    if (pokemon && (pokemon.name.includes('-Mega-X') || pokemon.name.includes('-Mega-Y'))) {
        var pokemonUrl = megaXYUrl(pokemon.name, 0);
    }
    else if (pokemon.changesFrom) {
        var pokemonUrl = 'https://play.pokemonshowdown.com/sprites/ani/' + pokemon.changesFrom.replace(/\s/g, '').toLowerCase() + '-' + pokemon.forme.replace(/\s/g, '').replace('-', '').toLowerCase() + '.gif';
    }
    else {
        if (!pokemon) {
            var pokemonUrl = 'https://play.pokemonshowdown.com/sprites/ani/bulbasaur.gif';
        }
        else {
            var pokemonUrl = 'https://play.pokemonshowdown.com/sprites/ani/' + pokemon.name.replace(/\s/g, '').toLowerCase() + '.gif';
        }
    }
    var image = new Image();
    try {
        image.src = pokemonUrl;
    }
    catch (error) {
    }
    image.onload = function () {
        div.style.backgroundImage = 'url(' + pokemonUrl + ')';
    };
    image.onerror = function () {
        var pokemonUrl = 'https://play.pokemonshowdown.com/sprites/dex/' + pokemon.name.replace(/\s/g, '').replace(/-/g, '').toLowerCase() + '.png';
        div.style.backgroundImage = 'url(' + pokemonUrl + ')';
    };

    function evsValuesUpdate(pokemon) {
        let evsKeys = Object.keys(pokemon.evs);
        let evs = infoPokemon.querySelectorAll('.evs input');
        let evsRanges = infoPokemon.querySelectorAll('.evs-range');
        let total = 0
        for (let i = 0; i < 6; i++) {
            evs[i].value = pokemon.evs[evsKeys[i]];
            evsRanges[i].value = pokemon.evs[evsKeys[i]]
        }
    }
    let evs = infoPokemon.querySelectorAll('.evs input');
    let evsRanges = infoPokemon.querySelectorAll('.evs-range');
    let evsKeys = Object.keys(pokemon.evs);

    evsValuesUpdate(pokemon)
    for (let i = 0; i < 6; i++) {
        evs[i].oninput = function () {
            let evs = infoPokemon.querySelectorAll('.evs input');
            total = 0
            for (let j = 0; j < 6; j++) {
                total += +evs[j].value
            }
            totalWithout = total - +evs[i].value
            if (totalWithout + +evs[i].value > 508) {
                evs[i].value = 508 - totalWithout
            }
            playerPokemons[num].evs[evsKeys[i]] = +this.value;
            pokemonStatsLoad(playerPokemons)
            evsValuesUpdate(pokemon)
            statValuesUpdate(playerPokemons[num])
            returnPokePaste(playerPokemons)
        }
        evsRanges[i].oninput = function () {
            let evsRanges = infoPokemon.querySelectorAll('.evs-range');
            let total = 0
            for (let j = 0; j < 6; j++) {
                total += +evsRanges[j].value
            }
            let totalWithout = total - +evsRanges[i].value
            if (totalWithout + +evsRanges[i].value > 508) {
                evsRanges[i].value = 508 - totalWithout
            }
            playerPokemons[num].evs[evsKeys[i]] = +this.value;
            pokemonStatsLoad(playerPokemons)
            evsValuesUpdate(pokemon)
            statValuesUpdate(playerPokemons[num])
            returnPokePaste(playerPokemons)
        }
    }

    function ivsValuesUpdate() {
        let ivs = infoPokemon.querySelectorAll('.ivs input');
        for (let i = 0; i < 6; i++) {
            ivs[i].value = pokemon.ivs[evsKeys[i]];
        }
    }
    ivsValuesUpdate()
    let ivs = infoPokemon.querySelectorAll('.ivs input');
    for (let i = 0; i < 6; i++) {
        ivs[i].value = pokemon.ivs[evsKeys[i]];
        ivs[i].oninput = function () {
            if (ivs[i].value > 31) {
                ivs[i].value = 31;
            }
            else if (ivs[i].value < 0) {
                ivs[i].value = 0;
            }
            playerPokemons[num].ivs[evsKeys[i]] = +this.value;
            pokemonStatsLoad(playerPokemons)
            ivsValuesUpdate(pokemon)
            statValuesUpdate(playerPokemons[num])
        }
    }


    statValuesUpdate(pokemon)
    function statValuesUpdate(pokemon) {
        let stats = infoPokemon.querySelectorAll('.current-pokemon-stat-values h3');
        for (let i = 0; i < 6; i++) {
            stats[i].textContent = pokemon.stats[evsKeys[i]];
        }
    }

    var item = infoPokemon.querySelector('.pokemon-info-item')
    if (pokemon.item.name) {

        let firstCord = -(pokemon.item.spritenum % 16 * 24)
        let secondCord = -(Math.floor(pokemon.item.spritenum / 16) * 24)

        item.title = pokemon.item.name;
        item.style = "background:transparent url(https://play.pokemonshowdown.com/sprites/itemicons-sheet.png?v1) no-repeat scroll " + firstCord + 'px ' + secondCord + 'px';
        infoPokemon.querySelector('.item').value = pokemon.item.name;
    }
    else {
        item.title = '';
        item.style = "background:transparent url(https://play.pokemonshowdown.com/sprites/itemicons-sheet.png?v1) no-repeat scroll " + 0 + 'px ' + 0 + 'px';
        infoPokemon.querySelector('.item').value = '';
    }

    let moves = infoPokemon.querySelectorAll('.team-pokemon-moves span');
    function movesValuesUpdate(pokemon) {
        for (let i = 0; i < 4; i++) {
            if (pokemon.moves[i].name) {
                moves[i].querySelector('input').value = pokemon.moves[i].name;
                moves[i].querySelector('img').src = imgSource + pokemon.moves[i].type.toLowerCase() + "_type.png";
            } else {
                moves[i].querySelector('input').value = '';
                moves[i].querySelector('img').src = imgSource + "normal_type.png";
            }
        }
    }
    
    for (let i = 0; i < 4; i++) {
        moves[i].querySelector('input').oninput = function () {
            if (this.value == '') {
                createMovesResults(null, num, object, i);
            }
            else if (allMoves[this.value.replace(' ', '').toLowerCase()]) {
                playerPokemons[num].moves[i] = allMoves[this.value.replace(' ', '').toLowerCase()];
                updateVisualTeam(playerPokemons[num], num, object)
                teamPokemonUpdate(playerPokemons[num], num, object)
                let moves = document.querySelectorAll('.moves span');
                moves[i + 1].querySelector('input').focus();
            }
            else {
                createMovesResults(this.value, num, object, i);
            }

        };
        moves[i].querySelector('input').onfocus = function () {
            this.select();
            createMovesResults(null, num, object, i);
            let curResult = document.querySelector('.current-result')
            /* if (curResult.getAttribute('data-name') != pokemon.moves[i].name) {
                while (curResult.firstChild) {
                    curResult.removeChild(curResult.firstChild);
                }
                let move = pokemon.moves[i]
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
                if (move.type) {
                    imgType.src = imgSources + move.type.toLowerCase() + '_type.png';
                }
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
 
                curResult.appendChild(divName);
                curResult.appendChild(divTypes)
                curResult.appendChild(divCat);
                curResult.appendChild(divPower);
                curResult.appendChild(divAcc);
                curResult.appendChild(divPP);
                curResult.appendChild(divDesc)
            } */
        }
    }

    movesValuesUpdate(pokemon)

    let types = infoPokemon.querySelectorAll('.team-pokemon-add-info .types img');
    types[0].src = imgSource + pokemon.types[0].toLowerCase() + '_type.png';
    if (pokemon.types.length == 2) {
        if (!types[1]) {
            var img = document.createElement('img');
            infoPokemon.querySelector('.current-pokemon-add-info .types').appendChild(img);
            types = infoPokemon.querySelectorAll('.current-pokemon-add-info .types img');
        }
        types[1].src = imgSource + pokemon.types[1].toLowerCase() + '_type.png';
    }
    else {
        if (types[1]) {
            types[1].remove();
        }
    }

    let abilitiesSelect = infoPokemon.querySelector('.ability');
    abilitiesSelect.onchange = function () {
        playerPokemons[num].ability.name = this.value;
        updateVisualTeam(playerPokemons[num], num, object);
        abilitiesParam(playerPokemons)
        returnPokePaste(playerPokemons)
    }
    let options = abilitiesSelect.querySelectorAll('option');

    options.forEach(option => option.remove());

    options = [];

    for (let i = 0; i < Object.keys(pokemon.abilities).length; i++) {
        let option = document.createElement('option');
        abilitiesSelect.appendChild(option);
        options.push(option);

        if (pokemon.abilities[i]) {
            option.value = pokemon.abilities[i];
            option.textContent = pokemon.abilities[i];
        } else if (pokemon.abilities["H"]) {
            option.value = pokemon.abilities["H"];
            option.textContent = pokemon.abilities["H"];
        }
    }

    let naturesSelect = document.querySelector('.nature');
    naturesSelect.onchange = function () {
        playerPokemons[num].nature = this.value;
        pokemonStatsLoad(playerPokemons)
        statValuesUpdate(playerPokemons[num])
        statNameColorsUpdate()
        returnPokePaste(playerPokemons)
    }
    if (naturesSelect.querySelector('option') == null) {
        Object.keys(natures).forEach(function (nature) {
            var option = document.createElement('option');
            option.value = nature;
            option.textContent = nature;
            if (natures[nature].boosted) {
                option.textContent += ' (+' + natures[nature].boosted + '; -' + natures[nature].reduced + ')';
            }
            naturesSelect.appendChild(option);

        });
    }

    function statNameColorsUpdate() {
        let statNames = document.querySelectorAll('.current-pokemon-stat-names p')
        for (let i = 0; i < evsKeys.length; i++) {
            statNames[i].classList.remove('boosted')
            statNames[i].classList.remove('decreased')
            if (evsKeys[i] == natures[playerPokemons[num].nature].boosted) {
                statNames[i].classList.add('boosted')
            }
            if (evsKeys[i] == natures[playerPokemons[num].nature].reduced) {
                statNames[i].classList.add('decreased')
            }
        }
    }

    options = naturesSelect.querySelectorAll('option');
    options.forEach(function (option) {
        option.selected = false;
        if (option.value == pokemon.nature) {
            option.selected = true;
            statNameColorsUpdate()
        }
    });

    options = abilitiesSelect.querySelectorAll('option')
    options.forEach(function (option) {
        option.selected = false;
        if (option.value == pokemon.ability.name) {
            option.selected = true;
        }
    });


    /* const myInput = document.querySelector('.current-pokemon .name');
 
    myInput.onfocus = function () {
        this.select();
        createResults(null, num, object);
    }
    myInput.addEventListener('input', function () {
        if (this.value == '') {
            createResults(null, num, object);
        }
        else {
            createResults(pokemon => pokemon.name.toLowerCase().startsWith(this.value.toLowerCase()), num, object);
        }
    }); */

    let itemInput = document.querySelector('#current-pokemon-info .item');
    itemInput.onfocus = function () {
        this.select();
        createItemsResults(null, num, object)
        let curResult = document.querySelector('.current-result')
        if (pokemon.item.name && curResult.getAttribute('data-name') != pokemon.item.name) {
            while (curResult.firstChild) {
                curResult.removeChild(curResult.firstChild);
            }

            let item = pokemon.item

            const divIcon = document.createElement('div');
            divIcon.classList.add('result-pokemon-icon');

            const divPokemonIcon = document.createElement('div');
            divPokemonIcon.classList.add('pokemon-icon');

            let firstCord = -(item.spritenum % 16 * 24)
            let secondCord = -(Math.floor(item.spritenum / 16) * 24)

            divPokemonIcon.style.width = '24px';
            divPokemonIcon.style.height = '24px';
            divPokemonIcon.style.backgroundImage = "url(" + imgSource + "itemicons-sheet.png)";
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

            curResult.appendChild(divIcon);
            curResult.appendChild(divName);
            curResult.appendChild(divDesc)

            curResult.setAttribute('data-name', item.name)
        }
        else if (playerPokemons[num].requiredItem) {
            while (curResult.firstChild) {
                curResult.removeChild(curResult.firstChild);
            }
            item = allItems[playerPokemons[num].requiredItem.replace(' ', '').toLowerCase()]

            const divIcon = document.createElement('div');
            divIcon.classList.add('result-pokemon-icon');

            const divPokemonIcon = document.createElement('div');
            divPokemonIcon.classList.add('pokemon-icon');

            let firstCord = -(item.spritenum % 16 * 24)
            let secondCord = -(Math.floor(item.spritenum / 16) * 24)

            divPokemonIcon.style.width = '24px';
            divPokemonIcon.style.height = '24px';
            divPokemonIcon.style.backgroundImage = 'url(' + imgSource + 'itemicons-sheet.png)';
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

            curResult.appendChild(divIcon);
            curResult.appendChild(divName);
            curResult.appendChild(divDesc)

            curResult.setAttribute('data-name', item.name)
        }
    }

    itemInput.oninput = function () {
        if (this.value == '') {
            createItemsResults(null, num, object);
        }
        else {
            createItemsResults(this.value, num, object);
        }
    };
    loadBuildResults(pokemon, num, object)
    returnCurrentPokemonPokepaste(pokemon)
}

function loadPokemonStats(pokemon, num, object){

}

/* function returnPokePaste(team) {
    let pokePaste = ''
    team.forEach(function (pokemon) {
        if (pokemon.name) {
            pokePaste += pokemon.name
            if(pokemon.item.name){
                pokePaste += " @ " + pokemon.item.name
            } 
            pokePaste += '  \n'
            pokePaste += "Ability: " + pokemon.ability.name + '  \n'
            pokePaste += "Tera Type: " + pokemon.types[0] + '  \n';
 
            pokePaste += "EVs: ";
 
            var evsNames = ['HP', 'Atk', 'Def', 'SpA', 'SpD', 'Spe'];
            var i = 0;
            var lastNonZeroIndex = -1;
 
            Object.keys(pokemon.evs).forEach(function (ev, index, array) {
                if (pokemon.evs[ev] != 0) {
                    pokePaste += pokemon.evs[ev] + ' ' + evsNames[i] + ' / ';
                    lastNonZeroIndex = i;
                }
                i++;
            });
 
            if (lastNonZeroIndex != -1) {
                pokePaste = pokePaste.slice(0, -3);
            }
 
 
            pokePaste += '  \n'
            pokePaste += pokemon.nature + " Nature  \n"
 
            pokemon.moves.forEach(function (move) {
                if(move.name){
                    pokePaste += '- ' + move.name + '  \n'
                }
            })
 
 
            pokePaste += '\n'
        }
 
    })
    document.getElementById("playerteam-input-text").value = pokePaste
} */

function returnCurrentPokemonPokepaste(pokemon) {
    let pokePaste = ''
    if (pokemon.name) {
        pokePaste += pokemon.name
        if (pokemon.item.name) {
            pokePaste += " @ " + pokemon.item.name
        }
        pokePaste += '  \n'
        pokePaste += "Ability: " + pokemon.ability.name + '  \n'
        pokePaste += "Tera Type: " + pokemon.types[0] + '  \n';

        pokePaste += "EVs: ";

        var evsNames = ['HP', 'Atk', 'Def', 'SpA', 'SpD', 'Spe'];
        var i = 0;
        var lastNonZeroIndex = -1;

        Object.keys(pokemon.evs).forEach(function (ev, index, array) {
            if (pokemon.evs[ev] != 0) {
                pokePaste += pokemon.evs[ev] + ' ' + evsNames[i] + ' / ';
                lastNonZeroIndex = i;
            }
            i++;
        });

        if (lastNonZeroIndex != -1) {
            pokePaste = pokePaste.slice(0, -3);
        }


        pokePaste += '  \n'
        pokePaste += pokemon.nature + " Nature  \n"

        pokemon.moves.forEach(function (move) {
            if (move.name) {
                pokePaste += '- ' + move.name + '  \n'
            }
        })


        pokePaste += '\n'
    }

    document.getElementById("current-pokemon-pokepaste-input").value = pokePaste
}

function createResults(filter = null, num = null, object = null) {
    let minPointValue = 2
    var results = document.querySelectorAll('.teambuilder-results ul .result');
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
            document.querySelector('.teambuilder-results ul').appendChild(li);
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
                document.querySelector('#current-pokemon-add-info .item').focus()
                updateVisualTeam(playerPokemons[num], num, object)
                teamPokemonUpdate(playerPokemons[num], num, object)
            };

            li.appendChild(a);

            document.querySelector('.teambuilder-results ul').appendChild(li);
        }
    }
}

function pokemonLoad(pokemonNum, newPokemon, object) {
    let num = pokemonNum
    let requiredItem = false
    if (newPokemon.requiredItem) {
        requiredItem = newPokemon.requiredItem
        newPokemon = allPokemons[newPokemon.baseSpecies.replace(/\s/g, '').replace(/-/g, '').replace(/%/g, '').replace('.', '').replace("'", '').toLowerCase()]
    }
    playerPokemons[num] = newPokemon
    pokemonToBaseValues(playerPokemons[num])
    playerPokemons[num].name = newPokemon.name
    playerPokemons[num].ability.name = newPokemon.abilities[0]
    if (requiredItem) {
        playerPokemons[num].item = allItems[requiredItem.replace(/\s/g, '').replace(/-/g, '').replace(/%/g, '').replace('.', '').replace("'", '').toLowerCase()]
    }
    abilitiesParam(playerPokemons)

    pokemonStatsLoad(playerPokemons)
}

function createItemsResults(filter = null, num = null, object = null) {
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
    document.querySelector('.teambuilder-results ul').appendChild(li);

    for (let item of Object.keys(filteredItems)) {
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

        document.querySelector('.teambuilder-results ul').appendChild(li);
    }
}

function createMovesResults(filter = null, num = null, object = null, moveNum) {
    console.log('zdarova')
    var results = document.querySelectorAll('#MovesTab');
    console.log(results)
    results.forEach(function (result) {
        if ((result.querySelector('a') || result.querySelector('h3')) && !result.querySelector('.current-result')) {
        }
    });
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
        if (foundPokemon.learnset.includes(move)) {
            move = allMoves[move]
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

function megaXYUrl(pokemonName, num) {
    if (pokemonName.includes('-Y')) {
        symbol = '-Y';
        newSymbol = 'Y';
    }
    else {
        symbol = '-X';
        newSymbol = 'X';
    }
    if (num == 0) {
        url = "https://play.pokemonshowdown.com/sprites/ani/" + pokemonName.replace(/\s/g, '').replace(symbol, newSymbol).toLowerCase() + ".gif";
    }
    else if (num == 1) {
        url = "https://play.pokemonshowdown.com/sprites/ani-back/" + pokemonName.replace(/\s/g, '').replace(symbol, newSymbol).toLowerCase() + ".gif";
    }
    return url
}

function saveTeam() {
    var savedTeams = JSON.parse(localStorage.getItem("savedTeams")) || [];
    var teamNum = savedTeams.length;

    if (savedTeams.length < 25) {
        var team = playerPokemons;

        savedTeams.push({
            teamId: teamNum,
            pokemonsTeam: team
        });

        localStorage.setItem("savedTeams", JSON.stringify(savedTeams));
    }
    savedTeamsUpdate()
}

/* function teamTypesDefenseUpdate(playerPokemons) {
    let tds = document.querySelectorAll('table tr td')
    let trs = document.querySelectorAll('.right-menu table tbody tr')
    let allTypes = Object.keys(typeEffectiveness)
    let teamTypesDefense = []
    for (let i = 0; i < 18; i++) {
        teamTypesDefense[allTypes[i]] = 0;
        if (trs[i].querySelectorAll('td')[2] && trs[i].querySelectorAll('td')[2].querySelector('div')) {
            trs[i].querySelectorAll('td')[2].remove()
        }
    }
 
    playerPokemons.forEach(function (pokemon) {
        if (pokemon.types && pokemon.name != 'Bulbasaur') {
            pokemon.types.forEach(function (checkType) {
                checkType = checkType.toLowerCase()
                allTypes.forEach(function (typeEff) {
                    if (typeEffectiveness[typeEff][checkType] == 0.5) {
                        teamTypesDefense[typeEff] += 1
                    }
                    else if (typeEffectiveness[typeEff][checkType] == 2) {
                        teamTypesDefense[typeEff] -= 1
                    } else if (typeEffectiveness[typeEff][checkType] == 0) {
                        allTypes.forEach(function (typ, i) {
                            if (typ == typeEff) {
                                let td = null
                                if (trs[i].querySelectorAll('td')[2]) {
                                    td = trs[i].querySelectorAll('td')[2]
                                }
                                else {
                                    td = document.createElement('td')
                                }
                                let findedPokemon = pokemonPointsData.find(function (item) {
                                    return item.name === pokemon.name && item.num === pokemon.num;
                                });
 
                                let div = document.createElement('div');
                                div.classList.add('pokemon-icon');
                                div.style.width = '40px';
                                div.style.height = '30px';
                                div.style.backgroundImage = 'url("https://play.pokemonshowdown.com/sprites/pokemonicons-sheet.png?v16")';
                                div.style.backgroundRepeat = 'no-repeat';
                                if (findedPokemon.iconLoc) {
                                    div.style.backgroundPosition = findedPokemon.iconLoc;
                                } else {
                                    var dex_number = +pokemon.num;
                                    var first = dex_number % 12 * 40;
                                    var second = Math.floor(dex_number / 12) * 30;
                                    div.style.backgroundPosition = '-' + first.toString() + 'px' + ' -' + second.toString() + 'px';
                                }
 
                                div.style.backgroundColor = 'transparent';
                                td.appendChild(div)
                                trs[i].appendChild(td)
                            }
                        })
                    }
                })
            })
        }
    })
    let j = 0
    for (let i = 0; i < trs.length; i++) {
        let effObj = trs[i].querySelectorAll('td')[1]
        effObj.textContent = teamTypesDefense[allTypes[i]]
        effObj.removeAttribute('class')
        if (teamTypesDefense[allTypes[i]] > 0) {
            effObj.classList.add('boosted')
        } else if (teamTypesDefense[allTypes[j]] < 0) {
            effObj.classList.add('decreased')
        }
        j++;
    }
} */

async function sendBuild(buildData) {
    const res = await fetch('/save-build', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildData)
    })
    const result = await res.json();
    if (res.status === 200) {
        alert('Build saved!')
    }
}

function saveBuild(num, event) {
    event.preventDefault();

    let pokemon = playerPokemons[num];
    if (!pokemon) {
        console.error('Pokemon not found');
        alert('Error occurred while saving build');
        return;
    }

    const buildData = {
        name: pokemon.name,
        type: '',
        nature: pokemon.nature,
        ability: pokemon.ability ? pokemon.ability.name.replace(/\s/g, '').toLowerCase() : '',
        item: pokemon.item ? pokemon.item.name.replace(/\s/g, '').toLowerCase() : '',
        moves: '[' + pokemon.moves.map(move => move.name.replace(/\s/g, '').toLowerCase()).join(',') + ']',
        evs: pokemon.evs
    };

    sendBuild(buildData)
}
