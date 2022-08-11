import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";

function SkeletonContent() {
  return (
    <div
      className="
            note-container"
    >
      <div>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 420,
            },
          }}
        >
          <Paper
            elevation={5}
            style={{ textAlign: "center", alignContent: "center" }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
              }}
            >
              <div style={{ marginLeft: "10px" }}>
                <Skeleton variant="text" width={50} />
              </div>
              <div style={{ margin: "auto", textAlign: "center" }}>
                <Skeleton variant="text" width={100} />
              </div>
            </div>
            <div style={{ padding: "10px" }}>
              <Skeleton variant="rectangular" height={140} />
            </div>
          </Paper>
        </Box>
      </div>
    </div>
  );
}

function NoteSkeleton() {
  return (
    <div style={{ display: "table" }}>
      <SkeletonContent/>
      <SkeletonContent/>
      <SkeletonContent/>
      <SkeletonContent/>
    </div>
  );
}

export default NoteSkeleton;
