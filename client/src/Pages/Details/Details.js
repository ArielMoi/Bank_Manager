import DetailsNav from "../../Components/DetailsNav/DetailsNav.Component";
import DetailsWindow from "../../Components/DetailsWindow/DetailsWindow.Component";
import { useState, useEffect } from "react";
import axios from "axios";
import Form from "../../Components/Form/Form.Component.js";
import "./Details.css";

import baseURL from "../../API/api.js";

function Details(user) {
  const [userDetails, setUserDetails] = useState({});
  const [accountDetails, setAccountDetails] = useState({});
  const [transfersDetails, setTransfersDetails] = useState({});
  const [buttonText, setButtonText] = useState("add user");

  //form
  const [formType, setFormType] = useState("users");
  const [formVisibility, setFormVisibility] = useState("hidden");

  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");
  const [thirdValue, setThirdValue] = useState("");

  const collectingData = async (dataType) => {
    try {
      const { data } = await axios.get(`${baseURL}/${dataType}/`);
      return data;
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  const addingDataUsers = async (dataToPost) => {
    try {
      const { data } = await axios.post(`${baseURL}/users/`, {
        name: dataToPost.name,
        age: dataToPost.age,
        email: dataToPost.email,
      });
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  const addingDataAccounts = async (dataToPost) => {
    try {
      const { data } = await axios.post(`${baseURL}/accounts/`, {
        credit: dataToPost.credit,
        cash: dataToPost.cash,
        user_id: dataToPost.user_id,
        user_name: dataToPost.user_name,
      });
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  const addingDataTransfers = async (dataToPost) => {
    try {
      const { data } = await axios.post(`${baseURL}/transitions/`, {
        transferringAccount: dataToPost.transferringAccount,
        receivingAccount: dataToPost.receivingAccount,
        amount: dataToPost.amount,
      });
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  const resetAllData = () => {
    setUserDetails({});
    setAccountDetails({});
    setTransfersDetails({});
  };

  const clickUsers = async () => {
    const data = await collectingData("users");
    resetAllData();
    resetForm();
    setUserDetails(data);
    setFormType("users");

    setButtonText("new user");
  };

  const clickAccounts = async () => {
    const data = await collectingData("accounts");
    resetAllData();
    resetForm();
    setAccountDetails(data);
    setFormType("accounts");

    setButtonText("new account");
  };

  const clickTransfers = async () => {
    const data = await collectingData("transitions");
    resetAllData();
    resetForm();
    setTransfersDetails(data);
    setFormType("transfers");

    setButtonText("new transfer");
  };

  const onClickAddButton = () => {
    setFormVisibility(formVisibility === "visible" ? "hidden" : "visible");
  };

  const onFirstChange = (text) => {
    setFirstValue(text);
  };

  const onSecondChange = (text) => {
    setSecondValue(text);
  };

  const onThirdChange = (text) => {
    setThirdValue(text);
  };

  const resetForm = () => {
    setFirstValue("");
    setSecondValue("");
    setThirdValue("");
    setFormVisibility("hidden");
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    switch (formType) {
      case "users":
        const user = await addingDataUsers({
          name: firstValue,
          email: secondValue,
          age: thirdValue,
        });
        resetForm();
        return user;
      case "accounts":
        const account = await addingDataAccounts({
          user_id: firstValue,
          cash: secondValue,
          credit: thirdValue,
        });
        resetForm();
        return account;
      case "transfers":
        const transfer = await addingDataTransfers({
          amount: thirdValue,
          transferringAccount: firstValue,
          receivingAccount: secondValue,
        });
        resetForm();
        return transfer;
    }
  };

  const updateAmount = async (accountId, amount) => {
    try {
      console.log(`${baseURL}/accounts/${accountId}/?amount=${amount}`);
      const { data } = await axios.patch(
        `${baseURL}/accounts/${accountId}/?amount=${amount}`
      );
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  const createAccount = async (userId, userName) => {
    try {
      const { data } = await axios.post(
        `${baseURL}/accounts/`,{
          name: userName,
          _id: userId
        }
      );
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  return (
    <div>
      <DetailsNav
        onClickUsers={clickUsers}
        onClickAccount={clickAccounts}
        onClickTransfer={clickTransfers}
      />
      <button onClick={onClickAddButton}>{buttonText}</button>
      <div className="details">
        {userDetails &&
          Object.values(userDetails).map((user) => {
            return (
              <DetailsWindow
                subHeadLine={user.name}
                description={`${user.age}, ${user.email}, ${user._id}`}
              />
            );
          })}
        {accountDetails &&
          Object.values(accountDetails).map((account) => {
            return (
              <DetailsWindow
                headLine={account.user_name}
                subHeadLine={`ID: ${account._id} Cash: ${account.cash}, \nCredit: ${account.credit}`}
                description={`${Object.values(account.transitions).map(
                  (transfer) =>
                    `Date: ${transfer.date} Amount: ${transfer.amount}`
                )}`}
              />
            );
          })}
        {transfersDetails &&
          Object.values(transfersDetails).map((transfer) => {
            return (
              <DetailsWindow
                headLine={`Amount: ${transfer.amount}`}
                subHeadLine={`ID: ${transfer._id}`}
                description={`receiver: ${
                  Object.entries(transfer.receivingAccount)[5][1]
                }, transferring: ${
                  Object.entries(transfer.transferringAccount)[5][1]
                }`}
              />
            );
          })}
      </div>
      <Form
        type={formType}
        formVisibility={formVisibility}
        changeFirst={(event) => onFirstChange(event.target.value)}
        changeSecond={(event) => onSecondChange(event.target.value)}
        changeThree={(event) => onThirdChange(event.target.value)}
        signFormSubmit={onSubmitForm}
        valueFirst={firstValue}
        valueSecond={secondValue}
        valueThree={thirdValue}
      />
    </div>
  );
}

export default Details;

// add current data to show whats created
