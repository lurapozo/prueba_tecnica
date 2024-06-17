const initialState = {
    skip: 0,
};

const paginacionReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SIGUIENTE':
            return {
                ...state,
                skip: state.skip + 10,
            };
        case 'ANTERIOR':
            return {
                ...state,
                skip: state.skip - 10,
            }
        default:
            return state;
    }
};

export default paginacionReducer;
