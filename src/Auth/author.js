import jwt_decode from 'jwt-decode';

export const check_role = async function() {
    const token = sessionStorage.getItem('token');
    if(token === null){
        sessionStorage.removeItem('token');
        return null
    }
    var decode = await jwt_decode(token);
    sessionStorage.setItem('role',decode.role);
    return decode.role;
}