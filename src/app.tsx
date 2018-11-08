import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NotFoundPage from './404'
import Content from './Content'
import Login from './Login'
import Signup from './Signup'

const App = () => (
  <div className="app-root">
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Content} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
