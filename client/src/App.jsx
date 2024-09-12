import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from './routes/routes';

import useAppContext from './store/AppContext'
import Navbar from './components/Navbar/Navbar.jsx';

function App() {
  const { store, actions } = useAppContext()


  return (
    <BrowserRouter basename='/'>
    <Navbar />
    
    <Routes>
      {routes.map((route) => <Route {...route} key={route.path} />)}
    </Routes>
    {/* <Footer/> */}
  </BrowserRouter>
  )
}

export default App



