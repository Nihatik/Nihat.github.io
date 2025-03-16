

function loadFunctions(){
    
}

function moveToCenter(boxId) {
    const boxes = document.getElementById('boxes');
    boxes.style.left = -boxId * 100 + 'px';
}