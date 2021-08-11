import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';

import Home from '../routes/home';
import Profile from '../routes/profile';
import NotFoundPage from '../routes/notfound';
import Header from './header';
import { useEffect } from 'preact/hooks';

const App: FunctionalComponent = () => {


    useEffect(() => {
        fetch(`/api/login`)
          .then(res => res.json())
          .then(
            (result) => {
                console.log(result?.code)
            },
            (error) => {
            }
          )
      }, [])


    return (
        <div id="preact_root">
            <Router>
                <Route path="/" component={Home} />
                <Route path="/profile/" component={Profile} user="me" />
                <Route path="/profile/:user" component={Profile} />
                <NotFoundPage default />
            </Router>
        </div>
    );
};

export default App;
