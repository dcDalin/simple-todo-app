import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { v4 as uuidv4 } from 'uuid';

type Todo = {
  id: string;
  task: string;
};

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    listTodos: (state) => {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        state.todos = JSON.parse(storedTodos) as Todo[];
      }
    },
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = { id: uuidv4(), task: action.payload };
      state.todos.push(newTodo);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
  },
});

export const { listTodos, addTodo, removeTodo } = todoSlice.actions;

export const selectTodos = (state: RootState) => state.todo.todos;

export default todoSlice.reducer;