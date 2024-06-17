import { API_BASE_URL } from './config';

export const login = async (username: string, password: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, expiresInMins: 30 }),
        });
        const data = await response.json();
        return { response, data };
    } catch (error) {
        throw new Error('Error en la solicitud de login');
    }
};
