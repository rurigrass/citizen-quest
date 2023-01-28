import { motion } from "framer-motion";

const FadeIn = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
        >
            {children}
        </motion.div>
    )
}

export default FadeIn