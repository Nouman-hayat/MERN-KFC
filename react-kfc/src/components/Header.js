import React , {useState , useRef , useEffect} from 'react'
import logo from '../img/kfc-colonel.svg'
import logo_xs from '../img/kfc_xs.png'
import pin from '../img/pin.svg'
import userIcon from '../img/user.svg'
import cart from '../img/cart-icon.png'
import hamburgerMenu from '../img/menu-icon.png'
import { Link } from 'react-router-dom'
import SideBar from './sideBar/SideBar'
//Redux
import { useSelector} from 'react-redux'

function SideMenu ({ showSideMenu , setShowSideMenu , loggedIn })
{

    let headerRef = useRef(null)

    let handleToggle = () => {
        setShowSideMenu( state => !state )
    }

    useEffect(() => {
        const handleClickOutside = (event) => {

        if ( !headerRef.current.contains(event.target))
            setShowSideMenu( false )

        }
    
        window.addEventListener('click', handleClickOutside);
    
        return () => {
          window.removeEventListener('click', handleClickOutside);
        };
      }, [showSideMenu]);

    return (
        <div className={`side-menu-wrapper ${showSideMenu ? "header-mobile-show" : "header-mobile-hide" }`} ref={headerRef}>
            <div className="brand-logo "  onClick={handleToggle}>
                <Link to="/" >
                    <img src={logo_xs} className='d-block mx-auto'  alt='logo'/>
                </Link>
            </div>
            <h2 className='mt-5 mb-4'>Categories</h2>
            <ul>
                <li onClick={handleToggle}><Link to="/category/everyday-value" className="pl-0">everyday value</Link></li>
                <li onClick={handleToggle}><Link to="/category/make-it-a-meal">make it a meal</Link></li>
                <li onClick={handleToggle}><Link to="/category/signature-box">signature box</Link></li>
                <li onClick={handleToggle}><Link to="/category/sharing">sharing</Link></li>
                <li onClick={handleToggle}><Link to="/category/promotions">promotions</Link></li>
                <li onClick={handleToggle}><Link to="/category/snacks">snacks</Link></li>
                <li onClick={handleToggle}><Link to="/category/midnight-deals" className="pr-0">midnight deals</Link></li>
            </ul>
            <div className="login-parent justify-content-start mt-5"  onClick={handleToggle}>
                <div className="login ms-0"> <img src={userIcon} alt="user"/>  <Link to="/login">{loggedIn? "Account" : "SIGN IN / REGISTER"}</Link>  </div>
            </div>
        </div>
    )
}

function Header ()
{
    let cartItems = useSelector(state=> state.cartItemsReducer.cartItems)
    let [ sideBar , setSideBar ]= useState(false)
    let [ showSideMenu , setShowSideMenu ] = useState(false)
    let  user = useSelector(state => state.userReducer)

    let handleToggleSideMenu = () => {
        setShowSideMenu( state => !state )
    }

    return (
        <div className="header-parent" id="header">
            <div className="header-inner header-default d-none d-md-block">
                <div className="header-inner-dec">
                    <div className="dec-red"></div>
                    <div className="dec-white"></div>
                    <div className="dec-red"></div>
                    <div className="dec-white"></div>
                    <div className="dec-red"></div>
                    <div className="dec-white"></div>
                    <div className="dec-red"></div>
                    <div className="dec-white"></div>
                    <div className="dec-red"></div>
                </div>
                <div className="header-inner-brand">
                    <div className="brand-logo">
                        <Link to="/">
                            <img src={logo} className='d-none d-sm-block' alt='logo'/>
                            <img src={logo_xs} className='d-block d-sm-none'  alt='logo'/>
                        </Link>
                    </div>
                    <div className="login-parent">
                      <div className='store-locator'> <img src={pin} alt="location" /> <Link to="/login">Store locator</Link> </div>  
                      <div className="login"> <img src={userIcon} alt="user"/>  <Link to="/login">{user.loggedIn? "Account" : "SIGN IN / REGISTER"}</Link>  </div>
                    </div>
                </div>
                <div className="header-inner-navbar">
                    <ul className="navbar">
                        <li><Link to="/category/everyday-value" className="pl-0">everyday value</Link></li>
                        <li><Link to="/category/make-it-a-meal">make it a meal</Link></li>
                        <li><Link to="/category/signature-box">signature box</Link></li>
                        <li><Link to="/category/sharing">sharing</Link></li>
                        <li><Link to="/category/promotions">promotions</Link></li>
                        <li><Link to="/category/snacks">snacks</Link></li>
                        <li><Link to="/category/midnight-deals" className="pr-0">midnight deals</Link></li>
                    </ul>
                    <ul className="cart-parent">
                        <li onClick={()=> setSideBar(!sideBar)}>
                            <button>
                                <img src={cart} alt="cart"  width="40px"/>
                                <span>{cartItems.length}</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="header-mobile d-block d-md-none py-3 d-flex align-items-center justify-content-between">
                <div className="header-inner-brandd">
                        <div className="brand-logo">
                            <Link to="/">
                                <img src={logo_xs} className='d-block '  alt='logo'/>
                            </Link>
                        </div>
                </div>
                <div className='menu-btn-wrapper d-flex align-items-center'>
                <ul className="cart-parent bg-transparent">
                        <li onClick={()=> setSideBar(!sideBar)}>
                            <button>
                                <img src={cart} alt="cart"  width="40px"/>
                                <span>{cartItems.length}</span>
                            </button>
                        </li>
                    </ul>
                    <button className="menu-btn btn"><img src={hamburgerMenu} width={30} onClick={handleToggleSideMenu} alt="" /></button>
                </div>
            </div>
            { showSideMenu ? <SideMenu showSideMenu setShowSideMenu={setShowSideMenu} loggedIn={ user ? true : false } /> : <></>}
            {sideBar? <SideBar setSideBar={setSideBar} user={user.user}/> : <div className="d-none"></div>}
        </div>
        
    )
}

export default Header ;