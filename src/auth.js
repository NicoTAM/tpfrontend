import axios from './axios';
import { jwtDecode } from 'jwt-decode';

export function isTokenExpired() {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (token) {
        try {
            const decoded = jwtDecode(token);
            const expirationDate = new Date(decoded.exp * 1000);
            const currentDate = new Date();
            // console.log('Token Expiration Date:', expirationDate);
            // console.log('Current Date:', currentDate);
            return expirationDate < currentDate;
        } catch (error) {
            console.error('Error al decodificar el token:', error);
            return true;
        }
    }
    return true;
}

export async function getNewToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return null;

    try {
        const response = await axios.post('https://localhost:7296/api/User/RefreshToken', { refreshToken });
        console.log(response.data);
        const { token, refreshToken: newRefreshToken } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', newRefreshToken);

        return token;
    } catch (error) {
        console.error('Error al renovar el token:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        return null;
    }
}

export function getUserPrivileges() {
    const token = localStorage.getItem('token');
    if (token) {
        const decoded = jwtDecode(token);
        return decoded.Privilege || '';
    }
    return '';
}

export function hasPrivilege(requiredPrivileges) {
    const userPrivilege = getUserPrivileges();
    return requiredPrivileges.includes(userPrivilege);
}


