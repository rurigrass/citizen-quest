import { Button, useColorMode, useColorModeValue } from '@chakra-ui/react';

const ToggleColorMode = () => {
    const { toggleColorMode } = useColorMode()
    const emoji = useColorModeValue("🌛", "🌞")

    return <Button onClick={toggleColorMode} variant="solid">{emoji}</Button>
}

export default ToggleColorMode