import React from "react";
import {
  FlatList,
  ListRenderItem,
  Text,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import db from "./../../database/dbService";
import { useTodos } from "./useTodos";
import { Todo } from "./todo";
import TodoItem from "../../components/TodoItem";
import { styles } from "./styles";

export default function TodoList() {
  const { todos, getTodos, addTodo, updateTodo, deleteTodo } = useTodos();
  const textInputRef = useRef<TextInput>(null);
  const [title, setTitle] = useState<string>("");
  const [todoId, setTodoId] = useState<number>();

  useEffect(() => {
    getTodos(db);
  }, []);

  useEffect(() => {
    if (!title) setTodoId(undefined);
  }, [title]);

  const handleChangeText = (text: string) => setTitle(text);

  /**
   * Add Todo if there is no id selected
   * Update Todo if any todo is selected
   **/
  const handleAddUpdateTodo = () => {
    if (title) {
      if (todoId) {
        updateTodo(db, todoId, title);
      } else {
        addTodo(db, title);
      }
    }
    setTitle("");
    setTodoId(undefined);
    textInputRef?.current?.clear();
    textInputRef?.current?.focus();
  };

  /** Delete todo on delete click **/
  const handleDeleteTodo = (id: number) => {
    if (id == todoId) {
      setTodoId(undefined);
      setTitle("");
    }
    deleteTodo(db, id);
  };

  /** Set id & title to update clicked todo **/
  const handleTodoClick = (id: number, title: string) => {
    textInputRef?.current?.focus();
    setTitle(title);
    setTodoId(id);
  };

  const renderItem: ListRenderItem<Todo> = ({ item: todo }) => {
    return (
      <TodoItem
        todo={todo}
        onDeletePress={handleDeleteTodo}
        handleTodoClick={handleTodoClick}
      />
    );
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS == "ios" ? 64 : -1000}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyboardShouldPersistTaps="always"
          keyExtractor={(todo) => todo.id.toString()}
          ListEmptyComponent={
            <View style={styles.emptyListContainer}>
              <Text style={styles.emptyListText}>
                {"Want to add todo?\nJust type in below input & Add it. "}
              </Text>
            </View>
          }
        />
        <View style={styles.bottomContainer}>
          <TextInput
            ref={textInputRef}
            style={styles.textInput}
            placeholder="Enter here"
            onChangeText={handleChangeText}
            underlineColorAndroid={"gray"}
            onSubmitEditing={handleAddUpdateTodo}
            value={title}
            testID="test-todo-input"
          />

          <Pressable
            style={styles.button}
            onPress={handleAddUpdateTodo}
            disabled={!title}
            testID={`test-button-${todoId ? "update" : "add"}`}
          >
            <Text style={styles.buttonText}>{todoId ? "UPDATE" : "ADD"}</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
