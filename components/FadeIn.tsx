import { motion } from "framer-motion";

const FadeIn = ({ children, delayTime = 0.5, }: { children: React.ReactNode, delayTime: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: delayTime }}
        >
            {children}
        </motion.div>
    )
}

export default FadeIn