# app.py

from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import json


app = Flask(__name__)
CORS(app)  # 启用 CORS，允许跨域请求

@app.route('/')
def home():
    return render_template('home.html', title='Home')

@app.route('/about')
def about():
    return render_template('about.html', title = 'About')

@app.route('/notification')
def notification():
    return render_template('notification.html', title='Notification')

@app.route('/myTicket')
def myTicket():
    return render_template('myticket.html', title = 'YourTicket')

@app.route('/bookTicket')
def bookTicket():
    return render_template('bookticket.html', title = 'Bookticket')

@app.route('/showTickets')
def showTickets():
    return render_template('bookticket2.html', title = "ShowTickets")

@app.route('/setting')
def setting():
    return render_template('setting.html', title = 'Setting')

@app.route('/updateConfig', methods=['POST'])
def updateConfig():
    with open('./static/json/config.json', 'r') as file:
        data = json.load(file)
    try:
        # 從請求的JSON主體中解析數據
        start_time = request.get_json()
        print(start_time)
        data["startDate"] = start_time["Date"]
        data["startTime"] = start_time["Time"]
        print(data)
        with open('./static/json/config.json', 'w') as file:
            json.dump(data, file, indent=2, ensure_ascii=False)
        return jsonify({"status": "success"})


        # # 在這裡處理start_time，你可以更新伺服器端的數據，或者進行其他操作
        # # 這裡只是一個簡單的例子，回傳一個表示成功的JSON
        # return jsonify({"status": "success", "message": f"Received start time: {start_time}"})

    except Exception as e:
        # 如果有錯誤，回傳一個表示失敗的JSON
        return jsonify({"status": "error", "message": str(e)})

    # with open('config.json', 'r') as file:
    #     data = json.load(file)
    # print("原始数据:", data)


if __name__ == '__main__':
    app.run(debug=True, port = 5004)
