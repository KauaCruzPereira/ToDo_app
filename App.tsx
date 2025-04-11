import Checkbox from "expo-checkbox";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";
import { AddTaskModal } from "./src/components/addTaskModal/AddTaskModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Task = {
  name: string;
  isChecked: boolean;
};

export default function App() {
  const [toDoList, setToDoList] = useState<Task[]>([]);

  useEffect(() => {
    AsyncStorage.getItem("tasks").then((data) => {
      if (data) {
        setToDoList(JSON.parse(data));
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("tasks", JSON.stringify(toDoList)).then(() => {});
  }, [toDoList]);

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
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={{ marginBottom: 30 }}>
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
          <View
            style={[styles.toDoListDiv, item.isChecked && { opacity: 0.5 }]}
            key={index}
          >
            <Text
              style={[
                styles.toDoListText,
                item.isChecked && { textDecorationLine: "line-through" },
              ]}
            >
              {item.name}
            </Text>
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
    backgroundColor: "white",
    gap: 10,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0,
  },

  toDoAddButtonText: {
    color: "white",
    borderRadius: 20,
    backgroundColor: "#111111",
    padding: 12,
    fontWeight: 700,
    textAlign: "center",
  },

  toDoListDiv: {
    padding: 24,
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 14,
    width: "100%",
    gap: 10,
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
