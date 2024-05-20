import sqlite3
import re
import json

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
        
        pokemonDataText += 'builds: ['
        for pokemon3 in data3:
            if pokemon['name'] == pokemon3['name']:
                pokemonDataText += '{type: "' + pokemon3['type'] + '", ability: "' + pokemon3['ability'] + '", item: "' + pokemon3['item'] +  '",nature: "' + pokemon3['nature'] + '",evs: ' + pokemon3['evs']  + ',moves: ' + pokemon3['moves'] + '}, '
        pokemonDataText += '], '
        pokemonDataText += '}'
        dataForTable += str(pokemonDataText) + ',\n'

dataForTable+= ']'

new_data_str2 = 'var pokemonPointsData = ' + str(dataForTable) + ';'

new_script_content2 = re.sub(r'var pokemonPointsData = \[.*?\];', new_data_str2, script_content2, flags=re.DOTALL)

with open('../pokemonPointsBase.js', 'w', encoding='utf-8') as file:
    file.write(new_script_content2)



data = sorted(data, key=lambda x: x["name"])
def generate_pokemon_cards_for_tier(tier):
    defisNames = ['Chi-Yu','Chien-Pao', 'Ho-Oh','Kommo-o', 'Porygon-Z']
    text = '<div id="pokemon-cards">'
    for pokemon in data:
        if(pokemon['tier'] == tier):
            url = pokemon['name'].replace(' ','').lower()
            if pokemon['name'] in defisNames:
                url = pokemon['name'].replace(' ','').replace('-','').lower()
            if url.count('-') == 2:
                url = remove_second_dash(url)
            text += f'''
            <div class="pokemon-card">
                <div class="pokemon-sprite">
                    <div class="pokemon-sprite" style="background-image:url(https://play.pokemonshowdown.com/sprites/gen5/{url}.png);background-position:-2px -3px;background-repeat:no-repeat">
                    </div>
                </div>
                <span>{pokemon['name']}</span>
            </div>'''
    text+= '</div>'
    return text

def generate_tiers(currentTier, tiersImg, tiersFullNames):
    tiers = ['AG', 'Uber', 'OU', 'UU', 'RU']
    text = ''
    for tier in tiers:
        if currentTier == tier:
            text += f'''<a class='current-page' id='{tier.lower()}' href="{tier.lower()}.html"><img class="tier-img" src="{tiersImg[tier]}">{tiersFullNames[tier]}</a> '''
        else:
            text += f'''<a id='{tier.lower()}' href="{tier.lower()}.html"><img class="tier-img" src="{tiersImg[tier]}">{tiersFullNames[tier]}</a> '''
    return text

def generate_pokemon_page(tier):
    tiersFullNames = {
        "AG" : 'Anything Goes',
        "Uber": 'Uber',
        "OU" : 'Over Used',
        "UU": 'Under Used',
        "RU": 'Rarely Used'
    }
    tiersImg = {
        "AG": '',
        "Uber": 'https://www.smogon.com/tiers/ubers/uberslogo.png',
        "OU": 'https://www.smogon.com/tiers/ou/banner_bummer.png',
        "UU": 'https://www.smogon.com/tiers/uu/uu_logo.png',
        "RU": 'https://www.smogon.com/tiers/ru/ru_logo.png'
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
    <script type="module" src="tiers.js"></script>
</head>
<body>
    <div id="right-menu">
        <a class="visiblea" href="rules.html">Общие правила</a>
        <input class='search-input' type="search" placeholder="Найти...">
        {tiers_code}
    </div>
    <div id="main">
        <div id="tiername">
            <h3>Тир {tiersFullNames[tier]}</h3>
        </div>
        {f'''
        <div>
            <p>Разрешено всё, кроме пунктов 2, 6, 7, 9, 11 общих правил.</p>
        </div>''' if tier == 'AG' else ''
        }
        {f'''
        <div>
            <h4>Запрещенные предметы(шапки):</h4>
            <p>King's Rock</p>
            <p>Legend Plate</p>
        </div>''' if tier == 'OU' else ''
        }
        <div>
            <h4>Покемоны {tier} тира:</h4>
            {cards_for_tier}
        </div>
    </div>
</body>
</html>
    '''
    return html



tiers = ['AG', 'Uber', 'OU', 'UU', 'RU']
for tier in tiers:
    with open(tier.lower() + '.html', 'w', encoding='utf-8') as file:
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