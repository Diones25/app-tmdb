import { RouterProvider } from "react-router-dom";
import Router from "./router/router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Providers } from "./utils/providers";

function App() {

  return (
    <>
      <Navbar />
      <Providers>
        <RouterProvider router={Router} />   
      </Providers>
      <Footer />
    </>
  )
}

export default App
