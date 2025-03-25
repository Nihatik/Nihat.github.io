
import { playerPokemons } from '../main.js';
import { pokemonPointsData } from '../pokemonPointsBase.js';
import { loadBuildResults } from './TeamUtils.js';

export { loadFunctions, openTab, openTab2, openPokemonTab };


function moveToCenter(tabIndex) {
    const boxes = document.querySelector('#TeamsInfo-container-in');
    const boxItems = boxes.querySelectorAll('.tab-item'); // Все вкладки
    const tablinks = document.querySelectorAll("#TeamsInfo-tab button");
    const tabContainer = document.querySelector("#TeamsInfo-tab");

    
    boxes.style.left = -tabIndex * 100 + '%';

    // Меняем позицию "нижнего индикатора" через CSS-переменную
    if (tabContainer) {
        tabContainer.style.setProperty("--tab-position", `calc(${tabIndex} * 100% / 3)`);
    }

    tablinks.forEach(btn => btn.classList.remove("active-tab"));
    boxItems.forEach(div => div.classList.remove("active-tab"));

    // Добавляем активный класс текущему табу
    if (boxItems[tabIndex]) {
        boxItems[tabIndex].classList.add("active-tab");
    }
    if (tablinks[tabIndex]) {
        tablinks[tabIndex].classList.add("active-tab");
    }
}

function loadFunctions() {
    const tablinks = document.querySelectorAll("#TeamsInfo-tab button");
    tablinks.forEach(button => {
        button.onclick = function () {
            const tabIndex = parseInt(button.getAttribute("num"), 10) || 0;
            moveToCenter(tabIndex);
        };
    });
}



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
    console.log(tabButton.num, tabIndex , "NUM AND TABINDEX");
    tablinks.forEach(function (button) {
        if (button.num != tabIndex && button.id === "pokemon-picked-btn") {
            button.id = '';
            console.log("ID CLEARED");
        }
    });
    tabButton.id = "pokemon-picked-btn";
    let pokemon = playerPokemons[tabIndex]
    var findedPokemon = pokemonPointsData.find(function (item) {
        return item.name === pokemon.name && item.num === pokemon.num;
    });
    $("#search-input").focus();
    if (pokemon.name != "") {
        loadBuildResults(pokemon, tabIndex, tabButton)
    }
}
