import Checkbox from "expo-checkbox";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { AddTaskModal } from "./src/components/addTaskModal/AddTaskModal";

type Task = {
  name: string;
  isChecked: boolean;
};

export default function App() {
  const [toDoList, setToDoList] = useState<Task[]>([]);

  function handleTaskClick(task: Task, index: number) {
    setToDoList((prevState) => {
      task.isChecked = !task.isChecked;
      const data = [...prevState];
      data[index] = task;
      return data;
    });
  }

  function removeTask(item: string) {
    setToDoList((prevState) => {
      return prevState.filter((task) => task.name != item);
    });
  }

  function handleAddTask(newTask: Task) {
    setToDoList((prevState) => [...prevState, newTask]);
  }

  const [isOpen, setIsOpen] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={function () {
            setIsOpen(true);
          }}
        >
          <Text style={styles.toDoAddButtonText}>Adicionar tarefa</Text>
        </TouchableOpacity>
      </View>
      {toDoList.map(function (item, index) {
        return (
          <View style={styles.toDoListDiv} key={index}>
            <Text style={styles.toDoListText}>{item.name}</Text>
            <Checkbox
              style={styles.toDoCheckBox}
              value={item.isChecked}
              onValueChange={() => {
                handleTaskClick(item, index);
              }}
            />
            <View>
              <TouchableOpacity onPress={() => removeTask(item.name)}>
                <Text style={styles.deleteButton}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
      <AddTaskModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        handleAddTask={handleAddTask}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 24,
  },

  toDoAddButtonText: {
    color: "white",
    borderRadius: 20,
    backgroundColor: "#111111",
    padding: 12,
    fontWeight: 700,
  },

  toDoListDiv: {
    padding: 24,
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 14,
    width: "100%",
    gap: 15,
  },

  toDoListText: {
    fontWeight: 700,
    flex: 1,
    fontSize: 15,
  },

  toDoCheckBox: {
    fontWeight: "700",
    fontSize: 14,
    alignSelf: "center",
    marginLeft: "auto",
    borderRadius: 6,
    paddingHorizontal: 9,
    paddingVertical: 9,
  },

  deleteButton: {
    fontWeight: "700",
    fontSize: 14,
    backgroundColor: "#ff4d4d",
    color: "white",
    paddingHorizontal: 8,
    paddingVertical: 1,
    borderRadius: 6,
  },
});
