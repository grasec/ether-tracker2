import { useMoralisWeb3Api } from "react-moralis"
import React,{ useId, useEffect, useState } from "react";
import MyContainer from "./myContainer";
import { Button, Divider, Link, Text, NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Stack, } from "@chakra-ui/react";
import { Moralis } from "moralis";


export default function Transactions({user}){

    const Web3Api = useMoralisWeb3Api()
    const BASE_URL = process.env.NEXT_PUBLIC_Base_URL
    const [transactions, setTransactions] = useState([])
    const [block, setBlock] = useState([])
    // next 3 comments tied to infura API
    const Web3 = require('Web3');
    const apiKey = process.env.NEXT_PUBLIC_Infura_URL + process.env.NEXT_PUBLIC_Infura_ID;
    const web3 = new Web3(new Web3.providers.HttpProvider(apiKey));

    const selectNUM = useId();
    const [input, setInput] = useState();

    // number of Tx to display
    var listLimit = input
    
    const fetchBlock = async () => {
        //use one of the next options

        //next 2 lines fetch latest block using Infura
        var latestBlock = await web3.eth.getBlockNumber()
        //const blockData = await web3.eth.getBlock(latestBlock)

        // next 2 lines fetch by NUMBER using Moralis
        const options = { chain: "rinkeby", block_number_or_hash: latestBlock};
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
            <Stack shouldWrapChildren direction='row'>
                <NumberInput size='xs' maxW={16} defaultValue={5} min={5} max={50}
                id={selectNUM} value={input} onInput={e => setInput(e.target.value)}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Button colorScheme="teal" px="5" py="5" onClick={fetchBlock() }>refresh</Button>
            </Stack>
            
            {/* <label htmlFor={id}>Please specify:</label> */}
            {/* <input id={id} value={input} onInput={e => setInput(e.target.value)}/> */}
            
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