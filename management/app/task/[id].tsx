import { View, Text, Button } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function TaskDetail() {
  const { id } = useLocalSearchParams();
  const task = useSelector((state: RootState) => state.tasks.tasks.find(t => t.id === id));

  if (!task) return <Text>Task not found</Text>;

  return (
    <View>
      <Text>{task.title}</Text>
      <Text>{task.description}</Text>
      <Text>{task.dueDate}</Text>
    </View>
  );
}
