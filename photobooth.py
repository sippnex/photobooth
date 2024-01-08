import flask
from flask import Flask, render_template, make_response
import subprocess
from subprocess import Popen
import os
import base64
import time

pwd='pi'
app = Flask(__name__)

@app.route('/')
def index_page():
    return render_template('index.html')

@app.route('/api/take-photo')
def api_take_photo():
    p = Popen(['gphoto2','--capture-image-and-download', '--keep'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
    output, errors = p.communicate()
    output
    errors
    return make_response('', 200)

@app.route('/api/photo', methods=['GET'])
def api_get_photo():
    files = os.listdir('.')
    for file in files:
        if file.endswith('.JPG') and (time.time() - os.path.getmtime(file) < 10):
            with open(file, 'rb') as fh:
                return make_response(base64.b64encode(fh.read()), 200)
    return make_response('No suitable image found', 404)

@app.route('/api/photo', methods=['DELETE'])
def api_delete_photo():
    files = os.listdir('.')
    for file in files:
        if file.endswith('.JPG'):
            os.remove(file)
    return make_response('', 200)

@app.route('/api/led-on')
def api_led_on():
    cmd = 'sudo java -jar DenkoviRelayCommandLineTool.jar 0001692504 4v2 1 1'
    subprocess.call('echo {} | sudo -S {}'.format(pwd, cmd), shell=True)
    return make_response('', 200)

@app.route('/api/led-off')
def api_led_off():
    cmd = 'sudo java -jar DenkoviRelayCommandLineTool.jar 0001692504 4v2 1 0'
    subprocess.call('echo {} | sudo -S {}'.format(pwd, cmd), shell=True)
    return make_response('', 200)

if __name__ == '__main__':
    subprocess.call('gphoto2 --set-config capturetarget=1', shell=True)
    app.run(debug=False)