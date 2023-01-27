import { motion } from "framer-motion";

const Backdrop = ({ children, onClick }: { children: React.ReactNode, onClick: any }) => (
    <motion.div
        className="fixed w-full h-full bg-halfBlack inset-0 cursor-default z-10"
        onClick={onClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        {children}
    </motion.div>
)

export default Backdrop