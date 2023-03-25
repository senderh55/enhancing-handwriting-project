import { Icon } from "@iconify/react";
import { Stack, IconButton } from "@mui/material";

const GoogleAuth = () => {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <IconButton
          sx={{
            border: "2px solid #ccc",
            borderRadius: "5px",
            padding: "0.5675rem",
            flex: 1,
          }}
        >
          <Icon icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
        </IconButton>
      </Stack>
    </>
  );
};

export default GoogleAuth;
