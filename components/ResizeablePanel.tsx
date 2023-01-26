import { motion } from "framer-motion"

const ResizeablePanel = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="overflow-hidden"
        >
            {children}
        </motion.div>
    )
}

export default ResizeablePanel