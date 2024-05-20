import { pokemonPointsData } from "../pokemonPointsBase.js";

window.onload = onLoad;

function onLoad() {
    document.querySelector('.search-input').oninput = function() {
        changePokemonResultForTier(this.value);
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

function changePokemonResultForTier(value) {
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
