import { Box, Button, Checkbox, FormControl, FormLabel, Heading, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { useState } from "react"

const SignUp = () => {
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();

    return (<Box w={['full', 'md']} p={[8, 10]} mt={[20, "10vh"]} mx="auto" border={["none", "1px"]} borderColor={["", "blackAlpha.900"]} borderRadius={10}>
        <VStack spacing={4} align="flex-start" w="full">
            <VStack spacing={1} align={["flex-start", "center"]} w="full">
                <Heading>Sign Up</Heading>
                <Text>Enter your e-mail and password to sign up</Text>
            </VStack>
            <FormControl>
                <FormLabel>E-mail Address</FormLabel>
                <Input rounded="10" variant="filled" />
            </FormControl>
            <FormControl>
                <FormLabel>Password</FormLabel>
                <Input rounded="10" variant="filled" type="password" />
            </FormControl>
            <Button variant="solid" w={["full", "auto"]} alignSelf="end">Login</Button>
        </VStack>
    </Box>)
}

export default SignUp
