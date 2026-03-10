import axios from 'axios';

const API_URL = 'http://localhost:8082/students';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const studentService = {
    getAllStudents: async () => {
        const response = await axiosInstance.get('/all');
        return response.data;
    },
    
    getStudentCount: async () => {
        const response = await axiosInstance.get('/count');
        return response.data;
    },

    getStudentsByYear: async () => {
        const response = await axiosInstance.get('/byYear');
        return response.data;
    },

    saveStudent: async (student) => {
        const response = await axiosInstance.post('/save', student);
        return response.data;
    },

    deleteStudent: async (id) => {
        await axiosInstance.delete(`/delete/${id}`);
    }
};
