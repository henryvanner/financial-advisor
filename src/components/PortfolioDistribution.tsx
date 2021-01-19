import React from 'react';
import { InvestmentCategory, Portfolio } from '../redux/types';

function renderHead(investmentCategories: InvestmentCategory[]) {
    return (
        <tr>
            {investmentCategories.map((invCatg, index) => <th key={index} className="text-center">{invCatg.name}</th>)}
        </tr>
    )
}

function renderBody(portfolio: Portfolio) {
    return (
        <tr>
            {portfolio.allocations.map((all, index) => <td key={index} className="text-center">{all.proportion}%</td>)}
        </tr>
    );
}

interface PortfolioDistributionProps {
    portfolio: Portfolio,
    investmentCategories: InvestmentCategory[]
}

const PortfolioDistribiution: React.FC<PortfolioDistributionProps> = ({ portfolio, investmentCategories }) => {

    return (
        <div>
            <h5><b>Risk level</b>: {portfolio.riskLevel}</h5>
            <table className="unstriped stack">
                <thead>{renderHead(investmentCategories)}</thead>
                <tbody>{renderBody(portfolio)}</tbody>
            </table>
        </div>
    );
}

export default PortfolioDistribiution;