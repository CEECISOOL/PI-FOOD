import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/Home';
import RecipeCreate from './components/RecipeCreate/RecipeCreate'
import RecipeDetails from './components/RecipeDetails/RecipeDetails'
import NotFound from './components/NotFound/NotFound';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/recipe' element={<RecipeCreate />} />
          <Route exact path="/home/:id" element={<RecipeDetails />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
