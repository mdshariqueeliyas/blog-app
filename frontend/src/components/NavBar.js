import { Link } from "react-router-dom";
import PropTypes from "prop-types"

const NavBar = (props) => {
    return (
        <header>
            <nav>
                <div className="logo">
                    <a href="/">
                        {props.firstName}
                        <span>{props.lastName}</span>
                    </a>
                </div>
                <input type="checkbox" id="menu-toggle" />
                <label htmlFor="menu-toggle" className="menu-icon">
                    &#9776;
                </label>
                <ul className="menu">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/articles">Articles</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

NavBar.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
}

export default NavBar;