import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import AuthPage from './pages/Auth'
import EventPage from './pages/Event';
import BookingsPage from './pages/Bookings';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect from="/" to="/auth" exact/>
        <Route path="/auth" component={AuthPage} />
        <Route path="/events" component={EventPage} />
        <Route path="/bookings" component={BookingsPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
