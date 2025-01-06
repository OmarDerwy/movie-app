import React,{ useState, Suspense } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
// //components
import MyNavbar from './components/MyNavbar'
// import Main from './pages/Main'
// import MovieDetails from './pages/MovieDetails'
// import NotFound from './pages/NotFound'
// import Wishlist from './pages/Wishlist'
// import Signup from './pages/Signup'
//Context
import LanguageContext from './context/language'

const Main = React.lazy(() => import("./pages/Main"));
const MovieDetails = React.lazy(() => import("./pages/MovieDetails"));
const Wishlist = React.lazy(() => import("./pages/Wishlist"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Signup = React.lazy(() => import("./pages/Signup"));

function App() {
  const [language, setLanguage] = useState('en')
  return (
    <>
      <BrowserRouter>
        <LanguageContext.Provider value={{language, setLanguage}}>
        <MyNavbar/>
          <div  dir={language === "ar-EG" ? "rtl" : "ltr"}
                className={language === "ar-EG" ? "text-right" : "text-left"}>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path='/'element={<Main></Main>}></Route>
                <Route path='/sign-up'element={<Signup/>}></Route>
                <Route path='/movie/:id'element={<MovieDetails/>}></Route>
                <Route path='/wishlist'element={<Wishlist></Wishlist>}></Route>
                <Route path='*'element={<NotFound/>}></Route>
              </Routes>
            </Suspense>
          </div>
        </LanguageContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App
