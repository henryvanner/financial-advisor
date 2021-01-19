import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePortfolios } from '../js/api';
import { setRiskPreference } from '../redux/actions';
import { State } from '../redux/types';

function renderSelectorBody(numberOfRiskLevels: number, currRiskPreference: number | null, onSelection: (n: number) => void) {

    const elements = [];

    for (let index = 0; index < numberOfRiskLevels; index++) {
        const riskLevel = index + 1,
            className = riskLevel === currRiskPreference ? "primary button" : "hollow button";
        elements.push(<button onClick={() => onSelection(riskLevel)} key={index} className={className}>{riskLevel}</button>);

    }
    return elements;
}

const RiskPreferenceSelector = () => {

    const riskPreference = useSelector((state: State) => state.riskPreference);
    const portfolios = usePortfolios();
    const dispatch = useDispatch();

    function handleSelection(selectedRiskLevel: number) {
        dispatch(setRiskPreference(selectedRiskLevel));
    }

    return (
        <div>
            <div className="grid-x align-center">
                <div className="cell medium-8">
                    <div className="clearfix">
                        <span className="float-left">Low</span>
                        <span className="float-right">High</span>
                    </div>
                </div>
            </div>
            <div className="grid-x align-center">
                <div className="cell medium-8 flex-container align-justify">
                    {renderSelectorBody(portfolios.length, riskPreference, handleSelection)}
                </div>
            </div>
        </div>
    );
}

export default RiskPreferenceSelector;