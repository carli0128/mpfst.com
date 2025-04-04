// components/ui/MotionDiv.tsx

import React, { forwardRef, HTMLAttributes } from "react";
import { motion, MotionProps } from "framer-motion";

// Merge <div> HTML attributes + Framer Motion props.
type DivProps = HTMLAttributes<HTMLDivElement> & MotionProps;

const MotionDiv = forwardRef<HTMLDivElement, DivProps>((props, ref) => (
  <motion.div ref={ref} {...props} />
));

MotionDiv.displayName = "MotionDiv";
export default MotionDiv;