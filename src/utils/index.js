export const buildActionCreator = type => {
    return (payload = {}) => ({
        type,
        payload
    });
}