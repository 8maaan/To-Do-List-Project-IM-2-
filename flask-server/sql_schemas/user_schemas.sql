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
