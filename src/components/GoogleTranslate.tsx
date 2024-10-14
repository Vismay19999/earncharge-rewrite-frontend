"use client";
import { useEffect } from "react";
import Script from "next/script";

const GoogleTranslate: React.FC = () => {
  useEffect(() => {
    const googleTranslateElementInit = () => {
      // @ts-ignore
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi,kn,ml,pa,ta,te,bn" // Include desired languages
        },
        "google_translate_element"
      );
    };

    // Expose the function to the window object
    // @ts-ignore
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  return (
    <div>
      <div id="google_translate_element" className="w-full"></div>

      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </div>
  );
};

export default GoogleTranslate;
