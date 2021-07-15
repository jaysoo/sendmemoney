// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import { useMemo, useState } from 'react';
import { useHistory, Link as RouterLink, Redirect } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  makeStyles,
  Paper,
  Slider,
  TextField,
  Typography,
} from '@material-ui/core';
import { useDonate, useGetFundraiser } from '@sendmemoney/data-access-api';
import { formatCurrency } from '@sendmemoney/shared-formatters/currency';

export interface WebPageDonateProps {
  fundraiserId: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 'calc(100vh - 48px)',
    width: '100vw',
    backgroundColor: theme.palette.background.default,
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
  input: {
    width: '100%',
  },
}));

export function WebPageDonate(props: WebPageDonateProps) {
  const classes = useStyles();
  const history = useHistory();
  const fundraiser = useGetFundraiser(props.fundraiserId);
  const donate = useDonate(props.fundraiserId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [amount, setAmount] = useState(0);
  const [tip, setTip] = useState(5);
  const [name, setName] = useState('');
  const tipAmount = useMemo(() => (amount * tip) / 100, [amount, tip]);
  const total = useMemo(() => amount + tipAmount, [amount, tipAmount]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    donate.mutate(
      {
        name,
        amount: total,
        fundraiser: props.fundraiserId,
      },
      {
        onSettled: () => setIsSubmitting(false),
        onSuccess: () => history.push(`/f/${fundraiser.data?._id}`),
      }
    );
  };

  return fundraiser.isError ? (
    <Redirect to="/" />
  ) : fundraiser.isLoading || !fundraiser.data ? (
    <Typography>Loading...</Typography>
  ) : (
    <Box className={classes.root}>
      <Container maxWidth="lg">
        <Box py={3}>
          <Link
            component={RouterLink}
            to={`/f/${fundraiser.data._id}`}
            underline="none"
          >
            <Button variant="outlined" size="small">
              Return to fundraiser
            </Button>
          </Link>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <Paper elevation={2} square>
              <Box mb={1} className={classes.coverContainer}>
                <img
                  src={fundraiser.data.coverUrl}
                  alt=""
                  className={classes.coverImage}
                />
              </Box>
              <Box my={1} p={2}>
                <Typography variant="h5" gutterBottom>
                  You are supporting <strong>{fundraiser.data.name}</strong>
                </Typography>
                <Box my={3}>
                  <CurrencyTextField
                    className={classes.input}
                    textAlign={'left'}
                    label="Enter your donation"
                    variant="outlined"
                    currencySymbol="$"
                    outputFormat="string"
                    decimalCharacter="."
                    digitGroupSeparator=","
                    value={String(amount)}
                    onChange={(_: unknown, value: string) => {
                      setAmount(Number(value));
                    }}
                  />
                </Box>
                <Box my={3}>
                  <Divider />
                </Box>
                <Box my={3}>
                  <Typography gutterBottom variant="h6">
                    Tip SendMeMoney services
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    SendMeMoney has a 0% platform fee for organizers and relies
                    on the generosity of donors like you to operate our service.
                  </Typography>
                  <Box px={3}>
                    <Slider
                      defaultValue={5}
                      getAriaValueText={(value) => `${value}%`}
                      aria-labelledby="discrete-slider"
                      valueLabelDisplay="auto"
                      step={1}
                      marks={[
                        { value: 0, label: '0%' },
                        { value: 5, label: '5%' },
                        { value: 10, label: '10%' },
                        { value: 15, label: '15%' },
                        { value: 20, label: '20%' },
                        { value: 25, label: '25%' },
                      ]}
                      min={0}
                      max={25}
                      onChange={(_, value) => setTip(value as number)}
                    />
                  </Box>
                  <Box my={3}>
                    <Divider />
                  </Box>
                  <Box my={3}>
                    <Typography gutterBottom variant="h6">
                      Donation details (optional)
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="What is your name?"
                      onChange={(evt) => setName(evt.target.value)}
                    />
                  </Box>
                  <Box my={3}>
                    <Divider />
                  </Box>
                  <Box my={3}>
                    <Button
                      onClick={handleSubmit}
                      disabled={total === 0 || isSubmitting}
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      Submit
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={2} square>
              <Box pt={2} px={2}>
                <Typography gutterBottom variant="h6">
                  Your donation
                </Typography>
              </Box>
              <Box pt={2} px={2} display="flex">
                <Box flex="1">
                  <Typography gutterBottom variant="body1">
                    Your donation
                  </Typography>
                </Box>
                <Typography gutterBottom variant="body1">
                  {formatCurrency(amount)}
                </Typography>
              </Box>
              <Box py={2} px={2} display="flex">
                <Box flex="1">
                  <Typography gutterBottom variant="body1">
                    SendMeMoney tip
                  </Typography>
                </Box>
                <Typography gutterBottom variant="body1">
                  {formatCurrency(tipAmount)}
                </Typography>
              </Box>
              <Divider />
              <Box py={2} px={2} display="flex">
                <Box flex="1">
                  <Typography gutterBottom variant="body1">
                    Total due today
                  </Typography>
                </Box>
                <Typography gutterBottom variant="body1">
                  {formatCurrency(total)}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default WebPageDonate;
