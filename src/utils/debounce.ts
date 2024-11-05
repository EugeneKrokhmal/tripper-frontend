// src/utils/debounce.ts
export const debounce = (func: Function, delay: number) => {
    let debounceTimer: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func(...args), delay);
    };
};
