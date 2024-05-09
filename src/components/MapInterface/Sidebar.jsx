import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

import cx from "classnames";



const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className={cx("sidebar", { "sidebar-closed": !isOpen })}>
      <button className={"sidebar__button"} onClick={() => setIsOpen(!isOpen)}>
      </button>
      <ul>
      
          
       
      </ul>
    </div>
  );
};

export default Sidebar;
