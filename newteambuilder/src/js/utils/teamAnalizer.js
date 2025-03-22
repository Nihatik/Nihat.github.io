import { pokemonPointsData } from "../pokemonPointsBase.js";

const typeEffectiveness = {
    normal: { normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1, rock: 0.5, ghost: 0, dragon: 1, dark: 1, steel: 0.5, fairy: 1 },
    fire: { normal: 1, fire: 0.5, water: 0.5, electric: 1, grass: 2, ice: 2, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 2, rock: 0.5, ghost: 1, dragon: 0.5, dark: 1, steel: 2, fairy: 1 },
    water: { normal: 1, fire: 2, water: 0.5, electric: 1, grass: 0.5, ice: 1, fighting: 1, poison: 1, ground: 2, flying: 1, psychic: 1, bug: 1, rock: 2, ghost: 1, dragon: 0.5, dark: 1, steel: 1, fairy: 1 },
    grass: { normal: 1, fire: 0.5, water: 2, electric: 1, grass: 0.5, ice: 1, fighting: 1, poison: 0.5, ground: 2, flying: 0.5, psychic: 1, bug: 0.5, rock: 2, ghost: 1, dragon: 0.5, dark: 1, steel: 0.5, fairy: 1 },
    electric: { normal: 1, fire: 1, water: 2, electric: 0.5, grass: 0.5, ice: 1, fighting: 1, poison: 1, ground: 0, flying: 2, psychic: 1, bug: 1, rock: 1, ghost: 1, dragon: 0.5, dark: 1, steel: 1, fairy: 1 },
    ice: { normal: 1, fire: 0.5, water: 0.5, electric: 1, grass: 2, ice: 0.5, fighting: 1, poison: 1, ground: 2, flying: 2, psychic: 1, bug: 1, rock: 1, ghost: 1, dragon: 2, dark: 1, steel: 0.5, fairy: 1 },
    fighting: { normal: 2, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 1, poison: 0.5, ground: 1, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dragon: 1, dark: 2, steel: 2, fairy: 0.5 },
    poison: { normal: 1, fire: 1, water: 1, electric: 1, grass: 2, ice: 1, fighting: 1, poison: 0.5, ground: 0.5, flying: 1, psychic: 1, bug: 1, rock: 0.5, ghost: 0.5, dragon: 1, dark: 1, steel: 0, fairy: 2 },
    ground: { normal: 1, fire: 2, water: 1, electric: 2, grass: 0.5, ice: 1, fighting: 1, poison: 2, ground: 1, flying: 0, psychic: 1, bug: 0.5, rock: 2, ghost: 1, dragon: 1, dark: 1, steel: 2, fairy: 1 },
    flying: { normal: 1, fire: 1, water: 1, electric: 0.5, grass: 2, ice: 1, fighting: 2, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 2, rock: 0.5, ghost: 1, dragon: 1, dark: 1, steel: 0.5, fairy: 1 },
    psychic: { normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 2, poison: 2, ground: 1, flying: 1, psychic: 0.5, bug: 1, rock: 1, ghost: 1, dragon: 1, dark: 0, steel: 0.5, fairy: 1 },
    bug: { normal: 1, fire: 0.5, water: 1, electric: 1, grass: 2, ice: 1, fighting: 0.5, poison: 0.5, ground: 1, flying: 0.5, psychic: 2, bug: 1, rock: 1, ghost: 0.5, dragon: 1, dark: 2, steel: 0.5, fairy: 0.5 },
    rock: { normal: 1, fire: 2, water: 1, electric: 1, grass: 1, ice: 2, fighting: 0.5, poison: 1, ground: 0.5, flying: 2, psychic: 1, bug: 2, rock: 1, ghost: 1, dragon: 1, dark: 1, steel: 0.5, fairy: 1 },
    ghost: { normal: 0, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 2, bug: 1, rock: 1, ghost: 2, dragon: 1, dark: 0.5, steel: 1, fairy: 1 },
    dragon: { normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1, rock: 1, ghost: 1, dragon: 2, dark: 1, steel: 0.5, fairy: 0 },
    dark: { normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 0.5, poison: 1, ground: 1, flying: 1, psychic: 2, bug: 1, rock: 1, ghost: 2, dragon: 1, dark: 0.5, steel: 1, fairy: 0.5 },
    steel: { normal: 1, fire: 0.5, water: 0.5, electric: 0.5, grass: 1, ice: 2, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1, rock: 2, ghost: 1, dragon: 1, dark: 1, steel: 0.5, fairy: 2 },
    fairy: { normal: 1, fire: 0.5, water: 1, electric: 1, grass: 1, ice: 1, fighting: 2, poison: 0.5, ground: 1, flying: 1, psychic: 1, bug: 1, rock: 1, ghost: 1, dragon: 2, dark: 2, steel: 0.5, fairy: 1 },
};

function teamTypesDefenseUpdate(playerPokemons) {
    let tds = document.querySelectorAll('table tr td')
    let trs = document.querySelectorAll('.team-types-defense table tbody tr')
    let allTypes = Object.keys(typeEffectiveness)
    let teamTypesDefense = []
    for (let i = 0; i < 18; i++) {
        teamTypesDefense[allTypes[i]] = 0;
        if (trs[i].querySelectorAll('td')[2] && trs[i].querySelectorAll('td')[2].querySelector('div')) {
            trs[i].querySelectorAll('td')[2].remove()
        }
    }

    playerPokemons.forEach(function (pokemon) {
        if (pokemon.types && pokemon.name != '') {
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
}

export {teamTypesDefenseUpdate}