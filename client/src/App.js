import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/Home';
import RecipeCreate from './components/RecipeCreate/RecipeCreate'
import RecipeDetails from './components/RecipeDetails/RecipeDetails'


function App() {
  return (
    <div className="App">
    <Router>
    <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/recipe' element={<RecipeCreate/>}/>
        <Route path="/home/:id" element={<RecipeDetails/>}/>
      </Routes>
    </Router>
     </div>
  );
}

export default App;
