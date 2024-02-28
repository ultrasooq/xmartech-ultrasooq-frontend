import React from "react";
import Head from "next/head";

export default function Custom500() {
  return (
    <div className="top-off left-off bottom-off absolute full-height full-width">
      <Head>
        <title>Internal Server Error</title>
      </Head>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10%" }}
      >
        Internal Server Error
      </div>
    </div>
  );
}
