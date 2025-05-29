import { pokemonPointsData } from "../pokemonPointsBase.js";

var allTiers = ['AG','Uber','OU','UU','RU']
var currentTierFilter = 'all';  // глобальная переменная для выбранного фильтра tier

window.onload = onLoad;

function onLoad() {
    document.querySelector('.search-input').oninput = function() {
        findTierByName(this.value);
    }

    const tierFilterSelect = document.querySelector('#tierFilter');
    if (tierFilterSelect) {
        tierFilterSelect.onchange = function() {
            let currentTierFilter = this.value;
            const searchValue = document.querySelector('.search-input-tier')?.value || '';
            changePokemonResultForTier(searchValue, currentTierFilter);
        }
    }

    if (document.querySelector('.search-input-tier')) {
        document.querySelector('.search-input-tier').oninput = function() {
            changePokemonResultForTier(this.value, currentTierFilter);
        }
    }

    const mc = new Hammer(document.body);
    const swipeMenu = document.querySelector('#right-menu').classList
    const activeClassMenu = 'right-menu-show'

    mc.on("swipeleft swiperight", function (ev) {
        if (ev.type === "swipeleft") {
            swipeMenu.remove(activeClassMenu)
        } else {
            swipeMenu.add(activeClassMenu)
        }
    })

    document.querySelector("#close-menu").onclick = function(){
        setTimeout(() => {
            if(this.hasAttribute('easy-add')){
                this.removeAttribute('easy-add')
                this.setAttribute('easy-remove', '#right-menu')
            }
            else{
                this.removeAttribute('easy-remove')
                this.setAttribute('easy-add', '#right-menu')
            }
        }, 100);
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

var pointsNames = {
    6: 'six',
    5: 'five',
    4: 'four',
    3: 'three',
    2: 'two',
    1: 'one',
    0: 'zero'
}

function findTierByName(value) {
    let filters = []
    filters.push(pokemon => pokemon.name.replace(' ','').replace('-','').toLowerCase().includes(value.replace('-','').replace(' ','').toLowerCase()))
    let as = document.querySelectorAll('#right-menu a')

    if (value != '') {
        as.forEach(function(a){
            if(!a.classList.contains('visiblea')){
                a.style.opacity = '0.3'
                a.style.border = '1px solid transparent'
            }
        })
        let filteredPokemons = filterPokemon(pokemonPointsData, filters)
        filteredPokemons.forEach(function(pokemon){
            if(document.getElementById(pointsNames[pokemon.points])){
                document.getElementById(pointsNames[pokemon.points]).style.opacity = '1'
                document.getElementById(pointsNames[pokemon.points]).style.border = '1px solid rgb(255,255,255,0.1)'
            }
            if(document.getElementById(pointsNames[pokemon.pointsHa])){
                document.getElementById(pointsNames[pokemon.pointsHa]).style.opacity = '1'
                document.getElementById(pointsNames[pokemon.pointsHa]).style.border = '1px solid rgb(255,255,255,0.1)'
            }
        })

    } else {
        as.forEach(function(a){
            a.style.opacity = '1'
            a.style.border = '1px solid transparent'
        })
    }
}

function changePokemonResultForTier(value, tierFilter){
    let as = document.querySelectorAll('#right-menu a')
    let filters = []

    // Фильтр по имени
    filters.push(pokemon => pokemon.name.replace(' ','').replace('-','').toLowerCase().includes(value.replace('-','').replace(' ','').toLowerCase()))

    // Фильтр по tier, если выбран не all
    if(tierFilter && tierFilter !== 'all') {
        filters.push(pokemon => pokemon.tier === tierFilter);
    }

    let pokemonCards = document.querySelectorAll('.pokemon-card')

    if(document.getElementById('noneResult')){
        document.getElementById('noneResult').remove()
    }

    if (value != '' || (tierFilter && tierFilter !== 'all')){
        let filteredPokemons = filterPokemon(pokemonPointsData, filters);
        let currentTier = filteredPokemons.length > 0;

        // Скрываем все карточки
        pokemonCards.forEach(function(card){
            card.style.display = 'none'
        })

        // Показываем отфильтрованные
        filteredPokemons.forEach(function(pokemon){
            const card = document.getElementById('pokemon-' + pokemon.name);
            if(card){
                card.style.display = '';
            }
        })

        if (!currentTier){
            let p = document.createElement('p')
            p.id = 'noneResult'
            p.textContent = 'Неверно указанно название покемона или он не подходит под выбранный фильтр.'
            document.querySelector('#pokemon-cards').appendChild(p)

            as.forEach(function(a){
                if(!a.classList.contains('visiblea')){
                    a.style.opacity = '0.3'
                    a.style.border = '1px solid transparent'
                }
            })

            filteredPokemons.forEach(function(pokemon){
                if(document.getElementById(pointsNames[pokemon.points])){
                    document.getElementById(pointsNames[pokemon.points]).style.opacity = '1'
                    document.getElementById(pointsNames[pokemon.points]).style.border = '1px solid rgb(255,255,255,0.1)'
                }
                if(document.getElementById(pointsNames[pokemon.pointsHa])){
                    document.getElementById(pointsNames[pokemon.pointsHa]).style.opacity = '1'
                    document.getElementById(pointsNames[pokemon.pointsHa]).style.border = '1px solid rgb(255,255,255,0.1)'
                }
            })
        } else {
            as.forEach(function(a){
                a.style.opacity = '1'
                a.style.border = '1px solid transparent'
            })
        }
    } else {
        // Показываем всех, если нет фильтров
        as.forEach(function(a){
            a.style.opacity = '1'
            a.style.border = '1px solid transparent'
        })
        pokemonCards.forEach(function(card){
            card.style.display = ''
        })
    }
}
