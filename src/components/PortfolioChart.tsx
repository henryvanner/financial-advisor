import { ResponsivePie } from '@nivo/pie';
import React from 'react';
import { InvestmentCategory, Portfolio } from '../redux/types';

const palette = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
];

function configDataForChart(investmentCategories: InvestmentCategory[], suggestedPortfolio: Portfolio) {
    return suggestedPortfolio.allocations.filter(all => all.proportion !== 0).map((all, index) => ({
        proportion: all.proportion,
        investmentCategory: investmentCategories.find(invCat => invCat.id === all.investmentCategory),
        color: palette[index]
    }))
}

interface PortfolioChartProps {
    portfolio: Portfolio | undefined,
    investmentCategories: InvestmentCategory[]
}

const PortfolioChart: React.FC<PortfolioChartProps> = ({ portfolio, investmentCategories }) => {

    if (!portfolio) return <p>It seems like you haven't selected a risk preference yet. Please select one first.</p>;

    const data = configDataForChart(investmentCategories, portfolio);

    return (
        <section>
            <h5>Portfolio distribiuton chart</h5>
            <div
                style={{
                    height: 400,
                    border: "1px solid black",
                    margin: "0 auto"
                }}
            >
                <ResponsivePie
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    data={data}
                    value="proportion"
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    borderWidth={1}
                    enableRadialLabels={false}
                    sliceLabel={({ data, value }) => {
                        const invCatgName = data.investmentCategory ? data.investmentCategory.name : "";
                        return `${invCatgName} (${value}%)`;
                    }}
                    colors={({ data }) => data.color}
                    borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                    isInteractive={false}
                />
            </div>
        </section>
    );
}

export default PortfolioChart;