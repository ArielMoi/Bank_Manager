import "./Nav.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="Nav">
      <ol>
        {/* <li>
          <Link to="/">Bank</Link>
        </li>
        <li>
          <Link to="/MyDetails">MyDetails</Link>
        </li>
        <li>
          <Link to="/MyAccount">MyAccount</Link>
        </li>
        <li>
          <Link to="/Transfers">Transfers</Link>
        </li>
        <li>
          <Link to="/MakeTransfer">MakeTransfer</Link>
        </li> */}
        <li>
          <Link to="/">Bank</Link>
        </li>
      </ol>
    </div>
  );
}

export default Nav;
