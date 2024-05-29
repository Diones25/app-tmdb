import { RouterProvider } from "react-router-dom";
import Router from "./router/router";
import Navbar from "./components/Navbar";

function App() {

  return (
    <>
      <Navbar />
      <RouterProvider router={Router} />           
    </>
  )
}

export default App
