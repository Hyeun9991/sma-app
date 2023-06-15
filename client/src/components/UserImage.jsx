const { Box } = require("@mui/material");

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        src={`http://localhost:8080/assets/${image}`}
        alt="user"
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
      />
    </Box>
  );
};

export default UserImage;
