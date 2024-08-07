import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react'
import useAppContext from './store/AppContext'
import routes from './routes/routes';

function App() {
  const { store, actions } = useAppContext()


  return (
    <BrowserRouter basename='/'>
    {/* <Navbar /> */}
    <Routes>
      {routes.map((route) => <Route {...route} key={route.path} />)}
    </Routes>
    {/* <Footer/> */}
  </BrowserRouter>
  )
}

export default App
