from flask import Flask, jsonify, request
import requests
import threading
import time

app = Flask(__name__)

WINDOW_SIZE = 10
numbers_store = {
    'p': [],
    'f': [],
    'e': [],
    'r': []
}
lock = threading.Lock()

def fetch_number(numberid):
    url = f"https://third-party-server.com/api/{numberid}"
    try:
        response = requests.get(url, timeout=0.5)
        if response.status_code == 200:
            number = int(response.text.strip())
            return number
    except requests.RequestException:
        pass
    return None

def add_number(numberid, number):
    with lock:
        numbers = numbers_store[numberid]
        if number not in numbers:
            if len(numbers) >= WINDOW_SIZE:
                numbers.pop(0)
            numbers.append(number)

@app.route('/numbers/<string:numberid>', methods=['GET'])
def get_numbers(numberid):
    if numberid not in ['p', 'f', 'e', 'r']:
        return jsonify({"error": "Invalid number ID"}), 400

    numbers = []
    start_time = time.time()
    while len(numbers) < 1 and (time.time() - start_time) < 0.5:
        number = fetch_number(numberid)
        if number is not None:
            numbers.append(number)
            break

    if not numbers:
        return jsonify({"error": "Failed to fetch number"}), 500

    with lock:
        numbers_before = numbers_store[numberid].copy()
        for number in numbers:
            add_number(numberid, number)
        numbers_after = numbers_store[numberid].copy()

    avg = sum(numbers_after) / len(numbers_after) if numbers_after else 0

    response = {
        "windowPrevState": numbers_before,
        "windowCurrState": numbers_after,
        "numbers": numbers,
        "avg": round(avg, 2)
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=9876)
