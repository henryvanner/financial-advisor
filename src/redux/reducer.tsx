import { ActionType, SET_RISK_PREFERENCE, State } from "./types";

const initialState: State = {
    riskPreference: null
}

export default function appReducer(state = initialState, action: ActionType): State {

    switch (action.type) {
        case SET_RISK_PREFERENCE:
            return {
                ...state,
                riskPreference: action.meta.riskLevel
            };
        default:
            return state;
    }
}