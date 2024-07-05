import React from "react";

import RFMChart from "./commponents/RFMChart";
import "./App.css";
import "./index.css";
import Header from "./commponents/Header";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RFMChartProducts from "./commponents/RFMChartProducts";
import RFMChartBestCustomers from "./commponents/RFMChart Best Customers";
import RFMChartRegions from "./commponents/RFMChart Regions";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<RFMChart className="relative z-10" />} />
          <Route path="/products" element={<RFMChartProducts />} />
          <Route path="/customers" element={<RFMChartBestCustomers />} />
          <Route path="/regions" element={<RFMChartRegions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
