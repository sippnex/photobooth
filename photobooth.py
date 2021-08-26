import flask
from flask import Flask, render_template, make_response
import subprocess
from subprocess import Popen
from flask import send_file
import os
import base64

app = Flask(__name__)

subprocess.call('gphoto2 --set-config capturetarget=1', shell=True)

@app.route('/')
def index_page():
    return flask.redirect(flask.url_for('landing_page'))

@app.route('/landing-page')
def landing_page():
    return render_template('landing-page.html')


@app.route('/countdown-page')
def countdown_page():
    return render_template('countdown-page.html')

@app.route('/photo-page')
def photo_page():
    return render_template('photo-page.html')

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
        if file.endswith('.JPG'):
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
    return make_response('No suitable image found', 404)