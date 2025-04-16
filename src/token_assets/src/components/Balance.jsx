import React, { useState } from "react";
import { Principle } from '@dfinity/principle';
import { token } from "../../../declarations/token"

function Balance() {
  
  const [inputValue, setInputVAlue] = useState("");
  const [balanceResult, setBalance] = useState("")

  async function handleClick() {
    console.log(inputValue);
    const principle = Principle.fromText(inputValue);
    let balance = await token.balanceOf(principle);
    setBalance(balance.toLocaleString);
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e) => setInputVAlue(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p>This account has a balance of {balanceResult}.</p>
    </div>
  );
}

export default Balance;
