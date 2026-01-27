/**
 * @file LoaderWithMessage - Spinning loader icon with accompanying text message.
 * @description Renders an animated spinning loader image alongside a text message.
 * Used as inline loading indicator within buttons and other UI elements during
 * async operations. Falls back to "Please wait" if no message is provided.
 *
 * @props
 *   - message {string} - Text to display beside the spinning loader icon.
 *
 * @dependencies
 *   - next/image - Optimized image rendering for the loader icon.
 *   - @/public/images/load.png - Static loader icon asset.
 */
import Image from "next/image";
import React from "react";
import LoaderIcon from "@/public/images/load.png";

type LoaderWithMessageProps = {
  message: string;
};

const LoaderWithMessage: React.FC<LoaderWithMessageProps> = ({ message }) => {
  return (
    <>
      <Image
        src={LoaderIcon}
        alt="loader-icon"
        width={20}
        height={20}
        className="mr-2 animate-spin"
      />
      {message || "Please wait"}
    </>
  );
};

export default LoaderWithMessage;
