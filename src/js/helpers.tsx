import { EffectiveAllocation, Portfolio } from "../redux/types";

type ExcessOrDeficit = {
    investmentCategory: string,
    amount: number
};

type Transaction = {
    from: string,
    to: string,
    amount: number
}

function getNewPortfolio(currPortfolio: EffectiveAllocation[], desired: Portfolio): EffectiveAllocation[] {

    const total = currPortfolio.reduce((acc, curr) => acc + (curr.amount || 0), 0);
    return currPortfolio.map((all, index) => ({ ...all, amount: formatNumber(total * (desired.allocations[index].proportion / 100)) }));

};

function extractExcessNDeficit(currPortfolio: EffectiveAllocation[], desired: EffectiveAllocation[]) {
    const excess: ExcessOrDeficit[] = [], deficit: ExcessOrDeficit[] = [];
    let m = null, n = null;

    currPortfolio.forEach((all, index) => {
        m = all.amount || 0;
        n = desired[index].amount || 0;
        if (m > n) { excess.push({ investmentCategory: all.investmentCategory, amount: formatNumber(m - n) }); }
        if (m < n) { deficit.push({ investmentCategory: desired[index].investmentCategory, amount: formatNumber(n - m) }); }
    });
    return [excess, deficit];
}

export function workOutTransactions(currPortfolio: EffectiveAllocation[], desired: EffectiveAllocation[]) {
    let [excess, deficit] = extractExcessNDeficit(currPortfolio, desired);
    const transactions: Transaction[] = [];

    // establish needed transactions
    let def = null, exc = null, excessIsNotEnough = false, aux = null;

    while (excess.length && deficit.length) {

        // sort descending
        excess.sort((a, b) => b.amount - a.amount);
        deficit.sort((a, b) => b.amount - a.amount);

        // get top excess and deficit
        exc = excess[0];
        def = deficit[0];
        excessIsNotEnough = exc.amount < def.amount;

        // save transaction info
        transactions.push({
            from: exc.investmentCategory,
            to: def.investmentCategory,
            amount: excessIsNotEnough ? exc.amount : def.amount
        });

        // determine new values after transaction
        aux = def.amount;
        def.amount = excessIsNotEnough ? def.amount - exc.amount : 0;
        exc.amount = excessIsNotEnough ? 0 : exc.amount - aux;

        // pop if necessary
        if (def.amount === 0) { deficit = deficit.slice(1) };
        if (exc.amount === 0) { excess = excess.slice(1) };

    }

    return transactions;
}

export function balancePortfolio(currPortfolio: EffectiveAllocation[], targetPortfolio: Portfolio): [EffectiveAllocation[], Transaction[]] {
    const newPortfolio = getNewPortfolio(currPortfolio, targetPortfolio);
    const neededTransactions = workOutTransactions(currPortfolio, newPortfolio);
    return [newPortfolio, neededTransactions];
}

export function formatNumber(n: number) {
    return parseFloat(n.toFixed(2));
}