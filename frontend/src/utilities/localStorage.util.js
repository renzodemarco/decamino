const loadState = (item) => {
    try {
        const serializedState = localStorage.getItem(item);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        console.log(error)
        return undefined;
    }
};

const saveState = (state, data) => {
    try {
        const serializedState = JSON.stringify(data);
        localStorage.setItem(state, serializedState);
    } catch (error) {
        console.log(error)
        return undefined
    }
};

export { loadState, saveState };
