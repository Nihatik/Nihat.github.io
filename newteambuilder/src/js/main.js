window.onload = onLoad;


import { allPokemons, allItems, allAbilities, allMoves } from './teambuilderBase.js';
import { pokemonPointsData } from './pokemonPointsBase.js'
import { createResults, filterResults, createMovesResults, createItemsResults } from './components/Search.js';
import {buildsOnLoad, submitBuildPokemonPaste, loadBuilds,loadBuildResults } from './components/Builds.js';
import { openTab, openTab2, openPokemonTab, loadFunctions } from './components/Tabs.js';
import { savedTeamsUpdate, saveTeam, deleteTeam, loadTeam } from './components/Teams.js';
import { teamTypesDefenseUpdate } from './utils/teamAnalyzer.js';
import { submitPokePaste } from './components/Pokepaste.js';
import { teamPokemonUpdate, updateVisualTeam} from './components/TeamUtils.js';
import { getGradientColor } from './components/Utils.js';

export {updateTeamStatsWeak, presentInfoUpdate, playerPokemons,  teamPokemonUpdate as teamCurPokemonChange };


var playerPokemons = [
    { name: "", abilities: { 0: 'Overgrow', H: 'Chlorophyll' }, ability: { name: 'Overgrow', onModifyAtkPriority: 5, onModifySpAPriority: 5, flags: {}, rating: 2 }, baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, color: "Green", eggGroups: ['Monster', 'Grass'], evos: ['Ivysaur'], evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, genderRatio: { M: 0.875, F: 0.125 }, heightm: 0.7, hp: 231, item: {}, ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }, level: 100, moves: [{}, {}, {}, {}], nature: "Bashful", num: 1, stats: { hp: 231, atk: 134, def: 134, spa: 166, spd: 166, spe: 134 }, status: null, tier: "LC", types: ['Grass', 'Poison'], weightkg: 6.9 },
    { name: "", abilities: { 0: 'Overgrow', H: 'Chlorophyll' }, ability: { name: 'Overgrow', onModifyAtkPriority: 5, onModifySpAPriority: 5, flags: {}, rating: 2 }, baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, color: "Green", eggGroups: ['Monster', 'Grass'], evos: ['Ivysaur'], evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, genderRatio: { M: 0.875, F: 0.125 }, heightm: 0.7, hp: 231, item: {}, ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }, level: 100, moves: [{}, {}, {}, {}], nature: "Bashful", num: 0, stats: { hp: 231, atk: 134, def: 134, spa: 166, spd: 166, spe: 134 }, status: null, tier: "LC", types: ['Grass', 'Poison'], weightkg: 6.9 },
    { name: "", abilities: { 0: 'Overgrow', H: 'Chlorophyll' }, ability: { name: 'Overgrow', onModifyAtkPriority: 5, onModifySpAPriority: 5, flags: {}, rating: 2 }, baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, color: "Green", eggGroups: ['Monster', 'Grass'], evos: ['Ivysaur'], evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, genderRatio: { M: 0.875, F: 0.125 }, heightm: 0.7, hp: 231, item: {}, ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }, level: 100, moves: [{}, {}, {}, {}], nature: "Bashful", num: 15, stats: { hp: 231, atk: 134, def: 134, spa: 166, spd: 166, spe: 134 }, status: null, tier: "LC", types: ['Grass', 'Poison'], weightkg: 6.9 },
    { name: "", abilities: { 0: 'Overgrow', H: 'Chlorophyll' }, ability: { name: 'Overgrow', onModifyAtkPriority: 5, onModifySpAPriority: 5, flags: {}, rating: 2 }, baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, color: "Green", eggGroups: ['Monster', 'Grass'], evos: ['Ivysaur'], evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, genderRatio: { M: 0.875, F: 0.125 }, heightm: 0.7, hp: 231, item: {}, ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }, level: 100, moves: [{}, {}, {}, {}], nature: "Bashful", num: 809, stats: { hp: 231, atk: 134, def: 134, spa: 166, spd: 166, spe: 134 }, status: null, tier: "LC", types: ['Grass', 'Poison'], weightkg: 6.9 },
    { name: "", abilities: { 0: 'Overgrow', H: 'Chlorophyll' }, ability: { name: 'Overgrow', onModifyAtkPriority: 5, onModifySpAPriority: 5, flags: {}, rating: 2 }, baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, color: "Green", eggGroups: ['Monster', 'Grass'], evos: ['Ivysaur'], evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, genderRatio: { M: 0.875, F: 0.125 }, heightm: 0.7, hp: 231, item: {}, ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }, level: 100, moves: [{}, {}, {}, {}], nature: "Bashful", num: 666, stats: { hp: 231, atk: 134, def: 134, spa: 166, spd: 166, spe: 134 }, status: null, tier: "LC", types: ['Grass', 'Poison'], weightkg: 6.9 },
    { name: "", abilities: { 0: 'Overgrow', H: 'Chlorophyll' }, ability: { name: 'Overgrow', onModifyAtkPriority: 5, onModifySpAPriority: 5, flags: {}, rating: 2 }, baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, color: "Green", eggGroups: ['Monster', 'Grass'], evos: ['Ivysaur'], evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, genderRatio: { M: 0.875, F: 0.125 }, heightm: 0.7, hp: 231, item: {}, ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }, level: 100, moves: [{}, {}, {}, {}], nature: "Bashful", num: 25, stats: { hp: 231, atk: 134, def: 134, spa: 166, spd: 166, spe: 134 }, status: null, tier: "LC", types: ['Grass', 'Poison'], weightkg: 6.9 }
];


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

    Array.from(document.getElementsByClassName("grouplinks")).forEach(function (groupLink) {
        groupLink.onclick = function (event) {
            document.querySelectorAll(".grouplinks").forEach(el => el.classList.remove("active-group"));
            
            this.classList.add("active-group");
            $("#search-input").focus();
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
    
    const myInput = document.querySelector('#search-input');

    myInput.onfocus = function () {
        this.select();
        let activeTabId = document.querySelector(".active-group").getAttribute("id");
        if(activeTabId == "Pokemons"){
            createResults(null, 0);
        }
        else if(activeTabId == "Moves"){
            createMovesResults(null , 0, null, 0);
        }
        else if(activeTabId == "Items"){
            createItemsResults(null , 0);
        }
        $("#Search").click();

    }
    myInput.addEventListener('input', function () {
        filterResults(pokemon => pokemon.name.toLowerCase().startsWith(this.value.toLowerCase()), null, 0);
    });


    $('#Search').click();
    $('#current-team-button').click();
    buildsOnLoad();
}


function loadPokemonStats(pokemon, num, object) {

}




function updateTeamStatsWeak(team) {
    const stats = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
    team.forEach(pokemon => {
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
