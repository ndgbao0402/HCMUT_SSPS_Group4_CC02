from flask import Flask, request, redirect, url_for, render_template, jsonify, session
import os
import hashlib
from datetime import datetime
app = Flask(__name__, template_folder='templates')

# Dữ liệu tài khoản (hardcoded)
def hash_password_sha256(password):
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

users = {
    "SPSO": {
        "password": "787530c740bcc078f882bb6d63a9feb9a648596e617e894f06405f059cffeb58",
        "phone": "0123456789",
        "email": "spso@example.com"
    },
    "user": {
        "password": "d04b98f48e8f8bcc15c6ae5ac050801cd6dcfd428fb5f9e65c4e16e7807340fa",
        "name": "Nguyễn Văn A",
        "StudentID": "2248987",
        "phone": "0929283473",
        "email": "vana@hcmut.edu.vn",
        "page": 50,
        "usedpage":0,
        "printtimes":0
    },
    "user2": {
        # "password": "d04b98f48e8f8bcc15c6ae5ac050801cd6dcfd428fb5f9e65c4e16e7807340fa",
        "name": "Nguyễn Văn B",
        "StudentID": "2248988",
        "phone": "0929283478",
        "email": "vanb@hcmut.edu.vn",
        "page": 30,
        "usedpage":0,
        "printtimes":0
    },
    
}
bank ={
    "BKpay": {
        "Bankname": "OCB: Ngân hàng TMCP Phương Đông",
        "Accountnum": "123456789",
        "Accountname": "Nguyễn Văn A"

    }
}
app.secret_key = '1234'
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        # Kiểm tra thông tin tài khoản
        if username in users and users[username]['password'] == hash_password_sha256(password):
            session['StudentID'] = users[username].get('StudentID')  # Lưu StudentID vào session
            print(session)
            if username == 'SPSO':
                return redirect(url_for('dash_SPSO'))
            elif username.lower() == 'user':
                return redirect(url_for('dash_Stu'))
        else:
            error = "Sai tài khoản hoặc mật khẩu. Vui lòng thử lại!"
            return render_template('login.html', error=error)
    return render_template('login.html')
@app.route('/get_student_id', methods=['GET'])
def get_student_id():
    print("Session content:", session) 
    if 'StudentID' in session:
        return jsonify({"success": True, "StudentID": session['StudentID']})
    return jsonify({"success": False, "message": "User not logged in"}), 401
@app.route('/get_users', methods=['GET'])
def get_users():
    # Lấy tháng hiện tại
    current_month = datetime.now().strftime("%Y-%m")

    # Cập nhật `page` trực tiếp trong `users` nếu chưa được cộng trong tháng này
    for username, user in users.items():
        if "StudentID" in user:
            # Kiểm tra nếu chưa có `last_updated` hoặc không phải tháng hiện tại
            last_updated = user.get("last_updated", "")
            if last_updated != current_month:
                # Cộng thêm `default_pages` vào `page`
                user["page"] += default_pages
                # Cập nhật `last_updated` thành tháng hiện tại
                user["last_updated"] = current_month
                print(f"Updated page for user {username}: {user['page']} (Month: {current_month})")

    # Trả lại dữ liệu `users` sau khi cập nhật
    return jsonify(users)
@app.route('/get_user_info', methods=['GET'])
def get_user_info():
    if 'StudentID' not in session:
        return jsonify({"success": False, "message": "User not logged in"}), 401

    # Retrieve StudentID from session
    student_id = session['StudentID']

    # Find the user by StudentID
    user = next((u for u in users.values() if u.get("StudentID") == student_id), None)
    if not user:
        return jsonify({"success": False, "message": "User not found"}), 404

    # Prepare the response with page, usedpage, and printtimes
    response = {
        "success": True,
        "StudentID": student_id,
        "page": user.get("page", 0),
        "usedpage": user.get("usedpage", 0),
        "printtimes": user.get("printtimes", 0)
    }

    return jsonify(response)
@app.route('/get_user_details', methods=['GET'])
def get_user_details():
    if 'StudentID' not in session:
        return jsonify({"success": False, "message": "User not logged in"}), 401

    # Retrieve StudentID from session
    student_id = session['StudentID']

    # Find the user by StudentID
    user = next((u for u in users.values() if u.get("StudentID") == student_id), None)
    if not user:
        return jsonify({"success": False, "message": "User not found"}), 404

    # Return detailed user information
    response = {
        "success": True,
        "StudentID": user.get("StudentID"),
        "name": user.get("name"),
        "phone": user.get("phone"),
        "email": user.get("email"),
        "page": user.get("page", 0),
        "usedpage": user.get("usedpage", 0),
        "printtimes": user.get("printtimes", 0),
    }

    return jsonify(response)
@app.route('/get_bank_info', methods=['GET'])
def get_bank_info():
    # Get the bank parameter from the query string
    bank_name = request.args.get('bank', '')

    # Find the bank information
    bank_info = bank.get(bank_name)
    if not bank_info:
        return jsonify({"success": False, "message": "Bank not found"}), 404

    return jsonify({"success": True, "data": bank_info})
@app.route('/')
def home():
    return render_template('index.html')
@app.route('/dash_Stu')
def dash_Stu():
    return render_template('dash_Stu.html')

@app.route('/upload')
def upload():
    return render_template('upload.html')
@app.route('/file_page_Stu')
def filepageStu():
    return render_template('file_page.html')
@app.route('/printMagStu')
def printMagStu():
    return render_template('printMagStu.html')
@app.route('/view_reports')
def view_reports():
    total_pages = 9  # Total number of pages

    # Get the current page number from the URL parameter, default to 1 if not provided
    try:
        page = int(request.args.get('page', 1))  # Get the 'page' parameter from the query string
    except ValueError:
        page = 1  # Default to page 1 if 'page' is not an integer
    # Ensure the page is within bounds
    if page < 1:
        page = 1
    if page > total_pages:
        page = total_pages

    # Determine the range of pages to show (e.g., 1, 2, 3, 4, ... 9)
    if total_pages <= 5:
        start_page = 1
        end_page = total_pages
    else:
        if page <= 3:
            start_page = 1
            end_page = 4
        elif page > total_pages - 2:
            start_page = total_pages - 5
            end_page = total_pages
        else:
            start_page = page - 2
            end_page = page + 1

    page_range = list(range(start_page, end_page + 1))
    user_data = {key: value for key, value in users.items() if "user" in key.lower()}

    return render_template('view_reports.html', user=user_data, current_page=page, total_pages=total_pages, page_range=page_range)

printers = [
    {
        "id": "B1-1",
        "name": "Máy in B1-1",
        "brand": "Epson",
        "model": "Epson EcoTank ET-3760",
        "date": "21/10/2024",
        "pages": 238,
        "description": "Tốc độ in 24 trang/phút. Máy in đa chức năng. Sức chứa giấy 500 tờ.",
        "location": "Cơ sở 1, tòa B1, phòng B1-101"
    },
    {
        "id": "B1-2",
        "name": "Máy in B1-2",
        "brand": "Canon",
        "model": "Canon PIXMA G6020",
        "date": "22/10/2024",
        "pages": 182,
        "description": "Máy in không dây, tốc độ in 13 trang/phút. Hỗ trợ in màu và in hai mặt tự động. Dung lượng giấy 350 tờ.",
        "location": "Cơ sở 1, tòa B1, phòng B1-102"
    },
    {
        "id": "B4-1",
        "name": "Máy in B4-1",
        "brand": "Brother",
        "model": "Brother MFC-L2750DW",
        "date": "23/10/2024",
        "pages": 450,
        "description": "Máy in laser đa chức năng. Tốc độ in 36 trang/phút. Hỗ trợ in di động và in hai mặt tự động. Khay giấy 250 tờ.",
        "location": "Cơ sở 4, tòa B4, phòng B4-101"
    },
    {
        "id": "B6-1",
        "name": "Máy in B6-1",
        "brand": "HP",
        "model": "HP LaserJet Pro MFP M428fdw",
        "date": "24/10/2024",
        "pages": 305,
        "description": "Máy in laser đa năng, tốc độ in 40 trang/phút. Hỗ trợ in không dây và in hai mặt. Sức chứa giấy 350 tờ.",
        "location": "Cơ sở 6, tòa B6, phòng B6-101"
    }
]

@app.route('/get_printers', methods=['GET'])
def get_printers():
    return jsonify(printers)


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
default_pages = 100
default_date = 20
CURRENCY = 2000  # Currency value in VND

@app.route('/get_currency', methods=['GET'])
def get_currency():
    """Returns the current currency value."""
    return jsonify({"currency": CURRENCY})
@app.route("/check_pages", methods=["POST"])
def check_pages():
    data = request.get_json()

    # Extract and validate input parameters
    try:
        username = data.get("username")
        if not username or username not in users:
            return jsonify(success=False, message="Invalid or missing username!")

        paper_size = 1 if data.get("paperSize") == "A4" else 2
        print_mode = 1 if data.get("printMode") == "oneside" else 2
        page_count = int(data.get("pageCount", 0))
        copy_count = int(data.get("copyCount", 0))
    except (KeyError, ValueError) as e:
        return jsonify(success=False, message=f"Invalid input: {str(e)}")

    # Perform the calculation
    calculated_pages = paper_size * (page_count / print_mode) * copy_count

    # Retrieve user data
    user = users.get(username)
    if not user or "StudentID" not in user:
        return jsonify(success=False, message="User does not have a valid StudentID!")

    # Retrieve user's page allowance
    user_page = user.get("page", 0)
    print(f"Username: {username}, User Page Allowance: {user_page}, Calculated Pages: {calculated_pages}")

    # Check against user's allowed limit
    if calculated_pages <= user_page:
        return jsonify(success=True, message="The operation is valid.")
    else:
        return jsonify(success=False, message="The operation exceeds the allowed page limit.")

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
    return jsonify({"pages":default_pages})
@app.route("/get_default_date", methods=["GET"])
def get_default_date():
    return jsonify({"date": default_date})
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
    """Updates the default date if valid input is provided."""
    global default_date
    data = request.get_json()
    try:
        # Validate and update the date
        new_date = int(data["date"])
        if new_date < 1 or new_date > 31:  # Assume day ranges from 1 to 31
            return jsonify(success=False, message="Ngày phải nằm trong khoảng từ 1 đến 31!")

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
@app.route('/defaulttypeStu.html')
def defaulttypeStu():
    return render_template('defaulttypeStu.html')
@app.route('/defaultpageStu.html')
def defaultpageStu():
    return render_template('defaultpageStu.html')
@app.route('/defaultdateStu.html')
def defaultdateStu():
    return render_template('defaultdateStu.html')
@app.route('/file_page_setting')
def file_page_setting():
    return render_template('file_page_setting.html', default_date=default_date, default_pages=default_pages)
# @app.route('/file_page_setting.html')
# def file_page_settinghtml():
#     return render_template('file_page_setting.html')
@app.route('/buypage')
def buy_page():
    return render_template('popup_buypage.html')
print_data = [] 
@app.route('/save_print_data', methods=['POST'])
def save_print_data():
    global print_data  # Access the global list
    try:
        if 'StudentID' not in session:
            return jsonify({"success": False, "message": "User not logged in"}), 401

        student_id = session['StudentID']
        # Get data from the client
        data = request.get_json()

        # Validate required fields
        required_fields = ['printerId', 'paperSize', 'pageCount', 'copyCount', 'printMode', 'timestamp']
        if not all(field in data for field in required_fields):
            return jsonify({"success": False, "message": "Missing required fields"}), 400

        # Retrieve the user by StudentID
        user = next((u for u in users.values() if u.get("StudentID") == student_id), None)
        if not user:
            return jsonify({"success": False, "message": "User not found"}), 404

        # Initialize printtimes and usedpage if not already present
        if "printtimes" not in user:
            user["printtimes"] = 0
        if "usedpage" not in user:
            user["usedpage"] = 0

        # Calculate used pages
        paperSize = 1 if data.get("paperSize") == "A4" else 2
        printMode = 1 if data.get("printMode") == "oneside" else 2
        pageCount = int(data.get("pageCount", 0))
        copyCount = int(data.get("copyCount", 0))
        usedpages = paperSize * (pageCount / printMode) * copyCount

        # Check if the user has enough pages
        if user["page"] < usedpages:
            return jsonify({"success": False, "message": "Not enough pages available"}), 400

        # Deduct the used pages from the user's available pages
        user["page"] -= usedpages

        # Increment printtimes and add usedpages to usedpage
        user["printtimes"] += 1
        user["usedpage"] += usedpages
        print(f"Updated user {user['StudentID']}: Remaining pages: {user['page']}, Used pages: {user['usedpage']}, Print times: {user['printtimes']}")

        # Assign StudentID from session
        data['StudentID'] = student_id

        # Generate a unique ID if not provided
        if 'id' not in data or not data['id']:
            data['id'] = len(print_data) + 1  # Generate unique ID based on list length

        # Append the new record to the global list
        print_data.append(data)

        return jsonify({
            "success": True,
            "message": "Data saved successfully",
            "printtimes": user["printtimes"],
            "usedpage": user["usedpage"],
            "print_data": print_data
        }) 
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500



@app.route('/get_print_data', methods=['GET'])
def get_print_data():
    return jsonify(print_data)
@app.route('/get_print_data_Stu', methods=['GET'])
def get_print_data_Stu():
    if 'StudentID' not in session:
        return jsonify({"success": False, "message": "User not logged in"}), 401

    # Lấy StudentID từ session
    student_id = session['StudentID']

    # Lọc dữ liệu print_data theo StudentID
    user_print_data = [entry for entry in print_data if entry.get("StudentID") == student_id]

    return jsonify(user_print_data)
purchase_data = []  # Global list to store all purchase records

@app.route('/save_purchase', methods=['POST'])
def save_purchase():
    try:
        # Check if the user is logged in
        if 'StudentID' not in session:
            return jsonify({"success": False, "message": "User not logged in"}), 401

        # Get StudentID from session
        student_id = session['StudentID']

        # Get data from the request
        data = request.get_json()
        num_pages = int(data.get("numberOfPages", 0))
        bank = data.get("bank", "")

        # Validate the input
        if num_pages <= 0:
            return jsonify({"success": False, "message": "Invalid number of pages"})

        # Find the user by StudentID
        user = next((u for u in users.values() if u.get("StudentID") == student_id), None)
        if not user:
            return jsonify({"success": False, "message": "User not found"}), 404

        # Update the user's page count
        user['page'] += num_pages

        # Create a purchase record
        purchase_record = {
            "StudentID": student_id,
            "name": user["name"],
            "phone": user["phone"],
            "email": user["email"],
            "numberOfPages": num_pages,
            "currency": CURRENCY,
            "totalAmount": num_pages * CURRENCY,
            "bank": bank,
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }

        # Save the record to the global list
        purchase_data.append(purchase_record)

        return jsonify({"success": True, "message": "Purchase saved successfully", "data": purchase_record})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})

@app.route('/get_save_purchase', methods=['GET'])
def get_save_purchase():
    try:
        return jsonify({"success": True, "data": purchase_data})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})

if __name__ == '__main__':
    app.run(debug=True,port=5001)
