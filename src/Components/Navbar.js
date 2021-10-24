import {NavLink} from "react-router-dom";
import {FaHome} from "react-icons/fa";
import {GiBowlOfRice  } from "react-icons/gi";
import {RiLogoutBoxFill} from "react-icons/ri";
import "./Navbar.css";
function Navbar()
{
    return(
        <>
          <nav className="navbar navbar-expand fixed-top">

              <div className="navbar-brand">Dietify</div>
              <ul className="navbar-nav">
                  <li className="nav-item">
                      <NavLink to="/diethome" className="nav-link" activeClassName="icons">
                       <FaHome/>
                      </NavLink>
                  </li>
                  <li className="nav-item">
                      <NavLink  to="/recipe" className="nav-link"  activeClassName="icons">
                        <GiBowlOfRice/>
                      </NavLink>
                  </li>
                  <li className="nav-item" >
                      <NavLink exact to="/" className="nav-link"  activeClassName="icons">
                        <RiLogoutBoxFill/>
                      </NavLink>
                  </li>
              </ul>
          </nav>


        </>
    );
}
export default Navbar;