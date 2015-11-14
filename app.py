from flask import Flask, render_template, request
import json
from bson import json_util
from bson.objectid import ObjectId
from pymongo import Connection

app = Flask(__name__)
connection = Connection('localhost', 27017)
db = connection.foo

def toJson(data):
    return json.dumps(data, default=json_util.default)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/users', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        results = db['users'].find()
        json_results = []
        for result in results:
            json_results.append(result)
        return toJson(json_results)

    if request.method == 'POST':
        data = request.form.get('data')
        # should add validation step here
        db['users'].insert(data)
        return 200
    return 404

@app.route('/api/users/<user_id>', methods=['GET'])
def user(user_id):
    if request.method == 'GET':
        result = db['users'].find_one({'_id': ObjectId(user_id)})
        return toJson(result)
    return 404

@app.route('/api/sell_posts/', methods=['GET', 'POST'])
def posts():
    if request.method == 'GET':
        results = db['sell_posts'].find()
        json_results = []
        for result in results:
            json_results.append(result)
        return toJson(json_results)
    
    if request.method == 'POST':
        data = request.form.get('data')
        # should add validation step here
        db['sell_posts'].insert(data)
        return 200
    return 404

@app.route('/api/sell_posts/<post_id>', methods=['GET'])
def post(post_id):
    if request.method == 'GET':
        result = db['sell_posts'].find_one({'_id': ObjectId(post_id)})
        return toJson(result)
    return 404


@app.route('/api/buy_posts/', methods=['GET', 'POST'])
def posts():
    if request.method == 'GET':
        results = db['buy_posts'].find()
        json_results = []
        for result in results:
            json_results.append(result)
        return toJson(json_results)
    
    if request.method == 'POST':
        data = request.form.get('data')
        # should add validation step here
        db['buy_posts'].insert(data)
        return 200
    return 404

@app.route('/api/buy_posts/<post_id>', methods=['GET'])
def post(post_id):
    if request.method == 'GET':
        result = db['buy_posts'].find_one({'_id': ObjectId(post_id)})
        return toJson(result)
    return 404

if __name__ == '__main__':
    app.debug = True
    app.run()
