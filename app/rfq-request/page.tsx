"use client";
import React, { useEffect, useState } from "react";
import RfqRequestChat from "@/components/modules/chat/rfqRequest/RfqRequestChat";

const RfqRequestPage = () => {
  const [rfqQuotesId, setRfqQuotesId] = useState<string | null>();

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    let rfqId = params.get("rfqQuotesId");
    setRfqQuotesId(rfqId);
  }, []);

  return (
    <section className="m-auto w-full max-w-[1400px] px-4 py-8">
      <RfqRequestChat rfqQuoteId={rfqQuotesId} />
    </section>
  );
};

export default RfqRequestPage;
