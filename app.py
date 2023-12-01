# app.py

from flask import Flask, render_template

app = Flask(__name__)

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

@app.route('/setting')
def setting():
    return render_template('setting.html', title = 'Setting')


if __name__ == '__main__':
    app.run(debug=True, port = 5000)
