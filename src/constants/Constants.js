export const hostId = "http://localhost:5000";


export const getAuthToken = () => {
    let token = localStorage.getItem('auth-token');
    if (!token) return null;
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwNzVjZjQ5MDYwNWNmYjhmNzU4NTdhIn0sImlhdCI6MTY3ODIxMzA1Mn0.Le8SUdfNIi66adYQSXG6bcChAtR8fhDOxT5-4ZXuwO8";
    return token;
}

export const storeAuthToken = (token) => {
    removeAuthToken();
    localStorage.setItem('auth-token', token);
    console.log('Successfully Stored', localStorage.getItem('auth-token'));
}

export const removeAuthToken = () => {
    localStorage.removeItem('auth-token');
}


export default hostId;