import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const Pagination = () => {
  return (
    <ul className="theme-pagination-s1">
      <li>
        <Button type="button" className="theme-primary-btn first">
          <Image
            src="/images/pagination-first.svg"
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
            src="/images/pagination-prev.svg"
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
            src="/images/pagination-next.svg"
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
            src="/images/pagination-last.svg"
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
