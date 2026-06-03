import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Google Analytics 4 Page View Tracking
    if (window.gtag) {
      window.gtag("config", "G-XXXXXXXXXX", {
        page_path: location.pathname + location.search,
        page_title: document.title,
        page_location: window.location.href,
      });
    }

    // Google Tag Manager Page View
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "pageview",
        page: location.pathname,
        title: document.title,
      });
    }
  }, [location]);

  // Track Outbound Links
  useEffect(() => {
    const handleOutboundClick = (e) => {
      const target = e.target.closest("a");
      if (
        target &&
        target.href &&
        !target.href.includes(window.location.hostname)
      ) {
        if (window.gtag) {
          window.gtag("event", "click", {
            event_category: "outbound",
            event_label: target.href,
            transport_type: "beacon",
          });
        }
      }
    };

    document.addEventListener("click", handleOutboundClick);
    return () => document.removeEventListener("click", handleOutboundClick);
  }, []);

  // Track Form Submissions
  useEffect(() => {
    const handleFormSubmit = (e) => {
      if (e.target.tagName === "FORM") {
        if (window.gtag) {
          window.gtag("event", "form_submit", {
            event_category: "engagement",
            event_label: e.target.id || "form_submission",
          });
        }
      }
    };

    document.addEventListener("submit", handleFormSubmit);
    return () => document.removeEventListener("submit", handleFormSubmit);
  }, []);

  return null;
};

export default GoogleAnalytics;
