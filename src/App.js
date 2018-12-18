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
import {  LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas  } from '@fortawesome/free-solid-svg-icons'
import { fab  } from '@fortawesome/free-brands-svg-icons'
import { fal  } from '@fortawesome/pro-light-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

class App extends Component {
    render() {
        return (
            <LocaleProvider locale={zhCN}>
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
            </LocaleProvider>
        );
    }
}
library.add(fas ,fab,fal,far);
export default App;
