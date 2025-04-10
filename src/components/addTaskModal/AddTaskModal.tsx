import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Prop = {
  isOpen: any;
  closeModal: any;
  handleAddTask:any
};

export function AddTaskModal({ isOpen, closeModal, handleAddTask}: Prop) {
  const [nameInput, setNameInput] = React.useState("");

  const setData = async () => {
    if (nameInput.trim() == "") {
      Alert.alert("Campo vazio", "Digite uma tarefa.");
      return;
    }
    const data = JSON.parse(await AsyncStorage.getItem("tasks") || "[]");
    const inputValue = {name: nameInput, isChecked: false}
    data.push(inputValue);
    handleAddTask(inputValue)
    await AsyncStorage.setItem("tasks", JSON.stringify(data));
    closeModal();
  };
  return (
    <Modal
      visible={isOpen}
      animationType="fade"
      statusBarTranslucent
      transparent
    >
      <SafeAreaView style={styles.modalBackGround}>
        <View style={styles.modal}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            Adicionar uma tarefa
          </Text>
          <TextInput
            value={nameInput}
            placeholder="Digite uma tarefa"
            onChangeText={setNameInput}
            style={styles.addTaskInput}
          />
          <View style={styles.buttons}>
            <TouchableOpacity onPress={closeModal}>
              <Text
                style={[styles.addTaskButton, { backgroundColor: "#ff4d4d" }]}
              >
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={setData}>
              <Text
                style={[styles.addTaskButton, { backgroundColor: "#111111" }]}
              >
                Adicionar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    gap: 20,
  },

  addTaskInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 12,
  },

  buttons: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    justifyContent: "flex-end",
  },

  addTaskButton: {
    color: "white",
    borderRadius: 20,
    padding: 12,
    fontWeight: 700,
    textAlign: "center",
  },
});
