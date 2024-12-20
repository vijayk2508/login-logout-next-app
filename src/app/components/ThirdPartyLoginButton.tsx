import Image from "next/image";
import React from "react";
import { loginWithThirdPartyLibClassName } from "../constants/general";

interface Props {
  readonly imageURL: string;
  readonly buttonText: string;
}

function ThirdPartyLoginButton({ imageURL, buttonText }: Props) {
  return (
    <button className={loginWithThirdPartyLibClassName}>
      <span className="mr-2">
        <Image
          aria-hidden
          src={imageURL}
          alt="Window icon"
          width={30}
          height={30}
        />
      </span>
      {buttonText}
    </button>
  );
}

export default ThirdPartyLoginButton;
