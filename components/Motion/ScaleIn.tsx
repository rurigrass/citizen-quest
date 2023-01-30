import { motion } from "framer-motion";

const ScaleIn = ({ children, delayTime = 0.5, }: { children: React.ReactNode, delayTime: number }) => {
    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: delayTime }}
        >
            {children}
        </motion.div>
    )
}

export default ScaleIn