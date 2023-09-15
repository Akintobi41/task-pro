export const date = (time) => {
    return new Date(
        time.slice(0, time.length - 5)
    ).toDateString();
};