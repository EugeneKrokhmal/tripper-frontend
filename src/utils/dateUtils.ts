export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
    }).format(date);
};
