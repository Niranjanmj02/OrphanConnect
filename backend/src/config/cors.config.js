  // Define a CORS whitelist of allowed origins
  const whitelist = [
    "*",
    // Add more URLs as required
  ];

  // Define CORS options with the whitelist and support for credentials
  const corsOptions = {
    // Allow requests from any origin
    origin: (origin, callback) => {
      // Accept all origins (including no origin for same-origin requests)
      callback(null, true);
    },
  
    // Enable credentials (cookies, authorization headers) for cross-origin requests
    credentials: true,
  
    // Additional configurations can be added here as needed
  };
  
  // Export CORS options for use in your application
  export { corsOptions };
