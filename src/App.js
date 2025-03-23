import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PickupDropoffForm from './components/PickupDropoffForm';
import RouteDetails from './components/RouteDetails';
import ELDLog from './components/ELDLog';

const App = () => {
  const [routeData, setRouteData] = useState(null);

  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<PickupDropoffForm setRouteData={setRouteData} />} />
          <Route path="/route-details" element={<RouteDetails routeData={routeData} />} />
          <Route path="/eld-log" element={<ELDLog />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;