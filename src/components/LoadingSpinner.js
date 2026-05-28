import React from "react";

const LoadingSpinner = () => {
  return (
    <div style={styles.container}>
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "300px",
  },
};

export default LoadingSpinner;
