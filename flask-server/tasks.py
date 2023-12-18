from database import execute

def create_task(user_id, category_id, task_name, description, due_date):
  query = "CALL create_task (%s, %s, %s, %s, %s)"
  cursor = execute(query, (user_id, category_id, task_name, description, due_date))
  row = cursor.fetchone()
  return row["message"] 

def get_AllTasks():
  query = "SELECT * FROM task_view"
  cursor = execute(query)
  return cursor.fetchall()