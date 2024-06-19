import { RouterProvider } from "react-router-dom";
import Router from "./router/router";
import Footer from "./components/Footer";
import { Providers } from "./utils/providers";

function App() {

  return (
    <>      
      <Providers>
        <RouterProvider router={Router} />   
      </Providers>
      <Footer />
    </>
  )
}

export default App
