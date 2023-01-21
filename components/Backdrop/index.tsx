import { motion } from "framer-motion";

const Backdrop = ({ children, onClick }: { children: any, onClick: any }) => (
    <motion.div
        className="fixed w-full h-full bg-halfBlack inset-0 cursor-default"
        onClick={onClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        {children}
    </motion.div>
)

export default Backdrop