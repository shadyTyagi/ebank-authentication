import {Router, Switch, Redirect} from 'react-router-dom'
import LoginForm from './component/LoginForm'
import Home from './component/Home'
import Failed from './component/Failed'
import './App.css'

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Router exact path="/ebank/login" component={LoginForm} />
      <Router exact path="/" component={Home} />
      <Router path="/not-found" component={Failed} />
      <Redirect to="not-found" />
    </Switch>
  </>
)

export default App
