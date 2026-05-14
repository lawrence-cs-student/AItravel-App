
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import TouristSpotPage from './pages/TouristSpotPage'
import TouristMapPage from './pages/TouristMapPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import DiscoverPage from './pages/DiscoverPage'
import SavedAttractionsPage from './pages/SavedAttractionsPage'
import SuggestionPage from './pages/SuggestionPage'
import CategoryPage from './pages/CategoryPage'
import TravelPlanPage from './pages/TravelPlanPage'


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/touristSpotPage/:place" element={<TouristSpotPage />} />
        <Route path="/map/:spotId" element={<TouristMapPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route path="discover" element={<DiscoverPage />} />
          <Route path="categories" element={<CategoryPage />} />
          <Route path="savedAttractions" element={<SavedAttractionsPage />} />
          <Route path="suggested" element={<SuggestionPage />} />
        </Route>
        <Route path='/ai-travel-planner' element={<TravelPlanPage />} />

        <Route path="*" element={"Page not found"} />
      </Routes>
    </Router>
  )
}

export default App
