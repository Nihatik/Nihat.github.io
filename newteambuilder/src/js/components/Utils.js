
export { checkToSpace, filterPokemon, setTypesImg, getGradientColor, imgSource, capitalizeFirstLetter }

var imgSource = '../img/';

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

function getGradientColor(value) {
    value = value / 40
    const red = Math.max(0, 255 - (value * 2.55 * 2));
    const green = Math.min(255, value * 2.55 * 2);
    const blue = Math.max(0, 255 - Math.abs(127.5 - (value * 2.55)) * 2);
    return `rgb(${red}, ${green}, ${blue})`;
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