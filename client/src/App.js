import {BrowserRouter, Routes, Route} from 'react-router-dom';
import DoctorCards from './pages/DoctorCards';
import Login from './pages/Login';
import Register from './pages/Register';
import {useSelector } from 'react-redux/es/hooks/useSelector';
import Spinner from './components/Spinner'
import  ProtectedRoute  from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';
import Notification from './pages/Notification';
import Users from './pages/admin/Users';
import Doctors from './pages/admin/Doctors';
import Profile from './pages/doctors/Profile';
import Booking from './pages/Booking';
import Appointments from './pages/Appointments';
import DoctorAppointments from './pages/doctors/DoctorAppointments';
import Home from './pages/Home';
import UserProflie from './pages/UserProflie';

function App() {
  const {loading}= useSelector(state=>state.alerts)
  return (
    <>
      <BrowserRouter>
      {loading ? <Spinner/>: (
        <Routes>
          <Route path='/' element={
          <ProtectedRoute><Home/></ProtectedRoute>
        }></Route>
        <Route path='/doctors' element={
          <ProtectedRoute><DoctorCards/></ProtectedRoute>
        }></Route>
        <Route path='/apply-doctor' element={
          <ProtectedRoute><ApplyDoctor></ApplyDoctor></ProtectedRoute>
        }></Route>
        <Route path='/admin/users' element={
          <ProtectedRoute><Users/></ProtectedRoute>
        }></Route>
        <Route path='/admin/doctors' element={
          <ProtectedRoute><Doctors/></ProtectedRoute>
        }></Route>
        <Route path='/doctor/profile/:id' element={
          <ProtectedRoute><Profile/></ProtectedRoute>
        }></Route>
        <Route path='/doctor/book-appointment/:id' element={
          <ProtectedRoute><Booking/></ProtectedRoute>
        }></Route>
        <Route path='/notification' element={
          <ProtectedRoute><Notification></Notification></ProtectedRoute>
        }></Route>
        <Route path='/login' element={
        <PublicRoute>
          <Login/>
        </PublicRoute>}></Route>
        <Route path='/register' element={<PublicRoute><Register/></PublicRoute>}></Route>
        <Route path='/appointments' element={
          <ProtectedRoute><Appointments/></ProtectedRoute>
        }></Route>
        <Route path='/doctor-appointments' element={
          <ProtectedRoute><DoctorAppointments/></ProtectedRoute>
        }></Route>
        <Route path='/profile' element={
          <ProtectedRoute><UserProflie/></ProtectedRoute>
        }></Route>
      </Routes>
      )}
    </BrowserRouter>
      
        
    </>
  );
}

export default App;
