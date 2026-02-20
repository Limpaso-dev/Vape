import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import LandingPage from "./LandingPage";
import CustomerView from "./CustomerView";
import AdminDashboardApp from "./AdminDashboardApp";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<CustomerView />} />
          <Route path="/admin" element={<AdminDashboardApp />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
