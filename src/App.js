import './App.css';
import Header from './components/header/Header'
import PokemonSearch from './components/pokemonSearch/PokemonSearch';
import Pokemon from './components/pokemonSearch/Pokemon';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import '../src/components/mediaQueries/mediaQ.css'

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Switch>
          <Route path={["/home", "/"]} exact>
            <PokemonSearch />
          </Route>
          <Route path="/pokemon/:id">
            <Pokemon />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
