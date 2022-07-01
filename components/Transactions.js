import { useMoralisWeb3Api } from "react-moralis"
import { useEffect, useState } from "react";
import MyContainer from "./myContainer";
import { Divider, Link, Text } from "@chakra-ui/react";
import { Moralis } from "moralis"


export default function Transactions({user}){

    const Web3Api = useMoralisWeb3Api()
    const BASE_URL = "https://etherscan.io/tx/"
    const [transactions, setTransactions] = useState([])
    const [block, setBlock] = useState([])
    let listLimit = 5
    const Web3 = require('Web3');
    const Project_ID_Infura = '9e6bb9bcb5e441a59379fc2c5d7c0f0d';
    const apiKey = 'https://mainnet.infura.io/v3/' + Project_ID_Infura;
    const web3 = new Web3(new Web3.providers.HttpProvider(apiKey));
 
    const fetchBlock = async () => {
        var LatestBlock = await web3.eth.getBlockNumber()
        const options = { chain: "eth", block_number_or_hash: LatestBlock, listLimit};
        const blockData = await Web3Api.native.getBlock(options);
        
        if(blockData) {
            setBlock(blockData.result)
            block = blockData.transactions
            block.sort((a, b) => a.value < b.value)
            setTransactions(block)
            //transactions.sort((a, b) => a.value < b.value)
            
           
        }
    }

    const fethTransactions = async () => {
        const options = {chain: "rinkeby", address: user.get('ethAddress') ,limit: listLimit}
        const data = await Web3Api.account.getTransactions(options)
        if(data) {
            setTransactions(data.result)
        }
    }

    useEffect(() => {
        
        fetchBlock()
    }, [])

    
    return(
        <MyContainer>
            <Text fontSize="lg" fontWeight="bold">Latest transactions</Text>
            
            {transactions && transactions.map(transaction => (
                <div key={transaction.hash} >
                    <Link href= {`${BASE_URL}${transaction.hash}`} isExternal>
                        <b>Tx# : </b> {transaction.hash}</Link>
                        <Text>
                            <b>From : </b> {transaction.from_address} 
                        </Text>
                        <Text>
                            <b>To : </b> {transaction.to_address}
                        </Text>
                        <Text float="right">
                            <b>ETH : </b> {Moralis.Units.FromWei(transaction.value)}
                        </Text>  
                        <Divider h="20px"/>
                </div>

            ))}

        </MyContainer>
    )
}