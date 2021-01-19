import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PortfoliosInfoTabs from '../containers/PortfoliosInfoTabs';
import RiskPreferenceSelector from '../containers/RiskPreferenceSelector';
import { State } from '../redux/types';

const SelectRiskPreference: React.FC = () => {

    const riskPreference = useSelector((state: State) => state.riskPreference);

    return (
        <section>
            <h4 className="lead text-center"><b>Please, select a risk level of your preference</b></h4>
            <RiskPreferenceSelector />
            <PortfoliosInfoTabs />
            <div className="flex-container align-right" style={{ marginTop: "1rem" }}>
                <Link to={riskPreference ? "/advise" : ""} className={`primary button ${riskPreference ? "" : "disabled"}`}>Next</Link>
            </div>
        </section>
    );
};

export default SelectRiskPreference;