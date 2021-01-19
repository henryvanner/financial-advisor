import React from 'react';
import { InvestmentCategory, Transaction } from '../redux/types';

interface TransactionsRecommendationProps {
    transactions: Transaction[],
    investmentCategories: InvestmentCategory[]
};

const TransactionsRecommendation: React.FC<TransactionsRecommendationProps> = ({ transactions, investmentCategories }) => {

    function getInvestmentCategoryName(id: string) {
        const invCatg = investmentCategories.find(invCatg => invCatg.id === id);
        return invCatg ? invCatg.name : '';
    }

    let from = null, to = null;
    return (
        <ul>
            {transactions.map((t, index) => {
                from = getInvestmentCategoryName(t.from);
                to = getInvestmentCategoryName(t.to);
                return <li key={index}>Move ${t.amount} from "{from}" to "{to}"</li>
            })}
        </ul >
    );
}

export default TransactionsRecommendation;