import { FC } from "react";
import { IPageLoader } from "../../types";

const PageLoader: FC<IPageLoader> = ({content,isHome}) => {
  return (
    <>
      {isHome ? (
        <span>Home page content loaded</span>
      ):(
    <div className="border border-1 rounded-3 shadow-sm">
      <span className="text text-black">{content.title}</span>
      <p>{content.content}</p>
    </div>
      )}
    </>
  );
};

export default PageLoader;