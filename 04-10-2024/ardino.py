import serial
import requests
import logging
import time

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')

# Serial port configuration (update port as needed)
arduino_port = 'COM21'  # Update to your Arduino's port
baud_rate = 9600
ser = serial.Serial(arduino_port, baud_rate, timeout=0.1)

# Server endpoint for the force sensor
server_url_force_sensor = "http://192.168.1.6:4000/arduino-data-bp"  # Update to your server's endpoint

# Force sensor threshold values
force_threshold_start = 950  # Value above which the sensor is considered to be activated
force_threshold_stop = 500   # Value below which the sensor is considered to be deactivated

# Variables to track sensor states
sensor_states = {
    "ForceSensor": None
}

# Debounce settings
debounce_delay = 0.3  # 300ms debounce delay
last_print_time = time.time()

# Function to send commands to the server
def send_command_to_server(url, command, retries=3):
    """Send a command to the server with retry logic."""
    payload = {"command": command}
    for attempt in range(retries):
        try:
            response = requests.post(url, json=payload)
            if response.status_code == 200:
                logging.info(f"Sent '{command}' command, response: {response.status_code}")
                return
            else:
                logging.error(f"Attempt {attempt + 1}: Request failed with {response.status_code}, {response.text}")
        except requests.exceptions.RequestException as e:
            logging.error(f"Attempt {attempt + 1}: Failed to send command '{command}': {e}")
    logging.error(f"All retries failed for command '{command}'.")

# Main loop
try:
    while True:
        if ser.in_waiting > 0:
            # Read and decode the serial data
            try:
                line = ser.readline().decode('utf-8').strip()
                if not line:
                    continue
            except UnicodeDecodeError:
                logging.error("Failed to decode serial data.")
                continue

            # Handle sensor data with debounce logic
            if time.time() - last_print_time > debounce_delay:
                logging.info(f"Data from Arduino: {line}")
                last_print_time = time.time()

            # Check for the "Started" or "Stopped" text
            if line == "Started":
                if sensor_states["ForceSensor"] != "detected":  # Check if state changed
                    send_command_to_server(server_url_force_sensor, "START")
                    sensor_states["ForceSensor"] = "detected"  # Update state

            elif line == "Stopped":
                if sensor_states["ForceSensor"] != "stopped":  # Ensure STOP is sent only once
                    send_command_to_server(server_url_force_sensor, "STOP")
                    sensor_states["ForceSensor"] = "stopped"  # Update state

            # If force sensor value is numeric (you can handle the threshold logic here if needed)
            else:
                try:
                    force_value = int(line)
                    # Check if force value is above the threshold (START condition)
                    if force_value >= force_threshold_start:
                        if sensor_states["ForceSensor"] != "detected":  # Check if state changed
                            send_command_to_server(server_url_force_sensor, "START")
                            sensor_states["ForceSensor"] = "detected"  # Update state

                    # Check if force value is below the threshold (STOP condition)
                    elif force_value <= force_threshold_stop:
                        if sensor_states["ForceSensor"] != "stopped":  # Ensure STOP is sent only once
                            send_command_to_server(server_url_force_sensor, "STOP")
                            sensor_states["ForceSensor"] = "stopped"  # Update state
                except ValueError:
                    logging.error(f"Invalid sensor data: {line}")
                    continue

except serial.SerialException as e:
    logging.error(f"Serial communication error: {e}")
except KeyboardInterrupt:
    logging.info("Program interrupted by user.")
finally:
    # Close the serial port when the program exits
    if ser.is_open:
        ser.close()
        logging.info("Serial port closed.")
