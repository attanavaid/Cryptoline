import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionsContract;
};

export const TransactionProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });

  const handleChange = (event, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: event.target.value }));
  };

  const getAllTransactions = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const transactionContract = createEthereumContract();
      const availableTransactions = await transactionContract.getAllTransactions();

      const structuredTransactions = availableTransactions.map((transaction) => ({
        addressTo: transaction.receiver,
        addressFrom: transaction.sender,
        timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
        message: transaction.message,
        keyword: transaction.keyword,
        amount: parseInt(transaction.amount._hex) / (10 ** 18)
      }));

      console.log(structuredTransactions);
      setTransactions(structuredTransactions);
    }

    catch (error) {
      console.log(error);
      throw new Error("No ethereum object found.");
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log(accounts);
  
      if (accounts.length) {
        setConnectedAccount(accounts[0]);
        getAllTransactions();
      }
  
      else {
        console.log("No Accounts Found!");
      }
    }

    catch (error) {
      console.log(error);
      throw new Error("No ethereum object found.");
    }
  };

  const checkIfTransactionsExist = async () => {
    try {
      const transactionContract = createEthereumContract();
      const transactionCount = await transactionContract.getTransactionCount();

      window.localStorage.setItem("transactionCount", transactionCount);
    }

    catch (error) {
      console.log(error);
      throw new Error("No ethereum object found.");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setConnectedAccount(accounts[0]);
      window.location.reload();
    }

    catch (error) {
      console.log(error);
      throw new Error("No ethereum object found.");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = createEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({ 
        method: "eth_sendTransaction",
        params: [{
          from: connectedAccount,
          to: addressTo,
          gas: "0x5208", // Equivalent to 21,000 GWEI, a subunit of Ether.
          value: parsedAmount._hex,
        }]
      });

      const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
      
      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);

      await transactionHash.wait();

      setIsLoading(false);
      console.log(`Success - ${transactionHash.hash}`);

      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());
    }

    catch (error) {
      console.log(error);
      throw new Error("No ethereum object found.");
    } 
  }

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExist();
  }, []);
  

  return (
    <TransactionContext.Provider value={{ connectedAccount, formData, transactions, transactionCount, isLoading, handleChange, connectWallet, sendTransaction }}>
      {children}
    </TransactionContext.Provider>
  )
};