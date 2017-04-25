import React, { Component } from 'react';

// Main App component
export default ({main, routeProps}) => {
    return (
        <div id="app">
            {React.createElement(main, routeProps)}
        </div> 
    )
}