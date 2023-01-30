import { motion } from "framer-motion"
import React from "react";
import useMeasure from "react-use-measure";


const ResizeablePanel = ({ children, delayTime = 0.5, durationTime = 0.5 }: { children: React.ReactNode, delayTime?: number, durationTime?: number }) => {
    let [ref, { height }] = useMeasure();

    return (
        <motion.div
            initial={{ height: 0 }}
            animate={{ height }}
            transition={{ duration: durationTime, delay: delayTime }}
            className="overflow-hidden"
        >
            <div ref={ref}>
                {children}
            </div>
        </motion.div>
    )
}

export default ResizeablePanel

// This below is used if you want the fade in to occur every time the children change 
// key={JSON.stringify(children, ignoreCircularReferences())}
// const ignoreCircularReferences = () => {
//     const seen = new WeakSet();
//     return (key: string, value: React.ReactNode) => {
//         if (key.startsWith("_")) return; //Dont compare react's internal props
//         if (typeof value === "object" && value !== null) {
//             if (seen.has(value)) return;
//             seen.add(value)
//         }
//         return value;
//     }
// }