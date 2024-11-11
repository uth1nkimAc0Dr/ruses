export type Todo = {
  id: number;
  title: string;
  created: string;
  isDone: boolean;
};

export type TodoRequest = {
  title?: string;
  isDone?: boolean; // изменение статуса задачи происходит через этот флаг
};

export type TodoInfo = {
  all: number;
  completed: number;
  inWork: number;
};

export type MetaResponse<T, N> = {
  data: T[];
  info?: N;
  meta: {
    totalAmount: number;
  };
};

export enum TaskFilter {
  ALL = 'all',
  COMPLETED = 'completed',
  IN_WORK = 'inWork',
}
