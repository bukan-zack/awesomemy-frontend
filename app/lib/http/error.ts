export function humanizeError(error: any) {
    if (error.response.data && error.response.data.message) {
        return error.response.data.message;
    }
    
    return error.message;
}