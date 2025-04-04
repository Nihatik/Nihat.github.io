window.onload = onLoad;

var imgSource = '../img/';

import { allPokemons, allItems, allAbilities, allMoves } from '../teambuilderBase.js';

import { pokemonPointsData } from '../pokemonPointsBase.js'

import {buildsOnLoad, loadBuilds, loadBuildResults } from './builds.js';

import { savedTeamsUpdate } from './teams.js';

import { createResults, createMovesResults, createItemsResults, filterResults } from './results.js';

import { loadFunctions } from './tabs.js';

import { teamTypesDefenseUpdate } from './teamAnalizer.js';

export { submitPokemonPaste, changeTeamToJson, calculateTeamPointsValue, filterPokemon, pokemonLoad, teamPokemonUpdate, pokemonStatsLoad, movesForPoints, playerPokemons, updateVisualTeam, teamPokemonUpdate as teamCurPokemonChange };

function openTab(tabIndex, tabButton) {
    let i, tablinks;
    const boxes = document.querySelector('.tab-container-in');

    boxes.style.left = -tabIndex * 100 + '%';

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active-tab", "");
    }

    const tabitems = document.querySelectorAll(".tab-container-in .tab-item");
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

function openPokemonTab(tabIndex, tabButton) {
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
    createResults(null, tabIndex, tabButton)
    document.querySelector('#search-input').onfocus = function () {
        this.select();
        createResults(null, tabIndex, tabButton)
    }
    $("#search-input").focus();
    if (pokemon.name != "") {
        loadBuildResults(pokemon, tabIndex, tabButton)
        createMovesResults(null, tabIndex, null, 0);
    }
}


var playerPokemons = [
    { name: "", abilities: { 0: 'Overgrow', H: 'Chlorophyll' }, ability: { name: 'Overgrow', onModifyAtkPriority: 5, onModifySpAPriority: 5, flags: {}, rating: 2 }, baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, color: "Green", eggGroups: ['Monster', 'Grass'], evos: ['Ivysaur'], evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, genderRatio: { M: 0.875, F: 0.125 }, heightm: 0.7, hp: 231, item: {}, ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }, level: 100, moves: [{}, {}, {}, {}], nature: "Bashful", num: 1, stats: { hp: 231, atk: 134, def: 134, spa: 166, spd: 166, spe: 134 }, status: null, tier: "LC", types: ['Grass', 'Poison'], weightkg: 6.9 },
    { name: "", abilities: { 0: 'Overgrow', H: 'Chlorophyll' }, ability: { name: 'Overgrow', onModifyAtkPriority: 5, onModifySpAPriority: 5, flags: {}, rating: 2 }, baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, color: "Green", eggGroups: ['Monster', 'Grass'], evos: ['Ivysaur'], evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, genderRatio: { M: 0.875, F: 0.125 }, heightm: 0.7, hp: 231, item: {}, ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }, level: 100, moves: [{}, {}, {}, {}], nature: "Bashful", num: 0, stats: { hp: 231, atk: 134, def: 134, spa: 166, spd: 166, spe: 134 }, status: null, tier: "LC", types: ['Grass', 'Poison'], weightkg: 6.9 },
    { name: "", abilities: { 0: 'Overgrow', H: 'Chlorophyll' }, ability: { name: 'Overgrow', onModifyAtkPriority: 5, onModifySpAPriority: 5, flags: {}, rating: 2 }, baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, color: "Green", eggGroups: ['Monster', 'Grass'], evos: ['Ivysaur'], evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, genderRatio: { M: 0.875, F: 0.125 }, heightm: 0.7, hp: 231, item: {}, ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }, level: 100, moves: [{}, {}, {}, {}], nature: "Bashful", num: 15, stats: { hp: 231, atk: 134, def: 134, spa: 166, spd: 166, spe: 134 }, status: null, tier: "LC", types: ['Grass', 'Poison'], weightkg: 6.9 },
    { name: "", abilities: { 0: 'Overgrow', H: 'Chlorophyll' }, ability: { name: 'Overgrow', onModifyAtkPriority: 5, onModifySpAPriority: 5, flags: {}, rating: 2 }, baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, color: "Green", eggGroups: ['Monster', 'Grass'], evos: ['Ivysaur'], evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, genderRatio: { M: 0.875, F: 0.125 }, heightm: 0.7, hp: 231, item: {}, ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }, level: 100, moves: [{}, {}, {}, {}], nature: "Bashful", num: 809, stats: { hp: 231, atk: 134, def: 134, spa: 166, spd: 166, spe: 134 }, status: null, tier: "LC", types: ['Grass', 'Poison'], weightkg: 6.9 },
    { name: "", abilities: { 0: 'Overgrow', H: 'Chlorophyll' }, ability: { name: 'Overgrow', onModifyAtkPriority: 5, onModifySpAPriority: 5, flags: {}, rating: 2 }, baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, color: "Green", eggGroups: ['Monster', 'Grass'], evos: ['Ivysaur'], evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, genderRatio: { M: 0.875, F: 0.125 }, heightm: 0.7, hp: 231, item: {}, ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }, level: 100, moves: [{}, {}, {}, {}], nature: "Bashful", num: 666, stats: { hp: 231, atk: 134, def: 134, spa: 166, spd: 166, spe: 134 }, status: null, tier: "LC", types: ['Grass', 'Poison'], weightkg: 6.9 },
    { name: "", abilities: { 0: 'Overgrow', H: 'Chlorophyll' }, ability: { name: 'Overgrow', onModifyAtkPriority: 5, onModifySpAPriority: 5, flags: {}, rating: 2 }, baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, color: "Green", eggGroups: ['Monster', 'Grass'], evos: ['Ivysaur'], evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, genderRatio: { M: 0.875, F: 0.125 }, heightm: 0.7, hp: 231, item: {}, ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }, level: 100, moves: [{}, {}, {}, {}], nature: "Bashful", num: 25, stats: { hp: 231, atk: 134, def: 134, spa: 166, spd: 166, spe: 134 }, status: null, tier: "LC", types: ['Grass', 'Poison'], weightkg: 6.9 }
];








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


function presentInfoUpdate(opponent = null) {
    var buttons = document.querySelectorAll('.pokemon-pick-btn');
    if (document.getElementById("playerteam-input-text").value) {
        submitPokePaste(playerPokemons, document.getElementById("playerteam-input-text").value);
    }
    for (var i = 0; i < 6; i++) {
        if (playerPokemons[i].types) {
            console.log('ff')
            updateVisualTeam(playerPokemons[i], i, buttons[i])
            if (playerPokemons[i].name == "") {
                buttons[i].classList.toggle("new-pokemon-btn")
                continue
            }
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
                console.log(move)
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

function submitPokemonPaste(pokemon, inputText) {
    let lines = inputText.split('\n');
    let a = 0;

    if (pokemon && lines[0] != '') {
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
        for (var c = 0; c < lines.length; c++) {
            var line = lines[c];
            var words = line.split(' ');
            if (c == 0) {
                pokemon.name = words[0];
                if (words[1] != '@' && !(words[1].includes('('))) {
                    pokemon.name += ' ' + words[1];
                }
            }

            if (line.includes('@')) {
                for (var b = 0; b < words.length; b++) {
                    if (words[b].includes('@')) {

                        pokemon.item.name = words[b + 1] + ' ' + words[b + 2].replace(/\s/g, '') + ' ' + words[b + 3].replace(/\s/g, '');
                        pokemon.item.name = checkToSpace(pokemon.item.name);
                    }
                }
            }

            if (line.includes('Nature')) {
                pokemon.nature = words[0];
            }

            if (line.includes('Ability: ')) {
                pokemon.ability.name = words[1];
                pokemon.ability.name += ' ' + words[2].replace(/\s/g, '');
                pokemon.ability.name += ' ' + words[3].replace(/\s/g, '');
                pokemon.ability.name = checkToSpace(pokemon.ability.name);
                a++;
                if (a == 4) {
                    a = 0;
                }
            }

            if (line.includes('EVs:')) {
                for (var b = 0; b < words.length; b++) {
                    if (words[b].includes('HP')) {
                        pokemon.evs.hp = parseInt(words[b - 1]);
                    }
                    else if (words[b].includes('Atk')) {
                        pokemon.evs.atk = parseInt(words[b - 1]);
                    }
                    else if (words[b].includes('Def')) {
                        pokemon.evs.def = parseInt(words[b - 1]);
                    }
                    else if (words[b].includes('SpA')) {
                        pokemon.evs.spa = parseInt(words[b - 1]);
                    }
                    else if (words[b].includes('SpD')) {
                        pokemon.evs.spd = parseInt(words[b - 1]);
                    }
                    else if (words[b].includes('Spe')) {
                        pokemon.evs.spe = parseInt(words[b - 1]);
                    }
                }
            }
            if (line.includes('-')) {
                pokemon.moves[a].name = words[1];
                pokemon.moves[a].name += ' ' + words[2].replace(/\s/g, '');
                pokemon.moves[a].name += ' ' + words[3].replace(/\s/g, '');
                pokemon.moves[a].name = checkToSpace(pokemon.moves[a].name);
                a++;
                if (a == 4) {
                    a = 0;
                }
            }
        }
    }
}

function submitPokePaste(team, inputText) {
    let pastes = inputText.split(/\n\s*\n/);
    let j = 0;
    for (let i = 0; i < pastes.length; i++) {
        submitPokemonPaste(team[j], pastes[i])
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


    let sprite = object.querySelector('.pokemon-sprite div')

    let spriteName
    if (pokemon.forme != null) {
        spriteName = pokemon.baseSpecies.toLowerCase().replace("-", "").replace(" ", "") + "-" + pokemon.forme.toLowerCase().replace("-", "");
    } else {
        spriteName = pokemon.name.toLowerCase().replace("-", "").replace(" ", "");
    }

    sprite.style = `background-image:url(https://play.pokemonshowdown.com/sprites/gen5/${spriteName}.png);background-repeat:no-repeat`;

    let boostedStat = natures[pokemon.nature].boosted;
    let reducedStat = natures[pokemon.nature].reduced;

    let container = object.querySelector('.pokemon-pick-evs'); // Контейнер, куда добавлять span
    container.innerHTML = ''; // Очищаем, чтобы не дублировать элементы

    let stats = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'];

    stats.forEach(stat => {
        let evValue = pokemon.evs[stat] || 0;
        if (evValue > 0) {
            let span = document.createElement('span');
            span.classList.add(stat); // Добавляем класс по названию стата
            let boostMark = boostedStat === stat ? '+' : reducedStat === stat ? '-' : '';
            span.textContent = `${evValue}${boostMark}`;
            container.appendChild(span); // Добавляем span в контейнер
        }
    });

    setTypesImg(pokemon, object, '.pokemon-pick-types');

    let item = object.querySelector('.pokemon-info-item')
    if (pokemon.item.name) {

        let firstCord = -(pokemon.item.spritenum % 16 * 24)
        let secondCord = -(Math.floor(pokemon.item.spritenum / 16) * 24)

        item.title = pokemon.item.name;
        item.style = "background:transparent url(https://play.pokemonshowdown.com/sprites/itemicons-sheet.png?v1) no-repeat scroll " + firstCord + 'px ' + secondCord + 'px';
    }
    else {
        item.title = '';
        item.style = "background:transparent url(https://play.pokemonshowdown.com/sprites/itemicons-sheet.png?v1) no-repeat scroll " + 0 + 'px ' + 0 + 'px';
    }

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
    loadFunctions();
    $('#teamsbutton').on('click', function (e) {
        e.preventDefault();
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
    document.getElementById('pokepaste-save').onclick = function () {
        $("#current-team-button").click();
        presentInfoUpdate();
        document.querySelectorAll(".new-pokemon-btn").forEach(function (btn) {
            btn.classList.remove("new-pokemon-btn");
        })
    }

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
    document.getElementById('saveteambutton').onclick = function () {
        saveTeam();
    }
    var buttons = document.querySelectorAll('.pokemon-pick-btn');
    createResults(null, 0, buttons[0])
    presentInfoUpdate();
    openPokemonTab(0, buttons[0])


    $('#Pokemons').click();
    $('#current-team-button').click();
    buildsOnLoad();
}

function teamPokemonUpdate(pokemon, num = null, object = null) {
    updateTeamStatsWeak();
    teamTypesDefenseUpdate(playerPokemons)
    if (document.getElementById('build-button')) {
        document.getElementById('build-button').remove()
    }
    var findedPokemon = pokemonPointsData.find(function (item) {
        return item.name === pokemon.name && item.num === pokemon.num;
    });
    loadBuilds(findedPokemon);

    createMovesResults(null, num, object, 0);
    createItemsResults(null, num, object, 0);

    /*       document.getElementById('current-pokemon-points').textContent = calculateTeamPointsValue(null, pokemon)
     */
    returnPokePaste(playerPokemons)
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
    else if (pokemon.baseSpecies) {
        var pokemonUrl = 'https://play.pokemonshowdown.com/sprites/ani/' + pokemon.baseSpecies.replace(/\s/g, '').toLowerCase() + '-' + pokemon.forme.replace(/\s/g, '').replace('-', '').toLowerCase() + '.gif';
    }
    else {
        if (!pokemon) {
            var pokemonUrl = 'https://play.pokemonshowdown.com/sprites/ani/bulbasaur.gif';
        }
        else {
            var pokemonUrl = 'https://play.pokemonshowdown.com/sprites/ani/' + pokemon.name.replace(/\s/g, '').replace('-', '').toLowerCase() + '.gif';
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
            $('#Moves').click();
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


    setTypesImg(pokemon, infoPokemon, '.team-pokemon-add-info .types');

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


    const myInput = document.querySelector('#search-input');

    myInput.onfocus = function () {
        this.select();
        createResults(null, num, object);
    }
    myInput.addEventListener('input', function () {
        filterResults(pokemon => pokemon.name.toLowerCase().startsWith(this.value.toLowerCase()), num, object);
    });

    let itemInput = infoPokemon.querySelector('#current-pokemon-info .item');
    itemInput.onfocus = function () {
        $('#Items').click();
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
    }

    $(infoPokemon).find(".team-pokemon-sprite").onclick = function () {
        $("#Pokemons").click();
    };
    loadBuildResults(pokemon, num, object)
    returnCurrentPokemonPokepaste(pokemon)
}

function setTypesImg(pokemon, infoPokemon, typesContainerPath) {
    let types = infoPokemon.querySelectorAll(typesContainerPath + ' img');
    types[0].src = imgSource + pokemon.types[0].toLowerCase() + '_type.png';
    if (pokemon.types.length == 2) {
        if (!types[1]) {
            var img = document.createElement('img');
            infoPokemon.querySelector(typesContainerPath).appendChild(img);
            types = infoPokemon.querySelectorAll(typesContainerPath + ' img');
        }
        types[1].src = imgSource + pokemon.types[1].toLowerCase() + '_type.png';
    }
    else {
        if (types[1]) {
            types[1].remove();
        }
    }
}

function loadPokemonStats(pokemon, num, object) {

}

function returnPokePaste(team) {
    let pokePaste = ''
    team.forEach(function (pokemon) {
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

    })
    document.getElementById("playerteam-input-text").value = pokePaste
}

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
    $("#teamsbutton").click();
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

function getGradientColor(value) {
    value = value / 40
    const red = Math.max(0, 255 - (value * 2.55 * 2));
    const green = Math.min(255, value * 2.55 * 2);
    const blue = Math.max(0, 255 - Math.abs(127.5 - (value * 2.55)) * 2);
    return `rgb(${red}, ${green}, ${blue})`;
}

function updateTeamStatsWeak() {
    const stats = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
    playerPokemons.forEach(pokemon => {
        Object.keys(stats).forEach(stat => stats[stat] += pokemon.stats[stat]);
    });
    Object.entries(stats).forEach(([key, value]) => updateStatWeak(key, value));
}

function updateStatWeak(id, value) {
    const bar = document.getElementById(id);
    bar.style.width = value / 10 + '%';
    bar.style.backgroundColor = getGradientColor(value);
    bar.textContent = value + '%';
}

function changeTeamToJson(jsonData) {
    playerPokemons = JSON.parse(JSON.stringify(jsonData));
    presentInfoUpdate();
}