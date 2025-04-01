import "./index.css";
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Sidebar />
        <AppRoutes />
    </AuthProvider>
  );
}

export default App;
