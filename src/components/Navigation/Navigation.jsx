import {NavLink, useNavigate} from "react-router-dom";
import './Navigation.modules.css';
import logo from '../../assets/logo-white.png';


function Navigation() {
    const navigate = useNavigate();

    return (<nav>
        <div className="navigation-outer-container">

            <button type="button" onClick={() => navigate('/')}>
                <img src={logo} alt="logo"/>
            </button>

            <ul>
                <li><NavLink to="/"
                             className={({isActive}) => isActive ? 'active-link' : 'default-link'}>Home</NavLink>
                </li>
                <li><NavLink to="/new" className={({isActive}) => isActive ? 'active-link' : 'default-link'}>Nieuwe
                    Post</NavLink></li>
                <li><NavLink to="/blogposts" className={({isActive}) => isActive ? 'active-link' : 'default-link'}>Alle
                    Posts</NavLink></li>
                {/*<li><NavLink to="/blogposts/:id"*/}
                {/*             className={({isActive}) => isActive ? 'active-link' : 'default-link'}>Blogpost*/}
                {/*    Details</NavLink></li>*/}
            </ul>

        </div>
    </nav>);
}

export default Navigation;