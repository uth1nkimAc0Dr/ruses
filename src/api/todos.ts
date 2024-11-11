const BASE_URL = 'https://easydev.club/api/v1';
import type {
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest,
  TaskFilter,
} from '@/types/types';

// остальные не нужно также переписывать с Promise<>?
export const createTask = async (newTodo: TodoRequest): Promise<Todo | any> => {
  try {
    const response = await fetch(`${BASE_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({ isDone: false, title: title }),
      body: JSON.stringify(newTodo),
      //  as TodoRequest
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.log('createTaskError is', error);
    throw error;
  }
};

export const changeTask = async (
  id: number,
  newTodo: TodoRequest,
): Promise<Todo | any> => {
  try {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.log('changeTaskError is', error);
    throw error;
  }
};

export const removeTask = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return;
  } catch (error) {
    console.log('removeTaskError is', error);
    throw error;
  }
};

export const getTasks = async (
  filter: TaskFilter,
): Promise<MetaResponse<Todo, TodoInfo>> => {
  try {
    let query = '';
    if (filter) {
      query = `?filter=${encodeURIComponent(filter)}`;
    }

    const response = await fetch(`${BASE_URL}/todos${query}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = (await response.json()) as MetaResponse<Todo, TodoInfo>;
    return data;
  } catch (error) {
    console.log('getTaskError is', error);
    throw error;
  }
};
