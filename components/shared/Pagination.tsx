import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import FirstIcon from "@/public/images/pagination-first.svg";
import PreviousIcon from "@/public/images/pagination-prev.svg";
import NextIcon from "@/public/images/pagination-next.svg";
import LastIcon from "@/public/images/pagination-last.svg";
import ReactPaginate from "react-paginate";
import { useTranslations } from "next-intl";

type PaginationProps = {
  // data: [];
  totalCount: number;
  page: number;
  setPage: (page: number) => void;
  limit: number;
};

const Pagination: React.FC<PaginationProps> = ({
  // data,
  totalCount = 0,
  page,
  setPage,
  limit,
}) => {
  const t = useTranslations();
  const itemsPerPage = limit;
  // const [itemOffset, setItemOffset] = useState(0);
  // const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  // const currentItems = (data || []).slice(itemOffset, endOffset);
  const pageCount = totalCount && Math.ceil(totalCount / itemsPerPage);

  const handlePageClick = (event: any) => {
    // const newOffset = (event.selected * itemsPerPage) % totalCount;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`,
    // );
    setPage(event.selected + 1);
    // setItemOffset(newOffset);
  };

  return (
    <ul className="theme-pagination-s1 pt-7">
      <li>
        <Button
          type="button"
          className="theme-primary-btn first"
          onClick={() => setPage(1)}
        >
          <Image
            src={FirstIcon}
            alt="next-icon"
            height={0}
            width={0}
            className="h-auto w-[7px]"
          />
          {t("first")}
        </Button>
      </li>
      <li>
        <ReactPaginate
          breakLabel="..."
          breakClassName="react-paginate"
          breakLinkClassName="react-paginate"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          forcePage={page - 1}
          renderOnZeroPageCount={null}
          containerClassName="flex gap-3"
          pageClassName="paginate-button"
          activeClassName="active-paginate-button"
          previousLabel={
            <Button type="button" variant="outline" className="nextPrev">
              <Image
                src={PreviousIcon}
                alt="prev-icon"
                height={0}
                width={0}
                className="h-auto w-[7px]"
              />
            </Button>
          }
          nextLabel={
            <Button type="button" variant="outline" className="nextPrev">
              <Image
                src={NextIcon}
                alt="prev-icon"
                height={0}
                width={0}
                className="h-auto w-[7px]"
              />
            </Button>
          }
        />
      </li>
      <li>
        <Button
          type="button"
          className="theme-primary-btn last"
          onClick={() => setPage(pageCount)}
        >
          {t("last")}
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
