import './DetailsWindow.css'

const DetailsWindow = (details) => {
    return (
      <div className="details-window">
        <h3>{details.headLine}</h3>
        <h4>{details.subHeadLine}</h4>
        <p>{details.description}</p>
        {details.onClickDelete && (
          <button onClick={details.onClickDelete}>Delete</button>
        )}
        {details.onClickDeposit && (
          <button onClick={details.onClickDeposit}>Deposit</button>
        )}
        {details.onClickWithdraw && (
          <button onClick={details.onClickWithdraw}>Withdraw</button>
        )}
      </div>
    );
}

export default DetailsWindow;