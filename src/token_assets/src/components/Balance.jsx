import React, { useState } from "react";
import { Principal } from '@dfinity/principal';
import { token } from "../../../declarations/token"

function Balance() {
  
  const [inputValue, setInputVAlue] = useState("");
  const [balanceResult, setBalance] = useState("");
  const [cryptoSymbol, setSymbol] = useState("");
  const [isHidden ,setHidden] = useState(true);

  async function handleClick() {
    try {
      const principal = Principal.fromText(inputValue);
      const rawBalance = await token.balanceOf(principal);
      setSymbol(await token.getSymbol());
      setHidden(false);
  
      // If it's not already a BigInt, convert it
      const balance = typeof rawBalance === "bigint" ? rawBalance : BigInt(rawBalance);
  
      // Format safely
      setBalance(balance.toLocaleString());
    } catch (err) {
      console.error("Failed to get balance:", err);
      setBalance("Error fetching balance");
    }
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
      <p hidden={isHidden}>This account has a balance of {balanceResult} {cryptoSymbol} .</p>
    </div>
  );
}

export default Balance;
