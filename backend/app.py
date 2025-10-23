from flask import Flask, jsonify
from flask_cors import CORS
import random
import datetime

app = Flask(__name__)
CORS(app)  # allow frontend to fetch data

@app.route("/api/live")
def live_readings():
    # Generate random values to simulate sensor data
    data = {
        "timestamp": datetime.datetime.now().isoformat(),
        "co2": random.randint(400, 800),        # CO₂ in ppm
        "vocs": random.randint(100, 300),       # VOCs in ppb
        "rh": round(random.uniform(35, 60), 2), # humidity (%)
        "temp": round(random.uniform(22, 28), 2), # temperature (°C)
        "pm25": random.randint(5, 25),          # PM2.5 (µg/m³)
        "occupancy": random.randint(0, 10)      # people count
    }
    return jsonify(data)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050, debug=True)
