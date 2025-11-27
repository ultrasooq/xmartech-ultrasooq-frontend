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
    <div className="min-h-screen bg-gray-50">
      <section className="m-auto w-full max-w-[1600px] px-4 py-6 md:px-6 md:py-8">
        <RfqRequestChat rfqQuoteId={rfqQuotesId} />
      </section>
    </div>
  );
};

export default RfqRequestPage;
