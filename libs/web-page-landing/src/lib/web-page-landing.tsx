import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { useListFundraisers } from '@sendmemoney/data-access-api';
import { WebUiFundraiserPaper } from '@sendmemoney/web-ui-fundraiser-paper';

import { ReactComponent as LandingImage } from './landing.svg';
import { ReactComponent as EmptyImage } from './empty.svg';

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundColor: theme.palette.background.default,
  },
  image: {
    width: 500,
    height: 400,
    [theme.breakpoints.down('sm')]: {
      width: 300,
      height: 300,
    },
    [theme.breakpoints.down('xs')]: {
      width: 500,
      height: 400,
    },
  },
}));

export function WebPageLanding() {
  const history = useHistory();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const classes = useStyles();
  const fundraisers = useListFundraisers();

  const handleStartFundraiser = () => {
    if (isAuthenticated) {
      history.push('/new-fundraiser');
    } else {
      loginWithRedirect({
        redirectUri: `${window.location.origin}/new-fundraiser`,
      });
    }
  };

  return (
    <>
      <Box py={1} mb={5} className={classes.hero}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box mt={10}>
                <Typography variant="h1">
                  Giving money to those that you care about
                </Typography>
              </Box>
              <Box mt={5}>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={handleStartFundraiser}
                >
                  Start a fundraiser
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LandingImage className={classes.image} />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container maxWidth="lg">
        {fundraisers.isLoading ? (
          <Box my={10} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : fundraisers.data?.length ? (
          <>
            <Box mb={3}>
              <Typography variant="h2">Top Fundraisers</Typography>
            </Box>
            <Grid container spacing={3}>
              {fundraisers.data?.map((fundraiser) => (
                <Grid item xs={12} sm={6} key={fundraiser._id}>
                  <WebUiFundraiserPaper fundraiser={fundraiser} />
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <>
            <Box mt={5} display="flex" justifyContent="center">
              <Typography variant="h4">
                There are no fundraisers yet.
              </Typography>
            </Box>
            <Box mt={5} display="flex" justifyContent="center">
              <EmptyImage />
            </Box>
          </>
        )}
      </Container>
    </>
  );
}

export default WebPageLanding;
