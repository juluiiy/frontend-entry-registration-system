export const styles = {
  mainBox: { display: "flex", flexDirection: "column", gap: 5 },
  innerBox: { display: "flex", gap: 4 },
  iconBox: {
    maxWidth: "400px",
    maxHeight: "400px",
    bgcolor: "grey.400",
    borderRadius: "8px",
  },
  noApplications: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 1,
    border: "1px solid red",
    py: 5,
    borderRadius: 3,
  },
  icon: { width: "300px", height: "300px", color: "white" },
  typographyBox: { py: 1 },
  infoBox: { display: "flex", flexDirection: "column", mt: 1 },
  infoItem: { display: "flex", gap: 1, fontSize: "16px" },
  applicationBox: { display: "flex", flexDirection: "column", gap: 2 },
  createApplicationButton: { width: "100%" },
};
