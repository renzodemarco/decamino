export const validator = {}

validator.emptyFilds = (data) => {

    const emptyAttributes = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => {
            if (Array.isArray(value)) {
                // Filtrar arrays vacíos
                return value.length === 0;
            } else {
                // Filtrar valores vacíos
                return value === '' || value === null;
            }
        })
    );
    return Object.keys(emptyAttributes).length === 0 ? false : emptyAttributes
}

validator.clearEmptyFilds = (data) => {

    const Attributes = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => {
            if (Array.isArray(value)) {
                // Filtrar arrays vacíos
                return value.length !== 0;
            } else {
                // Filtrar valores vacíos
                return value !== '' && value !== null;
            }
        })
    );
    return Object.keys(Attributes).length === 0 ? false : Attributes

}