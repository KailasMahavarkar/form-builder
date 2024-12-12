import { FormState, FormAction } from "./types";

export const formReducer = (state: FormState, action: FormAction): FormState => {
    switch (action.type) {
        case 'UPDATE_FIELD':
            return { ...state, [action.key]: action.value };
        default:
            return state;
    }
};

