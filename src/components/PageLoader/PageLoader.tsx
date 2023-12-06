import { FC } from "react";
import { IPageLoader } from "../../types";

const PageLoader: FC<IPageLoader> = ({content}) => {
  return (
    <div className="border border-1 rounded-3 shadow-sm">
      <span className="text text-black">{content.title}</span>
      <p>{content.content}</p>
    </div>
  );
};

export default PageLoader;