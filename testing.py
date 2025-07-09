from flask import Flask, render_template, request, jsonify
import requests 
import json
import urllib.parse

# response = requests.get('https://wallhaven.cc/api/v1/w/1q83qg')

#print(json.dumps(response.json(), indent=4))

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/getImageFromId', methods=['GET', 'POST'])
def getImageFromId():
    data = request.get_json()
    wallpaper_id = data.get('id')
    url = f"https://wallhaven.cc/api/v1/w/{wallpaper_id}"
    response = requests.get(url)

    path = response.json()['data']['path']
    # Print the 'path' field from the JSON response
    return jsonify({"path": path})

@app.route('/searchImages', methods=['GET', 'POST'])
def searchImage():
    data = request.get_json()
    
    params = {
        'q': data.get('query', ''),
        'categories': data.get('categories', '111'),
        'purity': data.get('purity', '100'),
        'sorting': data.get('sorting', 'relevance'),
        'order': data.get('order', 'desc')
    }

    url = "https://wallhaven.cc/api/v1/search?" + urllib.parse.urlencode(params)
    response = requests.get(url)

    for wallpaper in response.json()['data']:
        print(f"ID: {wallpaper['id']}, Path: {wallpaper['path']}\n")
   

    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True)