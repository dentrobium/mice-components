export const checkDoubleSpaces = (errorText?: string) => (text: string) => {
    const pattern = /\s{2}/;
    return pattern.test(text) ? errorText : null;
};

export const checkOnlySpaces = (errorText?: string) => (text: string) => {
    const pattern = /^\s*$/;
    return pattern.test(text) ? errorText : null;
};
