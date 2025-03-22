import time
import re
import pyautogui
import easyocr

# Укажи координаты области чата вручную, если нужно
CHAT_REGION = (50, 750, 400, 200)  # (x, y, width, height)

# Инициализация OCR
reader = easyocr.Reader(['ru'])

def extract_time(text):
    match = re.search(r"(\d+) мин(?:ут[ы]?)? и (\d+) сек", text)
    if match:
        minutes, seconds = map(int, match.groups())
        return minutes * 60 + seconds
    return None

def main():
    remaining_time = 0
    last_detected = ""
    
    while True:
        screenshot = pyautogui.screenshot(region=CHAT_REGION)
        text_list = reader.readtext(screenshot, detail=0)
        text = " ".join(text_list)
        
        if text and text != last_detected:
            new_time = extract_time(text)
            if new_time:
                remaining_time = new_time
                last_detected = text
                print(f"Таймер обновлён: {remaining_time // 60} мин {remaining_time % 60} сек")
        
        if remaining_time > 0:
            remaining_time -= 1
            mins, secs = divmod(remaining_time, 60)
            print(f"Осталось: {mins} мин {secs} сек", end="\r")
        
        time.sleep(1)

if __name__ == "__main__":
    main()
