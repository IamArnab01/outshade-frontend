import React from "react";
import Logo from "../../assets/images/logo.svg";
import { useWindowWidthAndHeight } from "../../../hooks/useWidthAndHeight";
import HeaderWeb from "./headerweb";
import HeaderMob from "./headermob";

const Header = () => {
  const [width] = useWindowWidthAndHeight();
  return (
    <div>
      {width > 768 ? (
        <HeaderWeb Logo={Logo} width={width} />
      ) : (
        <HeaderMob Logo={Logo} width={width} />
      )}
    </div>
  );
};

export default Header;
