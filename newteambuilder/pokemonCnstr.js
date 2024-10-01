class Pokemon {
    constructor(name, abilities, ability, baseStats, boosts, color, eggGroups, evos, evs, genderRatio, heightm, hp, item, ivs, level, moves, nature, num, stats, status, tier, types, weightkg) {
        this.name = name;
        this.abilities = abilities;
        this.ability = ability;
        this.baseStats = baseStats;
        this.boosts = boosts;
        this.color = color;
        this.eggGroups = eggGroups;
        this.evos = evos;
        this.evs = evs;
        this.genderRatio = genderRatio;
        this.heightm = heightm;
        this.hp = hp;
        this.item = item;
        this.ivs = ivs;
        this.level = level;
        this.moves = moves;
        this.nature = nature;
        this.num = num;
        this.stats = stats;
        this.status = status;
        this.tier = tier;
        this.types = types;
        this.weightkg = weightkg;
    }

    getName() {
        return this.name;
    }

    getAbilities() {
        return this.abilities;
    }

    getAbility() {
        return this.ability;
    }

    getBaseStats() {
        return this.baseStats;
    }

    getBoosts() {
        return this.boosts;
    }

    getColor() {
        return this.color;
    }

    getEggGroups() {
        return this.eggGroups;
    }

    getEvos() {
        return this.evos;
    }

    getEvs() {
        return this.evs;
    }

    getGenderRatio() {
        return this.genderRatio;
    }

    getHeightm() {
        return this.heightm;
    }

    getHp() {
        return this.hp;
    }

    getItem() {
        return this.item;
    }

    getIvs() {
        return this.ivs;
    }

    getLevel() {
        return this.level;
    }

    getMoves() {
        return this.moves;
    }

    getNature() {
        return this.nature;
    }

    getNum() {
        return this.num;
    }

    getStats() {
        return this.stats;
    }

    getStatus() {
        return this.status;
    }

    getTier() {
        return this.tier;
    }

    getTypes() {
        return this.types;
    }

    getWeightkg() {
        return this.weightkg;
    }

    
}

const playerPokemons = [
    { name: "Mewtwo", abilities: { 0: 'Overgrow', H: 'Chlorophyll' }, ability: { name: 'Overgrow', onModifyAtkPriority: 5, onModifySpAPriority: 5, flags: {}, rating: 2 }, baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, color: "Green", eggGroups: ['Monster', 'Grass'], evos: ['Ivysaur'], evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, genderRatio: { M: 0.875, F: 0.125 }, heightm: 0.7, hp: 231, item: {}, ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }, level: 100, moves: [{}, {}, {}, {}], nature: "Bashful", num: 150, stats: { hp: 231, atk: 134, def: 134, spa: 166, spd: 166, spe: 134 }, status: null, tier: "LC", types: ['Grass', 'Poison'], weightkg: 6.9 },
    { name: "Arceus", abilities: { 0: 'Overgrow', H: 'Chlorophyll' }, ability: { name: 'Overgrow', onModifyAtkPriority: 5, onModifySpAPriority: 5, flags: {}, rating: 2 }, baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, color: "Green", eggGroups: ['Monster', 'Grass'], evos: ['Ivysaur'], evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, genderRatio: { M: 0.875, F: 0.125 }, heightm: 0.7, hp: 231, item: {}, ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }, level: 100, moves: [{}, {}, {}, {}], nature: "Bashful", num: 493 , stats: { hp: 231, atk: 134, def: 134, spa: 166, spd: 166, spe: 134 }, status: null, tier: "LC", types: ['Grass', 'Poison'], weightkg: 6.9 },
    { name: "Beedrill", abilities: { 0: 'Overgrow', H: 'Chlorophyll' }, ability: { name: 'Overgrow', onModifyAtkPriority: 5, onModifySpAPriority: 5, flags: {}, rating: 2 }, baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, color: "Green", eggGroups: ['Monster', 'Grass'], evos: ['Ivysaur'], evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, genderRatio: { M: 0.875, F: 0.125 }, heightm: 0.7, hp: 231, item: {}, ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }, level: 100, moves: [{}, {}, {}, {}], nature: "Bashful", num: 15, stats: { hp: 231, atk: 134, def: 134, spa: 166, spd: 166, spe: 134 }, status: null, tier: "LC", types: ['Grass', 'Poison'], weightkg: 6.9 },
    { name: "Bulbasaur", abilities: { 0: 'Overgrow', H: 'Chlorophyll' }, ability: { name: 'Overgrow', onModifyAtkPriority: 5, onModifySpAPriority: 5, flags: {}, rating: 2 }, baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, color: "Green", eggGroups: ['Monster', 'Grass'], evos: ['Ivysaur'], evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, genderRatio: { M: 0.875, F: 0.125 }, heightm: 0.7, hp: 231, item: {}, ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }, level: 100, moves: [{}, {}, {}, {}], nature: "Bashful", num: 1, stats: { hp: 231, atk: 134, def: 134, spa: 166, spd: 166, spe: 134 }, status: null, tier: "LC", types: ['Grass', 'Poison'], weightkg: 6.9 },
    { name: "Bulbasaur", abilities: { 0: 'Overgrow', H: 'Chlorophyll' }, ability: { name: 'Overgrow', onModifyAtkPriority: 5, onModifySpAPriority: 5, flags: {}, rating: 2 }, baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, color: "Green", eggGroups: ['Monster', 'Grass'], evos: ['Ivysaur'], evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, genderRatio: { M: 0.875, F: 0.125 }, heightm: 0.7, hp: 231, item: {}, ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }, level: 100, moves: [{}, {}, {}, {}], nature: "Bashful", num: 1, stats: { hp: 231, atk: 134, def: 134, spa: 166, spd: 166, spe: 134 }, status: null, tier: "LC", types: ['Grass', 'Poison'], weightkg: 6.9 },
    { name: "Mewtwo", abilities: { 0: 'Overgrow', H: 'Chlorophyll' }, ability: { name: 'Overgrow', onModifyAtkPriority: 5, onModifySpAPriority: 5, flags: {}, rating: 2 }, baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, color: "Green", eggGroups: ['Monster', 'Grass'], evos: ['Ivysaur'], evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, genderRatio: { M: 0.875, F: 0.125 }, heightm: 0.7, hp: 231, item: {}, ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }, level: 100, moves: [{}, {}, {}, {}], nature: "Bashful", num: 150, stats: { hp: 231, atk: 134, def: 134, spa: 166, spd: 166, spe: 134 }, status: null, tier: "LC", types: ['Grass', 'Poison'], weightkg: 6.9 }
];

const pokemons = playerPokemons.map(pokemonData => {
    return new Pokemon(
        pokemonData.name,
        pokemonData.abilities,
        pokemonData.ability,
        pokemonData.baseStats,
        pokemonData.boosts,
        pokemonData.color,
        pokemonData.eggGroups,
        pokemonData.evos,
        pokemonData.evs,
        pokemonData.genderRatio,
        pokemonData.heightm,
        pokemonData.hp,
        pokemonData.item,
        pokemonData.ivs,
        pokemonData.level,
        pokemonData.moves,
        pokemonData.nature,
        pokemonData.num,
        pokemonData.stats,
        pokemonData.status,
        pokemonData.tier,
        pokemonData.types,
        pokemonData.weightkg
    );
});

pokemons.forEach(pokemon => {
    pokemon.sayHello();
});
