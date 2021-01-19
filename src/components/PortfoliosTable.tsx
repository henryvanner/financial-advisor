import React from 'react';
import { InvestmentCategory, Portfolio } from '../redux/types';


function renderHead(investmentCategories: InvestmentCategory[]) {
    return (
        <tr>
            <th className="text-center">Risk</th>
            {investmentCategories.map((invCatg, index) => <th key={index} className="text-center">{invCatg.name}</th>)}
        </tr>
    )
}

function renderBody(portfolios: Portfolio[], riskPreference: number | null) {
    return portfolios.map((portfolio, index) => {

        const className = portfolio.riskLevel === riskPreference ? "selected-row" : "";

        return (
            <tr key={index} className={className}>
                <td className="text-center">{portfolio.riskLevel}</td>
                {portfolio.allocations.map((allocation, jndex) => {
                    return (
                        <td className="text-center" key={jndex}>{allocation.proportion}%</td>
                    );
                })}
            </tr>
        )
    })
}

interface PortfoliosTableProps {
    portfolios: Portfolio[],
    riskPreference: number | null,
    investmentCategories: InvestmentCategory[]
}

const PortfoliosTable: React.FC<PortfoliosTableProps> = ({ portfolios, riskPreference, investmentCategories }) => {

    return (
        <section>
            <h5>Portfolio distribution table</h5>
            <table className="unstriped stack">
                <thead>{renderHead(investmentCategories)}</thead>
                <tbody>{renderBody(portfolios, riskPreference)}</tbody>
            </table>
        </section>
    );
}

export default PortfoliosTable;