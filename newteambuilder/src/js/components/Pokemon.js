export class Pokemon {
  constructor(name, abilities, ability, baseStats, boosts, color, eggGroups, evos, evs, genderRatio, heightm, hp, item, ivs, level, moves, nature, num, stats, status, tier, types, weightkg) {
    this.name = name;
    this.abilities = abilities;
    this.ability = ability;
    this.baseStats = baseStats;
    this.boosts = boosts;
    this.color = color;
    this.eggGroups = eggGroups;
    this.evos = evos;
    this.evs = evs || {};
    this.genderRatio = genderRatio;
    this.heightm = heightm;
    this.hp = hp;
    this.item = item;
    this.ivs = ivs || {};
    this.level = level || 100;
    this.moves = moves || [];
    this.nature = nature;
    this.num = num;
    this.stats = stats || {};
    this.status = status;
    this.tier = tier;
    this.types = types || [];
    this.weightkg = weightkg;
  }

  // Getters
  getName() { return this.name; }
  getAbilities() { return this.abilities; }
  getAbility() { return this.ability; }
  getBaseStats() { return this.baseStats; }
  getBoosts() { return this.boosts; }
  getColor() { return this.color; }
  getEggGroups() { return this.eggGroups; }
  getEvos() { return this.evos; }
  getEvs() { return this.evs; }
  getGenderRatio() { return this.genderRatio; }
  getHeightm() { return this.heightm; }
  getHp() { return this.hp; }
  getItem() { return this.item; }
  getIvs() { return this.ivs; }
  getLevel() { return this.level; }
  getMoves() { return this.moves; }
  getNature() { return this.nature; }
  getNum() { return this.num; }
  getStats() { return this.stats; }
  getStatus() { return this.status; }
  getTier() { return this.tier; }
  getTypes() { return this.types; }
  getWeightkg() { return this.weightkg; }

  // Setters
  setName(name) { this.name = name; }
  setAbilities(abilities) { this.abilities = abilities; }
  setAbility(ability) { this.ability = ability; }
  setBaseStats(baseStats) { this.baseStats = baseStats; }
  setBoosts(boosts) { this.boosts = boosts; }
  setColor(color) { this.color = color; }
  setEggGroups(eggGroups) { this.eggGroups = eggGroups; }
  setEvos(evos) { this.evos = evos; }
  setEvs(evs) { this.evs = evs; }
  setGenderRatio(genderRatio) { this.genderRatio = genderRatio; }
  setHeightm(heightm) { this.heightm = heightm; }
  setHp(hp) { this.hp = hp; }
  setItem(item) { this.item = item; }
  setIvs(ivs) { this.ivs = ivs; }
  setLevel(level) { this.level = level; }
  setMoves(moves) { this.moves = moves; }
  setNature(nature) { this.nature = nature; }
  setNum(num) { this.num = num; }
  setStats(stats) { this.stats = stats; }
  setStatus(status) { this.status = status; }
  setTier(tier) { this.tier = tier; }
  setTypes(types) { this.types = types; }
  setWeightkg(weightkg) { this.weightkg = weightkg; }

  // Utility methods
  toJSON() {
    return {
      name: this.name,
      abilities: this.abilities,
      ability: this.ability,
      baseStats: this.baseStats,
      boosts: this.boosts,
      color: this.color,
      eggGroups: this.eggGroups,
      evos: this.evos,
      evs: this.evs,
      genderRatio: this.genderRatio,
      heightm: this.heightm,
      hp: this.hp,
      item: this.item,
      ivs: this.ivs,
      level: this.level,
      moves: this.moves,
      nature: this.nature,
      num: this.num,
      stats: this.stats,
      status: this.status,
      tier: this.tier,
      types: this.types,
      weightkg: this.weightkg
    };
  }

  static fromJSON(json) {
    return new Pokemon(
      json.name,
      json.abilities,
      json.ability,
      json.baseStats,
      json.boosts,
      json.color,
      json.eggGroups,
      json.evos,
      json.evs,
      json.genderRatio,
      json.heightm,
      json.hp,
      json.item,
      json.ivs,
      json.level,
      json.moves,
      json.nature,
      json.num,
      json.stats,
      json.status,
      json.tier,
      json.types,
      json.weightkg
    );
  }
} 