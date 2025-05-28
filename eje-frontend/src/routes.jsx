import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Colaborador from "./pages/Colaborador/indexColaborador.jsx";
import Ejista from "./pages/Ejista/indexEjistas.jsx";
import Home from "./pages/Home/indexHome.jsx";
import AdminDashboard from './pages/Admin/adminDashboard';
import { GlobalStyle } from "./styles/GlobalStyles.js";

const App = () => {
	return (
		<>
			<GlobalStyle />
			<Router>
				<Routes>
					{/* Rota para a página principal */}
					<Route path="/" element={<Home />} />
					{/* Rota para a página de registro de colaborador */}
					<Route path="/Colaborador" element={<Colaborador />} />
					{/* Rota para página de registro de ejista */}
					<Route path="/Ejista" element={<Ejista />} />
					{/* Rota para admin*/}
					<Route path="/admin" element={<AdminDashboard />} />
				</Routes>
			</Router>
		</>
	);
};

export default App;
