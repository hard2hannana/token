import React, { useState } from "react";
import { Principal } from '@dfinity/principal';
import { token } from "../../../declarations/token"


function Transfer() {

  const [acctNum, setAcctNum] = useState("");
  const [inputValue, setInputVAlue] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [buttonText, setText] = useState("Transfer");

  
  async function handleClick() {
    try {
      setDisabled(true);
      const userAccount = Principal.fromText(acctNum);
      const transferAmount = Number(inputValue);
    
      const result = await token.transfer(userAccount, transferAmount);
    
      setText(result);
    } catch (error) {
      console.error("Transfer failed:", error);
      setText("Transfer failed: " + error.message);
    } finally {
      setDisabled(false);
    }
    
    

  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={acctNum}
          onChange={(e) => setAcctNum(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={inputValue}
                onChange={(e) => setInputVAlue(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button disabled={isDisabled} id="btn-transfer" onClick={handleClick} >
            {buttonText}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Transfer;
