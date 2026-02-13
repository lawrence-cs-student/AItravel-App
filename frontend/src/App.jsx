
import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import HomePage from "./pages/HomePage"
import TouristSpotPage from './pages/TouristSpotPage'
import TouristMapPage from './pages/TouristMapPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import DiscoverPage from './pages/DiscoverPage'
import SavedAttractionsPage from './pages/SavedAttractionsPage'
import LogoutPage from './pages/LogoutPage'

function App() {

  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<HomePage />} />
        <Route path = "/touristSpotPage/:place" element={<TouristSpotPage />}/>
        <Route path = "/map/:spotId" element={<TouristMapPage />}/> 
        <Route path = "/login" element={<LoginPage />} />
        <Route path = "/signup" element={<SignupPage />} />
        <Route path = "/dashboard" element={<DashboardPage/>}>
            <Route path="discover" element={<DiscoverPage />} />
            <Route path="savedAttractions" element={<SavedAttractionsPage />} />
            <Route path="logout" element={<LogoutPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
