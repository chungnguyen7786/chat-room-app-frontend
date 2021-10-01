import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './components/layout/Landing'
import Auth from './pages/Auth'
import ChatRoom from './pages/ChatRoom'
import AuthContextProvider from './contexts/AuthContext'
import ProtectedRoute from './utils/ProtectedRoute'

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route
            exact
            path='/login'
            render={(props) => <Auth {...props} authRoute='login' />}
          />
          <Route
            exact
            path='/register'
            render={(props) => <Auth {...props} authRoute='register' />}
          />
          <ProtectedRoute exact path='/chatroom' component={ChatRoom} />
        </Switch>
      </Router>
    </AuthContextProvider>
  )
}

export default App
