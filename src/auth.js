import {jwtDecode} from 'jwt-decode';

export function getUserPrivileges() {
    const token = localStorage.getItem('token');
    if (token) {
        const decoded = jwtDecode(token);
        return decoded.Privilege || ''; // Ajusta el nombre de la clave según tu token
    }
    return '';
}

export function hasPrivilege(requiredPrivileges) {
    const userPrivilege = getUserPrivileges();
    return requiredPrivileges.includes(userPrivilege);
}


