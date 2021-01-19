import React, { useState } from 'react';
import { useInvestmentCategories } from '../js/api';
import { EffectiveAllocation, InvestmentCategory, Portfolio, Transaction } from '../redux/types';
import { balancePortfolio, formatNumber } from '../js/helpers';
import TransactionsRecommendation from '../components/TransactionsRecommendation';

interface CalculatorProps {
    suggestedPortfolio: Portfolio
};

type State = {
    investmentCategory: string,
    amount: string
}[];

function inputPortfolioIsFull(input: State): boolean {
    for (let i = 0; i < input.length; i++) {
        if (input[i].amount === '') return false;
    }
    return true;
}

function createEmptyInputPortfolio(portfolio: Portfolio): State {
    return portfolio.allocations.map(all => ({ investmentCategory: all.investmentCategory, amount: "" }))
}

function createPortfolio(stateLikeObject: State): EffectiveAllocation[] {
    // creates a portfolio (set of effective allocations) from a state-like object
    return stateLikeObject.map(all => {
        const _amount = parseFloat(all.amount);
        return { ...all, amount: isNaN(_amount) ? null : _amount };
    });
}

function renderBody(
    investmentCategories: InvestmentCategory[],
    inputPortfolio: State,
    currPortfolio: EffectiveAllocation[],
    newPortfolio: EffectiveAllocation[],
    transactions: Transaction[],
    onChange: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void
) {

    let inputAmount = null, currAmount = null, newAmount = null, difference = null, thereIsDeficit = null;

    return investmentCategories.map((invCatg, index) => {

        inputAmount = inputPortfolio[index].amount;
        currAmount = currPortfolio[index].amount ?? '';
        newAmount = newPortfolio[index].amount ?? '';
        difference = parseFloat(currAmount.toString()) - parseFloat(newAmount.toString());
        thereIsDeficit = difference < 0;
        difference = isNaN(difference) ? '' : difference.toString();

        return (
            <tr key={index}>
                <td>{invCatg.name} ($)</td>
                <td>
                    <input type="text" className="small amount" value={inputAmount} onChange={onChange.bind(null, invCatg.id)} />
                </td>
                <td>
                    <input type="text" className={`small amount ${thereIsDeficit ? 'deficit' : 'excess'}`} value={difference} disabled />
                </td>
                <td>
                    <input type="text" className="small amount final" value={newAmount} disabled />
                </td>
                {index === 0 &&
                    <td rowSpan={0} style={{ verticalAlign: "top" }}>
                        <TransactionsRecommendation
                            transactions={transactions}
                            investmentCategories={investmentCategories}
                        />
                    </td>
                }
            </tr>
        );
    })
}

const Calculator: React.FC<CalculatorProps> = ({ suggestedPortfolio }) => {

    // 'inputPortfolio' is for input only so other values won't get affected till 'Rebalance' button is pressed
    // 'currPortfolio', 'newPortfolio' and 'transactions' will get affected when 'Rebalance'button is pressed
    const [inputPortfolio, setInputPortfolio] = useState<State>(createEmptyInputPortfolio(suggestedPortfolio));
    const [currPortfolio, setCurrPortfolio] = useState<EffectiveAllocation[]>(createPortfolio(inputPortfolio));
    const [newPortfolio, setNewPortfolio] = useState<EffectiveAllocation[]>(createPortfolio(inputPortfolio));
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const investmentCategories = useInvestmentCategories();

    function handleInputChange(investmentCategory: string, e: React.ChangeEvent<HTMLInputElement>) {
        const value = parseFloat(e.target.value);
        const amount = !isNaN(value) ? formatNumber(value).toString() : "";

        setInputPortfolio(prevPortfolio => {
            return prevPortfolio.map(all => {
                if (all.investmentCategory === investmentCategory) return { ...all, amount };
                else return all;
            })
        })
    }

    function handleCleanButtonClick() {
        const emptyInputPortfolio = createEmptyInputPortfolio(suggestedPortfolio);
        const emptyPortfolio = createPortfolio(emptyInputPortfolio);
        setInputPortfolio(emptyInputPortfolio);
        setCurrPortfolio(emptyPortfolio)
        setNewPortfolio(emptyPortfolio);
        setTransactions([]);
    }

    function handleRebalanceButtonClick() {

        const _currPortfolio = createPortfolio(inputPortfolio);
        const [_newPortfolio, recommendedTransactions] = balancePortfolio(_currPortfolio, suggestedPortfolio);
        setCurrPortfolio(_currPortfolio)
        setNewPortfolio(_newPortfolio);
        setTransactions(recommendedTransactions);
    }

    const inputIsFull = inputPortfolioIsFull(inputPortfolio);

    return (
        <section>
            <h5><b>Calculator</b></h5>
            <p>Please, enter you current portfolio and click <b>Rebalance</b> to give you advice
            on the transactions you have to run in order to match the suggested portfolio for your risk preference.</p>
            <div style={{ marginTop: "1rem" }}>
                <button className="primary button" disabled={!inputIsFull} onClick={handleRebalanceButtonClick}>Rebalance</button>
                <button className="clear secondary button" style={{ marginLeft: "0.5rem" }} onClick={handleCleanButtonClick}>Clean</button>
            </div>
            <table className="stack unstriped">
                <thead>
                    <tr>
                        <th colSpan={2} className="text-center">Current amount</th>
                        <th>Difference</th>
                        <th>Suggested<br></br>Amount</th>
                        <th>Recommended transactions</th>
                    </tr>
                </thead>
                <tbody>
                    {renderBody(investmentCategories, inputPortfolio, currPortfolio, newPortfolio, transactions, handleInputChange)}
                </tbody>
            </table>
        </section>
    );
}

export default Calculator;