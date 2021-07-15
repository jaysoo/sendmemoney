import { format } from 'date-fns';
import { Link as RouterLink, Redirect, useRouteMatch } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Link,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import {
  useGetFundraiser,
  useGetDonationTotal,
  useGetLatestDonations,
} from '@sendmemoney/data-access-api';
import { formatCurrency } from '@sendmemoney/shared-formatters/currency';

export interface WebPageViewFundraiserProps {
  fundraiserId: string;
}

const useStyles = makeStyles({
  subtitle: {
    color: '#333',
  },
  coverContainer: {
    width: '100%',
    height: 500,
    maxHeight: '30vh',
  },
  coverImage: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
  description: {
    whiteSpace: 'pre-line',
  },
  total: {
    fontSize: '2rem',
  },
});

export function WebPageViewFundraiser(props: WebPageViewFundraiserProps) {
  const classes = useStyles();
  const match = useRouteMatch();
  const fundraiser = useGetFundraiser(props.fundraiserId);
  const donationTotal = useGetDonationTotal(props.fundraiserId);
  const latestDonations = useGetLatestDonations(props.fundraiserId);

  const progress =
    donationTotal.data && fundraiser.data
      ? Math.min(
          100,
          Math.ceil((donationTotal.data.total / fundraiser.data.goal) * 100)
        )
      : 0;

  return fundraiser.isError ? (
    <Redirect to="/" />
  ) : fundraiser.isLoading || !fundraiser.data ? (
    <Typography>Loading...</Typography>
  ) : (
    <>
      <Box mb={3} className={classes.coverContainer}>
        <img
          src={fundraiser.data.coverUrl}
          alt=""
          className={classes.coverImage}
        />
      </Box>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={8}>
            <Box my={3}>
              <Typography variant="h2">{fundraiser.data.title}</Typography>
            </Box>
            <Divider />
            <Box my={1}>
              <Typography variant="subtitle1" className={classes.subtitle}>
                <strong>{fundraiser.data.name}</strong> is organizing this
                fundraiser
              </Typography>
            </Box>
            {fundraiser.data.createdAt ? (
              <Box my={2}>
                <Typography variant="subtitle2" className={classes.subtitle}>
                  Created on{' '}
                  {format(new Date(fundraiser.data.createdAt), 'yyyy/MM/dd')}
                </Typography>
              </Box>
            ) : null}
            <Divider />
            <Box my={3}>
              <Typography variant="body1" className={classes.description}>
                {fundraiser.data.description}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box my={3}>
              <Paper elevation={2} square>
                <Box p={2}>
                  <Typography variant="h6">
                    <strong className={classes.total}>
                      {formatCurrency(donationTotal.data?.total ?? 0)}{' '}
                    </strong>
                    raised of {formatCurrency(fundraiser.data?.goal ?? 0)} goal
                  </Typography>
                  <Box my={2}>
                    <LinearProgress variant="determinate" value={progress} />
                  </Box>
                  <Box my={2}>
                    <Link
                      component={RouterLink}
                      to={`${match.url}/donate`}
                      underline="none"
                    >
                      <Button
                        size="large"
                        color="secondary"
                        variant="contained"
                        disableElevation
                        fullWidth
                      >
                        Donate
                      </Button>
                    </Link>
                  </Box>
                  {latestDonations.isLoading || !latestDonations.data
                    ? null
                    : latestDonations.data.map((donation) => (
                        <Box my={2} key={donation._id}>
                          <Divider />
                          <Box py={2}>
                            <Typography>
                              {donation.name || 'Anonymous'} donated{' '}
                              <strong>{formatCurrency(donation.amount)}</strong>
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default WebPageViewFundraiser;
