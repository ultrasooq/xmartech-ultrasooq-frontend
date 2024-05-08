import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import FirstIcon from "@/public/images/pagination-first.svg";
import PreviousIcon from "@/public/images/pagination-prev.svg";
import NextIcon from "@/public/images/pagination-next.svg";
import LastIcon from "@/public/images/pagination-last.svg";

const Pagination = () => {
  return (
    <ul className="theme-pagination-s1">
      <li>
        <Button type="button" className="theme-primary-btn first">
          <Image
            src={FirstIcon}
            alt="next-icon"
            height={0}
            width={0}
            className="h-auto w-[7px]"
          />
          First
        </Button>
      </li>
      <li>
        <Button type="button" className="nextPrev">
          <Image
            src={PreviousIcon}
            alt="prev-icon"
            height={0}
            width={0}
            className="h-auto w-[7px]"
          />
        </Button>
      </li>
      <li>
        <Button type="button" className="current">
          1
        </Button>
      </li>

      <li>
        <Button type="button" className="nextPrev">
          <Image
            src={NextIcon}
            alt="next-icon"
            height={0}
            width={0}
            className="h-auto w-[7px]"
          />
        </Button>
      </li>
      <li>
        <Button type="button" className="theme-primary-btn last">
          Last
          <Image
            src={LastIcon}
            alt="next-icon"
            height={0}
            width={0}
            className="h-auto w-[7px]"
          />
        </Button>
      </li>
    </ul>
  );
};

export default Pagination;
