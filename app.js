import abi from './abi.json' assert { type: 'json' };

const contractAddress = "0x75473d30715138f7961B122CB4aBf737E19E722E "; // ใส่ Address ที่ Deploy แล้ว
const abi = [
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Deposit",
		"type": "event"
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Withdraw",
		"type": "event"
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
]; // ใส่ ABI ที่ได้จาก Remix

let signer;
let contract;

document.getElementById('connectButton').onclick = async function () {
  if (window.ethereum) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, abi, signer);
    alert('Connected to Metamask');
  } else {
    alert('Please install Metamask');
  }
};

document.getElementById('depositButton').onclick = async function () {
  const amount = document.getElementById('depositAmount').value;
  const tx = await contract.deposit({ value: ethers.utils.parseEther(amount) });
  await tx.wait();
  alert('Deposit Success');
};

document.getElementById('withdrawButton').onclick = async function () {
  const amount = document.getElementById('withdrawAmount').value;
  const tx = await contract.withdraw(ethers.utils.parseEther(amount));
  await tx.wait();
  alert('Withdraw Success');
};

document.getElementById('checkBalanceButton').onclick = async function () {
  const balance = await contract.checkBalance();
  document.getElementById('balance').innerText = `Your Balance: ${ethers.utils.formatEther(balance)} ETH`;
};
