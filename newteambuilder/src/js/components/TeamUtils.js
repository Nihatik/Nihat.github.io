import { playerPokemons, updateTeamStatsWeak} from '../main.js';
import { teamTypesDefenseUpdate } from '../utils/teamAnalyzer.js';
import { returnPokePaste, returnCurrentPokemonPokepaste } from './Pokepaste.js';
import { pokemonPointsData } from '../pokemonPointsBase.js';
import { allPokemons, allNatures } from '../teambuilderBase.js';
import { setTypesImg, imgSource } from './Utils.js';
import { loadBuilds, loadBuildResults } from './Builds.js';
import { openPokemonTab } from './Tabs.js';

var movesForPoints = ['Whirlwind', 'Roar', 'Baton Pass']

export { teamPokemonUpdate, loadBuildResults, updateVisualTeam, calculateTeamPointsValue, movesForPoints }

function teamPokemonUpdate(pokemon, num = null, object = null) {
    let buttons = document.querySelectorAll('.pokemon-pick-btn');
    updateTeamStatsWeak(playerPokemons);
    teamTypesDefenseUpdate(playerPokemons)
    if (document.getElementById('build-button')) {
        document.getElementById('build-button').remove()
    }
    var findedPokemon = pokemonPointsData.find(function (item) {
        return item.name === pokemon.name && item.num === pokemon.num;
    });
    loadBuilds(findedPokemon);

    /*       document.getElementById('current-pokemon-points').textContent = calculateTeamPointsValue(null, pokemon)
     */
    returnPokePaste(playerPokemons)
    let activePokemon = playerPokemons[num]

    var results = document.querySelectorAll('.result')
    if (!object) {
        if (num) {
            object = buttons[num];
        }
        else {
            object = buttons[0];
        }
    }

    object.classList.add('current-pokemon-choice');

    let infoPokemon = document.querySelectorAll('.team-pokemon-tab')[num]

    var div = infoPokemon.querySelector('.team-pokemon-sprite div');
    if (pokemon && (pokemon.name.includes('-Mega-X') || pokemon.name.includes('-Mega-Y'))) {
        var pokemonUrl = megaXYUrl(pokemon.name, 0);
    }
    else if (pokemon.baseSpecies) {
        var pokemonUrl = 'https://play.pokemonshowdown.com/sprites/ani/' + pokemon.baseSpecies.replace(/\s/g, '').toLowerCase() + '-' + pokemon.forme.replace(/\s/g, '').replace('-', '').toLowerCase() + '.gif';
    }
    else {
        if (!pokemon) {
            var pokemonUrl = 'https://play.pokemonshowdown.com/sprites/ani/bulbasaur.gif';
        }
        else {
            var pokemonUrl = 'https://play.pokemonshowdown.com/sprites/ani/' + pokemon.name.replace(/\s/g, '').replace('-', '').toLowerCase() + '.gif';
        }
    }
    var image = new Image();
    try {
        image.src = pokemonUrl;
    }
    catch (error) {
    }
    image.onload = function () {
        div.style.backgroundImage = 'url(' + pokemonUrl + ')';
    };
    image.onerror = function () {
        var pokemonUrl = 'https://play.pokemonshowdown.com/sprites/dex/' + pokemon.name.replace(/\s/g, '').replace(/-/g, '').toLowerCase() + '.png';
        div.style.backgroundImage = 'url(' + pokemonUrl + ')';
    };

    function evsValuesUpdate(pokemon) {
        let evsKeys = Object.keys(pokemon.evs);
        let evs = infoPokemon.querySelectorAll('.evs h3');
        let evsRanges = infoPokemon.querySelectorAll('.stat-progress');
        let total = 0
        for (let i = 0; i < 6; i++) {
            evs[i].textContent = pokemon.evs[evsKeys[i]];
            evsRanges[i].value = pokemon.stats[evsKeys[i]] * 100 / evsRanges[i].max;
        }
    }
    let evs = infoPokemon.querySelectorAll('.evs h3');
    let evsRanges = infoPokemon.querySelectorAll('.stat-progress');
    let evsKeys = Object.keys(pokemon.evs);

    evsValuesUpdate(pokemon)
    for (let i = 0; i < 6; i++) {
        evs[i].oninput = function () {
            let evs = infoPokemon.querySelectorAll('.evs input');
            total = 0
            for (let j = 0; j < 6; j++) {
                total += +evs[j].value
            }
            totalWithout = total - +evs[i].value
            if (totalWithout + +evs[i].value > 508) {
                evs[i].value = 508 - totalWithout
            }
            playerPokemons[num].evs[evsKeys[i]] = +this.value;
            pokemonStatsLoad(playerPokemons)
            evsValuesUpdate(pokemon)
            statValuesUpdate(playerPokemons[num])
            returnPokePaste(playerPokemons)
        }
        evsRanges[i].oninput = function () {
            let evsRanges = infoPokemon.querySelectorAll('.evs-range');
            let total = 0
            for (let j = 0; j < 6; j++) {
                total += +evsRanges[j].value
            }
            let totalWithout = total - +evsRanges[i].value
            if (totalWithout + +evsRanges[i].value > 508) {
                evsRanges[i].value = 508 - totalWithout
            }
            playerPokemons[num].evs[evsKeys[i]] = +this.value;
            pokemonStatsLoad(playerPokemons)
            evsValuesUpdate(pokemon)
            statValuesUpdate(playerPokemons[num])
            returnPokePaste(playerPokemons)
        }
    }

    function ivsValuesUpdate() {
        let ivs = infoPokemon.querySelectorAll('.ivs input');
        for (let i = 0; i < 6; i++) {
            ivs[i].value = pokemon.ivs[evsKeys[i]];
        }
    }

    // let ivs = infoPokemon.querySelectorAll('.ivs input');
    // for (let i = 0; i < 6; i++) {
    //     ivs[i].value = pokemon.ivs[evsKeys[i]];
    //     ivs[i].oninput = function () {
    //         if (ivs[i].value > 31) {
    //             ivs[i].value = 31;
    //         }
    //         else if (ivs[i].value < 0) {
    //             ivs[i].value = 0;
    //         }
    //         playerPokemons[num].ivs[evsKeys[i]] = +this.value;
    //         pokemonStatsLoad(playerPokemons)
    //         ivsValuesUpdate(pokemon)
    //         statValuesUpdate(playerPokemons[num])
    //     }
    // }


    statValuesUpdate(pokemon)
    function statValuesUpdate(pokemon) {
        let stats = infoPokemon.querySelectorAll('.current-pokemon-stat-values h3');
        for (let i = 0; i < 6; i++) {
            stats[i].textContent = pokemon.stats[evsKeys[i]];
        }
    }

    var item = infoPokemon.querySelector('.pokemon-info-item')
    if (pokemon.item.name) {

        let firstCord = -(pokemon.item.spritenum % 16 * 24)
        let secondCord = -(Math.floor(pokemon.item.spritenum / 16) * 24)

        item.title = pokemon.item.name;
        item.style = "background:transparent url(https://play.pokemonshowdown.com/sprites/itemicons-sheet.png?v1) no-repeat scroll " + firstCord + 'px ' + secondCord + 'px';
        infoPokemon.querySelector('.item').value = pokemon.item.name;
    }
    else {
        item.title = '';
        item.style = "background:transparent url(https://play.pokemonshowdown.com/sprites/itemicons-sheet.png?v1) no-repeat scroll " + 0 + 'px ' + 0 + 'px';
        infoPokemon.querySelector('.item').value = '';
    }

    let moves = infoPokemon.querySelectorAll('.team-pokemon-moves span');
    function movesValuesUpdate(pokemon) {
        for (let i = 0; i < 4; i++) {
            if (pokemon.moves[i].name) {
                moves[i].querySelector('input').value = pokemon.moves[i].name;
                moves[i].querySelector('img').src = imgSource + pokemon.moves[i].type.toLowerCase() + "_type.png";
            } else {
                moves[i].querySelector('input').value = '';
                moves[i].querySelector('img').src = imgSource + "normal_type.png";
            }
        }
    }

    movesValuesUpdate(pokemon)


    setTypesImg(pokemon, infoPokemon, '.team-pokemon-add-info .types');

    let abilitiesSelect = infoPokemon.querySelector('.ability');
    abilitiesSelect.onchange = function () {
        playerPokemons[num].ability.name = this.value;
        updateVisualTeam(playerPokemons[num], num, object);
        abilitiesParam(playerPokemons)
        returnPokePaste(playerPokemons)
    }
    let options = abilitiesSelect.querySelectorAll('option');

    options.forEach(option => option.remove());

    options = [];

    for (let i = 0; i < Object.keys(pokemon.abilities).length; i++) {
        let option = document.createElement('option');
        abilitiesSelect.appendChild(option);
        options.push(option);

        if (pokemon.abilities[i]) {
            option.value = pokemon.abilities[i];
            option.textContent = pokemon.abilities[i];
        } else if (pokemon.abilities["H"]) {
            option.value = pokemon.abilities["H"];
            option.textContent = pokemon.abilities["H"];
        }
    }

    let naturesSelect = document.querySelector('.nature');
    naturesSelect.onchange = function () {
        playerPokemons[num].nature = this.value;
        pokemonStatsLoad(playerPokemons)
        statValuesUpdate(playerPokemons[num])
        statNameColorsUpdate()
        returnPokePaste(playerPokemons)
    }
    if (naturesSelect.querySelector('option') == null) {
        Object.keys(allNatures).forEach(function (nature) {
            var option = document.createElement('option');
            option.value = nature;
            option.textContent = nature;
            if (allNatures[nature].boosted) {
                option.textContent += ' (+' + natures[nature].boosted + '; -' + natures[nature].reduced + ')';
            }
            naturesSelect.appendChild(option);

        });
    }

    function statNameColorsUpdate() {
        let statNames = document.querySelectorAll('.current-pokemon-stat-names p')
        for (let i = 0; i < evsKeys.length; i++) {
            statNames[i].classList.remove('boosted')
            statNames[i].classList.remove('decreased')
            if (evsKeys[i] == allNatures[playerPokemons[num].nature].boosted) {
                statNames[i].classList.add('boosted')
            }
            if (evsKeys[i] == allNatures[playerPokemons[num].nature].reduced) {
                statNames[i].classList.add('decreased')
            }
        }
    }

    options = naturesSelect.querySelectorAll('option');
    options.forEach(function (option) {
        option.selected = false;
        if (option.value == pokemon.nature) {
            option.selected = true;
            statNameColorsUpdate()
        }
    });

    options = abilitiesSelect.querySelectorAll('option')
    options.forEach(function (option) {
        option.selected = false;
        if (option.value == pokemon.ability.name) {
            option.selected = true;
        }
    });


    
    loadBuildResults(pokemon, num, object)
    returnCurrentPokemonPokepaste(pokemon)
}

function megaXYUrl(pokemonName, num) {
    if (pokemonName.includes('-Y')) {
        symbol = '-Y';
        newSymbol = 'Y';
    }
    else {
        symbol = '-X';
        newSymbol = 'X';
    }
    if (num == 0) {
        url = "https://play.pokemonshowdown.com/sprites/ani/" + pokemonName.replace(/\s/g, '').replace(symbol, newSymbol).toLowerCase() + ".gif";
    }
    else if (num == 1) {
        url = "https://play.pokemonshowdown.com/sprites/ani-back/" + pokemonName.replace(/\s/g, '').replace(symbol, newSymbol).toLowerCase() + ".gif";
    }
    return url
}



function calculateTeamPointsValue(team, pokemon = null) {
    let teamPointsValue = 0
    if (team) {
        team.forEach(function (pokemon) {
            if (pokemon.name) {
                let pokemonOtherForm = null
                let findedPokemon = null
                if (pokemon.otherFormes) {
                    pokemonOtherForm = allPokemons[pokemon.otherFormes[0].replace(/\s/g, '').replace(/-/g, '').replace(/%/g, '').replace('.', '').replace("'", '').toLowerCase()];
                }
                if (pokemonOtherForm && pokemonOtherForm.requiredItem && pokemonOtherForm.requiredItem == pokemon.item.name) {
                    findedPokemon = pokemonPointsData.find(function (item) {
                        return item.name === pokemon.otherFormes[0] && item.num === pokemon.num;
                    });
                }
                else if (pokemon.item.itemUser && pokemon.item.itemUser == pokemon.name) {
                    if (pokemon.item.megaStone) {
                        findedPokemon = pokemonPointsData.find(function (item) {
                            return item.name === pokemon.item.megaStone && item.num === pokemon.num;
                        });
                    } else {
                        findedPokemon = pokemonPointsData.find(function (item) {
                            return item.name === pokemon.item.itemUser[0] && item.num === pokemon.num;
                        });
                    }
                }
                else {
                    findedPokemon = pokemonPointsData.find(function (item) {
                        return item.name === pokemon.name && item.num === pokemon.num;
                    });
                }
                if (pokemon.ability.name == pokemon.abilities.H && findedPokemon.pointsHa) {
                    teamPointsValue += findedPokemon.pointsHa
                }
                else {
                    /* teamPointsValue += findedPokemon.points */
                }



                if (pokemon.moves) {
                    pokemon.moves.forEach(function (move) {
                        if (move.name) {
                            if (movesForPoints.includes(move.name)) {
                                teamPointsValue += 1;
                            }
                        }
                    })
                }
            }
        })
    }
    else {
        if (pokemon.name) {
            let pokemonOtherForm = null
            let findedPokemon = null
            if (pokemon.otherFormes) {
                pokemonOtherForm = allPokemons[pokemon.otherFormes[0].replace(/\s/g, '').replace(/-/g, '').replace(/%/g, '').replace('.', '').replace("'", '').toLowerCase()];
            }
            if (pokemonOtherForm && pokemonOtherForm.requiredItem && pokemonOtherForm.requiredItem == pokemon.item.name) {
                findedPokemon = pokemonPointsData.find(function (item) {
                    return item.name === pokemon.otherFormes[0] && item.num === pokemon.num;
                });
            }
            else if (pokemon.item.itemUser && pokemon.item.itemUser == pokemon.name) {
                if (pokemon.item.megaStone) {
                    findedPokemon = pokemonPointsData.find(function (item) {
                        return item.name === pokemon.item.megaStone && item.num === pokemon.num;
                    });
                } else {
                    findedPokemon = pokemonPointsData.find(function (item) {
                        return item.name === pokemon.item.itemUser[0] && item.num === pokemon.num;
                    });
                }
            }
            else {
                findedPokemon = pokemonPointsData.find(function (item) {
                    return item.name === pokemon.name && item.num === pokemon.num;
                });
            }
            if (pokemon.ability.name == pokemon.abilities.H && findedPokemon.pointsHa) {
                teamPointsValue += findedPokemon.pointsHa
            }
            else {
                teamPointsValue += findedPokemon.points
            }



            if (pokemon.moves) {
                pokemon.moves.forEach(function (move) {
                    if (move.name) {
                        if (movesForPoints.includes(move.name)) {
                            teamPointsValue += 1;
                        }
                    }
                })
            }
        }
    }
    return teamPointsValue;
}


function updateVisualTeam(pokemon, num = null, object = null) {
    object = document.querySelectorAll(".pokemon-pick-btn")[num];
    let thisPokemonTab = document.querySelectorAll(".team-pokemon-tab")[num]

    var teamPointsValue = calculateTeamPointsValue(playerPokemons);

    console.log(object, "AGAGAGA")
    let sprite = object.querySelector('.pokemon-sprite')

    let spriteName
    if (pokemon.forme != null) {
        spriteName = pokemon.baseSpecies.toLowerCase().replace("-", "").replace(" ", "") + "-" + pokemon.forme.toLowerCase().replace("-", "");
    } else {
        spriteName = pokemon.name.toLowerCase().replace("-", "").replace(" ", "");
    }

    sprite.style = `background-image:url(https://play.pokemonshowdown.com/sprites/gen5/${spriteName}.png);background-repeat:no-repeat`;

    let boostedStat = allNatures[pokemon.nature].boosted;
    let reducedStat = allNatures[pokemon.nature].reduced;

    let container = object.querySelector('.pokemon-pick-evs'); // Контейнер, куда добавлять span
    container.innerHTML = ''; // Очищаем, чтобы не дублировать элементы

    let stats = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'];

    stats.forEach(stat => {
        let evValue = pokemon.evs[stat] || 0;
        if (evValue > 0) {
            let span = document.createElement('span');
            span.classList.add(stat); // Добавляем класс по названию стата
            let boostMark = boostedStat === stat ? '+' : reducedStat === stat ? '-' : '';
            span.textContent = `${evValue}${boostMark}`;
            container.appendChild(span); // Добавляем span в контейнер
        }
    });

    setTypesImg(pokemon, object, '.pokemon-pick-types');

    let item = object.querySelector('.pokemon-info-item')
    if (pokemon.item.name) {

        let firstCord = -(pokemon.item.spritenum % 16 * 24)
        let secondCord = -(Math.floor(pokemon.item.spritenum / 16) * 24)

        item.title = pokemon.item.name;
        item.style = "background:transparent url(https://play.pokemonshowdown.com/sprites/itemicons-sheet.png?v1) no-repeat scroll " + firstCord + 'px ' + secondCord + 'px';
    }
    else {
        item.title = '';
        item.style = "background:transparent url(https://play.pokemonshowdown.com/sprites/itemicons-sheet.png?v1) no-repeat scroll " + 0 + 'px ' + 0 + 'px';
    }

    let objectLabel = object.querySelector('label')
    let pokemonName = objectLabel;
    pokemonName.textContent = pokemon.name;
    if (pokemon.baseSpecies) {
        pokemonName.textContent = pokemon.baseSpecies
    }
    object.onclick = function () {
        openPokemonTab(num, this)
    }
}
