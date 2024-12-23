
window.onload = onLoad;

import { pokemonPointsData } from '../pokemonPointsBase.js'

var playerPokemons = [
    { name: "Mewtwo", abilities: { 0: 'Overgrow', H: 'Chlorophyll' }, ability: { name: 'Overgrow', onModifyAtkPriority: 5, onModifySpAPriority: 5, flags: {}, rating: 2 }, baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, color: "Green", eggGroups: ['Monster', 'Grass'], evos: ['Ivysaur'], evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, genderRatio: { M: 0.875, F: 0.125 }, heightm: 0.7, hp: 231, item: {}, ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }, level: 100, moves: [{}, {}, {}, {}], nature: "Bashful", num: 150, stats: { hp: 231, atk: 134, def: 134, spa: 166, spd: 166, spe: 134 }, status: null, tier: "LC", types: ['Grass', 'Poison'], weightkg: 6.9 },
    { name: "Arceus", abilities: { 0: 'Overgrow', H: 'Chlorophyll' }, ability: { name: 'Overgrow', onModifyAtkPriority: 5, onModifySpAPriority: 5, flags: {}, rating: 2 }, baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, color: "Green", eggGroups: ['Monster', 'Grass'], evos: ['Ivysaur'], evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, genderRatio: { M: 0.875, F: 0.125 }, heightm: 0.7, hp: 231, item: {}, ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }, level: 100, moves: [{}, {}, {}, {}], nature: "Bashful", num: 493, stats: { hp: 231, atk: 134, def: 134, spa: 166, spd: 166, spe: 134 }, status: null, tier: "LC", types: ['Grass', 'Poison'], weightkg: 6.9 },
    { name: "Beedrill", abilities: { 0: 'Overgrow', H: 'Chlorophyll' }, ability: { name: 'Overgrow', onModifyAtkPriority: 5, onModifySpAPriority: 5, flags: {}, rating: 2 }, baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, color: "Green", eggGroups: ['Monster', 'Grass'], evos: ['Ivysaur'], evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, genderRatio: { M: 0.875, F: 0.125 }, heightm: 0.7, hp: 231, item: {}, ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }, level: 100, moves: [{}, {}, {}, {}], nature: "Bashful", num: 15, stats: { hp: 231, atk: 134, def: 134, spa: 166, spd: 166, spe: 134 }, status: null, tier: "LC", types: ['Grass', 'Poison'], weightkg: 6.9 },
    { name: "Melmetal", abilities: { 0: 'Overgrow', H: 'Chlorophyll' }, ability: { name: 'Overgrow', onModifyAtkPriority: 5, onModifySpAPriority: 5, flags: {}, rating: 2 }, baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, color: "Green", eggGroups: ['Monster', 'Grass'], evos: ['Ivysaur'], evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, genderRatio: { M: 0.875, F: 0.125 }, heightm: 0.7, hp: 231, item: {}, ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }, level: 100, moves: [{}, {}, {}, {}], nature: "Bashful", num: 809, stats: { hp: 231, atk: 134, def: 134, spa: 166, spd: 166, spe: 134 }, status: null, tier: "LC", types: ['Grass', 'Poison'], weightkg: 6.9 },
    { name: "Vivillon", abilities: { 0: 'Overgrow', H: 'Chlorophyll' }, ability: { name: 'Overgrow', onModifyAtkPriority: 5, onModifySpAPriority: 5, flags: {}, rating: 2 }, baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, color: "Green", eggGroups: ['Monster', 'Grass'], evos: ['Ivysaur'], evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, genderRatio: { M: 0.875, F: 0.125 }, heightm: 0.7, hp: 231, item: {}, ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }, level: 100, moves: [{}, {}, {}, {}], nature: "Bashful", num: 666, stats: { hp: 231, atk: 134, def: 134, spa: 166, spd: 166, spe: 134 }, status: null, tier: "LC", types: ['Grass', 'Poison'], weightkg: 6.9 },
    { name: "Pikachu", abilities: { 0: 'Overgrow', H: 'Chlorophyll' }, ability: { name: 'Overgrow', onModifyAtkPriority: 5, onModifySpAPriority: 5, flags: {}, rating: 2 }, baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, color: "Green", eggGroups: ['Monster', 'Grass'], evos: ['Ivysaur'], evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, genderRatio: { M: 0.875, F: 0.125 }, heightm: 0.7, hp: 231, item: {}, ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }, level: 100, moves: [{}, {}, {}, {}], nature: "Bashful", num: 25, stats: { hp: 231, atk: 134, def: 134, spa: 166, spd: 166, spe: 134 }, status: null, tier: "LC", types: ['Grass', 'Poison'], weightkg: 6.9 }
];



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

    Array.from(document.getElementsByClassName("pkmn-pick-btn")).forEach(function (tabLink) {
        tabLink.onclick = function (event) {
            openPokemonTab(tabLink.getAttribute("num"), tabLink);
        };
    });
}



function openPokemonTab(tabIndex, tabButton) {
    let i, activeTabIndex;
    const boxes = document.querySelector('#current-pkmn-info-in');
    
    boxes.style.top = -tabIndex * 100 + '%';
    
    const tablinks = document.querySelectorAll(".pkmn-pick-btn");
    
    tablinks.forEach((tab) => {
        tab.classList.remove("active-tab", "under-active-tab");
    });

    tabButton.classList.add("active-tab");

    activeTabIndex = Array.from(tablinks).indexOf(tabButton);

    for (i = activeTabIndex + 1; i < tablinks.length; i++) {
        tablinks[i].classList.add("under-active-tab");
    }

    tablinks.forEach(function (button) {
        if (button.id === "pokemon-picked-btn") {
            button.id = '';
        }
    });
    tabButton.id = "pokemon-picked-btn";

    let pokemon = playerPokemons[tabIndex];
    var findedPokemon = pokemonPointsData.find(function (item) {
        return item.name === pokemon.name && item.num === pokemon.num;
    });

    console.log('q');
}



document.addEventListener("DOMContentLoaded", function() {
    // Получаем все кастомные селекты на странице
    const customSelects = document.querySelectorAll(".custom-select");

    customSelects.forEach(customSelect => {
        const selected = customSelect.querySelector(".select-selected");
        const optionsContainer = customSelect.querySelector(".select-items");
        const originalSelect = customSelect.querySelector("select");

        selected.addEventListener("click", function() {
            // Если список уже открыт, то скрываем его
            if (optionsContainer.classList.contains("show")) {
                optionsContainer.classList.remove("show");
                optionsContainer.classList.add("hide");
                setTimeout(() => {
                    optionsContainer.classList.remove("hide"); // Удаляем класс после завершения анимации
                }, 300); // Это время должно совпадать с временем анимации в CSS
            } else {
                // Показываем список
                optionsContainer.classList.add("show");
                selected.classList.toggle("select-arrow-active");
            }
        });

        optionsContainer.querySelectorAll("div").forEach(function(option, index) {
            option.addEventListener("click", function() {
                selected.innerHTML = this.innerHTML;
                originalSelect.selectedIndex = index; // Синхронизация с оригинальным select
                // Скрываем список после выбора
                optionsContainer.classList.remove("show");
                optionsContainer.classList.add("hide"); // Применяем анимацию скрытия
                setTimeout(() => {
                    optionsContainer.classList.remove("hide"); // Удаляем класс после завершения анимации
                }, 300); // Это время должно совпадать с временем анимации в CSS
                selected.classList.remove("select-arrow-active"); // Убираем стрелку
            });
        });
    });

    document.addEventListener("click", function(e) {
        customSelects.forEach(customSelect => {
            const optionsContainer = customSelect.querySelector(".select-items");
            const selected = customSelect.querySelector(".select-selected");

            if (!e.target.closest(".custom-select")) {
                // Скрываем список, если кликнули вне
                optionsContainer.classList.remove("show");
                optionsContainer.classList.add("hide");
                setTimeout(() => {
                    optionsContainer.classList.remove("hide"); // Удаляем класс после завершения анимации
                }, 300); // Это время должно совпадать с временем анимации в CSS
                selected.classList.remove("select-arrow-active");
            }
        });
    });
});

