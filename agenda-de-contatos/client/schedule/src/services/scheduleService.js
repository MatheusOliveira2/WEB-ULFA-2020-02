import http from '../http';

const service = {
  getAll: async () => {
    const data = await http.get('/schedule');
    return Array.from(data.data);
  },

  add: async (user) => {
    const data = await http.post('/schedule', user);
    return data.data;
  },

  delete: async (id) => {
    await http.delete(`/schedule/${id}`);
  },

  update: async (id, number) => {
    await http.put(`schedule/${id}`, { number });
  },
};

export default service;
