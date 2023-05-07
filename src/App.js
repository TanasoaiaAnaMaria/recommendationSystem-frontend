import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";

import ProtectedRoute from "./rute/ProtectedRoutes";

import Navigare from "./componente/Navigare/Navigare";
import Subsol from "./componente/Subsol/Subsol.jsx";

import PaginaPrincipala from "./pagini/PaginaPrincipala/PaginaPrincipala.jsx";
import Onboarding from "./pagini/Onboarding/Onboarding";

import useWindowDimensions from "./hooks/useWindowDimensions";
import Alert from "./componente/Alert/Alert";
import useStateProvider from "./hooks/useStateProvider";

function App() {
  const { width } = useWindowDimensions();
  const { alert } = useStateProvider();
  return (
    <Router>
      <Routes>
        <Route
          element={
            <>
              <Navigare expand={width >= 750 ? "md" : false} />
              <ProtectedRoute />
              <Subsol />
            </>
          }
        >
          {/* protected routes */}
        </Route>

        <Route
          element={
            <>
              <Navigare expand={width >= 750 ? "md" : false} />
              <Outlet />
              <Subsol />
            </>
          }
        >
          {/* public rute */}
          <Route path="/" element={<PaginaPrincipala />} />

          {/* onboarding routes */}
          <Route path="/login" element={<Onboarding />} />
          <Route path="/register" element={<Onboarding />} />
          <Route path="/forgot-password" element={<Onboarding />} />
          <Route path="/reset-password" element={<Onboarding />} />
        </Route>
      </Routes>
      {alert && <Alert message={alert.message} type={alert.type} />}
    </Router>
  );
}

export default App;
