import { Route, Router, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import MovieCatalog from './pages/Private/MovieCatalog';
import history from './util/history';
import MovieDetails from './pages/Private/MovieDetails';

const Routes = () => {
  return (
    <Router history={history}>
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <PrivateRoute path="/movies">
          <Route path="/movies" exact>
            <MovieCatalog />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetails />
          </Route>
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default Routes;
