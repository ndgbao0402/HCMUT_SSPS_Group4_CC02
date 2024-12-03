from flask import Flask, request, redirect, url_for, render_template
import os
# Khởi tạo Flask và chỉ định đường dẫn đến thư mục chứa templates
app = Flask(__name__, template_folder='templates')

# Dữ liệu tài khoản (hardcoded)
users = {
    "SPSO": "bkhcm",
    "user": "hash"
}

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        if username in users and users[username] == password:
            if username == 'SPSO':
                return redirect(url_for('dash_SPSO'))
            elif username == 'user':
                return redirect(url_for('dash_Stu'))
        else:
            error = "Sai tài khoản hoặc mật khẩu. Vui lòng thử lại!"
            return render_template('login.html', error=error)
    return render_template('login.html')

@app.route('/dash_SPSO')
def dash_SPSO():
    return render_template('dash_SPSO.html')

@app.route('/dash_Stu')
def dash_Stu():
    return render_template('dash_Stu.html')

@app.route('/upload')
def upload():
    return render_template('upload.html')

@app.route('/view_reports')
def view_reports():
    return render_template('view_reports.html')

UPLOAD_FOLDER = 'uploads'  # Thư mục lưu file
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Tạo thư mục nếu chưa tồn tại
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return "No file part", 400  # Trả lỗi nếu không có file
    file = request.files['file']
    if file.filename == '':
        return "No selected file", 400  # Trả lỗi nếu file không có tên
    if file:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)  # Lưu file vào thư mục
        return f"File {file.filename} uploaded successfully!"
    return "Upload failed", 500


if __name__ == '__main__':
    app.run(debug=True)
