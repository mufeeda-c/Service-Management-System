import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/RegisterCustomer'
import RegisterTechnician from './pages/RegisterTechnician'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='register/customer' element={<Register />} />
          <Route path='register/technician' element={<RegisterTechnician/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
