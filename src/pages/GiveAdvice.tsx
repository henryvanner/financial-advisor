import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useInvestmentCategories, usePortfolios } from '../js/api';
import PortfolioDistribution from '../components/PortfolioDistribution';
import Calculator from '../containers/Calculator';
import { State } from '../redux/types';

const NavigationButton = () => <div className="flex-container align-right" style={{ marginTop: "1rem" }}>
    <Link to="/selectRiskPreference" className="hollow primary button">Previous</Link>
</div>;

const GiveAdvice: React.FC = () => {

    const riskPreference = useSelector((state: State) => state.riskPreference);
    const suggestedPortfolio = usePortfolios().find(portfolio => portfolio.riskLevel === riskPreference);
    const investmentCategories = useInvestmentCategories();


    if (!suggestedPortfolio) return (
        <React.Fragment>
            <p>It seems like you haven't selected a risk preference yet. Please select one first.</p>
            <NavigationButton />
        </React.Fragment>
    );

    return (
        <section>
            <h4 className="lead text-center"><b>Personalized Portfolio</b></h4>
            <PortfolioDistribution
                portfolio={suggestedPortfolio}
                investmentCategories={investmentCategories}
            />
            <Calculator
                suggestedPortfolio={suggestedPortfolio}
            />
            <NavigationButton />
        </section>
    );
}

export default GiveAdvice;