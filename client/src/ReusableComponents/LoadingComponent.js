import React from "react";
import { Box, CircularProgress } from "@mui/material";
import "../ReusableComponentsCSS/LoadingComponent.css"

const LoadingComponent = ({ onClose }) => {
  // Simulate some async operation
  setTimeout(() => {
    // After your async operation is complete, stop loading
    onClose();
  }, 2000); // Adjust the timeout as needed

  return (
    <div className="loading-overlay">
      <Box>
        <CircularProgress />
      </Box>
    </div>
  );
};

export default LoadingComponent;