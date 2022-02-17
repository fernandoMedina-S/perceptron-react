const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_FUNCTION':
            let newFunction = action.body ? action.body : "";
            return { ...state, Function: newFunction }
        case 'SET_EVALUATED':
            let newEvaluated = action.body ? action.body : "";
            return { ...state, evaluatedPoint: newEvaluated }
        case "SET_ENTERED_POINT":
            let newEntered = action.body ? action.body : "";
            return { ...state, enteredPoints: state.enteredPoints.concat(newEntered) }
        default:
            return state
    }
}

export default reducer;