import { playerPokemons } from "../main.js";

import { allPokemons, allItems, allMoves, allAbilities, allNatures } from "../teambuilderBase.js";

export { pokemonsParam, movesParam, itemsParam, abilitiesParam, pokemonStatsLoad, pokemonToBaseValues, pokemonLoad }

function pokemonsParam(team) {
    team.forEach(function (pokemon) {
        if (pokemon.name) {
            var pokebase = allPokemons[pokemon.name.replace(/\s/g, '').replace(/-/g, '').replace(/'/, '').toLowerCase()];
            for (var key in pokebase) {
                if (pokebase.hasOwnProperty(key)) {
                    pokemon[key] = pokebase[key];
                }
            }
        }
    });
}

function movesParam(team) {
    team.forEach(function (pokemon) {
        if (pokemon.moves) {
            pokemon.moves.forEach(function (move) {
                console.log(move)
                var movebase = allMoves[move.name.replace(/\s/g, '').replace(/-/g, '').replace(/'/, '').toLowerCase()];
                for (var key in movebase) {
                    if (movebase.hasOwnProperty(key)) {
                        move[key] = movebase[key];
                    }
                }
                move.pp += ((move.pp / 5) * 3)
                move.currentPP = move.pp
            });
        }
    });
}

function itemsParam(team) {
    team.forEach(function (pokemon) {
        if (pokemon.item) {
            var itembase = allItems[pokemon.item.name.replace(/\s/g, '').replace(/-/g, '').replace(/'/, '').toLowerCase()];
            for (var key in itembase) {
                if (itembase.hasOwnProperty(key)) {
                    pokemon.item[key] = itembase[key];
                }
            }
        }
    });
}

function abilitiesParam(team) {
    team.forEach(function (pokemon) {
        if (pokemon.ability) {
            var abilitybase = allAbilities[pokemon.ability.name.replace(/\s/g, '').replace(/-/g, '').replace(/'/, '').toLowerCase()];
            for (var key in abilitybase) {
                if (abilitybase.hasOwnProperty(key)) {
                    pokemon.ability[key] = abilitybase[key];
                }
            }
        }
    });
}


function pokemonStatsLoad(team) {
    var level = 100;
    team.forEach(function (pokemon) {
        if (!pokemon.name) {
            return
        }
        var baseStats = pokemon.baseStats
        var ivs = pokemon.ivs

        if (!pokemon.stats) {
            pokemon.stats = {}
        }

        pokemon.stats.hp = ((2 * baseStats.hp + ivs.hp) / 100 * level) + 10 + level;



        pokemon.stats.atk = ((2 * baseStats.atk) / 100 * level) + 5 + ivs.atk;
        pokemon.stats.def = ((2 * baseStats.def) / 100 * level) + 5 + ivs.def;
        pokemon.stats.spa = ((2 * baseStats.spa) / 100 * level) + 5 + ivs.spa;
        pokemon.stats.spd = ((2 * baseStats.spd) / 100 * level) + 5 + ivs.spd;
        pokemon.stats.spe = ((2 * baseStats.spe) / 100 * level) + 5 + ivs.spe;


        if (!pokemon.evs) {
            pokemon.evs = {
                hp: 0,
                atk: 0,
                def: 0,
                spa: 0,
                spd: 0,
                spe: 0
            }
            var keys = Object.keys(pokemon.evs);

            var randomIndex1 = Math.floor(Math.random() * keys.length);
            var randomIndex2;
            do {
                randomIndex2 = Math.floor(Math.random() * keys.length);
            } while (randomIndex1 === randomIndex2);

            var randomIndex3;
            do {
                randomIndex3 = Math.floor(Math.random() * keys.length);
            } while (randomIndex1 === randomIndex3 || randomIndex2 === randomIndex3);

            pokemon.evs[keys[randomIndex1]] = 252;
            pokemon.evs[keys[randomIndex2]] = 252;
            pokemon.evs[keys[randomIndex3]] = 4;
        }

        pokemon.stats.hp += pokemon.evs.hp / 4;
        pokemon.stats.atk += pokemon.evs.atk / 4;
        pokemon.stats.def += pokemon.evs.def / 4;
        pokemon.stats.spa += pokemon.evs.spa / 4;
        pokemon.stats.spd += pokemon.evs.spd / 4;
        pokemon.stats.spe += pokemon.evs.spe / 4;

        if (!pokemon.nature) {
            var natureKeys = Object.keys(allNatures);

            var randomKeyIndex = Math.floor(Math.random() * natureKeys.length);
            var randomNatureKey = natureKeys[randomKeyIndex];

            pokemon.nature = randomNatureKey;
        }
        var nature = pokemon.nature;

        if (nature && allNatures[nature]) {
            var boostedStat = allNatures[nature].boosted;
            var reducedStat = allNatures[nature].reduced;

            if (boostedStat) {
                pokemon.stats[boostedStat] *= 1.1;
            }
            if (reducedStat) {
                pokemon.stats[reducedStat] *= 0.9;
            }
        }


        pokemon.stats.hp = Math.floor(pokemon.stats.hp);
        pokemon.stats.atk = Math.floor(pokemon.stats.atk);
        pokemon.stats.def = Math.floor(pokemon.stats.def);
        pokemon.stats.spa = Math.floor(pokemon.stats.spa);
        pokemon.stats.spd = Math.floor(pokemon.stats.spd);
        pokemon.stats.spe = Math.floor(pokemon.stats.spe);

        pokemon.hp = pokemon.stats.hp;

        pokemon.status = null;
    })

}

function pokemonToBaseValues(pokemon) {
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
    pokemon.nature = 'Bashful';
}


function pokemonLoad(pokemonNum, newPokemon, object) {
    let num = pokemonNum
    let requiredItem = false
    if (newPokemon.requiredItem) {
        requiredItem = newPokemon.requiredItem
        newPokemon = allPokemons[newPokemon.baseSpecies.replace(/\s/g, '').replace(/-/g, '').replace(/%/g, '').replace('.', '').replace("'", '').toLowerCase()]
    }
    playerPokemons[num] = newPokemon
    pokemonToBaseValues(playerPokemons[num])
    playerPokemons[num].name = newPokemon.name
    playerPokemons[num].ability.name = newPokemon.abilities[0]
    if (requiredItem) {
        playerPokemons[num].item = allItems[requiredItem.replace(/\s/g, '').replace(/-/g, '').replace(/%/g, '').replace('.', '').replace("'", '').toLowerCase()]
    }
    abilitiesParam(playerPokemons)

    pokemonStatsLoad(playerPokemons)
}

