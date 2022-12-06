import request from './request'

interface Todo {
  id: number
  title: string
  body: string
  userId: number
}

export default {
  listAll: () => request<Todo[]>('/todos'),
  get: (id: number) => request<Todo>(`/todos/${id}`),
  create: (todo: Omit<Todo, 'id'>) => request.post<Todo>('/todos', todo),
}
