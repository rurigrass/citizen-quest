// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'
import Button from "./Button"


// 3. extend the theme
const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: true,
  styles: {
    global: {
      body: {

      },
      code: {

      }
    }
  },
  colors: {
    niceBlue: "#00AEDE",
    nicePurple: "#6E559A",
    niceGreen: "#2EFFAB",
    niceYellow: "#FCFD43",
    nicePeach: "#FAF2D7",
    niceOrange: "#FFAF39",
    brand: {
      100: "#f7fafc",
      900: "#1a202c",
    },
  },
  components: {
    Button
  }
})

export default theme