import { Button, Flex, Text} from "@chakra-ui/react"
import Head from "next/head"
import { useMoralis } from "react-moralis"

export default function Home() {
  const {isAuthenticated, authenticate} = useMoralis()

  if(!isAuthenticated) {
    return(
      <>
      <Head>
        <title>Login | EtherTarcker</title>
      </Head>
      <Flex
        direction="column"
        justifyContent="center" 
        alignItems="center"
        width="100vw"
        height="100vh"
        bgGradient="linear(to-br, yellow.400, pink.300)">
          <Text 
            fontSize="5xl" 
            fontWeight="bold" 
            color="white">
            EtherTracker</Text>
          <Button 
            colorScheme="orange"
            size="lg"
            mt="6"
            onClick={() => authenticate()}>
            Login with Metamask</Button>
      </Flex>
      </>
    )
  }
  return(
    <Flex
    height="100vh"
    weight="100vw"
    bgGradient="linear(to-br, teal.400, yellow.400)">

    </Flex>
  )
}
