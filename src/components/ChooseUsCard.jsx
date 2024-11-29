import { motion } from "framer-motion";
const ChooseUsCard = ({ imageSrc, title, description }) => {
  return (
    <motion.div
      className="p-4 transition-all rounded-md"
      whileHover={{ scale: 1.05, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-start mb-4">
        <img
          src={imageSrc}
          alt={title}
          className="object-cover w-[65px] h-[65px] mr-5"
        />
      </div>
      <h3 className="mb-2 text-lg font-semibold sm:text-xl md:text-2xl text-darkText">
        {title}
      </h3>
      <p className="text-[18px] text-black w-80 sm:text-sm md:text-base font-normal">
        {description}
      </p>
    </motion.div>
  );
};

export default ChooseUsCard;