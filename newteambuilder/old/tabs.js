function moveToCenter(tabIndex) {
    const boxes = document.querySelector('#TeamsInfo-container-in');
    const boxItems = boxes.querySelectorAll('.tab-item'); // Все вкладки
    const tablinks = document.querySelectorAll("#TeamsInfo-tab button");
    const tabContainer = document.querySelector("#TeamsInfo-tab");

    
    boxes.style.left = -tabIndex * 100 + '%';

    // Меняем позицию "нижнего индикатора" через CSS-переменную
    if (tabContainer) {
        tabContainer.style.setProperty("--tab-position", `calc(${tabIndex} * 100% / 3)`);
    }

    tablinks.forEach(btn => btn.classList.remove("active-tab"));
    boxItems.forEach(div => div.classList.remove("active-tab"));

    // Добавляем активный класс текущему табу
    if (boxItems[tabIndex]) {
        boxItems[tabIndex].classList.add("active-tab");
    }
    if (tablinks[tabIndex]) {
        tablinks[tabIndex].classList.add("active-tab");
    }
}

function loadFunctions() {
    const tablinks = document.querySelectorAll("#TeamsInfo-tab button");
    tablinks.forEach(button => {
        button.onclick = function () {
            const tabIndex = parseInt(button.getAttribute("num"), 10) || 0;
            moveToCenter(tabIndex);
        };
    });
}

export { loadFunctions };
