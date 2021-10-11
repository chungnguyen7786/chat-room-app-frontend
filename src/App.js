import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './components/layout/Landing'
import Auth from './pages/Auth'
import ChatRoom from './pages/ChatRoom'
import AuthContextProvider from './contexts/AuthContext'
import RoomContextProvider from './contexts/RoomContext'
import ProtectedRoute from './utils/ProtectedRoute'
import AddRoomModal from './components/modals/AddRoomModal'

function App() {
  return (
    <AuthContextProvider>
      <RoomContextProvider>
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
          <AddRoomModal />
        </Router>
      </RoomContextProvider>
    </AuthContextProvider>
  )
}

export default App
