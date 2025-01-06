import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faUser, faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import LanguageContext from '../context/language';

export default function MyNavbar() {
    const navigate = useNavigate();
    const { language, setLanguage } = React.useContext(LanguageContext);
    const handleRedirectToWishlist = () => {
        navigate('/wishlist');
    }
    return (
        <div>
            <Navbar style={{position:"fixed", top:'0', left:"0", right:'0', zIndex:'1000'}} expand="lg">
                <Container fluid className='mx-3' style={{backgroundColor:'rgb(190, 168, 68)', margin: '0', borderRadius: '20px'}}>
                    <Navbar.Brand onClick={() => navigate('/')} style={{cursor: 'pointer'}}>Movie-App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <div className="d-flex align-items-center">
                                <FontAwesomeIcon icon={faEarthAmericas} />
                                <select style={{ backgroundColor: 'rgb(190, 168, 68)', border: 'none', color:'black', marginRight:'10px' }} name="" id="" onChange={(e) => setLanguage(e.target.value)}>
                                    <option value="en-US">English</option>
                                    <option value="ar-EG">Arabic</option>
                                </select>
                            </div>
                            <Nav.Link style={{fontWeight: '500', borderLeft: 'solid 1px', borderRadius: '20px', paddingLeft:'15px'}} onClick={() => navigate('/sign-up')}><FontAwesomeIcon icon={faUser} /> Sign Up</Nav.Link>
                            <Nav.Link style={{fontWeight: '500', borderLeft: 'solid 1px', borderRadius: '20px', paddingLeft:'15px'}} onClick={handleRedirectToWishlist}><FontAwesomeIcon icon={faHeart}></FontAwesomeIcon> Wishlist</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
