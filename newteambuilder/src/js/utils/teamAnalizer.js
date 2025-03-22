import { pokemonPointsData } from "../pokemonPointsBase.js";
import {allTypes} from '../teambuilderBase.js'

function teamTypesDefenseUpdate(playerPokemons) {
    let tds = document.querySelectorAll('table tr td')
    let trs = document.querySelectorAll('.team-types-defense table tbody tr')
    let allTypes = Object.keys(allTypes)
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
                    if (allTypes[typeEff][checkType] == 0.5) {
                        teamTypesDefense[typeEff] += 1
                    }
                    else if (allTypes[typeEff][checkType] == 2) {
                        teamTypesDefense[typeEff] -= 1
                    } else if (allTypes[typeEff][checkType] == 0) {
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