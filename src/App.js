import { userContext } from './components/provider/userProvider'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext } from 'react'

import UserManag from './components/users-managemant-page/UserManag';
import HomePage from './components/home-page/HomePage';
import Nav from './components/navigation/Nav';
import Registr from './components/users-managemant-page/registr-page/Registr';
import Footer from './components/footer/Footer';
import About from "./components/about-page/About";
import Contact from "./components/contact-page/Contact";
import Events from "./components/events/events-page/Events";
import AddEvent from './components/events/add-events-page/AddEvent';
import EventsManage from './components/events/events-manage/EventsManage';
import Facility from './components/facilities-page/Facility';
import RequestsManage from './components/requests-manage/RequestsManage';
import AddRoom from './components/add-rooms/AddRoom';

function App() {

  const { currentUser } = useContext(userContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="About" element={<About />} />
          <Route path="Contact/:fname/:roomName" element={<Contact />} />
          <Route path="Events" element={<Events />} />
          {currentUser && (currentUser.isAdmin || currentUser.BuildManager) && <Route path='events-manage' element={<EventsManage currentUser={currentUser} />} />}
          {currentUser && (currentUser.isAdmin || currentUser.BuildManager) && <Route path='users-manage' element={<UserManag currentUser={currentUser} />} />}
          {currentUser && (currentUser.isAdmin || currentUser.BuildManager) && <Route path='requests-manage' element={<RequestsManage currentUser={currentUser} />} />}
          {currentUser && (currentUser.isAdmin || currentUser.BuildManager) && <Route path='add-room' element={<AddRoom />} />}
          {currentUser && (currentUser.isAdmin || currentUser.BuildManager) && <Route path='users-manage/registr' element={<Registr />} />}
          {currentUser && (currentUser.isAdmin || currentUser.BuildManager) && <Route path='events-manage/add-event' element={<AddEvent />} />}
          <Route path='facilities/:name' element={<Facility />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
