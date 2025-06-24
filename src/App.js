import React from "react";
import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route>
          <Route path="/home" element={<HomePage />} />
        </Route>
        <Route>
          <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
    </>
  );
};

export default App;
