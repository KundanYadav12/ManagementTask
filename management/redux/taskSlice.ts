 import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
};

 


export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
    const storedTasks = await AsyncStorage.getItem("tasks");
    if (storedTasks) return JSON.parse(storedTasks); // Return local storage data
  
    const response = await axios.get(API_URL);
    const tasks = response.data.slice(0, 10).map((task: any) => ({
      id: task.id.toString(),
      title: task.title,
      description: task.description || "No description available", // Add default description
      dueDate: new Date().toISOString(), // Set a dueDate if missing
    }));
  
    await AsyncStorage.setItem("tasks", JSON.stringify(tasks)); // Save to storage
    return tasks;
  });
  

// Save Tasks to AsyncStorage
const saveTasks = async (tasks: Task[]) => {
  await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
};

// Add Task
export const addTask = createAsyncThunk("tasks/addTask", async (task: Task, { getState }) => {
  const response = await axios.post(API_URL, task);
  const newTask = response.data;
  
  const currentTasks = (getState() as { tasks: TaskState }).tasks.tasks;
  const updatedTasks = [...currentTasks, newTask];
  await saveTasks(updatedTasks); // Update local storage

  return newTask;
});

 


// Update Task (Now updates local storage)
export const updateTask = createAsyncThunk("tasks/updateTask", async (task: Task, { getState }) => {
  const state: RootState = getState();
  const updatedTasks = state.tasks.tasks.map(t => t.id === task.id ? task : t);

  await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save changes locally

  return task;
});


// // Delete Task
// export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id: string, { getState }) => {
//   await axios.delete(`${API_URL}/${id}`);

//   const currentTasks = (getState() as { tasks: TaskState }).tasks.tasks;
//   const updatedTasks = currentTasks.filter((task) => task.id !== id);
//   await saveTasks(updatedTasks); // Update local storage

//   return id;
// });


export const deleteTask = createAsyncThunk(
    "tasks/deleteTask",
    async (id: string, { getState }) => {
      const currentTasks = (getState() as { tasks: TaskState }).tasks.tasks;
      
      // Filter out the task to be deleted
      const updatedTasks = currentTasks.filter((task) => task.id !== id);
  
      // Update AsyncStorage
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
  
      return id; // Return deleted task ID
    }
  );
  


// Task Slice
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
