import React, { useEffect } from 'react';

const JotformEmbed = () => {
  useEffect(() => {
    // This script is required by JotForm to handle the embed functionality
    const script = document.createElement('script');
    script.src = 'https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js';
    script.async = true;
    document.body.appendChild(script);

    // This function initializes the form handler once the script is loaded
    script.onload = () => {
      if (window.jotformEmbedHandler) {
        window.jotformEmbedHandler(
          "iframe[id='JotFormIFrame-019844dd3b2079ceb7f41f6d093d6e5a0df8']",
          "https://www.jotform.com"
        );
      }
    };

    // Clean up the script when the component is removed from the page
    return () => {
      document.body.removeChild(script);
    };
  }, []); // The empty array ensures this runs only once

  return (
    <iframe
      id="JotFormIFrame-019844dd3b2079ceb7f41f6d093d6e5a0df8"
      title="VEYDHA: Healthcare Intake Coordinator"
      onLoad={() => {
        if (window.parent) {
          window.parent.scrollTo(0, 0);
        }
      }}
      allowTransparency="true"
      allow="geolocation; microphone; camera; fullscreen"
      src="https://agent.jotform.com/019844dd3b2079ceb7f41f6d093d6e5a0df8?embedMode=iframe&background=1&shadow=1"
      frameBorder="0"
      style={{
        minWidth: '100%',
        maxWidth: '100%',
        height: '688px',
        border: 'none',
        width: '100%',
      }}
      scrolling="no"
    ></iframe>
  );
};

export default JotformEmbed;
