import "./Form.css";
import { Link } from "react-router-dom";

const Form = (props) => {
  let firstLabel;
  let secondLabel;
  let thirdLabel;
  switch (props.type) {
    case "users":
      firstLabel = "Name:";
      secondLabel = "Email:";
      thirdLabel = "Age";
      break;
    case "accounts":
      firstLabel = "user id:";
      secondLabel = "cash:";
      thirdLabel = "Credit: ";
      break;
    case "transfers":
      firstLabel = "transferring id:";
      secondLabel = "receiving id";
      thirdLabel = "Amount: ";
      break;
  }

  return (
    <form
      className="sign-form"
      onSubmit={props.signFormSubmit}
      style={{ visibility: `${props.formVisibility}` }}
    >
      <label>{firstLabel}</label>
      <input
        type="text"
        onChange={props.changeFirst}
        value={props.valueFirst}
      />
      <label>{secondLabel}</label>
      <input
        type="text"
        onChange={props.changeSecond}
        value={props.valueSecond}
      />
      <label>{thirdLabel}</label>
      <input
        type="text"
        onChange={props.changeThree}
        value={props.valueThree}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
