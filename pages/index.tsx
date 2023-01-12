import { Flex, Heading, Button, VStack, useColorMode, useColorModeValue, HStack } from '@chakra-ui/react';
import Head from 'next/head'
import ToggleColorMode from '../components/ToggleColorMode';

export default function Home() {
  const boxBackground = useColorModeValue("niceGreen", "niceBlue")
  const mainBackground = useColorModeValue("niceOrange", "nicePurple")

  return (
    <>
      <Head>
        <title>Citizen Quest</title>
      </Head>
      <Flex w="100%" h="80px" alignItems="center" justifyContent="right" background="blue.400" padding="10px">
        <ToggleColorMode />
      </Flex>
      <Flex height="80vh" background={mainBackground} alignItems="center" justifyContent="center">
        <VStack direction="column" background={boxBackground} boxShadow="0.7rem 0.7rem 0rem black" p={12} rounded={6} spacing="10px" border="2px solid" borderColor='black'>
          <Heading mb={6}>Citizen Quest</Heading>
          <Button variant="solid">New Game</Button>
          <Button variant="solid">Leaderboard</Button>
        </VStack>
      </Flex>
    </>
  )
}
