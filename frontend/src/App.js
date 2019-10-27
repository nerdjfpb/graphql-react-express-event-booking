import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import AuthContext from './context/auth-context'
import AuthPage from './pages/Auth'
import EventPage from './pages/Event'
import BookingsPage from './pages/Bookings'
import MainNavigation from './components/Navigation/MainNavigation'

import './App.css'

class App extends Component {
  state = {
    token: null,
    userId: null
  }

  login = (token, userId, tokenExpiration) => {
    this.setState({ token, userId })
  }

  logout = () => {
    this.setState({ token: null, userId: null })
  }

  render() {
    return (
      <BrowserRouter>
        <AuthContext.Provider value={{
          token: this.state.token,
          userId: this.state.userId,
          login: this.login,
          logout: this.logout
        }}>
          <MainNavigation />
          <main className="main-content">
            <Switch>              
              {!this.state.token && 
                <Redirect from="/bookings" to="/auth" exact/>
              }
              {this.state.token && 
                <Redirect from="/" to="/events" exact/>
              }
              {this.state.token && 
                <Redirect from="/auth" to="/events" exact/>
              }
              {!this.state.token && 
                <Route path="/auth" component={AuthPage} />
              }
              <Route path="/events" component={EventPage} />
              {this.state.token &&
                <Route path="/bookings" component={BookingsPage} />
              }
              {!this.state.token && 
                <Redirect to="/auth" exact/>
              }
            </Switch>
          </main>
        </AuthContext.Provider>
      </BrowserRouter>
    )
  }  
}

export default App;
