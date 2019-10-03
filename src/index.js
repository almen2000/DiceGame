import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './containers/App/App';
import Users from './containers/Users/users';
import Contact from './containers/Contact/contact';
import * as serviceWorker from './serviceWorker';
import Layout from './components/Layout/Layout';

const routing = (
    <Layout>
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/users">Users</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
                <Route exact path="/" component={App} />
                <Route path="/users" component={Users} />
                <Route path="/contact" component={Contact} />
            </div>
        </Router>
    </Layout>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
