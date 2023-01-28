import { motion } from "framer-motion"
import useMeasure from "react-use-measure";


const ResizeablePanel = ({ children, delayTime = 0.5 }: { children: React.ReactNode, delayTime: number }) => {
    let [ref, { height }] = useMeasure();
    return (
        <motion.div
            initial={{ height: 0 }}
            animate={{ height }}
            transition={{ duration: 0.5, delay: delayTime }}
            className="overflow-hidden"
        >
            <div ref={ref}>
                {children}
            </div>
        </motion.div>
    )
}

export default ResizeablePanel