# app.py

from flask import Flask, render_template, request, jsonify, make_response
from flask_cors import CORS
import json


app = Flask(__name__)
CORS(app)  # 启用 CORS，允许跨域请求

@app.route('/')
@app.route('/bookTicket')
def bookTicket():
    return render_template('bookticket.html', title = 'Bookticket')

@app.route('/about')
def about():
    return render_template('about.html', title = 'About')

@app.route('/notification')
def notification():
    return render_template('notification.html', title='Notification')

@app.route('/myTicket')
def myTicket():
    return render_template('myticket.html', title = 'YourTicket')

@app.route('/showTickets')
def showTickets():
    return render_template('bookticket2.html', title = "ShowTickets")

@app.route('/setting')
def setting():
    return render_template('setting.html', title = 'Setting')

@app.route('/updateConfigOfTime', methods=['POST'])
def updateConfigOfTime():
    
    try:
        with open('./static/json/config.json', 'r') as file:
            data = json.load(file)
        # 從請求的JSON主體中解析數據
        startTime = request.get_json()
        print(startTime)
        data["startDate"] = startTime["Date"]
        data["startTime"] = startTime["Time"]
        print(data)
        with open('./static/json/config.json', 'w') as file:
            json.dump(data, file, indent=2, ensure_ascii=False)
        return jsonify({"status": "success"})

    except Exception as e:
        # 如果有錯誤，回傳一個表示失敗的JSON
        return jsonify({"status": "error", "message": str(e)})
    
@app.route('/updateConfigOfPosition', methods=['POST'])
def updateConfigOfPosition():
    with open('./static/json/config.json', 'r') as file:
        data = json.load(file)
    try:
        # 從請求的JSON主體中解析數據
        startendPosition = request.get_json()
        print(startendPosition)
        data["startPosition"] = startendPosition["start-position"]
        data["endPosition"] = startendPosition["end-position"]
        print(data)
        with open('./static/json/config.json', 'w') as file:
            json.dump(data, file, indent=2, ensure_ascii=False)
        return jsonify({"status": "success"})

    except Exception as e:
        # 如果有錯誤，回傳一個表示失敗的JSON
        return jsonify({"status": "error", "message": str(e)})


@app.route('/updateMyTickets', methods=['POST'])
def updateMyTickets():
    with open('./static/json/myTickets.json', 'r') as file:
        data = json.load(file)
    try:
        # 從請求的JSON主體中解析數據
        newTicket = request.get_json()
        print(newTicket)
        data["myTickets"].append(newTicket)
        print(data["myTickets"])
        with open('./static/json/myTickets.json', 'w') as file:
            json.dump(data, file, indent=2, ensure_ascii=False)
        return jsonify({"status": "success"})

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})


if __name__ == '__main__':
    app.run(debug=True, port = 5004)
