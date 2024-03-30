import sqlite3
import json
import re

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


with open('pokedex.js', 'r') as file:
    script_content = file.read()

match = re.search(r'var pokemonData = (\[.*?\]);', script_content, re.DOTALL)
if match:
    data_str = match.group(1)
else:
    print("Массив данных не найден в JavaScript файле.")
    exit()

dataForTable = '['  # Создаем пустой список

keysForTable = ['num', 'name', 'types', 'points', 'pointsHa', 'baseStats', 'abilities', 'forme' , 'iconLoc']
# Проходим по вашему исходному массиву и добавляем данные в список
for pokemon in data:
    if pokemon['num'] < 1026 and pokemon['num'] > 0:
        pokemonDataText = '{'
        
        # Проходим по всем ключам в объекте pokemon
        for key in keysForTable:
            keyValue = str(pokemon[key]) 
            if keyValue == 'None':
                keyValue = 'null'
            if key == 'name':
                keyValue = '"' + pokemon[key] + '"'
                pokemonDataText += key + ': ' + keyValue + ', '
            elif key == 'baseStats':
                pokemonBaseStats = json.loads(pokemon[key])
                keyValues = []
                for stats in pokemonBaseStats:
                    keyValues.append(stats + ': ' + str(pokemonBaseStats[stats]))
                pokemonDataText += ', '.join(keyValues) + ', bst: ' + str(sum(pokemonBaseStats.values())) + ', '
            elif key == 'abilities':
                pokemonAbilities = json.loads(pokemon[key])
                keyValues = []
                for ability in pokemonAbilities:
                    keyValues.append(ability + ': ' + '"' + str(pokemonAbilities[ability]) + '"')
                pokemonDataText += "abilities: { "+ ', '.join(keyValues) + "}, "
            elif key == 'forme':
                if pokemon[key]:
                    pokemonDataText += 'forme: "' + str(pokemon[key]) + '", '
                else:
                    pokemonDataText += 'forme: null, '
            elif key == 'iconLoc':
                if pokemon[key]:
                    pokemonDataText += 'iconLoc: "' + str(pokemon[key]) + '", '
                else:
                    pokemonDataText += 'iconLoc: null, '
            else:
                pokemonDataText += key + ': ' + keyValue + ', '
        
        pokemonDataText += 'show: 0}'
        # Добавляем словарь текущего покемона в общий список
        dataForTable += str(pokemonDataText) + ',\n'

dataForTable+= ']'
# Преобразуем список Python в строку JavaScript массива
new_data_str = 'var pokemonData = ' + str(dataForTable) + ';'

# Заменяем старое содержимое массива на новое в файле JavaScript
new_script_content = re.sub(r'var pokemonData = \[.*?\];', new_data_str, script_content, flags=re.DOTALL)

# Записываем измененный JavaScript код обратно в файл
with open('pokedex.js', 'w', encoding='utf-8') as file:
    file.write(new_script_content)


typesBase = "https://play.pokemonshowdown.com/sprites/types/"

iconUrl = "https://play.pokemonshowdown.com/sprites/pokemonicons-sheet.png?v16"



def iconLocation(pokemon):
    if pokemon['iconLoc']:
        return pokemon['iconLoc']
    return "-" + str(pokemon['num'] % 12 * 40) + "px -" + str(pokemon['num'] // 12 * 30) + "px"

li_elements = ""
for idx, poke in enumerate(data):
        if poke['num'] < 1026 and poke['num'] > 0:
            poketypes = json.loads(poke['types'])
            pokestats = json.loads(poke['baseStats'])
            li_elements += f'''
                    <li class="buttons">
                        <a href="{poke['name'].replace('%', '').lower()}.html">
                        <button>
                            <div class="pokemon-icon">
                                <span style="display:inline-block; width:40px; height:30px; background: transparent url({iconUrl}) no-repeat scroll {iconLocation(pokemon)};">
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
    types = json.loads(pokemon['types'])
    base_stats = json.loads(pokemon['baseStats'])
    abilities = json.loads(pokemon['abilities'])
    pokemonOtherForme = None
    pokemonBaseSpecies = None
    if pokemon['otherFormes']:
        pokemonOtherForme = json.loads(pokemon['otherFormes'])
        pokemonOtherForme = list(filter(lambda pokemon: pokemon['name'] in pokemonOtherForme , data))
    if pokemon['baseSpecies']:
        pokemonBaseSpecies = list(filter(lambda p: p['name'] == pokemon['baseSpecies'], data))
    pokemonEvos = []
    pokemonEvos2 = []
    pokemonPrevo = None
    pokemonPrevo2 = None
    marginValue = 1
    if pokemon['evos']:
        pokemonEvoss = json.loads(pokemon['evos'])
        pokemonEvos = list(filter(lambda pokemon: pokemon['name'] in pokemonEvoss , data))
        marginValue+= 1
        if pokemonEvos[0]['evos']:
            pokemonEvoss = json.loads(pokemonEvos[0]['evos'])
            pokemonEvos2 = list(filter(lambda pokemon: pokemon['name'] in pokemonEvoss , data))
        marginValue+= 1
    if pokemon['prevo']:
        pokemonPrevo = list(filter(lambda p: p['name'] == pokemon['prevo'], data))
        marginValue+= 1
        if pokemonPrevo[0]['prevo']:
            pokemonPrevo2 = list(filter(lambda p: p['name'] == pokemonPrevo[0]['prevo'], data))
            marginValue+= 1
    

    html = f'''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{pokemon['name']}</title>
    <link rel="stylesheet" href="../styles.css">
    <link rel="stylesheet" href="pokedex.css">
    <link rel="icon" href="https://www.smogon.com/dex/media/sprites/xy/{pokemon["name"].replace('%', '').lower()}.gif" type="image/gif">
    <script src="pokedex.js"></script>
</head>
<body>
    <div class="main">
        <div class="left-menu">
            <div class="left-menu-top">
                <div>
                    <div class="filters">
                        <select class="ability-filter" placeholder="Enter name" onchange="searchUpdate()">
                        <option value="None">None (Ability)</option>
                        </select>
                    </div>
                    <div class="search">
                        <button onclick="sortTable(0)" class="pokemon-icon">
                        <img src="../img/sort.png">
                        </button>
                        <input placeholder="Enter name" type="search" oninput="searchUpdate()">
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
                            <option value="hp">HP</option>
                            <option value="atk">Atk</option>
                            <option value="def">Def</option>
                            <option value="spa">SpA</option>
                            <option value="spd">SpD</option>
                            <option value="spe">Spe</option>
                            <option value="bst">BST</option>
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
                <table id="pokemonTable">
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="pokemon-info">
            <h1 class="block-inline">{pokemon['name']}</h1>
            <div class="pokemon-info-top">
                <div class="pokemon-image-container" {'onmouseover="hover()"' if pokemon['name'] == 'Rillaboom' else ''}>
                    <div id="pokemon-image" style="background-image: url(https://www.smogon.com/dex/media/sprites/xy/{pokemon["name"].replace('%', '').lower()}.gif)" alt="{pokemon['name']}">
                    </div>
                    {
                        '<audio id="audio" src="../img/rillaboom.mp3"></audio>' if pokemon['name'] == 'Rillaboom' else ''
                    }
                </div>
                <div class="pokemon-evolutions">
                    {
                    f'''
                    <div class="pokemon-first-evo">
                        <div>
                            <div class="pokemon-icon">
                                <span style="display:inline-block; width:40px; height:30px; background: transparent url({iconUrl}) no-repeat scroll {iconLocation(pokemonPrevo2[0])};"></span>
                            </div>
                            <a href="{pokemonPrevo2[0]["name"].replace('%', '').lower() + '.html'}">{pokemonPrevo2[0]["name"]}</a>
                        </div>
                    </div>''' if pokemonPrevo2 else ''
                    }
                    { 
                    f'''
                    <div class="pokemon-{'first-evo' if not pokemonPrevo2 else 'second-evo'}">
                        <div>
                            <div class="pokemon-icon">
                                <span style="display:inline-block; width:40px; height:30px; background: transparent url({iconUrl}) no-repeat scroll {iconLocation(pokemonPrevo[0])};"></span>
                            </div>
                            <a href="{pokemonPrevo[0]["name"].replace('%', '').lower() + '.html'}">{pokemonPrevo[0]["name"]}</a>
                        </div>
                    </div>''' if pokemonPrevo else ''
                    }
                    <div class="pokemon-{'first-evo' if not pokemonPrevo else 'second-evo' if pokemonPrevo and not pokemonPrevo2 else 'third-evo' if pokemonPrevo and pokemonPrevo2 else ''}">
                        <div>
                            <div class="pokemon-icon">
                                <span style="display:inline-block; width:40px; height:30px; background: transparent url({iconUrl}) no-repeat scroll {iconLocation(pokemon)};"></span>
                            </div>
                            <p>{pokemon['name']}</p>
                        </div>
                    </div>
                    {f'''
                        <div class="pokemon-{'second-evo' if pokemonEvos2 else '' 'third-evo' if pokemonPrevo and not pokemonEvos2 else ''}">
                            <div>
                                <div class="pokemon-icon">
                                    <span style="display:inline-block; width:40px; height:30px; background: transparent url({iconUrl}) no-repeat scroll {iconLocation(pokemonEvos[0])};"></span>
                                </div>
                                <a href="{pokemonEvos[0]["name"].replace('%', '').lower() + '.html'}">{pokemonEvos[0]["name"]}</a>
                            </div>
                        </div>''' if pokemonEvos else ''
                    }
                    {f'''
                        <div class="pokemon-third-evo">
                            <div>
                                <div class="pokemon-icon">
                                    <span style="display:inline-block; width:40px; height:30px; background: transparent url({iconUrl}) no-repeat scroll {iconLocation(pokemonEvos2[0])};"></span>
                                </div>
                                <a href="{pokemonEvos2[0]["name"].lower() + '.html'}">{pokemonEvos2[0]["name"]}</a>
                            </div>
                        </div>''' if pokemonEvos2 else ''
                    }
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
             {f"""
                    <div class="pokemon-forms-pages">
                    {f'''
                        <div>
                            <div class="pokemon-icon">
                                <span style="display:inline-block; width:40px; height:30px; background: transparent url({iconUrl}) no-repeat scroll {iconLocation(pokemonBaseSpecies[0])};"></span>
                            </div>
                            <a href="{pokemonBaseSpecies[0]['name'].replace('%', '').lower() + '.html'}">Base</a>
                        </div>
                        <span style="margin: 0px 8px;"> / </span>''' if pokemonBaseSpecies else ''
                    }
                        <div>
                            <div class="pokemon-icon">
                                <span style="display:inline-block; width:40px; height:30px; background: transparent url({iconUrl}) no-repeat scroll {iconLocation(pokemon)};"></span>
                            </div>
                            <p>{f'{pokemon['forme']}' if pokemonBaseSpecies else 'Base'}</p>
                        </div>
                    {f'''
                        <span style="margin: 0px 8px;"> / </span>
                        <div>
                            <div class="pokemon-icon">
                                <span style="display:inline-block; width:40px; height:30px; background: transparent url({iconUrl}) no-repeat scroll {iconLocation(pokemonOtherForme[0])};"></span>
                            </div>
                            <a href="{pokemonOtherForme[0]['name'].replace('%', '').lower() + '.html'}">{pokemonOtherForme[0]['forme']}</a>
                        </div>''' if pokemonOtherForme and pokemonOtherForme[0] else ''
                    }
                    {f'''
                        <span style="margin: 0px 8px;"> / </span>
                        <div>
                            <div class="pokemon-icon">
                                <span style="display:inline-block; width:40px; height:30px; background: transparent url({iconUrl}) no-repeat scroll {iconLocation(pokemonOtherForme[1])};"></span>
                            </div>
                            <a href="{pokemonOtherForme[1]['name'].replace('%', '').lower() + '.html'}">{pokemonOtherForme[1]['forme']}</a>
                        </div>''' if pokemonOtherForme and len(pokemonOtherForme) == 2 else ''
                    }
                    </div>""" if pokemonOtherForme or pokemonBaseSpecies else ''
                    }
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