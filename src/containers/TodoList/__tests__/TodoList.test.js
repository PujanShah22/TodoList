import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import TodoList from "../index";
import * as todoHooks from "../useTodos";

const todos = [{ id: 1, title: "demo" }];
const addTodo = jest.fn();
const updateTodo = jest.fn();
const deleteTodo = jest.fn();

/**
 * Mock useTodos hook to test function calls
 **/
jest.spyOn(todoHooks, "useTodos").mockImplementation(() => ({
  todos,
  getTodos: jest.fn(),
  addTodo,
  updateTodo,
  deleteTodo: deleteTodo,
}));

describe("<TodoList/>", () => {
  it("Should render todos", async () => {
    const { findByTestId } = render(<TodoList />);
    const todoListItem = await findByTestId("test-todo-demo");
    expect(todoListItem).toBeTruthy();
  });

  it("Should let user to add todo", async () => {
    const { findByTestId } = render(<TodoList />);
    const todoInput = await findByTestId("test-todo-input");
    fireEvent.changeText(todoInput, "demo");
    const addButton = await findByTestId("test-button-add");
    fireEvent.press(addButton);
    expect(addTodo).toBeCalled();
  });

  it("Should let user to update todo", async () => {
    const { findByTestId } = render(<TodoList />);
    const todoItem = await findByTestId("test-todo-item-demo");
    fireEvent.press(todoItem);
    const todoInput = await findByTestId("test-todo-input");
    expect(todoInput.props.value).toBe("demo");
    fireEvent.changeText(todoInput, "demo updated");
    const updateButton = await findByTestId("test-button-update");
    fireEvent.press(updateButton);
    expect(updateTodo).toBeCalled();
  });

  it("Should let user to delete todo", async () => {
    const { findByTestId } = render(<TodoList />);
    const todoDeleteButton = await findByTestId("test-todo-delete-demo");
    fireEvent.press(todoDeleteButton);
    expect(deleteTodo).toBeCalled();
  });
});
