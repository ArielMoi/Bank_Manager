import "./DetailsNav.css";

function DetailsNav(props) {
  return (
    <div className="details-nav">
      <ol>
        <li>
          <h3 onClick={props.onClickUsers}>Users</h3>
        </li>
        <li>
          <h3 onClick={props.onClickAccount}>Accounts</h3>
        </li>
        <li>
          <h3 onClick={props.onClickTransfer}>Transfers</h3>
        </li>
      </ol>
    </div>
  );
}

export default DetailsNav;
