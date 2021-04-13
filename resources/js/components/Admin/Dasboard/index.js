import React from 'react'
import ReactDOM from 'react-dom';

const Dashboard = () => {
    return (<div>dashbard</div>)
}

export default Dashboard;

if (document.getElementById("main-dashboard"))
{
    ReactDOM.render(<Dashboard /> , document.getElementById("main-dashboard"));
}
