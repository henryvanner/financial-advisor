export type InvestmentCategory = {
    id: string,
    name: string
}

export type Allocation = {
    proportion: number,
    investmentCategory: string
}

export interface EffectiveAllocation {
    investmentCategory: string,
    amount: number | null
}

export type Portfolio = {
    riskLevel: number,
    allocations: Allocation[]
}

export type Transaction = {
    from: string,
    to: string,
    amount: number
}

// actions
export const SET_RISK_PREFERENCE = "riskPreference/set";

export type SetRiskPreference = {
    type: typeof SET_RISK_PREFERENCE,
    meta: {
        riskLevel: number
    }
}
// state
export type State = {
    riskPreference: number | null
}

export type ActionType = SetRiskPreference;