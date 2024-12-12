import type { ReactNode } from "react";

export type FormState = Record<string, string>;

export type FormAction = {
    type: 'UPDATE_FIELD';
    key: string;
    value: string
};

export type FormContextType = {
    state: Record<string, string>,
    dispatch: React.Dispatch<FormAction>;
}

export interface FormProviderProps {
    children: ReactNode;
}
