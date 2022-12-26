import { NEW_USER } from "../actionTypes/actionTypes";

const newUser = (user) =>  {
    return {
        type: NEW_USER,
        payload: user[0],
    };
};

export { newUser };