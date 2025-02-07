"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any; // Add this line to fix the error
  }
}

const GoogleTranslate = () => {
  useEffect(() => {
    // Define the function before script loads
    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,ar",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };

    // Create the script element dynamically
    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup: Remove script on component unmount
      document.body.removeChild(script);
    };
  }, []);

  return <div id="google_translate_element" className="m-2"></div>;
};

export default GoogleTranslate;
