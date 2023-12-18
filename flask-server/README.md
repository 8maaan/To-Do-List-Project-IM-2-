Installation Instructions (Windows)

Reference: https://flask.palletsprojects.com/en/3.0.x/installation/

1. Install python version 3.0 and higher

2. Create the environment in flask-server folder:
> cd flask-server
> py -3 -m venv .venv

3. Activate the environment:
>  Do this first: Set-ExecutionPolicy RemoteSigned –Scope Process (In case of error only)
> .venv\Scripts\activate

4. Install Flask
> pip install Flask

5. Install MySQLDB
> pip install flask-mysqldb



To run the application:
> flask --app main run --debug