import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterCustomer from './pages/RegisterCustomer'
import RegisterTechnician from './pages/RegisterTechnician'
import Login from './pages/Login'
import CustomerDashboard from './pages/CustomerDashboard'
import TechnicianDashboard from './pages/TechnicianDashboard'
import BookService from './pages/BookService'
import ViewService from './pages/ViewService'
import EditService from './pages/EditService'
import MyRequest from './pages/MyRequest'
import { useEffect } from 'react';
import { fetchCsrfToken } from './api/register';
import AdminDashboard from './pages/AdminDashboard'
import ViewServiceAdmin from './pages/viewServiceAdmin'
import AllRequests from './pages/AllRequests'


function App() {
  useEffect(() => {
    fetchCsrfToken()
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RegisterCustomer />} />
          <Route path='register/technician' element={<RegisterTechnician />} />
          <Route path='register/customer' element={<RegisterCustomer />} />
          <Route path='/login' element={<Login />} />
          <Route path='/customer' element={<CustomerDashboard />} />
          <Route path='/technician' element={<TechnicianDashboard />} />
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/book-service' element={<BookService />} />
          <Route path='/view-service/:id' element={<ViewService />} />
          <Route path='/edit-service/:id' element={<EditService />} />
          <Route path='/my-requests' element={<MyRequest />} />
          <Route path='/view-service-admin/:id' element={<ViewServiceAdmin />} />
          <Route path="/all-requests" element={<AllRequests />} />
          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
