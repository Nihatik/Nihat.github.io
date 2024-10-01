async function loadImageFromFile(file) {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.onload = () => resolve(img);
        img.onerror = reject;
    });
}

async function uploadImage() {
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];
    if (file) {
        const img = await loadImageFromFile(file);
        processImage(img);
    }
}

function processImage(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const src = cv.imread(canvas);
    const gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

    // Загрузка спрайтов покемонов
    fetch('sprites/sprite_list.json')
        .then(response => response.json())
        .then(spriteList => {
            let bestMatch = [];
            let remainingSprites = spriteList.length;

            spriteList.forEach(sprite => {
                const spriteImg = new Image();
                spriteImg.src = `sprites/${sprite.filename}`;
                spriteImg.onload = function() {
                    const spriteCanvas = document.createElement('canvas');
                    const spriteCtx = spriteCanvas.getContext('2d');
                    spriteCanvas.width = spriteImg.width;
                    spriteCanvas.height = spriteImg.height;
                    spriteCtx.drawImage(spriteImg, 0, 0);

                    const spriteSrc = cv.imread(spriteCanvas);
                    const spriteGray = new cv.Mat();
                    cv.cvtColor(spriteSrc, spriteGray, cv.COLOR_RGBA2GRAY);

                    // Сопоставление шаблонов
                    try {
                        const match = templateMatching(gray, spriteGray);
                        if (match > 0.9) { // Порог совпадения
                            bestMatch.push(sprite.name);
                        }
                    } catch (error) {
                        console.error('Ошибка при сравнении изображений:', error);
                    }

                    spriteSrc.delete();
                    spriteGray.delete();

                    remainingSprites--;
                    if (remainingSprites === 0) {
                        document.getElementById('result').innerText = `Ваши покемоны: ${bestMatch.join(', ')}`;
                        src.delete();
                        gray.delete();
                    }
                };
            });
        });
}

function templateMatching(img1, img2) {
    const result = new cv.Mat();
    const matchMethod = cv.TM_CCOEFF_NORMED;

    try {
        cv.matchTemplate(img1, img2, result, matchMethod);

        // Инициализация переменных для minMaxLoc
        let minVal = 0;
        let maxVal = 0;
        let minLoc = new cv.Point();
        let maxLoc = new cv.Point();

        // Поиск минимальных и максимальных значений
        cv.minMaxLoc(result, { minVal: minVal, maxVal: maxVal, minLoc: minLoc, maxLoc: maxLoc });

        console.log('minVal:', minVal, 'maxVal:', maxVal);
        result.delete();
        return maxVal;
    } catch (error) {
        console.error('Ошибка при вызове cv.minMaxLoc:', error);
        result.delete();
        return -1; // Возвращаем невалидное значение при ошибке
    }
}
