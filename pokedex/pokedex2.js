  
function searchUpdate(){
    inputValue = document.querySelector('.search input').value.toLowerCase()

    pointsSortValue = document.querySelector('.points-sort').value
    if (pointsSortValue == 'No'){
        pointsSortValue = null
    }
    else {
        pointsSortValue = +pointsSortValue
    }
    typeSortValue = document.querySelector('.type-sort').value

    buttons = document.querySelectorAll('.buttons')

    
    if (inputValue != "" || ((pointsSortValue || pointsSortValue == 0) && !isNaN(pointsSortValue) && pointsSortValue != NaN) || typeSortValue != 'None'){
        console.log(inputValue, pointsSortValue, typeSortValue)
        buttons.forEach(button => {
            const nameTextContent = button.querySelector('button p').textContent.toLowerCase()
            const pointsTextContent = +button.querySelector('button .pokemon-points').textContent
            const typesTextSrc = [];
            typesTextSrcElements = button.querySelectorAll('button .pokemon-types #type-img')
            if (typesTextSrcElements.length == 2) {
                typesTextSrc.push(typesTextSrcElements[0].src, typesTextSrcElements[1].src);
            }
            else {
                typesTextSrc.push(typesTextSrcElements[0].src)
            }

            if (inputValue && typeSortValue != 'None' && pointsSortValue != null) {
                if ((nameTextContent.startsWith(inputValue) || nameTextContent.includes(inputValue)) && pointsTextContent == pointsSortValue && (typesTextSrc.some(element => element.includes(typeSortValue)))) {
                    button.style.display = 'flex';
                } 
                else {
                    button.style.display = 'none';
                }
            }
            else if (inputValue && pointsSortValue != null){
                if ((nameTextContent.startsWith(inputValue) || nameTextContent.includes(inputValue)) && pointsTextContent == pointsSortValue) {
                    button.style.display = 'flex';
                } 
                else {
                    button.style.display = 'none';
                }
            }
            else if (inputValue && typeSortValue != 'None'){
                if ((nameTextContent.startsWith(inputValue) || nameTextContent.includes(inputValue)) && (typesTextSrc.some(element => element.includes(typeSortValue)))) {
                    button.style.display = 'flex';
                } 
                else {
                    button.style.display = 'none';
                }
            }
            else if (typeSortValue != 'None' && pointsSortValue != null){
                if (typesTextSrc.some(element => element.includes(typeSortValue)) && pointsTextContent == pointsSortValue){
                    button.style.display = 'flex';
                }
                else {
                    button.style.display = 'none';
                }
            }
            else if (inputValue && (nameTextContent.startsWith(inputValue) || nameTextContent.includes(inputValue))){
                button.style.display = 'flex';
            }
            else if (pointsTextContent == pointsSortValue){
                button.style.display = 'flex';
            } 
            else if (typesTextSrc.some(element => element.includes(typeSortValue))){
                button.style.display = 'flex';
            } 
            else {
                button.style.display = 'none';
            }
        });
    }
    else {
        buttons.forEach(button => {
            button.style.display = 'flex';
        });
    }
}

function openLeftMenu(){
    if(document.querySelector('.left-menu').style.transform == 'translateX(-410px)'){
        document.querySelector('.left-menu').style.transform = 'translateX(0px)';
    }
    else{
        document.querySelector('.left-menu').style.transform = 'translateX(-410px)';
    }
}


function populateTable() {
    function goToPokemonPage(pokemonName) {
        window.location.href = pokemonName.toLowerCase() + ".html";
    }

    const tableBody = document.querySelector("#pokemonTable tbody");
    tableBody.innerHTML = "";
  
    pokemonData.forEach(pokemon => {
        const row = document.createElement("tr");
        row.classList.add('button-like');
        row.onclick = function() {
            goToPokemonPage(pokemon.name);
        };

        const nameCell = document.createElement('td');
        nameCell.innerText = pokemon.name;

        const typeCell = document.createElement('td');
        typeCell.innerText = pokemon.type;

        const hpCell = document.createElement('td');
        hpCell.innerText = pokemon.hp;

        const attackCell = document.createElement('td');
        attackCell.innerText = pokemon.attack;

        const defenseCell = document.createElement('td');
        defenseCell.innerText = pokemon.defense;

        const speedCell = document.createElement('td');
        speedCell.innerText = pokemon.speed;

        const totalCell = document.createElement('td');
        totalCell.innerText = pokemon.total;

        row.appendChild(nameCell);
        row.appendChild(typeCell);
        row.appendChild(hpCell);
        row.appendChild(attackCell);
        row.appendChild(defenseCell);
        row.appendChild(speedCell);
        row.appendChild(totalCell);

        tableBody.appendChild(row);
    });
}

console.log(pokemonData[0].name)

function sortTable(columnIndex) {
    pokemonData.sort((a, b) => {
        const keyA = a[Object.keys(a)[columnIndex]];
        const keyB = b[Object.keys(b)[columnIndex]];
        if (keyA > keyB) return -1;
        if (keyA < keyB) return 1;
        return 0;
    });
    populateTable();
}
  window.onload = populateTable;