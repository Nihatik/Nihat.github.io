pokemonList = [
    {"name": "Bulbasaur", "types": ['Grass', 'Poison'], "tier": "LC", "description": "A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.", "num": 1, "stats": [45, 49, 49, 65, 65, 45], "abilities": ['Overgrow', 'Chlorophyll']},
    {"name": "Charmander", "types": ['Fire'], "tier": "LC", "description": "Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.", "num": 4, "stats": [39, 52, 43, 60, 50, 65], "abilities": ['Blaze', 'Solar Power']},
    {"name": "Squirtle", "types": ['Water'], "tier": "LC", "description": "After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth.", "num": 7, "stats": [44, 48, 65, 50, 64, 43], "abilities": ['Torrent', 'Rain Dish']},
    {"name": "Chikorita", "types": ['Grass'], "tier": "LC", "description": "It loves to bask in the sunlight. It uses the leaf on its head to seek out warm places.", "num": 152, "stats": [45, 49, 65, 49, 65, 45], "abilities": ['Overgrow', 'Leaf Guard']},
    {"name": "Cyndaquil", "types": ['Fire'], "tier": "LC", "description": "It has a timid nature. If it is startled, the flames on its back burn more vigorously.", "num": 155, "stats": [39, 52, 43, 60, 50, 65], "abilities": ['Blaze', 'Flash Fire']},
    {"name": "Totodile", "types": ['Water'], "tier": "LC", "description": "Its well-developed jaws are powerful and capable of crushing anything. Even its trainer must be careful.", "num": 158, "stats": [50, 65, 64, 44, 48, 43], "abilities": ['Torrent', 'Sheer Force']},
    {"name": "Treecko", "types": ['Grass'], "tier": "LC", "description": "It adeptly climbs tree branches and clings to them. It blinds prey with quick bursts of water.", "num": 252, "stats": [40, 45, 35, 65, 55, 70], "abilities": ['Overgrow', 'Unburden']},
    {"name": "Torchic", "types": ['Fire'], "tier": "LC", "description": "Torchic has a place inside its body where it keeps its flame. Give it a hug—it will be glowing with warmth. This Pokémon is covered all over by a fluffy coat of down.", "num": 255, "stats": [45, 60, 40, 70, 50, 45], "abilities": ['Blaze', 'Speed Boost']},
    {"name": "Mudkip", "types": ['Water'], "tier": "LC", "description": "The fin on Mudkip's head acts as highly sensitive radar. Using this fin to sense movements of water and air, this Pokémon can determine what is taking place around it without using its eyes.", "num": 258, "stats": [50, 70, 50, 50, 50, 40], "abilities": ['Torrent', 'Damp']},
]

pokemonMovesets = {
    "Bulbasaur": {
        "moves": [["Tackle", "Leech Seed"], ["Sleep Powder"], ["Giga Drain", "Sludge Bomb"], ["Synthesis",]],
        "ability": "Overgrow",
        "item": "Leftovers",
        "nature": "Modest",
        "evs": {"HP": 252, "SpA": 252, "Spe": 4},
        "ivs": {"HP": 31, "Atk": 31, "Def": 31, "SpA": 31, "SpD": 31, "Spe": 31}
    },
    "Charmander": {
        "moves": [["Dragon Breath"], ["Flamethrower", "Fire Blast"], ["Dragon Claw"], ["Substitute"]],
        "ability": "Blaze",
        "item": "Life Orb",
        "nature": "Jolly",
        "evs": {"Atk": 252, "Spe": 252, "HP": 4},
        "ivs": {"HP": 31, "Atk": 31, "Def": 31, "SpA": 31, "SpD": 31, "Spe": 31}
    },
    "Squirtle": {
        "moves": [["Water Gun"], ["Rapid Spin"], ["Water Pulse"], ["Rain Dance", "Hydro Pump"]],
        "ability": "Torrent",
        "item": "Eviolite",
        "nature": "Bold",
        "evs": {"HP": 252, "Def": 252, "SpD": 4},
        "ivs": {"HP": 31, "Atk": 31, "Def": 31, "SpA": 31, "SpD": 31, "Spe": 31}
    },
    "Chikorita": {
        "moves": [["Razor Leaf", "Poison Powder"], ["Synthesis", "Reflect", "Light Screen"], ["Toxic"], ["Aromatherapy"]],
        "ability": "Overgrow",
        "item": "Eviolite",
        "nature": "Calm",
        "evs": {"HP": 252, "Def": 252, "SpD": 4},
        "ivs": {"HP": 31, "Atk": 31, "Def": 31, "SpA": 31, "SpD": 31, "Spe": 31}
    },
    "Cyndaquil": {
        "moves": [["Ember", "Quick Attack"], ["Flame Wheel"], ["Flamethrower", ], ["Inferno", "Rollout"]],
        "ability": "Blaze",
        "item": "Choice Specs",
        "nature": "Timid",
        "evs": {"SpA": 252, "Spe": 252, "HP": 4},
        "ivs": {"HP": 31, "Atk": 31, "Def": 31, "SpA": 31, "SpD": 31, "Spe": 31}
    },
    "Totodile": {
        "moves": [["Water Gun"], ["Bite", "Scary Face"], ["Ice Fang", "Flail", "Crunch"], ["Aqua Tail"]],
        "ability": "Torrent",
        "item": "Life Orb",
        "nature": "Adamant",
        "evs": {"Atk": 252, "Def": 252, "Spe": 4},
        "ivs": {"HP": 31, "Atk": 31, "Def": 31, "SpA": 31, "SpD": 31, "Spe": 31}
    },
    "Treecko": {
        "moves": [["Pound", "Leer", "Absorb"], ["Pursuit"], ["Giga Drain"], ["Leaf Blade"]],
        "ability": "Overgrow",
        "item": "Focus Sash",
        "nature": "Timid",
        "evs": {"SpA": 252, "Spe": 252, "HP": 4},
        "ivs": {"HP": 31, "Atk": 31, "Def": 31, "SpA": 31, "SpD": 31, "Spe": 31}
    },
    "Torchic": {
        "moves": [["Growl", "Focus Energy"], ["Ember", "Sand Attack"], ["Fire Spin", "Double Kick"], ["Flamethrower"]],
        "ability": "Blaze",
        "item": "Leftovers",
        "nature": "Adamant",
        "evs": {"Atk": 252, "Spe": 252, "HP": 4}, 
        "ivs": {"HP": 31, "Atk": 31, "Def": 31, "SpA": 31, "SpD": 31, "Spe": 31}
    },
    "Mudkip": {
        "moves": [["Water Gun"], ["Mud-Slap"], ["Water Pulse", "Mud Sport"], ["Protect", "Hydro Pump", "Muddy Water"]],
        "ability": "Torrent",
        "item": "Assault Vest",
        "nature": "Adamant",
        "evs": {"Atk": 252, "Def": 252, "Spe": 4},
        "ivs": {"HP": 31, "Atk": 31, "Def": 31, "SpA": 31, "SpD": 31, "Spe": 31}
    },
}

pokemonEvos = {
    "Bulbasaur": [
        {"name": "Ivysaur", "num": 2},
        {"name": "Venusaur", "num": 3}
    ],
    "Charmander": [
        {"name": "Charmeleon", "num": 5},
        {"name": "Charizard", "num": 6}
    ],
    "Squirtle": [
        {"name": "Wartortle", "num": 8},
        {"name": "Blastoise", "num": 9}
    ],
    "Chikorita": [
        {"name": "Bayleef", "num": 153},
        {"name": "Meganium", "num": 154}
    ],
    "Cyndaquil": [
        {"name": "Quilava", "num": 156},
        {"name": "Typhlosion", "num": 157}
    ],
    "Totodile": [
        {"name": "Croconaw", "num": 159},
        {"name": "Feraligatr", "num": 160}
    ],
    "Treecko": [
        {"name": "Grovyle", "num": 253},
        {"name": "Sceptile", "num": 254}
    ],
    "Torchic": [
        {"name": "Combusken", "num": 256},
        {"name": "Blaziken", "num": 257}
    ],
    "Mudkip": [
        {"name": "Marshtomp", "num": 259},
        {"name": "Swampert", "num": 260}
    ],
    "Turtwig": [
        {"name": "Grotle", "num": 388},
        {"name": "Torterra", "num": 389}
    ],
    "Chimchar": [
        {"name": "Monferno", "num": 391},
        {"name": "Infernape", "num": 392}
    ],
    "Piplup": [
        {"name": "Prinplup", "num": 394},
        {"name": "Empoleon", "num": 395}
    ],
    "Snivy": [
        {"name": "Servine", "num": 496},
        {"name": "Serperior", "num": 497}
    ],
    "Tepig": [
        {"name": "Pignite", "num": 499},
        {"name": "Emboar", "num": 500}
    ],
    "Oshawott": [
        {"name": "Dewott", "num": 502},
        {"name": "Samurott", "num": 503}
    ],
    "Chespin": [
        {"name": "Quilladin", "num": 651},
        {"name": "Chesnaught", "num": 652}
    ],
    "Fennekin": [
        {"name": "Braixen", "num": 654},
        {"name": "Delphox", "num": 655}
    ],
    "Froakie": [
        {"name": "Frogadier", "num": 657},
        {"name": "Greninja", "num": 658}
    ],
    "Rowlet": [
        {"name": "Dartrix", "num": 723},
        {"name": "Decidueye", "num": 724}
    ],
    "Litten": [
        {"name": "Torracat", "num": 726},
        {"name": "Incineroar", "num": 727}
    ],
    "Popplio": [
        {"name": "Brionne", "num": 729},
        {"name": "Primarina", "num": 730}
    ],
    "Grookey": [
        {"name": "Thwackey", "num": 811},
        {"name": "Rillaboom", "num": 812}
    ],
    "Scorbunny": [
        {"name": "Raboot", "num": 814},
        {"name": "Cinderace", "num": 815}
    ],
    "Sobble": [
        {"name": "Drizzile", "num": 817},
        {"name": "Inteleon", "num": 818}
    ]
}

typesBase = "https://play.pokemonshowdown.com/sprites/types/"

def generate_pokemon_page(pokemon):
    iconUrl = "https://play.pokemonshowdown.com/sprites/pokemonicons-sheet.png?v16"
    def iconLocation(number):
        return "-" + str(number % 12 * 40) + "px -" + str(number // 12 * 30) + "px"
    
    li_elements = ""
    for idx, poke in enumerate(pokemonList):
        li_elements += f'''
            <li>
                <a href="{poke['name'].lower()}.html">
                <button>
                    <div class="pokemon-icon">
                        <span style="display:inline-block; width:40px; height:30px; background: transparent url({iconUrl}) no-repeat scroll {iconLocation(poke["num"])};">
                        </span>
                    </div>
                    <p class="pokemon-name">{poke['name']}</p>
                    <div class="pokemon-types">
                        <img id="type-img" src="{typesBase + poke['types'][0] + '.png'}">
                        {'<img id="type-img" src="' + typesBase + poke['types'][1] + '.png">' if len(poke['types']) > 1 else ''}
                    </div>
                    <p class="pokemon-tier">{poke['tier']}</p>
                </button></a>
            </li>
        '''
    
    html = f'''
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>{pokemon['name']}</title>
            <link rel="stylesheet" href="../styles.css">
            <link rel="stylesheet" href="pokedex.css">
        </head>
        <body>
            <header>
                <div class="All_header_menu">
                    <div class="Logo">
                        <img src="../img/pokeball.png">
                    </div>
                    <ul id="navbar">
                        <li><a href="../index.html">Главная</a></li>
                        <li>
                            <a>Покедекс</a>
                            <ul>
                                <li><a href="bulbasaur.html">Покемоны</a></li>
                                <li><a href="moves.html">Атаки</a></li>
                                <li><a href="abilities.html">Способности</a></li>
                                <li><a href="types.html">Типы</a></li>
                            </ul> 
                        </li>
                        <li><a href="../help.html">Поддержка</a></li>
                        <li><a href="../register.html">Войти/Регистрация</a></li>
                    </ul>
                </div>
            </header>
            <div class="main">
                <div class="left-menu">
                    <ul>
                    <div class="search">
                        <input type="search">
                    </div>
                        {li_elements}
                    </ul>
                </div>
                <div class="pokemon-info">
                    <h1 class="block-inline">{pokemon['name']}</h1>
                    <div class="pokemon-info-top">
                        <div class="pokemon-image-container">
                            <div id="pokemon-image" style="background-image: url(https://www.smogon.com/dex/media/sprites/xy/{pokemon["name"].lower()}.gif)" alt="{pokemon['name']}">
                            </div>
                        </div>
                        <div class="pokemon-evolutions">
                            <div>
                                <div class="pokemon-icon">
                                    <span style="display:inline-block; width:40px; height:30px; background: transparent url({iconUrl}) no-repeat scroll {iconLocation(pokemon["num"])};">
                                    </span>
                                </div>
                                <h4>{pokemon['name']}</h4>
                            </div>
                            <div>
                                <div class="pokemon-icon" style="margin-left: 50px;">
                                    <span style="display:inline-block; width:40px; height:30px; background: transparent url({iconUrl}) no-repeat scroll {iconLocation(pokemonEvos[pokemon['name']][0]["num"])};">
                                    </span>
                                </div>
                                <p>{pokemonEvos[pokemon['name']][0]["name"]}</p>
                            </div>
                            <div>
                                <div class="pokemon-icon" style="margin-left: 100px;">
                                    <span style="display:inline-block; width:40px; height:30px; background: transparent url({iconUrl}) no-repeat scroll {iconLocation(pokemonEvos[pokemon['name']][1]["num"])};">
                                    </span>
                                </div>
                                <p>{pokemonEvos[pokemon['name']][1]["name"]}</p>
                            </div>
                        </div>
                        <div class="pokemon-stats">
                            <div>
                                <p class="stat-name">HP:</p>
                                <p class="stat-value">{pokemon["stats"][0]}</p>
                                <div class="stat-bar">
                                    <div class="progress" style="width: {(pokemon["stats"][0] / 250) * 100}%" data-color="{ 'red' if pokemon['stats'][0] <= 50 else 'green' if pokemon['stats'][0] >= 250 else 'orange' }"></div>
                                </div>
                            </div>
                            <div>
                                <p class="stat-name">Attack:</p>
                                <p class="stat-value">{pokemon["stats"][1]}</p>
                                <div class="stat-bar">
                                    <div class="progress" style="width: {(pokemon["stats"][1] / 250) * 100}%" data-color="{ 'red' if pokemon['stats'][1] <= 50 else 'green' if pokemon['stats'][1] >= 250 else 'orange' }"></div>
                                </div>
                            </div>
                            <div>
                                <p class="stat-name">Defense:</p>
                                <p class="stat-value">{pokemon["stats"][2]}</p>
                                <div class="stat-bar">
                                    <div class="progress" style="width: {(pokemon["stats"][2] / 250) * 100}%" data-color="{ 'red' if pokemon['stats'][2] <= 50 else 'green' if pokemon['stats'][2] >= 250 else 'orange' }"></div>
                                </div>
                            </div>
                            <div>
                                <p class="stat-name">Sp. Atk:</p>
                                <p class="stat-value">{pokemon["stats"][3]}</p>
                                <div class="stat-bar">
                                    <div class="progress" style="width: {(pokemon["stats"][3] / 250) * 100}%" data-color="{ 'red' if pokemon['stats'][3] <= 50 else 'green' if pokemon['stats'][3] >= 250 else 'orange' }"></div>
                                </div>
                            </div>
                            <div>
                                <p class="stat-name">Sp. Def:</p>
                                <p class="stat-value">{pokemon["stats"][4]}</p>
                                <div class="stat-bar">
                                    <div class="progress" style="width: {(pokemon["stats"][4] / 250) * 100}%" data-color="{ 'red' if pokemon['stats'][4] <= 50 else 'green' if pokemon['stats'][0] >= 250 else 'orange' }"></div>
                                </div>
                            </div>
                            <div>
                                <p class="stat-name">Speed:</p>
                                <p class="stat-value">{pokemon["stats"][5]}</p>
                                <div class="stat-bar">
                                    <div class="progress" style="width: {(pokemon["stats"][5] / 250) * 100}%" data-color="{ 'red' if pokemon['stats'][5] <= 50 else 'green' if pokemon['stats'][5] >= 250 else 'orange' }"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="block">
                        <div class="pokemon-types">
                            <p>Type:   </p>
                            <img id="type-img" src="{typesBase + pokemon['types'][0] + '.png'}">
                            {'<img id="type-img" src="' + typesBase + pokemon['types'][1] + '.png">' if len(pokemon['types']) > 1 else ''}
                        </div>
                        <div>
                            <p>Tier: {pokemon['tier']}</p>
                        </div>
                        <div class="pokemon-abilities">
                            <p>Abilities: {pokemon["abilities"][0]}, {pokemon["abilities"][1]}</p>
                        </div>
                        <div>
                            <p>{pokemon['description']}</p>
                        </div>
                    </div>
                    <div class="block">
                        <div class="moveset">
                        <table>
                            <tr>
                                <td class="moveset-table-value-name">Move 1:</td>
                                <td class="moveset-table-value">{ " / ".join(pokemonMovesets[pokemon["name"]]["moves"][0]) }</td>
                            </tr>
                            <tr>
                                <td class="moveset-table-value-name">Move 2:</td>
                                <td class="moveset-table-value">{ " / ".join(pokemonMovesets[pokemon["name"]]["moves"][1]) }</td>
                            </tr>
                            <tr>
                                <td class="moveset-table-value-name">Move 3:</td>
                                <td class="moveset-table-value">{ " / ".join(pokemonMovesets[pokemon["name"]]["moves"][2]) }</td>
                            </tr>
                            <tr>
                                <td class="moveset-table-value-name">Move 4:</td>
                                <td class="moveset-table-value">{ " / ".join(pokemonMovesets[pokemon["name"]]["moves"][3]) }</td>
                            </tr>
                        </table>
                        <table>
                            <tr>
                                <td class="moveset-table-value-name">Item:
                                </td>
                                <td class="moveset-table-value">{pokemonMovesets[pokemon["name"]]["item"]}
                                </td>
                            </tr>
                            <tr>
                                <td class="moveset-table-value-name">Ability:
                                </td>
                                <td class="moveset-table-value">{pokemonMovesets[pokemon["name"]]["ability"]}
                                </td>
                            </tr>
                            <tr>
                                <td class="moveset-table-value-name">Nature:
                                </td>
                                <td class="moveset-table-value">{pokemonMovesets[pokemon["name"]]["nature"]}
                                </td>
                            </tr>
                            <tr>
                                <td class="moveset-table-value-name">Evs:
                                </td>
                                <td class="moveset-table-value">252 SpA / 4 SpD / 252 Spe
                                </td>
                            </tr>
                            <tr>
                                <td class="moveset-table-value-name">Ivs:
                                </td>
                                <td class="moveset-table-value">0 Atk
                                </td>
                            </tr>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <div>
                    <p>Мы рады, что вы здесь! Мы стремимся быть лучшим ресурсом о мире покемонов в сети, поэтому освещаем все
                        аспекты хита Nintendo.</p>
                </div>
                <div>
                    <p>Связь с разработчиком</p>
                    <p>APO2011@ku.edu.kz</p>
                    <p>+7 777 609 7373</p>
                </div>
                <div>
                    <p>Следите за нашими новостями!</p>
                    <div>
                        <img src="../img/vk.png">
                        <img src="../img/instagram.png">
                        <img src="../img/telegram.png">
                    </div>
                </div>
            </footer>
        </body>
        </html>
    '''
    return html

for pokemon in pokemonList:
    page_content = generate_pokemon_page(pokemon)
    with open(pokemon['name'].lower() + '.html', 'w', encoding='utf-8') as file:
        file.write(page_content)