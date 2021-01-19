import React from 'react';

const Layout: React.FC = ({ children }) => {
    return (

        <div className="grid-container-fluid">
            <header className="grid-x">
                <div className="cell" style={{ backgroundColor: "#37A07B", color: "white" }}>
                    <h1 className="text-center">Financial Advisor</h1>
                </div>
            </header>
            <main className="grid-x grid-padding-y align-center">
                <div className="cell medium-6">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default Layout;