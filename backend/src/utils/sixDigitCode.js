export const generateRandomSixDigitCode = () => {
    return Math.random().toString().slice(2, 8);
};
