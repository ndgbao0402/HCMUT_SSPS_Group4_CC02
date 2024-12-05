from flask import Flask, request, redirect, url_for, render_template,jsonify
import os
import hashlib

app = Flask(__name__, template_folder='templates')

# Dữ liệu tài khoản (hardcoded)
def hash_password_sha256(password):
    return hashlib.sha256(password.encode('utf-8')).hexdigest()
# Dữ liệu tài khoản (hardcoded)
users = {
    "SPSO": "787530c740bcc078f882bb6d63a9feb9a648596e617e894f06405f059cffeb58",
    "user": "d04b98f48e8f8bcc15c6ae5ac050801cd6dcfd428fb5f9e65c4e16e7807340fa"
}
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        # So sánh hash của mật khẩu nhập vào
        if username in users and users[username] == hash_password_sha256(password):
            if username == 'SPSO':
                return redirect(url_for('dash_SPSO'))
            elif username == 'user':
                return redirect(url_for('dash_Stu'))
        else:
            error = "Sai tài khoản hoặc mật khẩu. Vui lòng thử lại!"
            return render_template('login.html', error=error)
    return render_template('login.html')

@app.route('/')
def home():
    return render_template('index.html')



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



# Dữ liệu tài khoản (hardcoded)

file_types = [
    ".bmp", ".c", ".cpp", ".csv", ".css", ".docx", ".eps",
    ".gif", ".heif", ".html", ".jpeg", ".js", ".pdf",
    ".png", ".pptx", ".psd", ".tiff", ".xlsx", ".xps"
]
default_pages = 10
default_date = 20


@app.route('/file-types', methods=['GET'])
def get_file_types():
    return jsonify({"fileTypes": file_types})

@app.route('/add-file-type', methods=['POST'])
def add_file_type():
    new_file_type = request.json.get("fileType")
    if new_file_type and new_file_type not in file_types:
        file_types.append(new_file_type)
        file_types.sort()  # Keep the list sorted
        return jsonify({"message": "File type added successfully", "fileTypes": file_types})
    return jsonify({"message": "File type already exists or invalid input"}), 400
@app.route('/remove-file-type', methods=['POST'])
def remove_file_type():
    file_type_to_remove = request.json.get("fileType")
    if file_type_to_remove in file_types:
        file_types.remove(file_type_to_remove)
        return jsonify({"message": "File type removed successfully", "fileTypes": file_types})
    return jsonify({"message": "File type not found"}), 404

@app.route("/get_default_pages", methods=["GET"])
def get_default_pages():
    return jsonify(pages=default_pages)
@app.route("/update_pages", methods=["POST"])
def update_pages():
    global default_pages
    data = request.get_json()

    try:
        # Validate and update the number of pages
        new_pages = int(data["pages"])
        if new_pages < 0:
            return jsonify(success=False, message="Số trang không được nhỏ hơn 0!")

        default_pages = new_pages
        return jsonify(success=True, pages=default_pages)
    except (KeyError, ValueError):
        return jsonify(success=False, message="Dữ liệu không hợp lệ!")
@app.route("/update_date", methods=["POST"])
def update_date():
    global default_pages
    data = request.get_json()

    try:
        # Validate and update the number of pages
        new_date = int(data["date"])
        if new_date < 0:
            return jsonify(success=False, message="Ngày không được nhỏ hơn 0!")

        default_date = new_date
        return jsonify(success=True, date=default_date)
    except (KeyError, ValueError):
        return jsonify(success=False, message="Dữ liệu không hợp lệ!")

@app.route('/dash_SPSO')
def dash_SPSO():
    return render_template('dash_SPSO.html')

@app.route('/dash_SPSO.html')
def dash_SPSOhtml():
    return render_template('dash_SPSO.html')

@app.route('/popup_file_types.html')
def popup_file_types():
    return render_template('popup_file_types.html')

@app.route('/popup_default_pages.html')
def popup_default_pages():
    return render_template('popup_default_pages.html')

@app.route('/popup_default_date.html')
def popup_default_date():
    return render_template('popup_default_date.html')


@app.route('/file_page_setting')
def file_page_setting():
    return render_template('file_page_setting.html')
@app.route('/file_page_setting.html')
def file_page_settinghtml():
    return render_template('file_page_setting.html')




if __name__ == '__main__':
    app.run(debug=True,port=5001)
