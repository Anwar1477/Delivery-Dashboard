import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { DeliveryStatus } from "../../types";

interface StatusCardProps {
  status: DeliveryStatus;
  count: number;
}

const StatusCard: React.FC<StatusCardProps> = ({ status, count }) => {
  return (
    <Card
      sx={{
        minWidth: 200,
        backgroundColor: "transparent",
        border: "1px solid #ccc",
        boxShadow: "none",
        borderRadius: "8px",
      }}
    >
      <CardContent>
        <Typography variant="h3" color="black">
          {count}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" component="div" color="black">
            {status}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
