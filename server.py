
import json
from flask import Flask
from speech import *

import os
from flask import Flask, render_template, request, url_for, redirect
from flask_sqlalchemy import SQLAlchemy

from sqlalchemy.sql import func

basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] =\
    'sqlite:///' + os.path.join(basedir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


@app.route("/")
def hello():
    class PathCommands(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        command = db.Column(db.String(100), nullable=False)
        path = db.Column(db.String(100), nullable=False)
        created_at = db.Column(db.DateTime(timezone=True),
                               server_default=func.now())

        def __repr__(self):
            return f'<PathCommands {self.firstname}>'

    command = 'League of Legends'
    path = '/path/to/Lol'

    path_command = PathCommands(
        command=command,
        path=path
    )
    db.session.add(path_command)
    db.session.commit()

    speech_text = speak()
    return json.dumps({"speech_text": speech_text})


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000)
