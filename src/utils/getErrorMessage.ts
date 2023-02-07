export function getErrorMessage(error: Error) {
    if (error instanceof Error) return error.message;
    return String(error);
}