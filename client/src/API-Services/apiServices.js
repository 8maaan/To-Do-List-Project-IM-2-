import axios from "axios";

// API for tasks
export const createTasks = async (task) => {
  try {
    const response = await axios.post("http://127.0.0.1:5000/create_task", task);
    const result = response.data.result; // assuming the server sends { "result": "message" }

    if (result.includes("All fields must be filled.")) {
      return { success: false, message: result };
    }
    
    return { success: true, message: result };

  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: `${error}` };
  }
};

// Function for calling /getAllTasks API from server (flask)
export const getAllTasks = async() => {
    try{
      const response = await axios.get("http://127.0.0.1:5000/get_AllTasks");
      return {apiResponse: response.data, success: true, message: 'Successfully fetched data'}
    }catch (error) {
      throw new Error('Error, could not find user.', error);
    }
}

export const updateTasks = async (task) => {
  try {
    const response = await axios.put("http://127.0.0.1:5000/update_task", task);
    const result = response.data.result; // assuming the server sends { "result": "message" }
    return { success: true, message: result };

  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: `${error}` };
  }
};

export const removeTask = async (taskToRemove) => {
  try {
    const response = await axios.put("http://127.0.0.1:5000/remove_task", taskToRemove);
    const result = response.data.result; // assuming the server sends { "result": "message" }
    return { success: true, message: result };

  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: `${error}` };
  }
};



// API for USER
// Function for passing user registration info to /createUser API from server (flask)
export const createUser = async (user) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/create_user", user);
      const result = response.data.result; 
  
      if (result.includes("Username already exists") || result.includes("must be provided")) {
        return { success: false, message: result };
      }
  
      return { success: true, message: result };
    } catch (error) {
      console.error("Error:", error);
      return { success: false, message: `${error}` };
    }
};

export const authenticateUser = async (loginCredentials) => {
  try {
    const response = await axios.post("http://127.0.0.1:5000/authenticate_user", loginCredentials);
    const result = response.data.result;

    // console.log("Result:", result); // Add this line to check the type of result

    if (result.message.includes("Invalid")) {
      return { success: false, message: result.message};
    }

    return { success: true, message: result.message, uid: result.uid};
  } catch (error) {
    return { success: false, message: `${error}` };
  }
};

export const getUsers = async () => {
  try{
    const response = await axios.get("http://127.0.0.1:5000/get_users");
    return {apiResponse: response.data, success: true, message: 'Successfully fetched data'}
  }catch (error) {
    throw new Error('Error, could not find user.', error);
  }
}

export const updateUser = async (user) => {
  try {
    const response = await axios.put("http://127.0.0.1:5000/update_user", user);
    const result = response.data.result; // assuming the server sends { "result": "message" }
    console.log(result);
    if (result.includes("must be")) {
      return { success: false, message: result};
    }

    return { success: true, message: result};

  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: `${error}` };
  }
};

export const deleteUser = async (user_id) => {
  try{
    const response = await axios.delete(`http://127.0.0.1:5000/delete_user/${user_id}`);
    const result = response.data.result; // assuming the server sends { "result": "message" }
    console.log(result);
    return { success: true, message: result};
  }catch (error) {
    throw new Error('Error, could not find user.', error);
  }
};