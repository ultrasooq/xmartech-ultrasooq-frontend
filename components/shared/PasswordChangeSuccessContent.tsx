/**
 * @file PasswordChangeSuccessContent - Success confirmation for password change.
 * @description Renders a centered success icon and "Successful Changed Password"
 * message. Intended to be displayed inside a dialog after a password reset completes.
 *
 * @dependencies
 *   - next/image - Optimized image for the success SVG icon.
 *   - @/public/images/successful.svg - Success illustration asset.
 */
import Image from "next/image";
import React from "react";
import SuccessfulIcon from "@/public/images/successful.svg";

/** Success content displayed after a password change. */
const PasswordChangeSuccessContent = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-2 h-[160px] w-[190px]">
        <Image
          src={SuccessfulIcon}
          className="m-auto"
          alt="successful-icon"
          fill
        />
      </div>
      <h3 className="mt-3.5 text-center text-2xl font-semibold leading-normal text-color-dark sm:text-3xl sm:leading-10 xl:text-4xl">
        Successful <hr />
        Changed Password
      </h3>
    </div>
  );
};

export default PasswordChangeSuccessContent;
