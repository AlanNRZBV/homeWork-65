import { FC } from 'react';
import { IPageLoader } from '../../types';
import { motion } from 'framer-motion';

const PageLoader: FC<IPageLoader> = ({ content, isHome }) => {
  return (
    <div className="d-flex justify-content-center align-items-center pt-5">
      {isHome ? (
        <motion.h1 animate={{ y: 0, opacity: 1 }} initial={{ y: -100, opacity: 0 }} className="">
          Home page content loaded
        </motion.h1>
      ) : (
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: -100, opacity: 0 }}
          className="border border-1 rounded-3 shadow-sm py-3 px-3"
        >
          <h3 className="text text-black">{content.title}</h3>
          <p className="text text-secondary">{content.content}</p>
        </motion.div>
      )}
    </div>
  );
};

export default PageLoader;
