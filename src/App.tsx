import { RouterProvider } from "react-router-dom";
import Router from "./router/router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {

  return (
    <>
      <Navbar />
      <RouterProvider router={Router} />   
      <Footer />
    </>
  )
}

export default App
