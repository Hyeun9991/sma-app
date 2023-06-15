import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import Form from './Form';

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
  const background = theme.palette.background.default;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignContent="center"
      justifyContent="center"
    >
      <Box
        width="100%"
        backgroundColor={theme.palette.background.background}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography
          fontFamily="Satisfy, cursive"
          fontWeight="bold"
          fontSize="32px"
          color="neutral"
        >
          eHwave
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? '480px' : '93%'}
        p="2rem"
        m="3% auto 3%"
        borderRadius="0.75rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          fontSize="14px"
          fontWeight="500"
          variant="h5"
          sx={{ mb: '2rem' }}
          textAlign="center"
        >
          Welcome to eHwave, the Social Media for eHwave!
        </Typography>
        <Form></Form>
      </Box>
    </Box>
  );
};

export default LoginPage;
