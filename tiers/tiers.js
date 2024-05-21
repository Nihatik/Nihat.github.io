import { pokemonPointsData } from "../pokemonPointsBase.js";

var allTiers = ['AG','Uber','OU','UU','RU']

window.onload = onLoad;

function onLoad() {
    document.querySelector('.search-input').oninput = function() {
        findTierByName(this.value);
    }
    document.querySelector('.search-input-tier').oninput = function() {
        changePokemonResultForTier(this.value, this.id);
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
    let filters = []
    filters.push(pokemon => pokemon.name.replace(' ','').replace('-','').toLowerCase().includes(value.replace('-','').replace(' ','').toLowerCase()))
    let as = document.querySelectorAll('#right-menu a')
    
    if (value != ''){
        as.forEach(function(a){
            if(!a.classList.contains('visiblea')){
                a.style.opacity = '0.3'
                a.style.border = '1px solid transparent'
            }
        })
        let filteredPokemons = filterPokemon(pokemonPointsData, filters)
        filteredPokemons.forEach(function(pokemon){
            if(pokemon.tier && document.getElementById(pokemon.tier.toLowerCase())){
                document.getElementById(pokemon.tier.toLowerCase()).style.opacity = '1'
                document.getElementById(pokemon.tier.toLowerCase()).style.border = '1px solid rgb(255,255,255,0.1)'
            }
        })

    }
    else{
        as.forEach(function(a){
            a.style.opacity = '1'
            a.style.border = '1px solid transparent'
        })
    }
}

function changePokemonResultForTier(value, tier){
    let as = document.querySelectorAll('#right-menu a')
    let filters = []
    filters.push(pokemon => pokemon.name.replace(' ','').replace('-','').toLowerCase().includes(value.replace('-','').replace(' ','').toLowerCase()))
    let pokemonCards = document.querySelectorAll('.pokemon-card')
    if(document.getElementById('noneResult')){
        document.getElementById('noneResult').remove()
    }
    if (value != ''){
        let currentTier = false
        pokemonCards.forEach(function(card){
            card.style.display = 'none'
        })
        let filteredPokemons = filterPokemon(pokemonPointsData, filters)
        filteredPokemons.forEach(function(pokemon){
            if(pokemon.tier && document.getElementById('pokemon-' + pokemon.name)){
                document.getElementById('pokemon-' + pokemon.name).style.display = ''
            }
            if(pokemon.tier == tier){
                currentTier = true
                console.log('q')
            }
        })
        if (!currentTier){
            let p = document.createElement('p')
            p.id = 'noneResult'
            p.textContent = 'Неверно указанно название покемона или же он не ' + tier + ' тира. Его тир может быть указан левее.'
            document.querySelector('#pokemon-cards').appendChild(p)
            as.forEach(function(a){
                if(!a.classList.contains('visiblea')){
                    a.style.opacity = '0.3'
                    a.style.border = '1px solid transparent'
                }
            })
            filteredPokemons.forEach(function(pokemon){
                if(allTiers.includes(pokemon.tier)){
                    document.getElementById(pokemon.tier.toLowerCase()).style.opacity = '1'
                    document.getElementById(pokemon.tier.toLowerCase()).style.border = '1px solid rgb(255,255,255,0.1)'
                }
            })
        }else{
            as.forEach(function(a){
                a.style.opacity = '1'
                a.style.border = '1px solid transparent'
            })
        }
    }
    else{
        as.forEach(function(a){
            a.style.opacity = '1'
            a.style.border = '1px solid transparent'
        })
        pokemonCards.forEach(function(card){
            card.style.display = ''
            card.style.display = ''
        })
    }

}
