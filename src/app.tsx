import React from 'react'
import ReactDOM from 'react-dom'
import Login from './Login'
import Signup from './Signup'
import Content from './Content'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

const App = () => (
  <div className="app-root">
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Content} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </BrowserRouter>
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
