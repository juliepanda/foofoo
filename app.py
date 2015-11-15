from flask import Flask, render_template, request, jsonify, Response
import json, datetime
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

@app.route('/api/login', methods=['POST', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def login():
    if request.method == 'POST':
        js = request.json
        netid = js['netid']
        pw = js['password']
        res = db['people'].find_one({"data.attributes.netid": netid, "data.attributes.password": pw})
        if res == None:
            return Response(json.dumps({'error': 'invalid login'}), status=400, mimetype='application/json')
        else:
            return Response(toJson(res), status=200, mimetype='application/json')
    else:
        return Response(json.dumps({"error": "NOT FOUND"}), status=404, mimetype='application/json')


@app.route('/api/people', methods=['GET', 'POST', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def people():
    if request.method == 'GET':
        results = db['people'].find()
        json_results = []
        for result in results:
            json_results.append(result)
        return Response(toJson(json_results), status=200, mimetype='application/json')
    
    if request.method == 'POST':
        js = request.json
        netid = js['data']['attributes']['netid']
        res = db['people'].find_one({"data.attributes.netid": netid })
        if res == None:
            res = db['people'].insert(js)
            return Response(toJson(res), status=200, mimetype='application/json')
        else:
            return Response(json.dumps({"error": "person already exists"}), status=400, mimetype='application/json')
    else:
        return Response(json.dumps({"error": "NOT FOUND"}), status=404, mimetype='application/json')


@app.route('/api/people/<person_id>', methods=['GET', 'PATCH', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def person(person_id):
    if request.method == 'GET':
        result = db['people'].find_one({'_id': ObjectId(person_id)})
        return Response(toJson(result), status=200, mimetype='application/json')
    if request.method == 'PATCH':
        js = request.json
        result = db['people'].find_one({'_id': ObjectId(person_id)})
        if result == None:
            return Response(json.dumps({"error": "person_id doesn't exist"}), status=400, mimetype='application/json')
        else:
            result = toJson(result)
            # add attributes
            try:
                attributes = js['data']['attributes']
                name = attributes.get('name', None)
                nNumber = attributes.get('nNumber', None)
                netid = attributes.get('netid', None)
                password = attributes.get('password', None)
                if name != None: db.people.update({"_id": ObjectId(person_id)}, {"$set": { "data.attributes.name": name }})
                if nNumber != None: db.people.update({"_id": ObjectId(person_id)}, {"$set": { "data.attributes.nNumber": nNumber }})
                if netid != None: db.people.update({"_id": ObjectId(person_id)}, {"$set": { "data.attributes.netid": netid }})
                if password != None: db.people.update({"_id": ObjectId(person_id)}, {"$set": { "data.attributes.password": password }})
                return Response(json.dumps({}), status=400, mimetype='application/json')
            except KeyError:
                return Response(json.dumps({"error": "json format not accurate"}), status=400, mimetype='application/json')
            # add links
    else:
        return Response(json.dumps({"error": "NOT FOUND"}), status=404, mimetype='application/json')

@app.route('/api/sell_posts', methods=['GET', 'POST', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def sell_posts():
    if request.method == 'GET':
        results = db['sell_posts'].find()
        json_results = []
        for result in results:
            json_results.append(result)
        return Response(toJson(json_results), status=200, mimetype='application/json')
    
    if request.method == 'POST':
        js = request.json
        seller_id = js['links']['seller']['_id']
        res = db['people'].find_one({"_id": ObjectId(seller_id)})
        if res == None:
            return Response(json.dumps({"error": "seller_id does not exist"}), status=404, mimetype='application/json')
        else:
            offset = js['data']['attributes']['days_until_expiration']
            now = datetime.datetime.now()
            diff = datetime.timedelta(days=offset)
            expired_by = now + diff
            js['data']['attributes']['expired_by'] = expired_by
            js['data']['attributes']['fulfilled'] = False
            if js['data']['attributes']['price'] != None and js['data']['attributes']['expired_by'] != None and len(js['data']['attributes']['locations']) > 0 and js['data']['type'] == 'sell_posts':
                res = db['sell_posts'].insert(js)
                post_id = json.loads(toJson(res))['$oid']
                if post_id != None:
                    db.people.update({"_id": ObjectId(seller_id)}, {"$push": { "links.sell_posts": { "_id": post_id } }})
                return Response(toJson(res), status=200, mimetype='application/json')
            else:
                return Response(json.dumps({"error": "missing required info"}), status=404, mimetype='application/json')
    else:
        return Response(json.dumps({"error": "NOT FOUND"}), status=404, mimetype='application/json')

@app.route('/api/sell_posts/<post_id>', methods=['GET', 'DELETE'])
@crossdomain(origin='*', headers='Content-Type')
def sell_post(post_id):
    if request.method == 'GET':
        result = db['sell_posts'].find_one({'_id': ObjectId(post_id)})
        return Response(toJson(result), status=200, mimetype='application/json')
    if request.method == 'DELETE':
        result = db['sell_posts'].remove({'_id': ObjectId(post_id)})
        return Response(toJson(result), status=200, mimetype='application/json')
    else:
        return Response(json.dumps({"error": "NOT FOUND"}), status=404, mimetype='application/json')


@app.route('/api/buy_posts', methods=['GET', 'POST', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def buy_posts():
    if request.method == 'GET':
        results = db['buy_posts'].find()
        json_results = []
        for result in results:
            json_results.append(result)
        return toJson(json_results)
    
    if request.method == 'POST':
        js = request.json
        buyer_id = js['links']['buyer']['_id']
        res = db['people'].find_one({"_id": ObjectId(buyer_id)})
        if res == None:
            return Response(json.dumps({"error": "buyer_id does not exist"}), status=404, mimetype='application/json')
        else:
            offset = js['data']['attributes']['days_until_expiration']
            now = datetime.datetime.now()
            diff = datetime.timedelta(days=offset)
            expired_by = now + diff
            js['data']['attributes']['expired_by'] = expired_by
            js['data']['attributes']['fulfilled'] = False
            print js['data']['type']
            if js['data']['attributes']['price'] != None and js['data']['attributes']['expired_by'] != None and len(js['data']['attributes']['locations']) > 0 and js['data']['type'] == 'buy_posts':
                res = db['buy_posts'].insert(js)
                post_id = json.loads(toJson(res))['$oid']
                if post_id != None:
                    db.people.update({"_id": ObjectId(buyer_id)}, {"$push": { "links.buy_posts": { "_id": post_id } }})
                return Response(toJson(res), status=200, mimetype='application/json')
            else:
                return Response(json.dumps({"error": "missing required info"}), status=404, mimetype='application/json')
    else:
        return Response(json.dumps({"error": "NOT FOUND"}), status=404, mimetype='application/json')

@app.route('/api/buy_posts/<post_id>', methods=['GET', 'DELETE'])
@crossdomain(origin='*', headers='Content-Type')
def buy_post(post_id):
    if request.method == 'GET':
        result = db['buy_posts'].find_one({'_id': ObjectId(post_id)})
        return Response(toJson(result), status=200, mimetype='application/json')
    if request.method == 'DELETE':
        result = db['buy_posts'].remove({'_id': ObjectId(post_id)})
        return Response(toJson(result), status=200, mimetype='application/json')
    else:
        return Response(json.dumps({"error": "NOT FOUND"}), status=404, mimetype='application/json')

@app.route('/api/buy_posts/nearest/<post_id>', methods=['POST'])
@crossdomain(origin='*', headers='Content-Type')
def find_best(post_id):
    result = db['buy_posts'].find_one({'_id': ObjectId(post_id)})
    js = toJson(result)
    us = json_util.loads(js)
    price = us['data']['attributes']['price']
    date = us['data']['attributes']['expired_by']
    locations = us['data']['attributes']['locations']
    used_map = {}
    for location in locations:
        res = db.sell_posts.find( {"data.attributes.locations": location, "data.attributes.expired_by": {"$gte": date }})
        for i in range(0, res.count()):
            used_map[res[i]['_id']] = res[i]
    final_ret = []
    for key in used_map.keys():
        final_ret.append(used_map[key])

    return Response(toJson(final_ret), status=200, mimetype='application/json')



if __name__ == '__main__':
    app.debug = True
    app.run()
