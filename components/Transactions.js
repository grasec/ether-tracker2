import { useMoralisWeb3Api } from "react-moralis"
import React,{ useEffect, useState } from "react";
import MyContainer from "./myContainer";
import { Button, Divider, Link, Text } from "@chakra-ui/react";
import { Moralis } from "moralis";


export default function Transactions({user}){

    const Web3Api = useMoralisWeb3Api()
    const BASE_URL = "https://rinkeby.etherscan.io/tx/"
    const [transactions, setTransactions] = useState([])
    const [block, setBlock] = useState([])
    // next 4 comments tied to infura API
    // const Web3 = require('Web3');
    // const Project_ID_Infura = '9e6bb9bcb5e441a59379fc2c5d7c0f0d';
    // const apiKey = 'https://rinkeby.infura.io/v3/' + Project_ID_Infura;
    // const web3 = new Web3(new Web3.providers.HttpProvider(apiKey));
    let listLimit = 5
    
    const fetchBlock = async () => {
        // next 2 comments tied to infura API
        //var latestBlock = await web3.eth.getBlockNumber()
        //const blockData = await web3.eth.getBlock(10955978)
        const options = { chain: "rinkeby", block_number_or_hash: 10955979};
        const blockData = await Web3Api.native.getBlock(options);
        if(blockData) {
            setBlock(blockData.result)
            console.log(blockData)
            block = blockData.transactions.sort((a, b) => b.value - a.value).slice(0,listLimit)
            setTransactions(block)  
        }
    }
    
    useEffect(() => { 
        fetchBlock()
        // setInterval(() => {
        //     fetchBlock()
        // }, 15000);  
        
    }, [])

    return(
        <MyContainer>
            <Text fontSize="lg" fontWeight="bold">Latest transactions</Text>
            {/* <Button colorScheme="teal" px="5" py="5" onClick={fetchBlock() }>refresh</Button> */}
            {/* <Button colorScheme="teal" onClick={handleRefresh()}>Reload</Button> */}
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
                            {<b>ETH : </b> }{Moralis.Units.FromWei(transaction.value)}
                            {/* <b>ETH : </b> {toBN(transaction.value)} */}
                            {/* <b>ETH : </b> {transaction.value} */}
                        </Text>  
                        <Divider h="25px"/>
                </div>

            ))}

        </MyContainer>
    )
}