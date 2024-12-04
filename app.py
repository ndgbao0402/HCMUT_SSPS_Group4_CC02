from flask import Flask, jsonify, request, redirect, url_for, render_template

# Khởi tạo Flask và chỉ định đường dẫn đến thư mục chứa templates
app = Flask(__name__, template_folder='templates')

# Dữ liệu tài khoản (hardcoded)
users = {
    "SPSO": "bkhcm",
    "user": "hash"
}
file_types = [
    ".bmp", ".c", ".cpp", ".csv", ".css", ".docx", ".eps",
    ".gif", ".heif", ".html", ".jpeg", ".js", ".pdf",
    ".png", ".pptx", ".psd", ".tiff", ".xlsx", ".xps"
]
default_pages = 10
default_date = 20
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
@app.route('/dash_Stu')
def dash_Stu():
    return render_template('dash_Stu.html')

@app.route('/file_page_setting')
def file_page_setting():
    return render_template('file_page_setting.html')
@app.route('/file_page_setting.html')
def file_page_settinghtml():
    return render_template('file_page_setting.html')
@app.route('/upload')
def upload():
    return render_template('upload.html')

@app.route('/view_reports')
def view_reports():
    return render_template('view_reports.html')

if __name__ == '__main__':
    app.run(debug=True,port=5001)
