from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from database import set_connector
from users import create_user, authenticate_user
from tasks import create_task, get_AllTasks, update_task
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Required
app.config["MYSQL_HOST"] = "localhost"
app.config["MYSQL_USER"] = "root"
#app.config["MYSQL_PORT"] = 3307
app.config["MYSQL_PASSWORD"] = "root"
app.config["MYSQL_DB"] = "todolistdb"
# Extra configs, optional but important:
app.config["MYSQL_CURSORCLASS"] = "DictCursor"
app.config["MYSQL_AUTOCOMMIT"] = True

mysql = MySQL(app)
set_connector(mysql)

@app.route("/")
def hello_world():
    return "<p>Hello, World! :3</p>"

# Routes for users
@app.route("/create_user", methods=["POST"])
def createUsers(): 
  data = request.get_json()
  result = create_user(data["username"], data["password"], data["email"])
  return jsonify({"result": result})

@app.route("/authenticate_user", methods=["POST"])
def authenticateUser(): 
  data = request.get_json()
  result = authenticate_user(data["username"], data["password"])
  return jsonify({"result": result})


# Routes for tasks
@app.route("/create_task", methods=["POST"])
def createTask():
  data = request.get_json()
  result = create_task(data["user_id"], data["category_id"], 
                       data["task_name"], data["description"], data["due_date"],)
  return jsonify({"result": result})

@app.route("/get_AllTasks", methods=["GET"])
def getAllTasks():
  return jsonify(get_AllTasks())


@app.route("/update_task", methods=["PUT"])
def updateTask():
  data = request.get_json()
  result = update_task(data["task_id"], data["category_id"], 
                       data["task_name"], data["description"], data["due_date"],)
  return jsonify({"result": result})

