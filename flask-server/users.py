from database import execute

def create_user(username, password, email):
  query = "CALL create_user (%s, %s, %s)"
  cursor = execute(query, (username, password, email))
  row = cursor.fetchone()
  return row["message"]

def get_users():
  query = "SELECT * FROM users_view"
  cursor = execute(query)
  return cursor.fetchall()

def update_user(user_id, username, email, password):
  query = "CALL update_user (%s, %s, %s, %s)"
  cursor = execute(query, (user_id, username, email, password))
  row = cursor.fetchone()
  return row["message"] 
  
def authenticate_user(username, password):
  query = "CALL authenticate_user (%s, %s)"
  cursor = execute(query, (username, password))
  row = cursor.fetchone()
  return row
  
  
  
  
  
  
  
  
  
  
  
  
# def get_user(id):
#   query = "SELECT * FROM users_view WHERE id = %s"
#   cursor = execute(query, (id,))
#   return cursor.fetchone()

# def update_user(id, email, username, password):
#   query = "CALL update_user (%s, %s, %s, %s)"
#   cursor = execute(query, (id, email, username, password))
#   return cursor.fetchone()

# def delete_user(id):
#   query = "CALL delete_user (%s)"
#   cursor = execute(query, (id,))
#   return cursor.fetchone()