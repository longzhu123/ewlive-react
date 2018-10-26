import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './store';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './page/Login';
import Register from './page/Register';
import Home from './page/Home';
import Admin from './page/Admin';
import NoMatch from './common/NoMatch';
import AuthorRoute from './route/AuthorRoute';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter >
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <AuthorRoute path="/admin" component={Admin}/>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/register' component={Register}/>
                        <Route component={NoMatch}/>
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
