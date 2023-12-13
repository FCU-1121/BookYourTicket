# app.py

from flask import Flask, render_template, request, jsonify, redirect, url_for
from flask_cors import CORS
import json


app = Flask(__name__)
CORS(app)  # 启用 CORS，允许跨域请求

with open('./static/json/myTickets.json', 'r', encoding='utf-8') as f:
    tickets = json.load(f)['myTickets']

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

@app.route('/myTicket/received')
def received():
    return render_template('myticket/received.html', title = 'YourTicket', tickets=tickets)

@app.route('/myTicket/unpaid')
def unpaid():
    return render_template('myticket/unpaid.html', title='Tickets', tickets=tickets)

@app.route('/myTickets/details', methods=['POST', 'GET'])
def show_details():
    data = request.get_json()
    ticket = next((t for t in tickets if t['orderID'] == data['orderID']), None)
    print(ticket)
    return render_template('myticket/details.html', title='Ticket Details', ticket=ticket)

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
        with open('./static/json/config.json', 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=2, ensure_ascii=False)
        return jsonify({"status": "success"})

    except Exception as e:
        # 如果有錯誤，回傳一個表示失敗的JSON
        return jsonify({"status": "error", "message": str(e)})


@app.route('/updateMyTickets', methods=['POST'])
def updateMyTickets():
    with open('./static/json/myTickets.json', 'r', encoding='utf-8') as file:
        data = json.load(file)
    try:
        # 從請求的JSON主體中解析數據
        newTicket = request.get_json()
        print(newTicket)
        data["myTickets"].append(newTicket)
        print(data["myTickets"])
        with open('./static/json/myTickets.json', 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=2, ensure_ascii=False)
        return jsonify({"status": "success"})

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

@app.route('/payMeMoney/<ticketID>', methods=['POST'])
def payMeMoney(ticketID):
    for t in tickets:
        if t['orderID'] == ticketID:
            t['orderDetails'][0]['value'] = "已付款"
    with open('./static/json/myTickets.json', 'w', encoding='utf-8') as f:
        data = {'myTickets': tickets}
        json.dump(data, f, indent=2, ensure_ascii=False)
    return redirect(url_for('unpaid'))

if __name__ == '__main__':
    app.run(debug=True, port = 5001)
