import { pokemonPointsData } from '../pokemonPointsBase.js';
import { pokemonStatsLoad } from './PokemonUtils.js';
import { allPokemons, allItems, allAbilities, allMoves } from '../teambuilderBase.js';
import { playerPokemons, teamCurPokemonChange } from '../main.js';
import { updateVisualTeam, movesForPoints } from './TeamUtils.js';
import { imgSource } from './Utils.js';

export {buildsOnLoad, loadBuilds, loadBuildResults, submitBuildPokemonPaste}

function submitBuildPokemonPaste(pokemon, inputText) {
    let lines = inputText.split('\n');
    let a = 0;

    if (pokemon && lines[0] != '') {
        pokemon.moves = [];
        pokemon.stats = {};
        pokemon.boosts = {
            atk: 0,
            def: 0,
            spa: 0,
            spd: 0,
            spe: 0,
        };
        pokemon.level = 100;
        pokemon.evs = {
            hp: 0,
            atk: 0,
            def: 0,
            spa: 0,
            spd: 0,
            spe: 0,
        }
        pokemon.ivs = {
            hp: 31,
            atk: 31,
            def: 31,
            spa: 31,
            spd: 31,
            spe: 31,
        }
        for (var c = 0; c < lines.length; c++) {
            var line = lines[c];
            var words = line.split(' ');
            if (c == 0) {
                pokemon.name = words[0];
                if (words[1] != '@' && !(words[1].includes('('))) {
                    pokemon.name += ' ' + words[1];
                }
            }

            if (line.includes('@')) {
                for (let b = 0; b < words.length; b++) {
                    if (words[b].includes('@')) {
                        let rawItems = words.slice(b + 1).join("").toLowerCase();
                        pokemon.items = rawItems.replace(/\|/g, "/").replace(/-/g, "");
                    }
                }
            }
            

            if (line.includes('Nature')) {
                pokemon.natures = words.slice(0, -1).join(" ").replace(/\|/g, "/");
            }

            if (line.includes('Ability: ')) {pokemon.abilities = words.slice(1).join(" ")
                .toLowerCase()
                .replace(/\|/g, "/")
                .replace(/-/g, "");
                a++;
                if (a == 4) {
                    a = 0;
                }
            }

            if (line.includes('EVs:')) {
                for (var b = 0; b < words.length; b++) {
                    if (words[b].includes('HP')) {
                        pokemon.evs.hp = parseInt(words[b - 1]);
                    }
                    else if (words[b].includes('Atk')) {
                        pokemon.evs.atk = parseInt(words[b - 1]);
                    }
                    else if (words[b].includes('Def')) {
                        pokemon.evs.def = parseInt(words[b - 1]);
                    }
                    else if (words[b].includes('SpA')) {
                        pokemon.evs.spa = parseInt(words[b - 1]);
                    }
                    else if (words[b].includes('SpD')) {
                        pokemon.evs.spd = parseInt(words[b - 1]);
                    }
                    else if (words[b].includes('Spe')) {
                        pokemon.evs.spe = parseInt(words[b - 1]);
                    }
                }
            }
            
            
            if (line.includes('-')) {
                let rawMove = words.slice(1).join(" ").toLowerCase();
                rawMove = rawMove.replace(/\|/g, "/").replace(/\s+/g, "").replace(/-/g, "");
                pokemon.moves[a] = rawMove;
                
                a++;
                if (a == 4) {
                    a = 0;
                }
            }
            
        }
    }
}

function insertPokemon(buildName, buildPokemon) {
    fetch("http://localhost:3000/add-pokemon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ buildName, buildPokemon })
    })
    .then(response => response.json())
    .then(data => console.log("Ответ сервера:", data))
    .catch(error => console.error("Ошибка:", error));
}


function buildsOnLoad() {
    let newBuildBtn = document.querySelector("#new-build-save-btn");
    newBuildBtn.onclick = function () {
        let buildPokemon = {};
        submitBuildPokemonPaste(buildPokemon, document.querySelector("#new-build-paste").value); 
        insertPokemon(document.querySelector("#new-build-name").value, buildPokemon);
    }
}


function loadBuilds(findedPokemon){
    if (findedPokemon.builds.length != 0) {
        let buildButton = document.createElement('button');
        buildButton.textContent = "Builds";
        buildButton.id = 'build-button'
        buildButton.onclick = function () {
            let builds = document.querySelector('.current-pokemon-builds')
            if (builds.classList.contains('current-pokemon-builds-show')) {
                builds.classList.remove('current-pokemon-builds-show')
            }
            else {
                builds.classList.add('current-pokemon-builds-show')
            }
        }
    }
}

function loadBuildResults(pokemon, num, object) {
    let builds = document.querySelector('.current-pokemon-builds');
    let newBuildBtn = builds.querySelector("#NewBuild");

    Array.from(builds.children).forEach(child => {
        if (child !== newBuildBtn) {
            child.remove();
        }
    });
    var findedPokemon = pokemonPointsData.find(function (item) {
        return item.name === pokemon.name && item.num === pokemon.num;
    });

    if (findedPokemon.builds.length == 0) {
        builds.classList.remove('current-pokemon-builds-show')
        return
    }
    findedPokemon.builds.forEach(function (build, l) {
        let button = document.createElement('button')
        button.classList.add('build-result')
    
        

        let buildDiv = document.createElement('div')

        buildDiv.classList.add('build-content')

        let leftContent = document.createElement('div')
        leftContent.classList.add('build-result-left')

        let div = document.createElement('div')
        for (let i = 0; i < build.moves.length; i++) {
            let p = document.createElement('img')
            p.classList.add('type-icon')
            p.src = imgSource + allMoves[build.moves[i].split('/')[0]].type.toLowerCase() + '_type.png';
            div.appendChild(p);
        }
        leftContent.appendChild(div)

        div = document.createElement('div')


        for (let i = 0; i < build.moves.length; i++) {
            let moveContent = document.createElement('span');
            moveContent.classList.add('build-item');
            let g = 0;
            build.moves[i].split('/').forEach(function (move) {
                let p = document.createElement('span');
                p.textContent = allMoves[move].name;

                if (build.moves[i].split('/').length > 1) {
                    p.classList.add('build-select-item')
                    if (g == 0) {
                        p.classList.add('choice-build-element');
                    }
                    p.onclick = function (event) {
                        event.stopPropagation();
                        let newItem = move;
                        build.moves[i].split('/').forEach(function (item2) {
                            if (item2 != move) {
                                newItem += "/" + item2;
                            }
                        });
                        build.moves[i] = newItem;
                        moveContent.querySelectorAll('span').forEach(function (span) {
                            if (span.classList.contains('choice-build-element')) {
                                span.classList.remove('choice-build-element');
                            }
                        });
                        let buildObject = document.querySelectorAll('.build-result')[l]
                        let moveTypesColor = buildObject.querySelectorAll('.build-result-left div .type-icon')
                        moveTypesColor[i].src = imgSource + allMoves[build.moves[i].split('/')[0]].type.toLowerCase() + '_type.png';
                        this.classList.add('choice-build-element');
                    };
                }
                moveContent.appendChild(p);
                if (build.moves[i].split('/')[g + 1]) {
                    let slash = document.createElement('span');
                    slash.textContent = '/';
                    slash.classList.add('slash');
                    moveContent.appendChild(slash);
                }
                g++;
            });
            div.appendChild(moveContent);
        }
        leftContent.appendChild(div)




        let rightContent = document.createElement('div')
        rightContent.classList.add('build-result-right')

        div = document.createElement('div')

        let keys = ['Ability', 'Item', 'Nature', 'EVs']

        keys.forEach(function (key) {
            let p = document.createElement('p')
            p.textContent = key + ':'
            div.appendChild(p);
        })
        rightContent.appendChild(div)

        div = document.createElement('div')

        let p = document.createElement('p')
        if (build.ability != '') {
            p.textContent = allAbilities[build.ability.split("/")[0]].name
            if (build.ability.includes('/')) {
                p.classList.add('choice-build-element')
            }

        } else {
            p.textContent = pokemon.abilities[0];
        }
        div.appendChild(p);

        function buildItemOnClickSet(object, item, buildElement, content, event) {
            event.stopPropagation();
            let newItem = item;
            build[buildElement].split('/').forEach(function (item2) {
                if (item2 != item) {
                    newItem += "/" + item2;
                }
            });
            build[buildElement] = newItem;
            content.querySelectorAll('span').forEach(function (span) {
                if (span.classList.contains('choice-build-element')) {
                    span.classList.remove('choice-build-element');
                }
            });
            object.classList.add('choice-build-element');
        }

        let itemContent = document.createElement('div')
        itemContent.classList.add('build-item')
        let c = 0
        build.item.split('/').forEach(function (item) {
            let itemSpan = document.createElement('span')
            itemSpan.classList.add('pokemon-info-item')
            itemSpan.setAttribute('data-title', allItems[item].name)
            if (build.item.split('/').length > 1) {
                itemSpan.classList.add('build-select-item')
                if (c == 0) {
                    itemSpan.classList.add('choice-build-element')
                }
                itemSpan.onclick = function (event) {
                    buildItemOnClickSet(this, item, 'item', itemContent, event);
                };
            }

            let firstCord = -(allItems[item].spritenum % 16 * 24)
            let secondCord = -(Math.floor(allItems[item].spritenum / 16) * 24)

            itemSpan.style = "width: 24px; height: 24px; background:transparent url(https://play.pokemonshowdown.com/sprites/itemicons-sheet.png?v1) no-repeat scroll " + firstCord + 'px ' + secondCord + 'px';

            itemContent.appendChild(itemSpan)
            if (build.item.split('/')[c + 1]) {
                let slash = document.createElement('span')
                slash.textContent = '/'
                slash.classList.add('slash')
                itemContent.appendChild(slash)
            }
            c++;
        })
        div.appendChild(itemContent);
        c = 0
        let natureContent = document.createElement('span')
        natureContent.classList.add('build-item')
        build.nature.split('/').forEach(function (nature) {
            let natureSpan = document.createElement('span')
            natureSpan.textContent = nature;

            if (build.nature.split('/').length > 1) {
                natureSpan.classList.add('build-select-item')
                if (c == 0) {
                    natureSpan.classList.add('choice-build-element')
                }
                natureSpan.onclick = function (event) {
                    buildItemOnClickSet(this, nature, 'nature', natureContent, event);
                };
            }

            natureContent.appendChild(natureSpan)

            if (build.nature.split('/')[c + 1]) {
                let slash = document.createElement('span')
                slash.textContent = '/'
                slash.classList.add('slash')
                natureContent.appendChild(slash)
            }
            c++;
        })
        div.appendChild(natureContent);



        p = document.createElement('p')
        var evsNames = ['HP', 'Atk', 'Def', 'SpA', 'SpD', 'Spe'];
        var i = 0;
        var lastNonZeroIndex = -1;

        Object.keys(build.evs).forEach(function (ev, index, array) {
            if (build.evs[ev] != 0) {
                p.textContent += build.evs[ev] + ' ' + evsNames[i] + ' / ';
                lastNonZeroIndex = i;
            }
            i++;
        });

        if (lastNonZeroIndex != -1) {
            p.textContent = p.textContent.slice(0, -3);
        }
        div.appendChild(p);

        rightContent.appendChild(div)


        buildDiv.appendChild(rightContent)
        buildDiv.appendChild(leftContent)


        let buildTop = document.createElement('div');
        buildTop.classList.add('build-top')
        let buildName = document.createElement('span')
        buildName.classList.add('build-name')
        buildName.textContent = build.type;
        button.onclick = function () {

            pokemon.evs = build.evs;
            pokemon.nature = build.nature.split("/")[0];
            build.moves.forEach(function (moveName, i) {
                pokemon.moves[i] = allMoves[moveName.split('/')[0]]
            })
            pokemon.item = allItems[build.item.split("/")[0]]
            if (build.ability != '') {
                pokemon.ability = allAbilities[build.ability.split("/")[0]]
            } else {
                pokemon.ability = allAbilities[pokemon.abilities[0].replace(/[\s()]/g, '').replace('-', '').toLowerCase()];
            }
            pokemonStatsLoad(playerPokemons)
            updateVisualTeam(playerPokemons[num], num, object)
            teamCurPokemonChange(pokemon, num, object)
        }

        let pointsValue = document.createElement('span')
        let addValues = checkToPointsAddValue(pokemon, build)
        pointsValue.textContent = addValues[0];

        if (addValues[1]) {
            pointsValue.classList.add('points-add-value')

            const tooltip = document.createElement('div');
            tooltip.classList.add('tooltip');
            tooltip.innerHTML = addValues[1];
            pointsValue.appendChild(tooltip);
        }


        let tierValue = document.createElement('span')
        tierValue.textContent = '';

        buildTop.appendChild(tierValue)

        buildTop.appendChild(buildName)

        buildTop.appendChild(pointsValue)

        button.appendChild(buildTop)
        button.appendChild(buildDiv)
        builds.prepend(button);


    })
}

function checkBuildToCurrent(pokemon, build){
    let buildItemName = allItems[build.item.split('/')[0]]?.name;
    let checkMoves = build.moves.every(name => pokemon.moves.includes(allMoves[name.split('/')[0]]));
    let checkItem = pokemon.item?.name && buildItemName && pokemon.item.name.includes(buildItemName);
    if (checkItem && checkMoves){
        return true;
    }
}

function checkToPointsAddValue(pokemon, build) {
    let titleText = ''
    let pointsAdd = 0
    let findedPokemon = pokemonPointsData.find(function (item) {
        return item.name === pokemon.name && item.num === pokemon.num;
    });
    if (pokemon.abilities.H && findedPokemon.pointsHa && findedPokemon.pointsHa != findedPokemon.points && build.ability == pokemon.abilities.H.replace(/\s/g, '').toLowerCase()) {
        pointsAdd += findedPokemon.pointsHa - findedPokemon.points;
        titleText += 'Ability: +' + (findedPokemon.pointsHa - findedPokemon.points) + '<br>';
    }
    build.moves.forEach(function (moves) {
        if (movesForPoints.map(move => move.toLowerCase()).includes(moves.split('/')[0])) {
            pointsAdd += 1;
            titleText += '<span>' + allMoves[moves.split('/')[0]].name + ': +1' + '</span>';
        }
    })

    if (allItems[build.item.split('/')[0]] && allItems[build.item.split('/')[0]].megaStone) {
        let megaFormName = allItems[build.item.split('/')[0]].megaStone
        let findedForm = pokemonPointsData.find(function (item) {
            return item.name === megaFormName && item.num === pokemon.num;
        });
        pointsAdd += findedForm.points - findedPokemon.points;

        let firstCord = -(allItems[build.item.split('/')[0]].spritenum % 16 * 24)
        let secondCord = -(Math.floor(allItems[build.item.split('/')[0]].spritenum / 16) * 24)

        let itemSpan = '<span class="pokemon-info-item" data-title="' + allItems[build.item.split('/')[0]].name + '" style="width: 24px; height: 24px; background: url(&quot;https://play.pokemonshowdown.com/sprites/itemicons-sheet.png?v1&quot;)' + firstCord + 'px ' + secondCord + 'px' + ' no-repeat scroll transparent;"></span>'


        titleText += '<span>' + 'Mega' + itemSpan + ': ' + '+' + (findedForm.points - findedPokemon.points) + '</span>';

    }

    if (pointsAdd > 0) {
        return ["+" + pointsAdd, titleText]
    }
    else if (pointsAdd < 0) {
        return [pointsAdd, titleText]
    }
    else {
        return ['']
    }
}