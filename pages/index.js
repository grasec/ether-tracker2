import { Box, Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text} from "@chakra-ui/react"
import Head from "next/head"
import { useMoralis } from "react-moralis"
import Header from "../components/header"
import Profile from "../components/profile"
import Transactions from "../components/transactions"

export default function Home() {
  //uncomment section bellow for login with metamask screen


  const {isAuthenticated, authenticate, user, logout, isLoggingOut} = useMoralis()

  if(!isAuthenticated) {
    return(
      <>
      <Head>
        <title> Login | EtherTarcker </title>
      </Head>
      <Flex direction="column" justifyContent="center" alignItems="center"
        width="100vw" height="100vh"bgGradient="linear(to-br, yellow.400, pink.300)">
          <Text 
            fontSize="5xl" fontWeight="bold" color="white">
            EtherTracker</Text>
          <Button 
            colorScheme="orange" size="lg" mt="6"
            onClick={() => authenticate({
              signingMessage: "Sign to Login to EtherTracker"
            })}>
            Login with Metamask</Button>
      </Flex>
      </>
    )
  }
  return(
    <>
    <Head>
      <title> EtherTracker </title>
    </Head>
    <Flex direction="column" height="100vh" weight="100vw">
      {/* header required for user info and logout button */}
      <Header user={user} logout={logout} isLoggingOut={isLoggingOut}/>
        <Box flex="1" px="40" py="20"
        bgGradient="linear(to-br, teal.400, yellow.400)">
          <Tabs size="lg" colorScheme="yellow"
          align="center" variant="enclosed">
            <TabList>
              {/* Profile tab in the list */}
              <Tab fontWeight="bold">Profile</Tab>
              <Tab fontWeight="bold">Transactions</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {/* Profile tab UI *remove comment to add the tab* */}
                <Profile user={user}/>
              </TabPanel>
              <TabPanel>
                {/* Transactions can pass user={user} for profile tab */}
                <Transactions  />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
    </Flex>
    </>
  )
}
