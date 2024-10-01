from flask import Flask, request, render_template, redirect, url_for
import os
from pokemon_recognizer import process_image  # Импортируйте функцию обработки

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return redirect(request.url)
    file = request.files['file']
    if file.filename == '':
        return redirect(request.url)
    if file and allowed_file(file.filename):
        filename = file.filename
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        # Запуск обработки изображения
        sprite_dir = 'sprites'
        sprite_list_path = 'sprites/sprite_list.json'
        matched_pokemon = process_image(file_path, sprite_dir, sprite_list_path)
        
        return render_template('result.html', pokemon=matched_pokemon)
    else:
        return 'File type not allowed'

if __name__ == '__main__':
    app.run(debug=True)
