import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import HomePage from "./features/HomePage/HomePage";
import { SearchResults } from './features/SearchResults/SearchResults';
import AppLayout from './AppLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
        <Route path="home" element={<HomePage />}/>
        <Route path="search-results" element={<SearchResults />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
