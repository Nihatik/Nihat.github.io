
function getAnswer(){
    value = 1

    for (let i = 2; i <= 100; i++){
        value *= (i + 1 )/ (i + 2)
    }
    alert('Ответ: ' + value)
}
