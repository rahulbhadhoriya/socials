import { motion } from "framer-motion";
import "./Animate.css";

/**
 * 
 * @description work in progess right now
 */
const AnimationWrapper = ({children}) => {
  return (
    <div className="flip-card-container">
      <motion.div
        className="flip-card"
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.6 }}
      >
        <div className="card-front">Story Front</div>
        {children}
        <div className="card-back">Story Back</div>
      </motion.div>
    </div>
  );
};

export default AnimationWrapper;
