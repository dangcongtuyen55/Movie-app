import { NavLink, Route, Routes } from "react-router-dom";
import { Banner } from "./components/banner/Banner";

import { Main } from "./components/layout/Main";
import { HomePage } from "./components/pages/HomePage";
import { MovieDetail } from "./components/pages/MovieDetail";
import { MoviePage } from "./components/pages/MoviePage";

function App() {
  return (
    <>
      {/* <Header />
      <Banner /> */}
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
    </>
  );
}

export default App;
