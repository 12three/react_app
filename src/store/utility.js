export const updateState = (state) => {
    return (newState) => {
        return {
            ...state,
            ...newState,
        }
    }
}