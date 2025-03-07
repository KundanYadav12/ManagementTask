 




// import { View, Text, Button, StyleSheet } from "react-native";
// import { Task, deleteTask } from "../redux/taskSlice";
// import { useDispatch } from "react-redux";
// import { Link, useRouter } from "expo-router";

// export default function TaskItem({ task }: { task: Task }) {
//   const dispatch = useDispatch<any>();
//   const router = useRouter();

//   return (
//     <View style={styles.tableRow}>
//       <Text style={[styles.tableCell, { flex: 2 }]}>{task.title}</Text>
//       <Text style={[styles.tableCell, { flex: 3 }]}>{task.description || "No description"}</Text>
//       <Text style={[styles.tableCell, { flex: 2 }]}>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}</Text>
//       <View style={[styles.tableCell, styles.buttonContainer, { flex: 2 }]}>
//         <Button title="Edit" onPress={() => router.push(`/edit-task/${task.id}`)} />
//         <Button title="Delete" color="red" onPress={() => dispatch(deleteTask(task.id))} />
//       </View>
//     </View>
//   );
// }

// // Styles for TaskItem
// const styles = StyleSheet.create({
//   tableRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//     paddingVertical: 10,
//   },
//   tableCell: {
//     textAlign: "center",
//     paddingHorizontal: 5,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//   },
// });






import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Task, deleteTask } from "../redux/taskSlice";
import { useDispatch } from "react-redux";
import { Link, useRouter } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons"; // Import icons

export default function TaskItem({ task }: { task: Task }) {
  const dispatch = useDispatch<any>();
  const router = useRouter();

  return (
    <View style={styles.taskCard}>
      <View style={styles.taskContent}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.description}>{task.description || "No description"}</Text>
        <Text style={styles.date}>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}</Text>
      </View>

      {/* Edit & Delete Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={() => router.push(`/edit-task/${task.id}`)}>
          <Ionicons name="pencil" size={24} color="#007bff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(deleteTask(task.id))}>
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: "center",
    justifyContent: "space-between",
  },
  taskContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 15,
  },
});
