import React from "react";
import { useLocation } from "react-router-dom";

const GoogleStructuredData = () => {
  const location = useLocation();
  const currentUrl = `https://dhwanitourist.com${location.pathname}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: document.title,
    description: document.querySelector('meta[name="description"]')?.content,
    url: currentUrl,
    mainEntity: {
      "@type": "TravelAgency",
      name: "Dhwani Tourist",
      description: "Best car rental and tour packages in India",
      telephone: "+91-9274713544",
      email: "dhwanitourist@gmail.com",
    },
  };

  return (
    <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
  );
};

export default GoogleStructuredData;
