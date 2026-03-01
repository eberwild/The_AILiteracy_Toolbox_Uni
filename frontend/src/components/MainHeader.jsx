import { NavLink } from 'react-router';
import '../styles/components/MainHeader.css';
import Icon from '../assets/icons/Icon.png';

function MainHeader() {

    return(
        <>
            <div className="main-header">

                <div className='icon-section'>
                    <img src={Icon} 
                        alt="Robot_Toolbox" 
                        className='header-icon'
                />
                </div>
                
                <div className='navlink-section'>
                    <NavLink to='/' className={({isActive}) => isActive? 'nav-link-active' : 'nav-link'}>
                    Home
                    </NavLink>
                    <NavLink to='/pillars' className={({isActive}) => isActive? 'nav-link-active' : 'nav-link'}>
                        4-Pillars
                    </NavLink>
                    <NavLink to='/tools' className={({isActive}) => isActive? 'nav-link-active' : 'nav-link'}>
                        Tools
                    </NavLink>
                    <NavLink to='/contact' className={({isActive}) => isActive? 'nav-link-active' : 'nav-link'}>
                        Contact
                    </NavLink>
                </div>
                
            </div>
        </>
    )
}

export default MainHeader;