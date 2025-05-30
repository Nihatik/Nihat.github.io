import { pokemonPointsData } from "../pokemonPointsBase.js";

import { changeTeamToJson, calculateTeamPointsValue, playerPokemons } from "./script.js";

function savedTeamsUpdate() {
    document.querySelector('.teams').innerHTML = ''
    let h3 = document.createElement('h4')
    let teamsClear = document.createElement('button')
    teamsClear.id = 'clearteams'
    teamsClear.textContent = 'Clear all teams'

    let teamsContent = document.createElement("div")
    teamsContent.setAttribute("id", "teamsContent")

    teamsClear.onclick = function () {
        localStorage.setItem("savedTeams", '[]')
        savedTeamsUpdate()
    }
    document.querySelector('.teams').appendChild(teamsClear);
    document.querySelector('.teams').appendChild(teamsContent);
    let savedTeams = JSON.parse(localStorage.getItem("savedTeams"));
    if (savedTeams.length > 0) {
        savedTeams.forEach(function (dataTeam, index) {
            let teamResult = document.createElement('div')
            teamResult.classList.add('team-result')
            let newTeam = document.createElement('div');
            newTeam.classList.add('data-team');
            dataTeam.pokemonsTeam.forEach(function (pokemon) {
                let findedPokemon
                console.log(pokemon);
                if (pokemon.name) {
                    findedPokemon = pokemonPointsData.find(function (item) {
                        return item.name === pokemon.name && item.num === pokemon.num;
                    });
                }

                let div = document.createElement('div');
                div.classList.add('pokemon-icon');
                div.style.width = '40px';
                div.style.height = '30px';

                div.style.backgroundImage = 'url("https://play.pokemonshowdown.com/sprites/pokemonicons-sheet.png?v16")';
                div.style.backgroundRepeat = 'no-repeat';
                console.log(findedPokemon)
                if (findedPokemon.iconLoc) {
                    div.style.backgroundPosition = findedPokemon.iconLoc;
                } else {
                    var dex_number = +pokemon.num;
                    var first = dex_number % 12 * 40;
                    var second = Math.floor(dex_number / 12) * 30;
                    div.style.backgroundPosition = '-' + first.toString() + 'px' + ' -' + second.toString() + 'px';
                }

                div.style.backgroundColor = 'transparent';

                let item = document.createElement('div')
                console.log(pokemon.item);
                item.classList.add('pokemon-info-item')
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
                let container = document.createElement('div');
                container.appendChild(item);
                container.appendChild(div);
                newTeam.appendChild(container);

            });

            let h5 = document.createElement('h5')
            h5.textContent = calculateTeamPointsValue(dataTeam.pokemonsTeam)

            newTeam.appendChild(h5)


            newTeam.onclick = function () {
                changeTeamToJson(savedTeams[index].pokemonsTeam);
                document.getElementById("playerteam-input-text").value = null;
                $("#current-team-button").click();
                document.querySelectorAll(".new-pokemon-btn").forEach( function(btn){
                    btn.classList.remove("new-pokemon-btn");
                })
            };


            teamResult.appendChild(newTeam)

            let butt = document.createElement('button')
            butt.classList.add('team-delete-button')

            butt.onclick = function () {
                savedTeams.splice(index, 1);
                localStorage.setItem("savedTeams", JSON.stringify(savedTeams));
                savedTeamsUpdate();
            }

            teamResult.appendChild(butt)

            teamsContent.appendChild(teamResult);
        });
    }
    let newTeamSpan = document.createElement('span')
    newTeamSpan.id = 'new-team';

    let pointsInput = document.createElement('input')
    pointsInput.type = 'number';
    pointsInput.max = '30';
    pointsInput.min = '0';
    newTeamSpan.appendChild(pointsInput)

    let newTeamButton = document.createElement('button')
    newTeamSpan.appendChild(newTeamButton)
    newTeamButton.classList.add('hover-button')
    newTeamButton.textContent = 'Create random team';
    newTeamButton.onclick = function () {
        let buttons = document.querySelectorAll('.team button')

        if (pointsInput.value) {
            let sum = +pointsInput.value
            let teamForPoints = [];
            let teamForPointsSum = 0;
            let current = false;
            if (sum == 34) {
                teamForPoints = [6, 6, 6, 6, 5, 5]
            }
            else if (sum == 33) {
                teamForPoints = [6, 6, 6, 6, 5, 4]
            }
            else {
                while (!current) {
                    let randomNum = Math.floor(Math.random() * 7);
                    if (sum - randomNum >= 0) {
                        teamForPoints.push(randomNum);
                        teamForPointsSum += randomNum;
                        sum -= randomNum;
                    }
                    console.log(teamForPoints)
                    if (teamForPoints.length == 6) {
                        if (teamForPointsSum == +pointsInput.value) {
                            current = true;
                        }
                        else {
                            teamForPoints = [];
                            teamForPointsSum = 0;
                            sum = +pointsInput.value
                        }
                    }
                }
            }
            let fullTeam = []
            let mega = false;
            for (let i = 0; i < playerPokemons.length; i++) {
                let randomElement = null
                let j = 0;
                while (!randomElement) {
                    let randomIndex = Math.floor(Math.random() * pokemonPointsData.length);
                    if (pokemonPointsData[randomIndex].name.includes('-Mega')) {
                        if (!mega) {
                            mega = true;
                        }
                        else {
                            let noMega = false
                            while (!noMega) {
                                randomIndex = Math.floor(Math.random() * pokemonPointsData.length);
                                if (!(pokemonPointsData[randomIndex].name.includes('-Mega'))) {
                                    noMega = true;
                                }
                            }
                        }
                    }
                    if (!fullTeam.includes(pokemonPointsData[randomIndex].num) && pokemonPointsData[randomIndex].points >= 0 && pokemonPointsData[randomIndex].points <= Math.max(...teamForPoints)) {
                        if (teamForPoints.includes(pokemonPointsData[randomIndex].points)) {
                            let elementToRemove = pokemonPointsData[randomIndex].points;
                            let index = teamForPoints.indexOf(elementToRemove);
                            if (index !== -1) {
                                teamForPoints.splice(index, 1);
                            }
                            randomElement = allPokemons[pokemonPointsData[randomIndex].name.replace(/\s/g, '').replace(/-/g, '').replace(/%/g, '').replace('.', '').replace("'", '').toLowerCase()]
                            fullTeam.push(pokemonPointsData[randomIndex].num)
                            break
                        }
                    }
                    j++;
                    if (j > 3000) {
                        randomElement = allPokemons.bulbasaur;
                    }
                }
                pokemonLoad(i, randomElement, buttons[i])
                updateVisualTeam(playerPokemons[i], i, buttons[i])
            }
        } else {
            for (let i = 0; i < playerPokemons.length; i++) {
                let randomElement = null
                while (true) {
                    const randomIndex = Math.floor(Math.random() * pokemonPointsData.length);
                    if (pokemonPointsData[randomIndex].points >= 0 && pokemonPointsData[randomIndex].points <= 6) {
                        randomElement = allPokemons[pokemonPointsData[randomIndex].name.replace(/\s/g, '').replace(/-/g, '').replace(/%/g, '').replace('.', '').replace("'", '').toLowerCase()];
                        break
                    }
                }
                pokemonLoad(i, randomElement, buttons[i])
                updateVisualTeam(playerPokemons[i], i, buttons[i])
            }
        }
        buttons[0].click()
    }
    document.querySelector('#teamsContent').appendChild(newTeamSpan);
}

export { savedTeamsUpdate }