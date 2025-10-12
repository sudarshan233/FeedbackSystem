import type { JSX } from "react";
import { motion } from "framer-motion";

type FloatingShapeStyle = {
    colour: string,
    size: string,
    top: string,
    left: string,
    delay: number
}

const FloatingShape = (props: FloatingShapeStyle):JSX.Element => {

    const {
        colour,
        size,
        top,
        left,
        delay
    }:FloatingShapeStyle = props;
    return(
        <motion.div className={`absolute rounded-full opacity-35 blur-xl
            ${colour} ${size}`}
            style={{
                top, left
            }}
            animate={{
                y: ["0%", "100%", "0%"],
                x: ["0%", "100%", "0%"],
                rotate: [0, 360]
            }}
            transition={{
                duration: 20,
                ease: "linear",
                repeat: Infinity,
                delay
            }}
            aria-hidden='true'></motion.div>
    )
}

export default FloatingShape;