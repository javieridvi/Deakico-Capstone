import {
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
import React from "react";

function CardBar({ title, chart }) {

  return (
    <>
      <Card>
        <CardContent>
          <Typography color='red'>
            {title}
          </Typography>
          <Divider />
          {chart}
        </CardContent>
      </Card>
    </>
  );
}

export { CardBar };
