import { Link } from 'react-router-dom'
// import logo from '../images/tbird.png'

const Navbar = () => {
    return (
        <header>
            <div className='container'>
                <div className='logo'>
                    <Link to="/">
                        {/* <img src={logo} alt="logo" /> */}
                        <h1>UBC RateMyCoffs</h1>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Navbar