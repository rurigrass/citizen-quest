
// const Button = defineStyleConfig({
//   // The styles all button have in common
//   baseStyle: {
//     fontWeight: 'bold',
//     textTransform: 'uppercase',
//     borderRadius: 'base', // <-- border radius is same for all variants and sizes
//   },
//   // Two sizes: sm and md
//   sizes: {
//     sm: {
//       fontSize: 'sm',
//       px: 4, // <-- px is short for paddingLeft and paddingRight
//       py: 3, // <-- py is short for paddingTop and paddingBottom
//     },
//     md: {
//       fontSize: 'md',
//       px: 6, // <-- these values are tokens from the design system
//       py: 4, // <-- these values are tokens from the design system
//     },
//   },
//   // Two variants: outline and solid
//   variants: {

//     outline: {
//       border: '2px solid',
//       borderColor: 'niceYellow',
//       color: 'niceYellow',
//       _hover: {
//         color: "purple.700",
//       },
//       _dark: {
//         _hover: {
//           bg: "gray.600",
//           color: "purple.400"
//         }
//       },
//       boxShadow: "0.3rem 0.3rem 0rem black",
//     },
//     solid: {
//       bg: 'nicePurple',
//       color: 'white',
//       border: '2px solid',
//       borderColor: 'black',
//       _hover: {
//         bg: 'niceBlue',
//         color: "white"
//       },
//       boxShadow: "0.3rem 0.3rem 0rem black",
//       _dark: {
//         bg: "niceYellow",
//         color: "black",
//         _hover: {
//           bg: "nicePurple",
//           color: "white"
//         }
//       }
//     },
//   },
//   // The default size and variant values
//   defaultProps: {
//     size: 'md',
//     variant: 'outline',
//   },
// })

// export default Button