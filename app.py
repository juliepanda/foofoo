from flask import Flask, render_template, request, jsonify, Response
import json
from bson import json_util
from bson.objectid import ObjectId
from pymongo import Connection
from flask_mime import Mime
from cors import crossdomain

app = Flask(__name__)
mimetype = Mime(app)
connection = Connection('localhost', 27017)
db = connection.foo

def toJson(data):
    return json.dumps(data, default=json_util.default)

@app.route('/api/people', methods=['GET', 'POST', 'OPTIONS'])
@crossdomain(origin='*')
def people():
    if request.method == 'GET':
        results = db['people'].find()
        json_results = []
        for result in results:
            json_results.append(result)
        return Response(toJson(json_results), status=200, mimetype='application/json')
    
    elif request.method == 'POST':
        js = request.json
        # should add validation step here
        netid = js['data']['attributes']['netid']
        res = db['people'].find_one({"data.attributes.netid": netid })
        if res == None:
            res = db['people'].insert(js)
            return Response(toJson(res), status=200, mimetype='application/json')
        else:
            return Response(json.dumps({"error": "person already exists"}), status=400, mimetype='application/json')
    else:
        return 404


@app.route('/api/people/<person_id>', methods=['GET', 'PATCH', 'OPTIONS'])
def get_person(person_id):
    if request.method == 'GET':
        result = db['people'].find_one({'_id': ObjectId(person_id)})
        return Response(toJson(result), status=200, mimetype='application/json')
    return 404

@app.route('/api/sell_posts/', methods=['GET', 'POST'])
def sell_posts():
    if request.method == 'GET':
        results = db['sell_posts'].find()
        json_results = []
        for result in results:
            json_results.append(result)
        return toJson(json_results)
    
    if request.method == 'POST':
        data = request.json
        # should add validation step here
        db['sell_posts'].insert(data)
        return 200
    return 404

@app.route('/api/sell_posts/<post_id>', methods=['GET'])
def get_sell_post(post_id):
    if request.method == 'GET':
        result = db['sell_posts'].find_one({'_id': ObjectId(post_id)})
        return toJson(result)
    return 404


@app.route('/api/buy_posts/', methods=['GET'])
def get_buy_posts():
    if request.method == 'GET':
        results = db['buy_posts'].find()
        json_results = []
        for result in results:
            json_results.append(result)
        return toJson(json_results)

@app.route('/api/buy_posts/', methods=['POST'])
def post_buy_posts():
    if request.method == 'POST':
        data = request.json
        # should add validation step here
        db['buy_posts'].insert(data)
        return 200
    return 404

@app.route('/api/buy_posts/<post_id>', methods=['GET'])
def get_buy_post(post_id):
    if request.method == 'GET':
        result = db['buy_posts'].find_one({'_id': ObjectId(post_id)})
        return toJson(result)
    return 404

if __name__ == '__main__':
    app.debug = True
    app.run()
