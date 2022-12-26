import { NEW_USER } from "../actionTypes/actionTypes";

const initialState = {
    user: "",
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEW_USER:
            
            return{
                ...state,
                user: action.payload
            }
    
        default:
            return state;
    }
};