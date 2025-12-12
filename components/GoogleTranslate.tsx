"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
    googleTranslateReady?: boolean;
    triggerGoogleTranslate?: (langCode: string) => void;
  }
}

const GoogleTranslate = () => {
  useEffect(() => {
    if (!document.querySelector("script[src*='translate.google.com']")) {
      // Define the function before script loads
      (window as any).googleTranslateElementInit = function () {
        try {
          const container = document.getElementById("google_translate_element");
          if (!container) {
            console.error("[GoogleTranslate] Container element not found!");
            return;
          }

          // Make container temporarily visible for initialization (Google Translate needs this)
          container.style.position = "fixed";
          container.style.top = "0";
          container.style.left = "0";
          container.style.width = "200px";
          container.style.height = "40px";
          container.style.opacity = "0.01"; // Almost invisible but not completely
          container.style.pointerEvents = "none";
          container.style.zIndex = "-1";
          container.style.visibility = "visible";

          // Use VERTICAL layout which creates a select dropdown instead of a button
          new (window as any).google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,ar",
              autoDisplay: false, // Don't auto-translate on page load
              layout: (window as any).google.translate.TranslateElement
                .InlineLayout.VERTICAL,
            },
            "google_translate_element",
          );
          (window as any).googleTranslateReady = true;

          // Dispatch custom event when Google Translate is ready
          window.dispatchEvent(new CustomEvent("googleTranslateReady"));
        } catch (error) {
          console.error(
            "[GoogleTranslate] Error initializing Google Translate:",
            error,
          );
        }
      };

      // Create the script element dynamically
      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.onerror = () => {
        console.error(
          "[GoogleTranslate] Failed to load Google Translate script",
        );
      };

      document.body.appendChild(script);

      // After Google Translate loads, add CSS and ensure it's ready
      script.onload = () => {
        // Check multiple times with increasing delays
        const checkForComboBox = (attempt = 0) => {
          // Check if combo box exists
          const comboBox = document.querySelector(
            ".goog-te-combo",
          ) as HTMLSelectElement;

          if (comboBox) {
            // Found it! Proceed with setup
            setupGoogleTranslate(comboBox);
            return;
          }

          // If not found and we haven't tried too many times, try again
          if (attempt < 10) {
            setTimeout(() => checkForComboBox(attempt + 1), 500);
          }
        };

        // Start checking after a delay
        setTimeout(() => checkForComboBox(), 500);
      };

      // Setup function that runs when combo box is found
      const setupGoogleTranslate = (comboBox: HTMLSelectElement) => {
        // Add CSS to hide Google Translate's default styling and ensure translate="no" works
        if (!document.getElementById("google-translate-styles")) {
          const style = document.createElement("style");
          style.id = "google-translate-styles";
          style.textContent = `
            .goog-te-banner-frame { display: none !important; }
            .goog-te-balloon-frame { display: none !important; }
            body { top: 0 !important; }
            /* Ensure elements with translate="no" are not translated by Google Translate */
            [translate="no"] { }
            .notranslate { }
            /* Make sure the translate combo is accessible */
            .goog-te-combo { visibility: visible !important; opacity: 1 !important; }
            /* Hide the Google Translate widget container but keep combo accessible */
            #google_translate_element { position: fixed !important; top: -9999px !important; left: -9999px !important; width: 1px !important; height: 1px !important; overflow: hidden !important; }
            .goog-te-combo { position: fixed !important; top: -9999px !important; left: -9999px !important; }
          `;
          document.head.appendChild(style);
        }

        // Mark as ready and dispatch event
        (window as any).googleTranslateReady = true;

        // Create a helper function to trigger translation
        (window as any).triggerGoogleTranslate = (langCode: string) => {
          // First, try to find the combo box directly
          let elem = document.querySelector(
            ".goog-te-combo",
          ) as HTMLSelectElement;

          // If not found, try to find it in an iframe or popup
          if (!elem) {
            // Check if there's a Google Translate iframe
            const iframes = document.querySelectorAll("iframe");
            for (const iframe of Array.from(iframes)) {
              try {
                const iframeDoc =
                  iframe.contentDocument || iframe.contentWindow?.document;
                if (iframeDoc) {
                  const iframeSelect = iframeDoc.querySelector(
                    ".goog-te-combo",
                  ) as HTMLSelectElement;
                  if (iframeSelect) {
                    elem = iframeSelect;
                    break;
                  }
                }
              } catch (e) {
                // Cross-origin iframe, can't access
              }
            }
          }

          // If still not found, try clicking the link to open the popup, then find the select
          if (!elem) {
            const container = document.getElementById(
              "google_translate_element",
            );
            const translateLink = container?.querySelector("a");
            if (translateLink) {
              translateLink.click();
              // Wait a bit for popup to open
              setTimeout(() => {
                elem = document.querySelector(
                  ".goog-te-combo",
                ) as HTMLSelectElement;
              }, 500);
            }
          }

          if (elem && elem.options && elem.options.length > 0) {
            // Check if the language code exists
            const optionExists = Array.from(elem.options).some(
              (opt) => opt.value === langCode,
            );

            let targetValue = langCode;
            if (!optionExists) {
              // Try to find a matching option
              const arabicOption = Array.from(elem.options).find(
                (opt) =>
                  opt.value.includes("ar") ||
                  opt.text.toLowerCase().includes("arabic") ||
                  opt.value === "ar",
              );
              const englishOption = Array.from(elem.options).find(
                (opt) =>
                  opt.value.includes("en") ||
                  opt.text.toLowerCase().includes("english") ||
                  opt.value === "en",
              );
              const targetOption =
                langCode === "ar" ? arabicOption : englishOption;
              if (targetOption) {
                targetValue = targetOption.value;
              } else {
                return false;
              }
            }

            // IMPORTANT: If the value is already set to the target, we need to force a change
            if (elem.value === targetValue) {
              // First, try to use Google Translate's API directly if available
              try {
                const googleTranslate = (window as any).google?.translate;
                if (googleTranslate) {
                  // Try to get the current page language
                  const currentPageLang =
                    googleTranslate.getCurrentLang?.() || "en";
                  const targetLang = targetValue;

                  if (currentPageLang !== targetLang) {
                    // Try to trigger translation directly
                    if (googleTranslate.translate) {
                      googleTranslate.translate(
                        document.body,
                        currentPageLang,
                        targetLang,
                      );
                      return true;
                    }
                  }
                }
              } catch (e) {
                // Direct API not available, using reset method
              }

              // Fallback: Reset to the opposite language first
              const oppositeValue = langCode === "ar" ? "en" : "ar";
              const oppositeOption = Array.from(elem.options).find(
                (opt) =>
                  opt.value === oppositeValue ||
                  (langCode === "ar"
                    ? opt.value.includes("en") ||
                      opt.text.toLowerCase().includes("english")
                    : opt.value.includes("ar") ||
                      opt.text.toLowerCase().includes("arabic")),
              );

              if (oppositeOption) {
                elem.value = oppositeOption.value;
                // Trigger change to reset
                const resetEvent = new Event("change", {
                  bubbles: true,
                  cancelable: true,
                });
                elem.dispatchEvent(resetEvent);

                // Also trigger input event for reset
                const resetInputEvent = new Event("input", {
                  bubbles: true,
                  cancelable: true,
                });
                elem.dispatchEvent(resetInputEvent);

                // Wait a bit for the reset to take effect, then set to target
                // Use a retry mechanism to ensure the element exists and value is set
                const setTargetValue = (attempt = 0) => {
                  // Get a fresh reference to the element (it might have been recreated)
                  let freshElem = document.querySelector(
                    ".goog-te-combo",
                  ) as HTMLSelectElement;

                  if (!freshElem) {
                    // Try to find it in the container
                    const container = document.getElementById(
                      "google_translate_element",
                    );
                    freshElem = container?.querySelector(
                      ".goog-te-combo",
                    ) as HTMLSelectElement;
                  }

                  if (!freshElem) {
                    if (attempt < 5) {
                      setTimeout(() => setTargetValue(attempt + 1), 100);
                      return;
                    } else {
                      return;
                    }
                  }

                  // Try to find the target option first - check multiple ways
                  let targetOption = Array.from(freshElem.options).find(
                    (opt) => opt.value === targetValue,
                  );

                  // If not found by exact value, try by language code
                  if (!targetOption) {
                    if (targetValue === "ar") {
                      targetOption = Array.from(freshElem.options).find(
                        (opt) =>
                          opt.value.includes("ar") ||
                          opt.text?.toLowerCase().includes("arabic") ||
                          opt.text?.toLowerCase().includes("عربي"),
                      );
                    } else if (targetValue === "en") {
                      targetOption = Array.from(freshElem.options).find(
                        (opt) =>
                          opt.value.includes("en") ||
                          opt.text?.toLowerCase().includes("english"),
                      );
                    }
                  }

                  if (!targetOption) {
                    if (attempt < 3) {
                      setTimeout(() => setTargetValue(attempt + 1), 200);
                      return;
                    }
                    return;
                  }

                  // Method 1: Try setting value directly using the found option's value
                  const optionValue = targetOption.value;
                  freshElem.value = optionValue;

                  // Verify the value was set
                  if (freshElem.value !== optionValue) {
                    // Method 2: Try setting selectedIndex instead
                    freshElem.selectedIndex = targetOption.index;

                    // Verify again
                    if (
                      freshElem.value !== optionValue &&
                      freshElem.value !== targetValue
                    ) {
                      // Method 3: Try setting option.selected
                      targetOption.selected = true;
                      // Also try setting the value again
                      freshElem.value = optionValue;
                    }
                  }

                  // Final verification - get fresh value
                  let finalValue = freshElem.value;

                  // Check if the value matches the target (either exact match or contains the language code)
                  const valueMatches =
                    finalValue === targetValue ||
                    finalValue === optionValue ||
                    (targetValue === "ar" &&
                      (finalValue.includes("ar") ||
                        finalValue.includes("arabic"))) ||
                    (targetValue === "en" &&
                      (finalValue.includes("en") ||
                        finalValue.includes("english")));

                  // If value is still empty or doesn't match, try one more time with a small delay
                  if (
                    !valueMatches &&
                    (finalValue === "" || finalValue === undefined)
                  ) {
                    setTimeout(() => {
                      // Get element again
                      const retryElem = document.querySelector(
                        ".goog-te-combo",
                      ) as HTMLSelectElement;
                      if (retryElem && targetOption) {
                        retryElem.value = optionValue;
                        retryElem.selectedIndex = targetOption.index;
                        finalValue = retryElem.value;
                      }
                    }, 100);
                  }

                  // If still not set, retry
                  if (
                    !valueMatches &&
                    (finalValue === "" || finalValue === undefined)
                  ) {
                    if (attempt < 3) {
                      setTimeout(() => setTargetValue(attempt + 1), 200);
                      return;
                    }
                  }

                  // Only dispatch events if value is actually set
                  const currentValue = freshElem.value || finalValue;
                  const isValidValue =
                    valueMatches ||
                    (currentValue !== "" &&
                      currentValue !== undefined &&
                      currentValue !== null);

                  if (isValidValue) {
                    // Create and dispatch change event with more force
                    const changeEvent = new Event("change", {
                      bubbles: true,
                      cancelable: true,
                    });
                    freshElem.dispatchEvent(changeEvent);

                    // Also try input event
                    const inputEvent = new Event("input", {
                      bubbles: true,
                      cancelable: true,
                    });
                    freshElem.dispatchEvent(inputEvent);

                    // Try multiple approaches to trigger translation
                    // Approach 1: Click
                    freshElem.click();

                    // Approach 2: Focus and blur
                    freshElem.focus();
                    setTimeout(() => {
                      freshElem.blur();
                    }, 50);

                    // Approach 3: Try to trigger via Google Translate's internal handlers
                    try {
                      // Access Google Translate's internal translation function if available
                      const googleTranslate = (window as any).google?.translate;
                      if (googleTranslate && googleTranslate.translate) {
                        const currentLang = targetValue === "ar" ? "en" : "ar";
                        // Try to trigger translation directly
                        googleTranslate.translate(
                          document.body,
                          currentLang,
                          targetValue,
                        );
                      }
                    } catch (e) {
                      // Direct API call not available
                    }
                  } else {
                    // Retry if we haven't exceeded attempts
                    if (attempt < 3) {
                      setTimeout(() => setTargetValue(attempt + 1), 200);
                      return;
                    }
                  }
                };

                // Start setting the target value after delay
                setTimeout(() => setTargetValue(), 300); // Increased delay to ensure reset completes

                // Return true immediately since we've initiated the change
                return true;
              } else {
                // If we can't find opposite, just force the change anyway
                elem.value = targetValue;
                const changeEvent = new Event("change", {
                  bubbles: true,
                  cancelable: true,
                });
                elem.dispatchEvent(changeEvent);
              }
            } else {
              // Value is different, just set it normally
              // Try to find the target option to get the correct value format
              const targetOption = Array.from(elem.options).find(
                (opt) =>
                  opt.value === targetValue ||
                  (targetValue === "ar" &&
                    (opt.value.includes("ar") ||
                      opt.text?.toLowerCase().includes("arabic"))) ||
                  (targetValue === "en" &&
                    (opt.value.includes("en") ||
                      opt.text?.toLowerCase().includes("english"))),
              );

              if (targetOption) {
                elem.value = targetOption.value;
              } else {
                elem.value = targetValue;
              }

              const changeEvent = new Event("change", {
                bubbles: true,
                cancelable: true,
              });
              elem.dispatchEvent(changeEvent);
            }

            // Also try input event
            const inputEvent = new Event("input", {
              bubbles: true,
              cancelable: true,
            });
            elem.dispatchEvent(inputEvent);

            // Also try to trigger translation directly using Google Translate API
            try {
              if ((window as any).google?.translate?.translate) {
                // This might help trigger the translation
              }
            } catch (e) {
              // Ignore errors
            }

            const finalElemValue = elem.value;

            // If value is empty, try to fix it
            if (!finalElemValue || finalElemValue === "") {
              const allOptions = Array.from(elem.options || []).map((opt) => ({
                value: opt.value,
                text: opt.text?.substring(0, 50),
                index: opt.index,
                selected: opt.selected,
              }));

              // Try to find and set the correct option
              const correctOption = allOptions.find(
                (opt) =>
                  opt.value === langCode ||
                  (langCode === "ar" &&
                    (opt.value.includes("ar") ||
                      opt.text?.toLowerCase().includes("arabic"))) ||
                  (langCode === "en" &&
                    (opt.value.includes("en") ||
                      opt.text?.toLowerCase().includes("english"))),
              );

              if (correctOption) {
                elem.value = correctOption.value;
                elem.selectedIndex = correctOption.index;

                // Dispatch change event again
                const fixChangeEvent = new Event("change", {
                  bubbles: true,
                  cancelable: true,
                });
                elem.dispatchEvent(fixChangeEvent);
              }
            }

            return true;
          }

          // Fallback: Try to use Google Translate API directly
          try {
            // Try to trigger translation using Google Translate's internal API
            if ((window as any).google?.translate?.translate) {
              // This might not work, but worth trying
              return false; // Let the fallback in Header handle it
            }
          } catch (e) {
            // Direct API call failed
          }

          return false;
        };

        window.dispatchEvent(new CustomEvent("googleTranslateReady"));
      };
    } else {
      // Script already exists, check if Google Translate is ready
      if ((window as any).google?.translate) {
        (window as any).googleTranslateReady = true;
        window.dispatchEvent(new CustomEvent("googleTranslateReady"));
      }
    }

    return () => {
      const translateContainer = document.getElementById(
        "google_translate_element",
      );
      if (translateContainer) {
        translateContainer.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      id="google_translate_element"
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "200px",
        height: "40px",
        opacity: "0.01",
        pointerEvents: "none",
        zIndex: -1,
        visibility: "visible",
        overflow: "visible",
      }}
    >
      {/* Google Translate widget will be injected here */}
    </div>
  );
};

export default GoogleTranslate;
