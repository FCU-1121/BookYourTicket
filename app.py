from flask import Flask
app = Flask(__name__)

@app.route('/')
@app.route('/login')
def homePage():
    return 'Hello World\n'

@app.route('/yourTicket')
def yourTicket():
    return 'Your Ticket\n'

@app.route('/bookTicket')
# Schedule Check in this page
def bookTicket():
    return 'Start Book\n'


if __name__ == '__main__':
    app.run(debug = True, port = 5050)

