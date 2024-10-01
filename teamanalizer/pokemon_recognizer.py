import cv2
import numpy as np
import json
import os

def load_image(file_path):
    """Загрузка изображения в оттенках серого."""
    return cv2.imread(file_path, cv2.IMREAD_GRAYSCALE)

def template_matching(img, template):
    """Сопоставление шаблона."""
    result = cv2.matchTemplate(img, template, cv2.TM_CCOEFF_NORMED)
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)
    return max_val

def process_image(image_path, sprite_dir, sprite_list_path):
    """Обработка изображения команды для распознавания покемонов."""
    img = load_image(image_path)

    with open(sprite_list_path, 'r') as f:
        sprite_list = json.load(f)

    best_matches = []
    for sprite in sprite_list:
        sprite_img_path = os.path.join(sprite_dir, sprite['filename'])
        sprite_img = load_image(sprite_img_path)
        match = template_matching(img, sprite_img)
        if match > 0.9:  # Порог совпадения
            best_matches.append(sprite['name'])

    return best_matches

if __name__ == "__main__":
    # Путь к изображению команды
    image_path = 'path_to_your_image.png'

    # Путь к директории со спрайтами и JSON-файлу
    sprite_dir = 'sprites'
    sprite_list_path = 'sprites/sprite_list.json'
    
    matched_pokemon = process_image(image_path, sprite_dir, sprite_list_path)
    print("Ваши покемоны:", ', '.join(matched_pokemon))
