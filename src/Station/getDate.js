
export const getDateWithDelta = (date, daysDelta) => {
    const newDate = new Date(
        date.getFullYear(), date.getMonth(), date.getDate() - daysDelta
    );

    const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
    const day = newDate.getDate().toString().padStart(2, "0");
    const year = newDate.getFullYear();
    return `${year}-${month}-${day}`;
};
