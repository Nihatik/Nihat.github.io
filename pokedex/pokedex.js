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
                if (nameTextContent.startsWith(inputValue) && pointsTextContent == pointsSortValue && (typesTextSrc.some(element => element.includes(typeSortValue)))) {
                    button.style.display = 'flex';
                } 
                else {
                    button.style.display = 'none';
                }
            }
            else if (inputValue && pointsSortValue != null){
                if (nameTextContent.startsWith(inputValue) && pointsTextContent == pointsSortValue) {
                    button.style.display = 'flex';
                } 
                else {
                    button.style.display = 'none';
                }
            }
            else if (inputValue && typeSortValue != 'None'){
                if (nameTextContent.startsWith(inputValue) && (typesTextSrc.some(element => element.includes(typeSortValue)))) {
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
            else if (inputValue && nameTextContent.startsWith(inputValue)){
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