import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { v4 as uuidv4 } from 'uuid';

type Todo = {
  id: string;
  task: string;
  createdAt: string;
  editedAt?: string;
};

interface TodoState {
  todos: Todo[];
  isNewActive: boolean;
  isEditActive: boolean;
  editTodoId: string | null;
}

const initialState: TodoState = {
  todos: [],
  isNewActive: false,
  isEditActive: false,
  editTodoId: null,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setIsNewActive: (state) => {
      state.isNewActive = true;
      state.isEditActive = false;
      state.editTodoId = null;
    },
    setIsNewNotActive: (state) => {
      state.isNewActive = false;
      state.isEditActive = false;
      state.editTodoId = null;
    },
    setIsEditActive: (state, action: PayloadAction<string>) => {
      state.editTodoId = action.payload;
      state.isNewActive = false;
      state.isEditActive = true;
    },
    listTodos: (state) => {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        state.todos = JSON.parse(storedTodos) as Todo[];
        state.todos.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
    },
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: uuidv4(),
        task: action.payload,
        createdAt: new Date().toISOString(),
      };
      state.todos.push(newTodo);
      localStorage.setItem('todos', JSON.stringify(state.todos));
      state.isNewActive = false;
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    editTodo: (state, action: PayloadAction<{ id: string; task: string }>) => {
      const { id, task } = action.payload;
      const todoToEdit = state.todos.find((todo) => todo.id === id);
      if (todoToEdit) {
        todoToEdit.task = task;
        todoToEdit.editedAt = new Date().toISOString();
        localStorage.setItem('todos', JSON.stringify(state.todos));
        state.isEditActive = false;
        state.editTodoId = null;
      }
    },
    searchTodos: (state, action: PayloadAction<string>) => {
      const searchQuery = action.payload.trim();
      if (searchQuery === '') {
        // If search query is empty, display all todos
        return;
      }
      state.todos = state.todos.filter((todo) =>
        todo.task.includes(searchQuery)
      );
    },
  },
});

export const {
  setIsNewActive,
  setIsNewNotActive,
  setIsEditActive,
  listTodos,
  addTodo,
  removeTodo,
  editTodo,
  searchTodos,
} = todoSlice.actions;

export const selectTodos = (state: RootState) => state.todo.todos;

export default todoSlice.reducer;
