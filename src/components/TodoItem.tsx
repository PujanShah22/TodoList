import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React from "react";
import { Todo } from "./../containers/TodoList/todo";

interface TodoItemProps {
  todo: Todo;
  onDeletePress: (id: number) => void;
  handleTodoClick: (id: number, title: string) => void;
}

export default function TodoItem({
  todo,
  onDeletePress,
  handleTodoClick,
}: TodoItemProps) {
  return (
    <View testID={`test-todo-${todo.title}`}>
      <TouchableOpacity
        style={styles.container}
        testID={`test-todo-item-${todo.title}`}
        onPress={() => handleTodoClick(todo.id, todo.title)}
      >
        <View style={styles.bulletView} />
        <Text style={styles.todoTitle}>{`${todo.title}`}</Text>
        <Text
          style={styles.removeButton}
          onPress={() => onDeletePress(todo.id)}
          testID={`test-todo-delete-${todo.title}`}
        >
          Remove
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    margin: 10,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  bulletView: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: "#1b44a0",
  },
  removeButton: {
    padding: 5,
    fontSize: 15,
  },
  todoTitle: { flex: 1, fontSize: 15 },
});
