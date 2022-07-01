import { Button, Center, Flex, Text } from "@chakra-ui/react";

export default function Header({user, logout, isLoggingOut}){
    return(
    <header>
       <Flex px="9" py="5" justifyContent="space-between" 
       bg="teal.300" color="black">
            <Center>
                <Text fontSize="xl" fontWeight="bold">
                    EtherTarcker
                </Text>
            </Center>
            <Center>
                <Text>{user.getUsername()}</Text>
                <Button ml="4" colorScheme="teal" onClick={logout}
                disabled={isLoggingOut}>Logout</Button>
            </Center>
       </Flex>
    </header>
    )
}