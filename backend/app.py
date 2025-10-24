from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import sqlite3
import random
from datetime import datetime
import os

app = Flask(__name__)

CORS(app, supports_credentials=True)

DB_FILE = "readings.db"

def init_db():
    """Initialize database if missing"""
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute(
        """
        CREATE TABLE IF NOT EXISTS readings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            co2 REAL,
            vocs REAL,
            humidity REAL,
            temperature REAL,
            occupancy INTEGER
        )
        """
    )
    conn.commit()
    conn.close()

def insert_random_data():
    """Generate demo sensor readings"""
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    co2 = round(random.uniform(400, 1500), 2)
    vocs = round(random.uniform(50, 400), 2)
    humidity = round(random.uniform(30, 80), 2)
    temperature = round(random.uniform(20, 35), 2)
    occupancy = random.randint(0, 10)

    c.execute(
        "INSERT INTO readings (timestamp, co2, vocs, humidity, temperature, occupancy) VALUES (?, ?, ?, ?, ?, ?)",
        (timestamp, co2, vocs, humidity, temperature, occupancy),
    )
    conn.commit()
    conn.close()

@app.route("/api")
def api_home():
    """Health check"""
    return jsonify({"message": "Backend API is running"})


@app.route("/api/live", methods=["GET"])
def get_live_readings():
    """Fetch the latest reading (insert new random sample each time)"""
    insert_random_data()
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute(
        "SELECT timestamp, co2, vocs, humidity, temperature, occupancy FROM readings ORDER BY id DESC LIMIT 1"
    )
    row = c.fetchone()
    conn.close()

    if row:
        data = {
            "timestamp": row[0],
            "co2": row[1],
            "vocs": row[2],
            "humidity": row[3],
            "temperature": row[4],
            "occupancy": row[5],
        }
        return jsonify(data)
    else:
        return jsonify({"error": "No data found"}), 404


@app.route("/api/history", methods=["GET"])
def get_history():
    """Return 100 most recent readings"""
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute(
        "SELECT timestamp, co2, vocs, humidity, temperature, occupancy FROM readings ORDER BY id DESC LIMIT 100"
    )
    rows = c.fetchall()
    conn.close()

    history = [
        {
            "timestamp": row[0],
            "co2": row[1],
            "vocs": row[2],
            "humidity": row[3],
            "temperature": row[4],
            "occupancy": row[5],
        }
        for row in rows
    ]

    return jsonify(history)


@app.route("/api/purifier/fan", methods=["POST"])
def set_fan_speed():
    """Set purifier fan speed (simulated)"""
    data = request.get_json()
    speed = data.get("speed", 2)
    print(f"[INFO] Fan speed set to: {speed}")
    return jsonify({"message": f"Fan speed set to {speed}"})


@app.route("/api/purifier/auto", methods=["POST"])
def set_auto_mode():
    """Toggle auto mode (simulated)"""
    data = request.get_json()
    auto = data.get("auto", True)
    print(f"[INFO] Auto mode set to: {auto}")
    return jsonify({"message": f"Auto mode set to {auto}"})



@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    """Serve React build files (index.html + static assets)"""
    dist_dir = os.path.join(app.root_path, 'dist')
    if path != "" and os.path.exists(os.path.join(dist_dir, path)):
        return send_from_directory(dist_dir, path)
    else:
        return send_from_directory(dist_dir, 'index.html')

if __name__ == "__main__":
    init_db()
    port = int(os.environ.get("PORT", 5050))
    app.run(host="0.0.0.0", port=port, debug=True)
