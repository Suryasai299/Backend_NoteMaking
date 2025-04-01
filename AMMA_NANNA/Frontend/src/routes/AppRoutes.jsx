import { BrowserRouter as Router , Routes , Route } from "react-router-dom"
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Dashboard from '../pages/Dashboard'
import CreateNote from '../pages/CreateNote'
import ViewNote from '../pages/ViewNote'
import PrivateRoute from "../components/PrivateRoute"

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
                <Route path="/create-note" element={<CreateNote/>}/>
                <Route path="/view-note/:id" element={<ViewNote/>}/>
            </Routes>
        </Router>
    )
}

export default AppRoutes