import { ReactNode, useState } from "react";

export const openControlModal = (children: ReactNode) => {
  _setChildren(children);
  return closeControlModal;
}

export const closeControlModal = () => {
  _setChildren(null);
}

let _setChildren: any = () => {};

const ControlModal: React.FC = () => {
  const [children, setChildren] = useState<ReactNode>(null);
  _setChildren = setChildren;
  if(!children) return <></>;
  return (
    <div className="absolute w-full h-full z-50 bg-black bg-opacity-50">
      { children }
    </div>
  );
}

export default ControlModal;