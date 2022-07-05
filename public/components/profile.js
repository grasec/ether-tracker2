import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useMoralis } from "react-moralis"
import MyContainer from "./myContainer";

export default function Profile({user}) {
    var [input, setInput] = useState('')
    const {setUserData, isUserUpdating} = useMoralis()
    return(
        <MyContainer>
            <Text><b>Username:</b> {user.getUsername()}</Text>
            <Text><b>Wallet Adress:</b> {user.get('ethAddress')}</Text>
            <form onSubmit={e =>{
                e.preventDefault()
                if(input.trim() !== ''){
                setUserData({
                     username: input,
                }).then(() => setInput=(''))
                }
            }}>
                <FormControl mt="6" mb="6">
                    <FormLabel htmlFor="username">Change Username</FormLabel>
                    <Input id="username" type="text" placeholder="ex. anyUsername" value={input} onChange={e => setInput(e.target.value)}/>
                </FormControl>
                <Button type="submit" colorScheme="teal" disabled={isUserUpdating}>Change Username</Button>
            </form>
        </MyContainer>
    )
}