Installation Instructions (Windows)

Reference: https://flask.palletsprojects.com/en/3.0.x/installation/

## 1. Install python version 3.0 and higher

## 2. Create the environment in flask-server folder:

### `cd flask-server`
### `py -3 -m venv .venv`

## 3. Activate the environment:

### `.venv\Scripts\activate`

## 3.1 [Optional]
### Do this first before activating the environment: `Set-ExecutionPolicy RemoteSigned –Scope Process` (In case of error only)

## 4. Install Flask
### `pip install Flask`

## 5. Install MySQLDB
### `pip install flask-mysqldb`


Additional note: 
Be sure to have Name: REST Client Extension in your VSCode
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=humao.rest-client


## To run the application:

### flask --app main run --debug
