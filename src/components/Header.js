import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Navbar.css'; 
import { logOut } from '../redux/apiRequest';
import { createAxios } from '../createInstance';
import { logOutSuccess } from '../redux/authSlice';

const Header = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const accessToken = user?.acccessToken;
    const id = user?._id;
    let axiosJWT = createAxios(user,dispatch,logOutSuccess);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut(dispatch,id,navigate,accessToken,axiosJWT);
    }

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
        window.addEventListener('resize', showButton);

        return () => {
            window.removeEventListener('resize', showButton);
        };
    }, []);

    return (
        <nav className='navbar1'>
            <div className='navbar-container'>
                <Link to="/" className='navbar-logo'>
                    HASAKI.vn <i className="fas fa-leaf"></i>
                </Link>
                <div className="navbar-search">
                    <input type="text" placeholder="Tìm kiếm sản phẩm..." />
                    <i className="fas fa-search search-icon"></i>
                </div>
                <Link to='/profile' className='nav-link'> 
                <i className='fas fa-user'></i>{user ? user.username : 'Tài khoản'}
                </Link>
                <Link to='/support' className='nav-link'>
                    <i className='fas fa-phone-alt'></i> Hỗ trợ
                </Link>
                {user ? (
                    <Link to='/logout' className='nav-link' onClick={handleLogout}>
                        <i className='fas fa-sign-out-alt'></i> Log Out
                    </Link>
                ) : (
                    <Link to='/login' className='nav-link'>
                        <i className='fas fa-user-circle'></i> Sign In
                    </Link>
                )}
                <Link to='/cart' className='nav-link'>
                    <i className='fas fa-shopping-cart'></i> Giỏ hàng
                </Link>
            </div>
            <div className="navbar-bottom">
                <div className='navbar-bottom-link' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>Danh mục
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/services' className='nav-links' onClick={closeMobileMenu}>
                            Services
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/products' className='nav-links' onClick={closeMobileMenu}>
                            Products
                        </Link>
                    </li>
                </ul>

                <Link to="/deals" className='navbar-bottom-link'>
                    <i className='fas fa-gift'></i> Hasaki Deals
                </Link>
                <Link to="/hot-deals" className='navbar-bottom-link'>
                    <i className='fas fa-fire'></i> Hot Deals
                </Link>
                <Link to="/best-sellers" className='navbar-bottom-link'>
                    <i className='fas fa-star'></i> Bán chạy
                </Link>
                <Link to="/deals" className='navbar-bottom-link'>
                    <i className='fas fa-tags'></i> Ưu đãi
                </Link>
                <Link to="/products" className='navbar-bottom-link'>
                    <i className='fas fa-box'></i> Sản phẩm
                </Link>
            </div>
        </nav>
    );
};

export default Header; 