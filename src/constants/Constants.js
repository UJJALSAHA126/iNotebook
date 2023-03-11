export const hostId = "http://localhost:5000";


export const getAuthToken = () => {
    const token = localStorage.getItem('auth-token');
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwNzVjZjQ5MDYwNWNmYjhmNzU4NTdhIn0sImlhdCI6MTY3ODIxMzA1Mn0.Le8SUdfNIi66adYQSXG6bcChAtR8fhDOxT5-4ZXuwO8";
    return token;
}


export default  hostId;