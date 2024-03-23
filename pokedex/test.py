import sqlite3
import json

def fetch_data_from_db(db_path):
    try:
        # Подключаемся к базе данных
        connection = sqlite3.connect(db_path)
        cursor = connection.cursor()

        # Выполняем запрос к базе данных
        cursor.execute("SELECT * FROM pokemons")  # Замените "your_table_name" на имя вашей таблицы
        # Получаем все строки из результата запроса
        rows = cursor.fetchall()
        data = []
        for row in rows:
            row_dict = {}
            for i, column_name in enumerate(cursor.description):
                row_dict[column_name[0]] = row[i]
            data.append(row_dict)
        return data
    except sqlite3.Error as e:
        print("Ошибка при работе с базой данных:", e)
        return None


    finally:
        # Закрываем соединение с базой данных
        if connection:
            connection.close()

# Пример использования функции
db_path = "pokemon.db"  # Укажите путь к вашей базе данных SQLite3
data = fetch_data_from_db(db_path)

typesBase = "https://play.pokemonshowdown.com/sprites/types/"

iconUrl = "https://play.pokemonshowdown.com/sprites/pokemonicons-sheet.png?v16"

def iconLocation(number):
    return "-" + str(number % 12 * 40) + "px -" + str(number // 12 * 30) + "px"

li_elements = ""
for idx, poke in enumerate(data):
        if poke['num'] < 1026 and poke['num'] > 0:
            poketypes = json.loads(poke['types'])
            pokestats = json.loads(poke['baseStats'])
            li_elements += f'''
                <li class="buttons">
                    <a href="{poke['name'].lower()}.html">
                    <button>
                        <div class="pokemon-icon">
                            <span style="display:inline-block; width:40px; height:30px; background: transparent url({iconUrl}) no-repeat scroll {iconLocation(poke["num"])};">
                            </span>
                        </div>
                        <p class="pokemon-name">{poke['name']}</p>
                        <div class="pokemon-types">
                            <img id="type-img" src="{typesBase + poketypes[0] + '.png'}">
                            {'<img id="type-img" src="' + typesBase + poketypes[1] + '.png">' if len(poketypes) > 1 else ''}
                        </div>
                        <p class="pokemon-points">{poke['points']}</p>
                        <p class="pokemon-stat">{pokestats['hp'] + pokestats['atk'] + pokestats['def'] + pokestats['spa'] + pokestats['spd'] + pokestats['spe']}</p>
                    </button></a>
                </li>
            '''

def generate_pokemon_page(pokemon):
    print(pokemon['name'])
    types = json.loads(pokemon['types'])
    base_stats = json.loads(pokemon['baseStats'])
    abilities = json.loads(pokemon['abilities'])
    
    
    
    html = f'''
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>{pokemon['name']}</title>
            <link rel="stylesheet" href="../styles.css">
            <link rel="stylesheet" href="pokedex.css">
            <link rel="icon" href="https://www.smogon.com/dex/media/sprites/xy/{pokemon["name"].lower()}.gif" type="image/gif">
            <script src="pokedex.js"></script>
        </head>
        <body>
            <div class="main">
                <div class="left-menu">
                    <div class="left-menu-top">
                        <div class="search">
                            <input type="search" oninput="searchUpdate()">
                            <div class="sorting">
                                <select class="type-sort" onchange="searchUpdate()">
                                    <option value="None">None</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Fire">Fire</option>
                                    <option value="Water">Water</option>
                                    <option value="Grass">Grass</option>
                                    <option value="Electric">Electric</option>
                                    <option value="Ice">Ice</option>
                                    <option value="Fighting">Fighting</option>
                                    <option value="Poison">Poison</option>
                                    <option value="Ground">Ground</option>
                                    <option value="Flying">Flying</option>
                                    <option value="Psychic">Psychic</option>
                                    <option value="Bug">Bug</option>
                                    <option value="Rock">Rock</option>
                                    <option value="Ghost">Ghost</option>
                                    <option value="Dragon">Dragon</option>
                                    <option value="Dark">Dark</option>
                                    <option value="Steel">Steel</option>
                                    <option value="Fairy">Fairy</option>
                                </select>
                                <select class="points-sort" onchange="searchUpdate()">
                                    <option value="No">No</option>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                                <select class="stat-sort" onchange="searchUpdate()">
                                    <option value="No">No</option>
                                    <option value="BST">BST</option>
                                    <option value="1">HP</option>
                                    <option value="2">Atk</option>
                                    <option value="3">Def</option>
                                    <option value="4">SpA</option>
                                    <option value="5">SpD</option>
                                    <option value="6">Spe</option>
                                </select>
                            </div>
                        </div>
                        <div class="xzpoka">
                        </div>
                        <button class="open-button" onclick="openLeftMenu()">
                            <img src="../img/pokeball.gif">
                        </button>
                    </div>
                    <div class="pokemons-list">
                        <ul>
                            {li_elements}
                        </ul>
                    </div>
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
                                    <span style="display:inline-block; width:40px; height:30px; background: transparent url({iconUrl}) no-repeat scroll {iconLocation(pokemon["num"])};"></span>
                                </div>
                                <h4>{pokemon['name']}</h4>
                            </div>
                        </div>
                        <div class="pokemon-stats">
                            <div>
                                <p class="stat-name">HP:</p>
                                <p class="stat-value">{base_stats["hp"]}</p>
                                <div class="stat-bar">
                                    <div class="progress" style="width: {(base_stats["hp"] / 250) * 100}%" data-color="{ 'red' if base_stats["hp"] <= 50 else 'green' if base_stats["hp"] >= 250 else 'orange' }"></div>
                                </div>
                            </div>
                            <div>
                                <p class="stat-name">Attack:</p>
                                <p class="stat-value">{base_stats["atk"]}</p>
                                <div class="stat-bar">
                                    <div class="progress" style="width: {(base_stats["atk"] / 250) * 100}%" data-color="{ 'red' if base_stats["atk"] <= 50 else 'green' if base_stats["atk"] >= 250 else 'orange' }"></div>
                                </div>
                            </div>
                            <div>
                                <p class="stat-name">Defense:</p>
                                <p class="stat-value">{base_stats["def"]}</p>
                                <div class="stat-bar">
                                    <div class="progress" style="width: {(base_stats["def"] / 250) * 100}%" data-color="{ 'red' if base_stats["def"] <= 50 else 'green' if base_stats["def"] >= 250 else 'orange' }"></div>
                                </div>
                            </div>
                            <div>
                                <p class="stat-name">Sp. Atk:</p>
                                <p class="stat-value">{base_stats["spa"]}</p>
                                <div class="stat-bar">
                                    <div class="progress" style="width: {(base_stats["spa"] / 250) * 100}%" data-color="{ 'red' if base_stats["spa"] <= 50 else 'green' if base_stats["spa"] >= 250 else 'orange' }"></div>
                                </div>
                            </div>
                            <div>
                                <p class="stat-name">Sp. Def:</p>
                                <p class="stat-value">{base_stats["spd"]}</p>
                                <div class="stat-bar">
                                    <div class="progress" style="width: {(base_stats["spd"] / 250) * 100}%" data-color="{ 'red' if base_stats["spd"] <= 50 else 'green' if base_stats["spd"] >= 250 else 'orange' }"></div>
                                </div>
                            </div>
                            <div>
                                <p class="stat-name">Speed:</p>
                                <p class="stat-value">{base_stats["spe"]}</p>
                                <div class="stat-bar">
                                    <div class="progress" style="width: {(base_stats["spe"] / 250) * 100}%" data-color="{ 'red' if base_stats["spe"] <= 50 else 'green' if base_stats["spe"] >= 250 else 'orange' }"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="block">
                        <div class="pokemon-types">
                            <p>Type:   </p>
                            <img id="type-img" src="{typesBase + types[0] + '.png'}">
                            {'<img id="type-img" src="' + typesBase + types[1] + '.png">' if len(types) > 1 else ''}
                        </div>
                        <div>
                            <p>Points: {pokemon['points']}</p>
                        </div>
                        {f"""
                        <div>
                            <p>HA points: {pokemon['pointsHa']}</p>
                        </div>""" if abilities.get("H") else ''
                        }
                        <div>
                            <p>Tier: {pokemon['tier']}</p>
                        </div>
                        <div class="pokemon-abilities">
                            <p>Abilities: {", ".join([ability for ability in [abilities.get("0"), abilities.get("1"), abilities.get("H")] if ability])}</p>
                        </div>
                        <div>
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </html>
    '''
    return html

for pokemon in data:
    if pokemon['num'] < 1026 and pokemon['num'] > 0:
        page_content = generate_pokemon_page(pokemon)
        with open(pokemon['name'].replace("%","").lower() + '.html', 'w', encoding='utf-8') as file:
            file.write(page_content)