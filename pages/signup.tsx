import { Box, Button, Checkbox, FormControl, FormLabel, Heading, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { useState } from "react"
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";

const SignUp = () => {
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const router = useRouter();

    const signUpWithEmail = async () => {
        try {
            if (email && password) {
                const resp = await supabase.auth.signUp({
                    email: email,
                    password: password
                });
                if (resp.error) throw resp.error;
                const userId = resp.data.user?.id
                console.log("userId: ", userId);
                router.push("/");
            }
        } catch { }
    }

    return (<Box w={['full', 'md']} p={[8, 10]} mt={[20, "10vh"]} mx="auto" border={["none", "1px"]} borderColor={["", "blackAlpha.900"]} borderRadius={10}>
        <VStack spacing={4} align="flex-start" w="full">
            <VStack spacing={1} align={["flex-start", "center"]} w="full">
                <Heading>Sign Up</Heading>
                <Text>Enter your e-mail and password to sign up</Text>
            </VStack>
            <FormControl>
                <FormLabel>E-mail Address</FormLabel>
                <Input rounded="10" variant="filled" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl>
                <FormLabel>Password</FormLabel>
                <Input rounded="10" variant="filled" type="password" onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Button variant="solid" w={["full", "auto"]} alignSelf="end" onClick={signUpWithEmail}>Sign Up</Button>
        </VStack>
    </Box>)
}

export default SignUp
