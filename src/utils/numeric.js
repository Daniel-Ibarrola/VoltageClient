

export const roundVoltage = (voltage) => {
    if (voltage === null){
        return "-";
    }
    return voltage.toFixed(2);
};
