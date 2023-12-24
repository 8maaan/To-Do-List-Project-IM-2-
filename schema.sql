/*
    Lists of SQL queries/schema intended for tasks

    INCLUDES:
    -Tables
    -Stored Procedures
    -Views
*/

/* --- TABLE/S --- */

CREATE TABLE `tasks` (
  `task_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `task_name` varchar(255) NOT NULL,
  `description` text,
  `due_date` datetime DEFAULT NULL,
  `status` varchar(20) DEFAULT 'In progress',
  `completion_date` datetime DEFAULT NULL,
  PRIMARY KEY (`task_id`),
  KEY `user_id` (`user_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `task_categories` (`category_id`)
) ENGINE=InnoDB;

CREATE TABLE `task_categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB;

/* --- STORED PROCEDURE --- */

-- Creating a task --
DELIMITER $$$

CREATE PROCEDURE create_task(
    IN p_user_id INT,
    IN p_category_id INT,
    IN p_task_name VARCHAR(255),
    IN p_description TEXT,
    IN p_due_date DATETIME
)
BEGIN
     -- Check for empty parameters
    IF p_user_id IS NULL OR p_category_id IS NULL OR LENGTH(p_task_name) = 0 OR LENGTH(p_description) = 0 OR p_due_date IS NULL THEN
        SELECT 'All fields must be filled.' AS message;
    ELSE
		-- Insert the new task
        INSERT INTO tasks (user_id, category_id, task_name, description, due_date)
        VALUES (p_user_id, p_category_id, p_task_name, p_description, p_due_date);

        -- Set success message
        SELECT 'Task created successfully.' AS message;
    END IF;
END $$$

DELIMITER ;

-- Update a task --
DELIMITER $$$

CREATE PROCEDURE update_task(
    IN p_task_id INT,
    IN p_category_id INT,
    IN p_task_name VARCHAR(255),
    IN p_description TEXT,
    IN p_due_date DATETIME
)
BEGIN
    -- Check if the task with the specified ID exists
    DECLARE task_exists INT DEFAULT 0;
    SELECT COUNT(*) INTO task_exists FROM tasks WHERE task_id = p_task_id;

    IF task_exists = 0 THEN
        SELECT 'Task not found' AS message;

    ELSE
        -- Update the task
        UPDATE tasks
        SET
            task_name = p_task_name,
            description = p_description,
            due_date = p_due_date,
            category_id = p_category_id
        WHERE task_id = p_task_id;

        SELECT 'Task updated successfully.' AS message;
    END IF;
END $$$

DELIMITER ;

-- Deleting task --
DELIMITER $$$

CREATE PROCEDURE remove_task(
    IN task_id_toremove INT,
    IN new_status VARCHAR(50)
)
BEGIN
    DECLARE task_exists INT;

    -- Check if task_id exists
    SELECT COUNT(*) INTO task_exists FROM tasks WHERE task_id = task_id_toremove;

    -- If task_id exists, update the status and get the task name, otherwise return a message
    IF task_exists > 0 THEN
        UPDATE tasks SET status = new_status WHERE task_id = task_id_toremove;
        SELECT CONCAT('Task: ', task_name, ' successfully ' , new_status ) AS message
        FROM tasks
        WHERE task_id = task_id_toremove;
    ELSE
        SELECT 'Task ID does not exist' AS message;
    END IF;
END $$$

DELIMITER ;


/* --- VIEWS --- */

CREATE VIEW task_view AS
SELECT
    t.task_id,
    t.user_id,
    t.category_id,
    t.task_name,
    t.description,
    t.due_date,
    t.status,
    u.username AS user_username,
    c.category_name,
    t.completion_date
FROM
    tasks t
    JOIN users u ON t.user_id = u.user_id
    JOIN task_categories c ON t.category_id = c.category_id;

/* --- TRIGGERS --- */

DELIMITER $$$

CREATE TRIGGER TaskBeforeStatusChangeTrigger
BEFORE UPDATE ON tasks
FOR EACH ROW
BEGIN
    -- Check if the status is being updated to "Completed" or "Cancelled"
    IF (NEW.status = 'Completed' OR NEW.status = 'Cancelled') AND OLD.status NOT IN ('Completed', 'Cancelled') THEN
        SET NEW.completion_date = NOW();
    END IF;
END $$$

DELIMITER ;


/*
    Lists of SQL queries/schema intended for users

    INCLUDES:
    -Tables
    -Stored Procedures
    -Views
*/


/* --- TABLE/S --- */

CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB;

/* --- STORED PROCEDURE --- */

-- Creating a user --
DELIMITER $$$

CREATE PROCEDURE `create_user`(
    IN p_username VARCHAR(50),
    IN p_password VARCHAR(255),
    IN p_email VARCHAR(100)
)
insertUser:BEGIN
	DECLARE user_exists INT DEFAULT 0;

    -- Check if any parameter is empty
    IF LENGTH(p_username) = 0 OR LENGTH(p_password) = 0 OR LENGTH(p_email) = 0 THEN
        SELECT 'All fields must be provided.' AS message;
        LEAVE insertUser;
    END IF;

    -- Check if the username already exists
    SELECT COUNT(*) INTO user_exists
    FROM users
    WHERE username = p_username;

    -- If the username exists, set the message and exit
    IF user_exists > 0 THEN
        SELECT 'Username already exists. Please choose a different username.' AS message;
    ELSE
        -- If the username does not exist, insert the new user
        INSERT INTO users (username, password, email)
        VALUES (p_username, p_password, p_email);
        SELECT 'User created successfully.' AS message;
    END IF;
END $$$

DELIMITER ;

-- Updating a user --

DELIMITER $$$

CREATE PROCEDURE update_user(
    IN p_user_id INT,
    IN p_new_username VARCHAR(50),
    IN p_new_email VARCHAR(100),
    IN p_new_password VARCHAR(255)
)
BEGIN
    -- Check if the user with the specified ID exists
    DECLARE user_exists INT DEFAULT 0;
    SELECT COUNT(*) INTO user_exists FROM users WHERE user_id = p_user_id;

    IF user_exists = 0 THEN
        SELECT 'User not found.' AS message;

    ELSE
        -- Check the length of the new username, email, and password
        IF LENGTH(p_new_username) < 5 OR LENGTH(p_new_email) < 5 OR LENGTH(p_new_password) < 5 THEN
            SELECT 'New username, email, and password must be at least 5 characters long.' AS message;
        
        ELSE
            -- Update the user information
            UPDATE users
            SET
                username = p_new_username,
                email = p_new_email,
                password = p_new_password
            WHERE user_id = p_user_id;

            SELECT 'User information updated successfully.' AS message;
        END IF;
    END IF;
END $$$

DELIMITER ;

-- Verify user
CREATE PROCEDURE authenticate_user(
    IN p_username VARCHAR(50),
    IN p_password VARCHAR(255)
)
BEGIN
    DECLARE hashed_password VARCHAR(255);
    
    -- Retrieve the hashed password for the given username
    SELECT password INTO hashed_password
    FROM users
    WHERE username = p_username;

    -- Check if the username exists and the password matches
    IF hashed_password IS NOT NULL AND hashed_password = p_password THEN
        -- Authentication successful, return the user_id and message
        SELECT user_id AS uid, 'Authentication successful.' AS message
        FROM users
        WHERE username = p_username;
    ELSE
        -- Invalid username or password, return null and error message
        SELECT NULL AS id, 'Invalid username or password.' AS message;
    END IF;
END $$$

DELIMITER ;

/* --- VIEWS --- */

CREATE VIEW users_view AS
SELECT
    u.user_id,
    u.username,
    u.email,
    u.password,
    COUNT(t.task_id) AS total_tasks
FROM
    users u
LEFT JOIN
    tasks t ON u.user_id = t.user_id
GROUP BY
    u.user_id, u.username, u.email, u.password;


-- DELETE ACCOUNT --

--Delete all associated task
DELIMITER $$$

CREATE TRIGGER before_delete_user
BEFORE DELETE ON users FOR EACH ROW
BEGIN
  -- Delete tasks associated with the user being deleted
  DELETE FROM tasks WHERE user_id = OLD.user_id;
END;
$$$

DELIMITER ;


--Delete Account Procedure

DELIMITER $$$

CREATE PROCEDURE delete_account(
	IN user_id_to_delete INT
)
BEGIN
  DECLARE rowCount INT;

  -- Check if the user exists
  SELECT COUNT(*) INTO rowCount FROM users WHERE user_id = user_id_to_delete;

  IF rowCount > 0 THEN
    -- User exists, proceed with deletion
    DELETE FROM users WHERE user_id = user_id_to_delete;
    SELECT CONCAT('User id ', user_id_to_delete, ' has been deleted') AS result;
  ELSE
    -- User does not exist
    SELECT CONCAT('User id ', user_id_to_delete, ' does not exist') AS result;
  END IF;
END $$$

DELIMITER ;
