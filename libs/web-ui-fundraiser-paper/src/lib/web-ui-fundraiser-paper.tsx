import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, makeStyles, Paper, Typography } from '@material-ui/core';
import { Fundraiser } from '@sendmemoney/shared-models/fundraiser';

export interface WebUiFundraiserPaperProps {
  fundraiser: Fundraiser;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    height: 500,
    display: 'flex',
    flexDirection: 'column',
  },
  coverContainer: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    width: '100%',
    height: 200,
    marginBottom: '10px',
  },
  coverImage: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
}));

export function WebUiFundraiserPaper({
  fundraiser,
}: WebUiFundraiserPaperProps) {
  const classes = useStyles();
  return (
    <Link underline="none" component={RouterLink} to={`/f/${fundraiser._id}`}>
      <Paper className={classes.paper} elevation={5} square>
        <Box className={classes.coverContainer}>
          {fundraiser.coverUrl ? (
            <img
              src={fundraiser.coverUrl}
              alt=""
              className={classes.coverImage}
            />
          ) : null}
        </Box>
        <Box my={2}>
          <Typography variant="h5" data-testid="title">
            {fundraiser.title}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1">
            {fundraiser.description.length > 400
              ? `${fundraiser.description.substr(0, 400)}...`
              : fundraiser.description}
          </Typography>
        </Box>
      </Paper>
    </Link>
  );
}

export default WebUiFundraiserPaper;
