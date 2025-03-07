// import { useState, useEffect } from "react";
// import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { addTask, fetchTasks } from "../redux/taskSlice";
// import { useRouter } from "expo-router";
// import { Task } from "../redux/taskSlice";
// import { RootState } from "../redux/store";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Ionicons from "react-native-vector-icons/Ionicons"; // Import icons

// export default function AddTaskScreen() {
//   const dispatch = useDispatch<any>();
//   const router = useRouter();

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [isFocused, setIsFocused] = useState(false);


//   // Fetch tasks from Redux store
//   const tasks = useSelector((state: RootState) => state.tasks.tasks);

//   useEffect(() => {
//     dispatch(fetchTasks());
//   }, [dispatch]);

//   const saveToLocalStorage = async (updatedTasks: Task[]) => {
//     await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
//   };

//   const handleAddTask = async () => {
//     if (!title.trim()) {
//       Alert.alert("Error", "Title is required!");
//       return;
//     }

//     const newTask: Task = {
//       id: Math.random().toString(),
//       title,
//       description,
//       dueDate: new Date().toISOString(),
//     };

//     try {
//       const updatedTasks = [...tasks, newTask];
//       await saveToLocalStorage(updatedTasks);
//       await dispatch(addTask(newTask));

//       Alert.alert("Success", "Task added!");
//       setTitle("");
//       setDescription("");
//       router.push("/"); // Navigate back to home screen
//     } catch (error) {
//       Alert.alert("Error", "Failed to add task.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Add New Task</Text>

//       {/* Task Title Input */}
//       <View style={styles.inputContainer}>
//         <Ionicons name="document-text-outline" size={22} color="#666" style={styles.icon} />
//         <TextInput
//           placeholder="Title"
//           value={title}
//           onChangeText={setTitle}
//           style={styles.input}
//         />
//       </View>

//       {/* Task Description Input */}
//       <View style={styles.inputContainer}>
//         <Ionicons name="chatbox-ellipses-outline" size={22} color="#666" style={styles.icon} />
//         <TextInput
//           placeholder="Description"
//           value={description}
//           onChangeText={setDescription}
//           multiline
//           style={[styles.input, { height: 80 }]}
//         />
//       </View>

//       {/* Save Task Button */}
//       <TouchableOpacity style={styles.saveButton} onPress={handleAddTask}>
//         <Ionicons name="checkmark" size={24} color="white" />
//         <Text style={styles.buttonText}>Save Task</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#f8f9fa",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 12,
//     backgroundColor: "#fff",
//     elevation: 3, // Android shadow
//     shadowColor: "#000", // iOS shadow
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   icon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//   },
//   saveButton: {
//     flexDirection: "row",
//     backgroundColor: "#007bff",
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 10,
//     elevation: 3, // Android shadow
//     shadowColor: "#000", // iOS shadow
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//     marginLeft: 8,
//   },
// });






// import { useState, useEffect } from "react";
// import { 
//   View, TextInput, TouchableOpacity, Text, Alert, StyleSheet, Platform 
// } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { useDispatch, useSelector } from "react-redux";
// import { addTask, fetchTasks } from "../redux/taskSlice";
// import { useRouter } from "expo-router";
// import { Task } from "../redux/taskSlice";
// import { RootState } from "../redux/store";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Ionicons from "react-native-vector-icons/Ionicons"; // Import icons

// export default function AddTaskScreen() {
//   const dispatch = useDispatch<any>();
//   const router = useRouter();

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [dueDate, setDueDate] = useState(new Date()); // State for due date
//   const [showPicker, setShowPicker] = useState(false); // Control picker visibility

//   const tasks = useSelector((state: RootState) => state.tasks.tasks);

//   useEffect(() => {
//     dispatch(fetchTasks());
//   }, [dispatch]);

//   const saveToLocalStorage = async (updatedTasks: Task[]) => {
//     await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
//   };

//   const handleAddTask = async () => {
//     if (!title.trim()) {
//       Alert.alert("Error", "Title is required!");
//       return;
//     }

//     const newTask: Task = {
//       id: Math.random().toString(),
//       title,
//       description,
//       dueDate: dueDate.toISOString(), // Save selected date
//     };

//     try {
//       const updatedTasks = [...tasks, newTask];
//       await saveToLocalStorage(updatedTasks);
//       await dispatch(addTask(newTask));

//       Alert.alert("Success", "Task added!");
//       setTitle("");
//       setDescription("");
//       setDueDate(new Date()); // Reset date
//       router.push("/");
//     } catch (error) {
//       Alert.alert("Error", "Failed to add task.");
//     }
//   };

//   const onDateChange = (event: any, selectedDate?: Date) => {
//     setShowPicker(false); // Hide picker
//     if (selectedDate) {
//       setDueDate(selectedDate);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Add New Task</Text>

//       {/* Task Title Input */}
//       <View style={styles.inputContainer}>
//         <Ionicons name="document-text-outline" size={22} color="#666" style={styles.icon} />
//         <TextInput
//           placeholder="Title"
//           value={title}
//           onChangeText={setTitle}
//           style={styles.input}
//         />
//       </View>

//       {/* Task Description Input */}
//       <View style={styles.inputContainer}>
//         <Ionicons name="chatbox-ellipses-outline" size={22} color="#666" style={styles.icon} />
//         <TextInput
//           placeholder="Description"
//           value={description}
//           onChangeText={setDescription}
//           multiline
//           style={[styles.input, { height: 80 }]}
//         />
//       </View>

//       {/* Date Picker Input */}
//       <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.datePicker}>
//         <Ionicons name="calendar-outline" size={22} color="#666" style={styles.icon} />
//         <Text style={styles.dateText}>{dueDate.toDateString()}</Text>
//       </TouchableOpacity>

//       {showPicker && (
//         <DateTimePicker
//           value={dueDate}
//           mode="date"
//           display={Platform.OS === "ios" ? "inline" : "default"}
//           onChange={onDateChange}
//         />
//       )}

//       {/* Save Task Button */}
//       <TouchableOpacity style={styles.saveButton} onPress={handleAddTask}>
//         <Ionicons name="checkmark" size={24} color="white" />
//         <Text style={styles.buttonText}>Save Task</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#f8f9fa",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 12,
//     backgroundColor: "#fff",
//     elevation: 3, // Android shadow
//     shadowColor: "#000", // iOS shadow
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   datePicker: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 12,
//     borderRadius: 8,
//     backgroundColor: "#fff",
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     marginBottom: 12,
//   },
//   dateText: {
//     fontSize: 16,
//     marginLeft: 10,
//   },
//   icon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//   },
//   saveButton: {
//     flexDirection: "row",
//     backgroundColor: "#007bff",
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 10,
//     elevation: 3, // Android shadow
//     shadowColor: "#000", // iOS shadow
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//     marginLeft: 8,
//   },
// });









import { useState, useEffect } from "react";
import { 
  View, TextInput, TouchableOpacity, Text, Alert, StyleSheet, Platform 
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { addTask, fetchTasks } from "../redux/taskSlice";
import { useRouter } from "expo-router";
import { Task } from "../redux/taskSlice";
import { RootState } from "../redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons"; // Import icons

export default function AddTaskScreen() {
  const dispatch = useDispatch<any>();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date()); // State for due date
  const [showPicker, setShowPicker] = useState(false); // Control picker visibility

  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const saveToLocalStorage = async (updatedTasks: Task[]) => {
    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleAddTask = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Title is required!");
      return;
    }

    const newTask: Task = {
      id: Math.random().toString(),
      title,
      description,
      dueDate: dueDate.toISOString(), // Save selected date
    };

    try {
      const updatedTasks = [...tasks, newTask];
      await saveToLocalStorage(updatedTasks);
      await dispatch(addTask(newTask));

      Alert.alert("Success", "Task added!");
      setTitle("");
      setDescription("");
      setDueDate(new Date()); // Reset date
      router.push("/");
    } catch (error) {
      Alert.alert("Error", "Failed to add task.");
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false); // Hide picker
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back-outline" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Add New Task</Text>
      </View>

      {/* Task Title Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="document-text-outline" size={22} color="#666" style={styles.icon} />
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
      </View>

      {/* Task Description Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="chatbox-ellipses-outline" size={22} color="#666" style={styles.icon} />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          style={{
            flex: 1,
            fontSize: 16,
            height: 80,
            backgroundColor: "transparent",
            borderWidth: 0, // No border
            outlineStyle: "none", // Prevents outline in web
          }}
        />
      </View>

      {/* Date Picker Input */}
      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.datePicker}>
        <Ionicons name="calendar-outline" size={22} color="#666" style={styles.icon} />
        <Text style={styles.dateText}>{dueDate.toDateString()}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={onDateChange}
        />
      )}

      {/* Save Task Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleAddTask}>
        <Ionicons name="checkmark" size={24} color="white" />
        <Text style={styles.buttonText}>Save Task</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 12,
  },
  dateText: {
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    backgroundColor: "transparent",
    borderWidth: 0, // No border
    outlineStyle: "none", // Prevents outline in web
  },
  saveButton: {
    flexDirection: "row",
    backgroundColor: "#007bff",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
});