

 







import { View, FlatList, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../redux/taskSlice";
import { RootState } from "../redux/store";
import { Link } from "expo-router";
import TaskItem from "../components/TaskItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons"; // Import icons

export default function HomeScreen() {
  const dispatch = useDispatch<any>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [search, setSearch] = useState("");
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useEffect(() => {
    const loadTasks = async () => {
      const storedTasks = await AsyncStorage.getItem("tasks");
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        dispatch(fetchTasks(parsedTasks));
      } else {
        dispatch(fetchTasks());
      }
    };
    loadTasks();
  }, [dispatch]);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredTasks(tasks);
    } else {
      const lowercasedSearch = search.toLowerCase();
      setFilteredTasks(
        tasks.filter(task => task.title.toLowerCase().includes(lowercasedSearch))
      );
    }
  }, [search, tasks]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Manager</Text>

      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search Task..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Task List */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TaskItem task={item} />}
      />

      {/* Floating Add Button */}
      <Link href="/add-task" asChild>
        <TouchableOpacity style={styles.floatingButton}>
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007bff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
