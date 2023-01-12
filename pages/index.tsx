import { Flex, Heading, Button, VStack, useColorMode, useColorModeValue, HStack, Collapse, Box, useDisclosure } from '@chakra-ui/react';
import Head from 'next/head'
import ToggleColorMode from '../components/ToggleColorMode';

export default function Home() {
  const boxBackground = useColorModeValue("niceGreen", "niceBlue")
  const mainBackground = useColorModeValue("niceOrange", "nicePurple")
  const { isOpen, onToggle } = useDisclosure()


  return (
    <>
      <Head>
        <title>Citizen Quest</title>
      </Head>
      <Flex w="100%" h="80px" alignItems="center" justifyContent="right" background="blue.400" padding="10px">
        <ToggleColorMode />
      </Flex>
      <Flex height="80vh" background={mainBackground} alignItems="center" justifyContent="center">
        <VStack direction="column" width={300} background={boxBackground} boxShadow="0.7rem 0.7rem 0rem black" p={12} rounded={6} spacing="10px" border="2px solid" borderColor='black'>
          <Heading mb={6}>Citizen Quest</Heading>
          <Button variant="solid" onClick={onToggle}>New Game</Button>
          <Collapse in={isOpen} animateOpacity>
            <Box color='white' bg='niceBlue' width="max" p={12} rounded={6} border="2px solid" borderColor='black'
            //  boxShadow="0.7rem 0.7rem 0rem black" 
            >
              <Button variant="solid">Start Game</Button>
            </Box>
          </Collapse>
          <Button variant="solid">Leaderboard</Button>
        </VStack>
      </Flex>
    </>
  )
}
