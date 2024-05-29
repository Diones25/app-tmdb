import Logo from '../assets/logo.png';

function Navbar() {
  return (
    <>
      <div className="bg-[#03658B] py-5">
        <div className="container">
          <img src={Logo} alt="Logo" />
        </div>
      </div>
    </>
  )
}

export default Navbar
