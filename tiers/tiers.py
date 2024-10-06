import sqlite3
import re
import json

def urlfix(name):
    name = name.replace(' ', '').replace('/', '').lower()
    return name

def fetch_data_from_db(db_path, table):
    try:
        # Подключаемся к базе данных
        connection = sqlite3.connect(db_path)
        cursor = connection.cursor()

        # Выполняем запрос к базе данных
        cursor.execute("SELECT * FROM " + table)  # Замените "your_table_name" на имя вашей таблицы
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

def remove_second_dash(string):
    first_dash_index = string.find('-')
    
    if first_dash_index != -1:
        second_dash_index = string.find('-', first_dash_index + 1)
        
        if second_dash_index != -1:
            string = string[:second_dash_index] + string[second_dash_index + 1:]

    return string

db_path = '../pokedex/pokemon.db'

data0 = fetch_data_from_db(db_path, "pokemons")
data = fetch_data_from_db(db_path, "streamcrafttiers")
data2 = fetch_data_from_db(db_path, "learnsets")
data3 = fetch_data_from_db(db_path, "builds")

with open('../pokemonPointsBase.js', 'r') as file:
    script_content2 = file.read()
    

match2 = re.search(r'var pokemonPointsData = (\[.*?\]);', script_content2, re.DOTALL)
if match2:
    data_str2 = match2.group(1)
else:
    print("Массив данных не найден в JavaScript файле.")
    exit()

dataForTable = '['  # Создаем пустой список

keysForTable = ['num','name', 'tier' ,'points', 'pointsHa', 'iconLoc']
for pokemon in data:
    for pokemon2 in data2:
        if pokemon['name'].lower().replace(' ', '').replace('-', '') == pokemon2['name']:
            break
    if pokemon['num'] < 1026 and pokemon['num'] > 0:
        pokemonDataText = '{'
        # Проходим по всем ключам в объекте pokemon
        for key in keysForTable:
            if key == 'iconLoc':
                for pok in data0:
                    if (pok['name'] == pokemon['name']):
                        keyValue = str(pok['iconLoc'])
            else:
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
            elif key == 'tier':
                if pokemon[key]:
                    pokemonDataText += 'tier: "' + str(pokemon[key]) + '", '
                else:
                    pokemonDataText += 'tier: null, '
            elif key == 'iconLoc':
                if keyValue != 'null':
                    pokemonDataText += 'iconLoc: "' + keyValue + '", '
                else:
                    pokemonDataText += 'iconLoc: null, '
            else:
                pokemonDataText += key + ': ' + keyValue + ', '
        pokemonDataText += 'learnset: ' + pokemon2['moves'] + ', '
        
        pokemonDataText += 'ubersuu: ' + str(pokemon['ubersuu']) + ', '
        pokemonDataText += 'doublesou: ' + str(pokemon['doublesou']) + ', '
        pokemonDataText += 'monotype: ' + str(pokemon['monotype']) + ', '

        pokemonDataText += 'builds: ['
        for pokemon3 in data3:
            if pokemon['name'] == pokemon3['name']:
                pokemonDataText += '{type: "' + pokemon3['type'] + '", ability: "' + pokemon3['ability'] + '", item: "' + pokemon3['item'] +  '",nature: "' + pokemon3['nature'] + '",evs: ' + pokemon3['evs']  + ',moves: ' + pokemon3['moves'] + '}, '
        pokemonDataText += '], '
        pokemonDataText += '}'
        dataForTable += str(pokemonDataText) + ',\n'

dataForTable += ']'

new_data_str2 = 'var pokemonPointsData = ' + str(dataForTable) + ';'

if not re.search(r'var pokemonPointsData = \[.*?\];', script_content2, flags=re.DOTALL):
    print("Строка не найдена для замены!")

new_script_content2 = re.sub(r'var pokemonPointsData = \[.*?\];', new_data_str2, script_content2, flags=re.DOTALL)

try:
    with open('../pokemonPointsBase.js', 'w', encoding='utf-8') as file:
        file.write(new_script_content2)
        print('Writed')
except Exception as e:
    print(f"Ошибка при записи в файл: {e}")



data = sorted(data, key=lambda x: x["name"])
def generate_pokemon_cards_for_tier(tier):
    defisNames = ['Chi-Yu','Chien-Pao', 'Ho-Oh','Kommo-o', 'Porygon-Z']
    text = '<div id="pokemon-cards">'
    for pokemon in data:
        url = pokemon['name'].replace(' ','').lower()
        if pokemon['name'] in defisNames:
            url = pokemon['name'].replace(' ','').replace('-','').lower()
        if url.count('-') == 2:
            url = remove_second_dash(url)
        if tier in ['Mono/Dual Type','Doubles OU', 'Ubers UU']:
            tierValue = urlfix(tier)
            if tier == 'Mono/Dual Type':
                tierValue = 'monotype'
            if (pokemon[tierValue] == False):
                text += f'''
                <div id='pokemon-{pokemon['name']}' class="pokemon-card">
                    <div class="pokemon-sprite">
                        <div class="pokemon-sprite" style="background-image:url(https://play.pokemonshowdown.com/sprites/gen5/{url}.png);background-position:-2px -3px;background-repeat:no-repeat">
                        </div>
                    </div>
                    <span>{pokemon['name']}</span>
                </div>'''
        elif(pokemon['tier'] == tier):
            text += f'''
                <div id='pokemon-{pokemon['name']}' class="pokemon-card">
                    <div class="pokemon-sprite">
                        <div class="pokemon-sprite" style="background-image:url(https://play.pokemonshowdown.com/sprites/gen5/{url}.png);background-position:-2px -3px;background-repeat:no-repeat">
                        </div>
                    </div>
                    <span>{pokemon['name']}</span>
                </div>'''
    text+= '</div>'
    return text

tiers = ['AG', 'Ubers', 'OU', 'UU', 'RU', 'Ubers UU', 'Doubles OU', 'Mono/Dual Type']
def generate_tiers(currentTier, tiersImg, tiersFullNames):
    text = ''
    for tier in tiers:
        classList = ''
        if tier in ['Ubers UU', 'Doubles OU', 'Mono/Dual Type']:
            classList += 'visiblea'
        if currentTier == tier:
            text += f'''<a class='current-page' id='{urlfix(tier)}' href="{urlfix(tier)}.html"><img class="tier-img" src="{tiersImg[tier]}">{tiersFullNames[tier]}</a> '''
        else:
            text += f'''<a class='{classList}' id='{urlfix(tier)}' href="{urlfix(tier)}.html"><img class="tier-img" src="{tiersImg[tier]}">{tiersFullNames[tier]}</a> '''
        if tier == 'RU':
            text += f'''<div class='line'></div> '''
    return text

def generate_monotype(currentTier):
    text = ''

    return text

def generate_ubersuu(currentTier):
    text = ''

    return text

def generate_pokemon_page(tier):
    print(tier)
    tiersFullNames = {
        "AG" : 'Anything Goes',
        "Ubers": 'Ubers',
        "Ubers UU": 'Ubers UU',
        "OU" : 'Over Used',
        "UU": 'Under Used',
        "RU": 'Rarely Used',
        "Doubles OU": 'Doubles OU',
        "Mono/Dual Type": 'Mono/Dual Type',
    }
    tiersImg = {
        "AG": '',
        "Ubers": 'https://www.smogon.com/tiers/ubers/uberslogo.png',
        "Ubers UU": '',
        "OU": 'https://www.smogon.com/tiers/ou/banner_bummer.png',
        "UU": 'https://www.smogon.com/tiers/uu/uu_logo.png',
        "RU": 'https://www.smogon.com/tiers/ru/ru_logo.png',
        "Doubles OU": '',
        "Mono/Dual Type": '',
    }
    cards_for_tier = generate_pokemon_cards_for_tier(tier)
    tiers_code = generate_tiers(tier, tiersImg, tiersFullNames)
    html = f'''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{tier} | Турниры по системе тиров</title>
    <link rel="stylesheet" href="tiers.css">
    <link rel="stylesheet" href="../scrollbar.css">
    <link rel="stylesheet" href="../header.css">
    <link rel="stylesheet" href="../theme.css">
    <link rel="stylesheet" href="../index.css">
    <script type="module" src="tiers.js"></script>
    <script src="../theme.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/easy-toggler@2.2.7"></script>
    <script src="https://hammerjs.github.io/dist/hammer.js"></script>
</head>
<body>
    <header>
        <a href="../index.html"><img id="logo" src="../img/snorlaxfavicon.png"></a>
        <div class="dropdown">
            <a href="#">Покедекс</a>
            <div class="dropdown-content">
                <a href="../pokedex/bulbasaur.html">Покемоны</a>
                <a href="#">Атаки</a>
                <a href="#">Способности</a>
                <a href="#">Типы</a>
            </div>
        </div>
        <div class="dropdown">
            <a href="#">Турниры</a>
            <div class="dropdown-content">
                <a href="rules.html">Система тиров</a>
                <a href="../points/rules.html">Система баллов</a>
            </div>
        </div>
        <a href="../teambuilder.html">Тимбилдер</a>
        <div id="settings">
            <input type="checkbox" id="theme-slider" class="toggle">

            <label for="theme-slider" class="label">
                <div class="ball">

                </div>
            </label>
        </div>
        <button id="close-menu" easy-add="#right-menu" easy-class="right-menu-show">
            <span class="button-line"></span>
            <span class="button-line"></span>
            <span class="button-line"></span>
        </button>
    </header>
    <main>
        <div id="right-menu">
            <a class="visiblea" href="rules.html">Общие правила</a>
            <input class='search-input' type="search" placeholder="Найти...">
            {tiers_code}
        </div>
        <div id="main">
            <div id="tiername">
                <img src="{tiersImg[tier]}">
                <h3>Тир {tiersFullNames[tier]}</h3>
            </div>
            {f'''
            <div>
                <p>Разрешено всё, кроме пунктов 2, 6, 7, 9, 11 общих правил.</p>
            </div>''' if tier == 'AG' else ''
            }
            {f'''
            <div>
                <h4><label class="red-text">Запрещенные</label> предметы(шапки):</h4>
                <div id='blocked-moves'>
                    <div>
                        <div class="pokemon-icon" style="width: 24px; height: 24px; background-image: url(&quot;../img/itemicons-sheet.png&quot;); background-repeat: no-repeat; background-position: -288px -336px; background-color: transparent;"></div><p>King’s Rock</p>
                    </div>
                </div>
            </div>''' if tier == 'Ubers UU' else ''
            }
            {f'''
            <div>
                <h4><label class="red-text">Запрещенные</label> предметы(шапки):</h4>
                <div id='blocked-moves'>
                    <div>
                        <div class="pokemon-icon" style="width: 24px; height: 24px; background-image: url(&quot;../img/itemicons-sheet.png&quot;); background-repeat: no-repeat; background-position: -288px -336px; background-color: transparent;"></div><p>King’s Rock</p>
                    </div>
                </div>
            </div>''' if tier == 'OU' else ''
            }
            {f'''
            <div>
                <h4><label class="red-text">Запрещенные</label> предметы(шапки):</h4>
                <div id='blocked-moves'>
                    <div>
                        <div class="pokemon-icon" style="width: 24px; height: 24px; background-image: url(&quot;../img/itemicons-sheet.png&quot;); background-repeat: no-repeat; background-position: -288px -336px; background-color: transparent;"></div><p>King’s Rock</p>
                    </div>
                    <div>
                        <div class="pokemon-icon" style="width: 24px; height: 24px; background-image: url(&quot;../img/itemicons-sheet.png&quot;); background-repeat: no-repeat; background-position: -288px -360px; background-color: transparent;"></div><p>Light Clay</p>
                    </div>
                </div>
            </div>''' if tier == 'UU' or tier == 'RU' else ''
            }
            {f'''
            <div>
                <h4><label class="red-text">Запрещенные</label> предметы(шапки):</h4>
                <div id='blocked-moves'>
                    <div>
                        <div class="pokemon-icon" style="width: 24px; height: 24px; background-image: url(&quot;../img/itemicons-sheet.png&quot;); background-repeat: no-repeat; background-position: -192px -120px; background-color: transparent;"></div><p>Damp Rock</p>
                    </div>
                    <div>
                        <div class="pokemon-icon" style="width: 24px; height: 24px; background-image: url(&quot;../img/itemicons-sheet.png&quot;); background-repeat: no-repeat; background-position: -72px -72px; background-color: transparent;"></div><p>Bright Powder</p>
                    </div>
                    <div>
                        <div class="pokemon-icon" style="width: 24px; height: 24px; background-image: url(&quot;../img/itemicons-sheet.png&quot;); background-repeat: no-repeat; background-position: -144px -216px; background-color: transparent;"></div><p>Focus Band</p>
                    </div>
                    <div>
                        <div class="pokemon-icon" style="width: 24px; height: 24px; background-image: url(&quot;../img/itemicons-sheet.png&quot;); background-repeat: no-repeat; background-position: -288px -336px; background-color: transparent;"></div><p>King’s Rock</p>
                    </div>
                    <div>
                        <div class="pokemon-icon" style="width: 24px; height: 24px; background-image: url(&quot;../img/itemicons-sheet.png&quot;); background-repeat: no-repeat; background-position: 0px -360px; background-color: transparent;"></div><p>Lax Incense</p>
                    </div>
                    <div>
                        <div class="pokemon-icon" style="width: 24px; height: 24px; background-image: url(&quot;../img/itemicons-sheet.png&quot;); background-repeat: no-repeat; background-position: -120px -552px; background-color: transparent;"></div><p>Quick Claw</p>
                    </div>
                    <div>
                        <div class="pokemon-icon" style="width: 24px; height: 24px; background-image: url(&quot;../img/itemicons-sheet.png&quot;); background-repeat: no-repeat; background-position: -120px -672px; background-color: transparent;"></div><p>Smooth Rock</p>
                    </div>
                    <div>
                        <div class="pokemon-icon" style="width: 24px; height: 24px; background-image: url(&quot;../img/itemicons-sheet.png&quot;); background-repeat: no-repeat; background-position: -144px -984px; background-color: transparent;"></div><p>Terrain Extender</p>
                    </div>
                </div>
            </div>''' if tier == 'Mono/Dual Type' else ''
            }
            <div>
                {f'''<h4>Покемоны <label class="green-text">{tier}</label> тира:</h4>''' if tier != 'Mono/Dual Type' and tier != 'Ubers UU' and tier != 'Doubles OU' else f'''<h4>Покемоны <label class="red-text" >ЗАПРЕЩЕННЫЕ</label> в тире {tier}:</h4>'''}
                <input id='{tier}' class='search-input-tier' placeholder="Найти...">
                {cards_for_tier}
            </div>
        </div>
    </main>
</body>
</html>
    '''
    return html



for tier in tiers:
    url = urlfix(tier)
    print(url)
    with open(url + '.html', 'w', encoding='utf-8') as file:
        file.write(generate_pokemon_page(tier))


def load_table():
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()

    for pokemon in data:
        name = pokemon["name"]
        
        cursor.execute("SELECT * FROM streamcrafttiers WHERE name = ?", (name,))
        result = cursor.fetchone()
        
        if result:
            cursor.execute("""
                UPDATE streamcrafttiers
                SET iconLoc = ? 
                WHERE name = ?
            """, (pokemon['iconLoc']))
        else:
            cursor.execute("""
                INSERT INTO streamcrafttiers (name, tier, points, pointsHa, monotype, num)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (pokemon['name'], pokemon['tier'], pokemon['points'], pokemon['pointsHa'], True, pokemon['num']))

    connection.commit()
    connection.close()