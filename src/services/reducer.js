const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_FUNCTION':
            let newFunction = action.body ? action.body : "";
            return { ...state, Function: newFunction }
        case 'SET_EVALUATED':
            let newEvaluated = action.body ? action.body : "";
            return { ...state, evaluatedPoint: newEvaluated }
        default:
            return state
    }
}

export default reducer;