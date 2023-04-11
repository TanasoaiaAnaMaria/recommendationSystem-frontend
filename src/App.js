import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";

import Navigare from "./componente/Navigare/Navigare";
import Subsol from './componente/Subsol/Subsol.jsx'

import PaginaPrincipala from "./pagini/PaginaPrincipala/PaginaPrincipala.jsx";

import useWindowDimensions from './hooks/useWindowDimensions';

function App() {
  const { width } = useWindowDimensions();
  return (
    <Router>
      <Routes>
        <Route
        element={
          <>
            <Navigare expand={width >= 750 ? 'md' : false} />
            <Outlet />
            <Subsol />
          </>
        }>
          {/* public rute */}
          <Route path='/' element={<PaginaPrincipala />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
