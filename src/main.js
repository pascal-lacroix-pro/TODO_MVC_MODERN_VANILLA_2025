import "./styles.css";
import TodoList from "./components/todoList/TodoList";

new TodoList({
  el: "#app",
  apiURL: "https://68ad9556a0b85b2f2cf3e1b0.mockapi.io/",
});
