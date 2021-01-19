import React, { useEffect } from 'react';
import PortfolioChart from '../components/PortfolioChart';
import PortfoliosTable from '../components/PortfoliosTable';
import $ from 'jquery';
import { useInvestmentCategories, usePortfolios } from '../js/api';
import { useSelector } from 'react-redux';
import { State } from '../redux/types';

const PortfoliosInfoTabs: React.FC = () => {

    const portfolios = usePortfolios();
    const investmentCategories = useInvestmentCategories();
    const riskPreference = useSelector((state: State) => state.riskPreference);
    const suggestedPortfolio = portfolios.find(portfolio => portfolio.riskLevel === riskPreference);

    useEffect(() => {
        if ("Foundation" in window) {
            new (window as any).Foundation.Tabs($("#portfolio-info-tabs"));
        }
    }, []);

    return (
        <div>
            <div className="tabs" id="portfolio-info-tabs">
                <li className="tabs-title is-active">
                    <a href="#portfolios-table" role="tab" aria-selected="true">Tabla</a>
                </li>
                <li className="tabs-title">
                    <a href="#portfolio-chart" role="tab">Gráfico</a>
                </li>
            </div>
            <div className="tabs-content" data-tabs-content="portfolio-info-tabs">
                <div className="tabs-panel is-active" id="portfolios-table">
                    <PortfoliosTable
                        portfolios={portfolios}
                        riskPreference={riskPreference}
                        investmentCategories={investmentCategories}
                    />
                </div>
                <div className="tabs-panel" id="portfolio-chart">
                    <PortfolioChart
                        portfolio={suggestedPortfolio}
                        investmentCategories={investmentCategories}
                    />
                </div>
            </div>
        </div>
    );
}

export default PortfoliosInfoTabs;