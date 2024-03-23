function searchUpdate(){
    inputValue = document.querySelector('.search input').value.toLowerCase()
    buttons = document.querySelectorAll('.buttons')
    if (inputValue){
        buttons.forEach(button => {
            textContent = button.querySelector('button p').textContent.toLowerCase()
            if(textContent.startsWith(inputValue) || textContent.includes(inputValue)){
                button.style.display = 'flex';
            }
            else{
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


document.querySelector('.left-menu').style.transform = 'translateX(0px)';