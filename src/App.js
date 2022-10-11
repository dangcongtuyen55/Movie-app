import React, { lazy, Suspense } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { Banner } from "./components/banner/Banner";
import { Main } from "./components/layout/Main";
// import { HomePage } from "./components/pages/HomePage";
// import { MovieDetail } from "./components/pages/MovieDetail";
// import { MoviePage } from "./components/pages/MoviePage";

const HomePage = lazy(() => import("./components/pages/HomePage"));
const MovieDetail = lazy(() => import("./components/pages/MovieDetail"));
const MoviePage = lazy(() => import("./components/pages/MoviePage"));

// const MyComponent = lazy(() => import("./MyComponent"));

function App() {
  return (
    <>
      {/* <Header />
      <Banner /> */}
      <Suspense fallback={<>loading...</>}>
        <Routes>
          <Route element={<Main />}>
            <Route
              path="/"
              element={
                <>
                  <Banner />
                  <HomePage />
                </>
              }
            ></Route>
            <Route path="/movies" element={<MoviePage />}></Route>
            <Route path="/movie/:movieId" element={<MovieDetail />}></Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
