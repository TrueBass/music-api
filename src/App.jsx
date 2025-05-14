import './css/App.css';

import React, { useState } from 'react';
import {Routes, Route, Navigate} from "react-router-dom"; 

import { UserProvider } from './contexts/UserContext.jsx';
import { SearchProvider } from "./contexts/SearchContext";
import { PlayingSongProvider } from "./contexts/SongsContext";
import { PlaylistsProvider } from './contexts/PlaylistsContext.jsx';

import Home from './pages/Home.jsx';
import Account from './pages/Account.jsx';
import Playlists from './pages/Playlists.jsx';
import LoginForm from './pages/LoginForm.jsx';
import SignupForm from './pages/SignupForm.jsx';

import NavBar from './components/NavBar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const ProtectedLayout = ({children}) => (
  <ProtectedRoute>
    <div className='page-container'>
      <NavBar />
      <UserProvider>
        <PlayingSongProvider>
          {children}
        </PlayingSongProvider>
      </UserProvider>
    </div>
  </ProtectedRoute>
);

function App() {
  return (
      <Routes>
        <Route path='/' element={<Navigate to='/home' replace/>}/>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignupForm />} />
        
        <Route path='/home' element={
          <ProtectedLayout>
            <SearchProvider>
              <Home />
            </SearchProvider>
          </ProtectedLayout>
        }/>

        <Route path='/account' element={
          <ProtectedLayout>
            <Account/>
          </ProtectedLayout>
        }/>

        <Route path='/playlists' element={
          <ProtectedLayout>
            <PlaylistsProvider>
              <Playlists/>
            </PlaylistsProvider>
          </ProtectedLayout>
        }/>

      </Routes>
  );
}

export default App;