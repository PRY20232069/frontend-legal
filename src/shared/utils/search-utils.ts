// Function to remove diacritics (accents) from a string
export const removeDiacritics = (str: any) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

  // Filter the items based on the filterKey and searchTerm
export const filterItemsByString = (items: any[], filterKey: string, searchTerm: string) => {
    return items.filter(item =>
        removeDiacritics((item[filterKey] as string).toLowerCase()).includes(removeDiacritics(searchTerm.toLowerCase()))
    );
};

// Filter the items based on the filterKey and searchTerm and boolean
export const filterItemsByStringAndBoolean = (items: any[], stringFilterKey: string, searchTerm: string, booleanFilterKey: string) => {
    return items.filter(item => item[booleanFilterKey] === true &&
        removeDiacritics((item[stringFilterKey] as string).toLowerCase()).includes(removeDiacritics(searchTerm.toLowerCase()))
    );
};