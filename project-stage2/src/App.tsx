import Home from './pages/Home';
import Follows from './pages/Follows';
import Search from './pages/Search';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThreadDetail } from './features/Thread/component/ThreadDetail';
import Register from './pages/Register';
import Login from './pages/Login';
import ProfilePage from './pages/Profile';
import { API, setAuthToken } from './libs/api';
import { useDispatch } from 'react-redux';
import React from 'react';
import Main from './layout';
import { AUTH_CHECK } from './store/RootReducer';

function App () {
  const dispatch = useDispatch();

  async function checkAuth() {
    try {
      setAuthToken(localStorage.token)
      
      const response = await API.get("/auth/check")
      dispatch(AUTH_CHECK(response.data))
      console.log(response);
    } catch (error) {
      throw error
    }
  }

  React.useEffect(() => {
    checkAuth()
  }, [])

  function IsNotLogin() {
    if(localStorage.token) {
      return <Navigate to={"/"} />
    } else {
      return <Outlet />
    }
  }

  function IsLogin() {
    if(!localStorage.token) {
      return <Navigate to={"/login"} />
    } else {
      return <Outlet />
    }
  }

  return (
    <Router>
      <Routes>
       <Route path="/" element={<IsLogin />} >
         <Route element={
            <Main>
             <Home />
            </Main>}
           path='/'
           />
         <Route path="/follows" element={<Follows />}/>
         <Route element={
            <Main>
            <Search />
            </Main>}
            path="/search"
            />
         <Route path="/thread/:id" element={<ThreadDetail />}/>
         <Route element={
              <Main>
              <ProfilePage />
              </Main>}
              path='/profile'
              />
       </Route>

       <Route path="/" element={<IsNotLogin />} >
         <Route path="/login" element={<Login />}/>
         <Route path="/register" element={<Register />}/>
       </Route>
      </Routes>
    </Router>
  )
}

export default App
