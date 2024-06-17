const inintialState = {
    count: 0
}

const intentosReducer = (state = inintialState, action: any) => {
    switch (action.type) {
        case 'INCREMENTO':
            if (state.count + 1 > 3) {
                return {
                    ...state,
                    count: 1,
                };
            }
            else {
                return {
                    ...state,
                    count: state.count + 1,
                };
            }

        default:
            return state;
    }
}

export default intentosReducer;
