import React from "react";

const TabViewSection = () => {
  return (
    <div className="w-full">
      <ul className="flex flex-wrap items-center justify-start">
        <li className="mr-4 w-full sm:w-auto md:mr-6">
          <a
            href="#"
            className="inline-block w-full bg-dark-orange px-6 py-3 text-center text-base font-semibold leading-6 text-white sm:w-auto sm:rounded-t-lg sm:px-9 sm:py-3.5"
          >
            Profile Info
          </a>
        </li>
        <li className="mr-4 w-full sm:w-auto md:mr-6">
          <a
            href="#"
            className="inline-block w-full bg-gray-300 px-6 py-3 text-center text-base font-semibold leading-6 text-zinc-500 sm:w-auto sm:rounded-t-lg sm:px-9 sm:py-3.5"
          >
            Ratings & Reviews
          </a>
        </li>
        <li className="mr-4 w-full sm:w-auto md:mr-6">
          <a
            href="#"
            className="inline-block w-full bg-gray-300 px-6 py-3 text-center text-base font-semibold leading-6 text-zinc-500 sm:w-auto sm:rounded-t-lg sm:px-9 sm:py-3.5"
          >
            Services
          </a>
        </li>
      </ul>
    </div>
  );
};

export default TabViewSection;
