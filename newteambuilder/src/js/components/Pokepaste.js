import { movesParam, itemsParam, abilitiesParam } from './PokemonUtils.js';
import { checkToSpace } from './Utils.js';
import { pokemonsParam, pokemonStatsLoad } from './PokemonUtils.js';

export { returnPokePaste, returnCurrentPokemonPokepaste, submitPokePaste, submitPokemonPaste }


function returnPokePaste(team) {
    let pokePaste = ''
    team.forEach(function (pokemon) {
        if (pokemon.name) {
            pokePaste += pokemon.name
            if (pokemon.item.name) {
                pokePaste += " @ " + pokemon.item.name
            }
            pokePaste += '  \n'
            pokePaste += "Ability: " + pokemon.ability.name + '  \n'
            pokePaste += "Tera Type: " + pokemon.types[0] + '  \n';

            pokePaste += "EVs: ";

            var evsNames = ['HP', 'Atk', 'Def', 'SpA', 'SpD', 'Spe'];
            var i = 0;
            var lastNonZeroIndex = -1;

            Object.keys(pokemon.evs).forEach(function (ev, index, array) {
                if (pokemon.evs[ev] != 0) {
                    pokePaste += pokemon.evs[ev] + ' ' + evsNames[i] + ' / ';
                    lastNonZeroIndex = i;
                }
                i++;
            });

            if (lastNonZeroIndex != -1) {
                pokePaste = pokePaste.slice(0, -3);
            }


            pokePaste += '  \n'
            pokePaste += pokemon.nature + " Nature  \n"

            pokemon.moves.forEach(function (move) {
                if (move.name) {
                    pokePaste += '- ' + move.name + '  \n'
                }
            })


            pokePaste += '\n'
        }

    })
    document.getElementById("playerteam-input-text").value = pokePaste
}

function returnCurrentPokemonPokepaste(pokemon) {
    let pokePaste = ''
    if (pokemon.name) {
        pokePaste += pokemon.name
        if (pokemon.item.name) {
            pokePaste += " @ " + pokemon.item.name
        }
        pokePaste += '  \n'
        pokePaste += "Ability: " + pokemon.ability.name + '  \n'
        pokePaste += "Tera Type: " + pokemon.types[0] + '  \n';

        pokePaste += "EVs: ";

        var evsNames = ['HP', 'Atk', 'Def', 'SpA', 'SpD', 'Spe'];
        var i = 0;
        var lastNonZeroIndex = -1;

        Object.keys(pokemon.evs).forEach(function (ev, index, array) {
            if (pokemon.evs[ev] != 0) {
                pokePaste += pokemon.evs[ev] + ' ' + evsNames[i] + ' / ';
                lastNonZeroIndex = i;
            }
            i++;
        });

        if (lastNonZeroIndex != -1) {
            pokePaste = pokePaste.slice(0, -3);
        }


        pokePaste += '  \n'
        pokePaste += pokemon.nature + " Nature  \n"

        pokemon.moves.forEach(function (move) {
            if (move.name) {
                pokePaste += '- ' + move.name + '  \n'
            }
        })


        pokePaste += '\n'
    }

    document.getElementById("current-pokemon-pokepaste-input").value = pokePaste
}


function submitPokemonPaste(pokemon, inputText) {
    let lines = inputText.split('\n');
    let a = 0;

    if (pokemon && lines[0] != '') {
        pokemon.moves = [{}, {}, {}, {}];
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
        pokemon.item = {}
        pokemon.ability = {}
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
                for (var b = 0; b < words.length; b++) {
                    if (words[b].includes('@')) {

                        pokemon.item.name = words[b + 1] + ' ' + words[b + 2].replace(/\s/g, '') + ' ' + words[b + 3].replace(/\s/g, '');
                        pokemon.item.name = checkToSpace(pokemon.item.name);
                    }
                }
            }

            if (line.includes('Nature')) {
                pokemon.nature = words[0];
            }

            if (line.includes('Ability: ')) {
                pokemon.ability.name = words[1];
                pokemon.ability.name += ' ' + words[2].replace(/\s/g, '');
                pokemon.ability.name += ' ' + words[3].replace(/\s/g, '');
                pokemon.ability.name = checkToSpace(pokemon.ability.name);
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
                pokemon.moves[a].name = words[1];
                pokemon.moves[a].name += ' ' + words[2].replace(/\s/g, '');
                pokemon.moves[a].name += ' ' + words[3].replace(/\s/g, '');
                pokemon.moves[a].name = checkToSpace(pokemon.moves[a].name);
                a++;
                if (a == 4) {
                    a = 0;
                }
            }
        }
    }
}

function submitPokePaste(team, inputText) {
    let pastes = inputText.split(/\n\s*\n/);
    let j = 0;
    for (let i = 0; i < pastes.length; i++) {
        submitPokemonPaste(team[j], pastes[i])
        j++;
    }

    pokemonsParam(team)
    pokemonStatsLoad(team);
    movesParam(team);
    itemsParam(team);
    abilitiesParam(team);
}