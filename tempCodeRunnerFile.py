from flask import Flask, request, redirect, url_for, render_template

# Khởi tạo Flask và chỉ định đường dẫn đến thư mục chứa templates
app = Flask(__name__, template_folder='/Templates')

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

if __name__ == '__main__':
    app.run(debug=True)
