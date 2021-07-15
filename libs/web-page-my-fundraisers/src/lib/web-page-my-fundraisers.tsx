import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Link,
  Typography,
} from '@material-ui/core';
import { useListFundraisers } from '@sendmemoney/data-access-api';
import { WebUiFundraiserPaper } from '@sendmemoney/web-ui-fundraiser-paper';
import { ReactComponent as EmptyImage } from './empty.svg';

export interface WebPageMyFundraisersProps {
  ownedBy: string;
}

export function WebPageMyFundraisers(props: WebPageMyFundraisersProps) {
  const fundraisers = useListFundraisers(props.ownedBy);

  return (
    <Container maxWidth="lg">
      {fundraisers.isLoading ? (
        <Box my={3} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : fundraisers.data?.length ? (
        <>
          <Box my={3} display="flex" alignItems="center">
            <Box flex="1">
              <Typography variant="h2">Your Fundraisers</Typography>
            </Box>
            <Link component={RouterLink} underline="none" to="/new-fundraiser">
              <Button variant="contained" color="primary">
                Start new fundraiser
              </Button>
            </Link>
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
              You have no fundraisers.{' '}
              <Link component={RouterLink} to="/new-fundraiser">
                Create one?
              </Link>
            </Typography>
          </Box>
          <Box mt={5} display="flex" justifyContent="center">
            <EmptyImage />
          </Box>
        </>
      )}
    </Container>
  );
}

export default WebPageMyFundraisers;
