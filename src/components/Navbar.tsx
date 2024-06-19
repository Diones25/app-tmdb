import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

function Navbar() {
  return (
    <>
      <div className="bg-[#03658B] py-5">
        <div className="container">
          <Link to={"/"}>
            <img src={Logo} alt="Logo" />          
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar
