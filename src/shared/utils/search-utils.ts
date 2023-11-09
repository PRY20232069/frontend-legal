// Function to remove diacritics (accents) from a string
export const removeDiacritics = (str: any) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};