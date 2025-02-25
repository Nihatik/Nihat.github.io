import { pokemonPointsData } from "../pokemonPointsBase.js";

var allTiers = ['AG', 'Ubers', 'OU', 'UU', 'RU', 'Ubers UU', 'Monotype', 'Doubles OU']

window.onload = onLoad;

function onLoad() {
    document.querySelector('.search-input').oninput = function () {
        findTierByName(this.value);
    }
    if (document.querySelector('.search-input-tier')) {
        document.querySelector('.search-input-tier').oninput = function () {
            changePokemonResultForTier(this.value, this.id);
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
    document.querySelector("#close-menu").onclick = function () {
        setTimeout(() => {
            if (this.hasAttribute('easy-add')) {
                this.removeAttribute('easy-add')
                this.setAttribute('easy-remove', '#right-menu')
            }
            else {
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

function findTierByName(value) {

    function checkToAviableIn(tier, pokemon) {
        
        let tierElement = document.getElementById(tier);
        if (tier == 'monotype'){
            tierElement = document.getElementById('monodualtype')
        }
        const tierValue = pokemon[tier];
        if (tierValue === 0) {
            tierElement.style.borderLeft = '4px solid rgb(128,0,0,0.5)';
        } else if (tierValue === 1) {
            tierElement.style.borderLeft = '4px solid rgb(0,128,0,0.5)';
        } else {
            tierElement.style.backgroundColor = '';
        }
    }

    let filters = []
    filters.push(pokemon => pokemon.name.replace(' ', '').replace('-', '').toLowerCase().includes(value.replace('-', '').replace(' ', '').toLowerCase()))
    let as = document.querySelectorAll('#right-menu a')

    if (value != '') {
        as.forEach(function (a) {
            if (!a.classList.contains('visiblea')) {
                a.style.opacity = '0.3'
                a.style.border = '1px solid transparent'
                a.style.boxShadow = ''
            }
        })
        let filteredPokemons = filterPokemon(pokemonPointsData, filters)
        let firstPokemon = filteredPokemons[0]
        checkToAviableIn('monotype', firstPokemon)
        checkToAviableIn('ubersuu', firstPokemon)
        checkToAviableIn('doublesou', firstPokemon)
        filteredPokemons.forEach(function (pokemon) {
            let tierId = pokemon.tier.toLowerCase()
            if (pokemon.tier && document.getElementById(tierId)) {
                document.getElementById(tierId).style.opacity = '1'
                document.getElementById(tierId).style.boxShadow = '0 -2px 6px 0 rgba(0, 128, 0, 0.25), 0 4px 8px 0 rgba(128, 0, 0, 0.3)'
                document.getElementById(tierId).style.border = '1px solid rgb(255,255,255,0.1)'
                document.getElementById(tierId).style.borderBottom = '1px solid rgb(128,0,0,0.5)'
            }
        })

    }
    else {
        as.forEach(function (a) {
            console.log(a.id)
            document.getElementById('ubersuu').style.backgroundColor = ''
            if (!(a.style.id in ['ubersuu', 'monodualtype'])) {
                a.style.opacity = '1'
                a.style.border = '1px solid transparent'
                a.style.boxShadow = ''
            }
        })
    }
}

function changePokemonResultForTier(value, tier) {
    let as = document.querySelectorAll('#right-menu a')
    let filters = []
    filters.push(pokemon => pokemon.name.replace(' ', '').replace('-', '').toLowerCase().includes(value.replace('-', '').replace(' ', '').toLowerCase()))
    let pokemonCards = document.querySelectorAll('.pokemon-card')
    if (document.getElementById('noneResult')) {
        document.getElementById('noneResult').remove()
    }
    if (value != '') {
        let currentTier = false
        pokemonCards.forEach(function (card) {
            card.style.display = 'none'
        })
        let filteredPokemons = filterPokemon(pokemonPointsData, filters)
        filteredPokemons.forEach(function (pokemon) {
            if (pokemon.tier && document.getElementById('pokemon-' + pokemon.name)) {
                document.getElementById('pokemon-' + pokemon.name).style.display = ''
            }
            if (pokemon.tier == tier) {
                currentTier = true
                console.log('q')
            }
        })
        if (!currentTier) {
            let p = document.createElement('p')
            p.id = 'noneResult'
            p.textContent = 'Неверно указанно название покемона или же он не ' + tier + ' тира. Его тир может быть указан левее.'
            document.querySelector('#pokemon-cards').appendChild(p)
            as.forEach(function (a) {
                if (!a.classList.contains('visiblea')) {
                    a.style.opacity = '0.3'
                    a.style.border = '1px solid transparent'
                }
            })
            filteredPokemons.forEach(function (pokemon) {
                if (allTiers.includes(pokemon.tier)) {
                    document.getElementById(pokemon.tier.toLowerCase()).style.opacity = '1'
                    document.getElementById(pokemon.tier.toLowerCase()).style.border = '1px solid rgb(255,255,255,0.1)'
                }
            })
        } else {
            as.forEach(function (a) {
                a.style.opacity = '1'
                a.style.border = '1px solid transparent'
            })
        }
    }
    else {
        as.forEach(function (a) {
            a.style.opacity = '1'
            a.style.border = '1px solid transparent'
        })
        pokemonCards.forEach(function (card) {
            card.style.display = ''
            card.style.display = ''
        })
    }

}
