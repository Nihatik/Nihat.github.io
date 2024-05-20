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
    filters.push(pokemon => pokemon.name.toLowerCase().includes(value.toLowerCase()))
    let as = document.querySelectorAll('#right-menu a')
    
    if (value != ''){
        as.forEach(function(a){
            a.style.display = 'none'
        })
        let filteredPokemons = filterPokemon(pokemonPointsData, filters)
        filteredPokemons.forEach(function(pokemon){
            if(pokemon.tier && document.getElementById(pokemon.tier.toLowerCase())){
                document.getElementById(pokemon.tier.toLowerCase()).style.display = ''
            }
        })

    }
    else{
        as.forEach(function(a){
            a.style.display = ''
        })
    }
}
