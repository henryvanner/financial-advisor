import { ActionType, SET_RISK_PREFERENCE } from "./types";

export function setRiskPreference(riskLevel: number): ActionType {
    return {
        type: SET_RISK_PREFERENCE,
        meta: {
            riskLevel
        }
    }
}