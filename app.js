const contractAddress = "0xA8873687c9F593C877D8B7a981E93A090FA3EF21"; // ✅ ใช้ Address ที่ Deploy แล้ว
const abi = [
  {
    "inputs": [],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "checkBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

let signer;
let contract;

document.getElementById('connectButton').onclick = async function () {
  if (window.ethereum) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, abi, signer);
    alert('✅ Connected to Metamask');
  } else {
    alert('❌ Please install Metamask');
  }
};

document.getElementById('depositButton').onclick = async function () {
  try {
    const amount = document.getElementById('depositAmount').value;
    const tx = await contract.deposit({ value: ethers.utils.parseEther(amount) });
    await tx.wait();
    alert('✅ Deposit Success');
  } catch (error) {
    console.error(error);
    alert('❌ Deposit Failed');
  }
};

document.getElementById('withdrawButton').onclick = async function () {
  try {
    const amount = document.getElementById('withdrawAmount').value;
    const tx = await contract.withdraw(ethers.utils.parseEther(amount));
    await tx.wait();
    alert('✅ Withdraw Success');
  } catch (error) {
    console.error(error);
    alert('❌ Withdraw Failed');
  }
};

document.getElementById('checkBalanceButton').onclick = async function () {
  try {
    const balance = await contract.checkBalance();
    document.getElementById('balance').innerText = `💰 Your Balance: ${ethers.utils.formatEther(balance)} ETH`;
  } catch (error) {
    console.error(error);
    alert('❌ Failed to fetch balance');
  }
};
