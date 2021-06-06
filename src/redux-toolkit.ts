import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v1 as uuid } from 'uuid';
import { Todo } from './type';

const todosInitialState: Todo[] = [
  {
    id: uuid(),
    desc: 'Learn React',
    isComplete: true
  },
  {
    id: uuid(),
    desc: 'Learn Redux',
    isComplete: true
  },
  {
    id: uuid(),
    desc: 'Learn Redux-ToolKit',
    isComplete: false
  }
];

const todoSlice = createSlice({
  name: 'todos',
  initialState: todosInitialState,
  reducers: {
    create: {
      reducer: (
        state,
        {
          payload: { desc, id, isComplete }
        }: PayloadAction<{ id: string; isComplete: boolean; desc: string }>
      ) => {
        state.push({
          id,
          desc,
          isComplete
        });
      },
      prepare: ({ desc }: { desc: string }) => ({
        payload: {
          id: uuid(),
          desc,
          isComplete: false
        }
      })
    },
    edit: (
      state,
      { payload: { id, desc } }: PayloadAction<{ id: string; desc: string }>
    ) => {
      const todoToEdit = state.find(todo => todo.id === id);
      if (todoToEdit) {
        todoToEdit.desc = desc;
      }
    },
    toggle: (
      state,
      {
        payload: { id, isComplete }
      }: PayloadAction<{ id: string; isComplete: boolean }>
    ) => {
      const todoToToggle = state.find(todo => todo.id === id);
      if (todoToToggle) {
        todoToToggle.isComplete = isComplete;
      }
    },
    remove: (state, { payload: { id } }: PayloadAction<{ id: string }>) => {
      const index = state.findIndex(todo => todo.id === id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    }
  }
});

const selectedTodoSlice = createSlice({
  name: 'selectedTodo',
  initialState: null as string | null,
  reducers: {
    // since initialState is a primitive type, we cannot mutate it
    select: (state, { payload: { id } }: PayloadAction<{ id: string }>) => id
  }
});
