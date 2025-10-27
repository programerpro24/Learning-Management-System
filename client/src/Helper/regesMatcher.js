
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

export function isEmail(string) {
    if (!string) return false; 
    return emailRegex.test(string); 
}

export function isValidPassword(string) {
    
    if (!string) return false;
    return passwordRegex.test(string);
}