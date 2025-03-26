
function calculateTeamPointsValue(team, pokemon = null) {
  if (pokemon) {
    let pokemonOtherForm = null;
    let findedPokemon = null;
    
    // Find the Pokemon in the points data
    for (const p of pokemonPointsData) {
      if (p.name === pokemon.name) {
        findedPokemon = p;
        break;
      }
    }
    
    if (!findedPokemon) {
      console.error('Pokemon not found in points data');
      return 0;
    }
    
    return findedPokemon.points;
  }
  
  if (!team) return 0;
  
  let totalPoints = 0;
  for (const p of team) {
    if (!p) continue;
    totalPoints += calculateTeamPointsValue(null, p);
  }
  
  return totalPoints;
}

function teamTypesDefenseUpdate(playerPokemons) {
  const typeDefenses = {
    'Normal': 0, 'Fire': 0, 'Water': 0, 'Electric': 0, 'Grass': 0,
    'Ice': 0, 'Fighting': 0, 'Poison': 0, 'Ground': 0, 'Flying': 0,
    'Psychic': 0, 'Bug': 0, 'Rock': 0, 'Ghost': 0, 'Dragon': 0,
    'Dark': 0, 'Steel': 0, 'Fairy': 0
  };

  for (const pokemon of playerPokemons) {
    if (!pokemon) continue;
    
    for (const type of pokemon.types) {
      // Add type defense values based on Pokemon's type
      Object.keys(typeDefenses).forEach(defenseType => {
        typeDefenses[defenseType] += getTypeEffectiveness(defenseType, type);
      });
    }
  }

  // Update UI with defense values
  Object.entries(typeDefenses).forEach(([type, value]) => {
    updateStatWeak(type.toLowerCase(), value);
  });
}

function getTypeEffectiveness(attackType, defenseType) {
  // Type effectiveness chart implementation
  const typeChart = {
    'Normal': { 'Ghost': 0, 'Rock': 0.5, 'Steel': 0.5 },
    'Fire': { 'Fire': 0.5, 'Water': 0.5, 'Rock': 0.5, 'Dragon': 0.5, 'Grass': 2, 'Ice': 2, 'Bug': 2, 'Steel': 2 },
    // Add all type effectiveness relationships
  };

  return typeChart[attackType]?.[defenseType] || 1;
}

export function updateStatWeak(id, value) {
  const element = document.getElementById(id);
  if (!element) return;
  
  const color = getGradientColor(value);
  element.style.backgroundColor = color;
}

export function getGradientColor(value) {
  // Convert value to a color on a gradient scale
  const r = value < 0 ? 255 : Math.round(255 * (1 - value));
  const g = value > 0 ? 255 : Math.round(255 * (1 + value));
  const b = 0;
  return `rgb(${r}, ${g}, ${b})`;
} 