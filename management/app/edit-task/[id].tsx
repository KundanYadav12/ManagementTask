 





import { useState, useEffect } from "react";
import { View, TextInput, Alert, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useLocalSearchParams } from "expo-router";
import { RootState } from "../../redux/store";
import { Task, updateTask } from "../../redux/taskSlice";
import { Ionicons } from "@expo/vector-icons";

export default function EditTaskScreen() {
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  // Find the task from Redux state
  const task = useSelector((state: RootState) =>
    state.tasks.tasks.find((t) => t.id.toString() === id)
  );

  // Local state for editing
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
    }
  }, [task]);

  const handleUpdateTask = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Title is required!");
      return;
    }

    if (!task) {
      Alert.alert("Error", "Task not found!");
      return;
    }

    // Create updated task object
    const updatedTask: Task = { ...task, title, description };

    try {
      await dispatch(updateTask(updatedTask)); // Update in Redux & local storage
      Alert.alert("Success", "Task updated!");
      router.push("/"); // Navigate back to home
    } catch (error) {
      Alert.alert("Error", "Failed to update task.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back-outline" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Task</Text>
      </View>

      {/* Task Title Input */}
      <View style={[styles.inputContainer, isTitleFocused && styles.inputFocused]}>
        <Ionicons name="document-text-outline" size={22} color="#666" style={styles.icon} />
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          onFocus={() => setIsTitleFocused(true)}
          onBlur={() => setIsTitleFocused(false)}
          style={styles.input}
        />
      </View>

      {/* Task Description Input */}
      <View style={[styles.inputContainer, isDescriptionFocused && styles.inputFocused]}>
        <Ionicons name="chatbox-ellipses-outline" size={22} color="#666" style={styles.icon} />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          onFocus={() => setIsDescriptionFocused(true)}
          onBlur={() => setIsDescriptionFocused(false)}
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

      {/* Update Task Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleUpdateTask}>
        <Ionicons name="checkmark" size={24} color="white" />
        <Text style={styles.buttonText}>Update Task</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    flex: 1, // Allows title to take remaining space
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  
  icon: { marginRight: 10 },
  input: {
    flex: 1,
    fontSize: 16,
    borderWidth: 0, // Removes black border
    backgroundColor: "transparent",
    outlineStyle: "none", // Prevents outline in web
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
