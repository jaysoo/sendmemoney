// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import { useEffect, useState } from 'react';
import type { SyntheticEvent } from 'react';
import ky from 'ky';
import {
  Grid,
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  TextField,
  InputLabel,
  Link,
  makeStyles,
  TextareaAutosize,
  Typography,
} from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import { useCreateFundraiser, useUpload } from '@sendmemoney/data-access-api';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { ReactComponent as NewIdeaImage } from './new-idea.svg';

interface WebPageNewFundraiserProps {
  user: {
    email?: string;
    name?: string;
  };
}

const useStyles = makeStyles((theme) => ({
  image: {
    width: 500,
    height: 500,
    [theme.breakpoints.down('sm')]: {
      width: '30vw',
      height: '30vw',
      maxWidth: 400,
      maxHeight: 400,
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  input: {
    width: 400,
  },
  dropzone: {
    border: '1px dashed rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    color: 'rgba(0,0,0,0.5)',
    textAlign: 'center',
  },
  coverImage: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
}));

export function WebPageNewFundraiser(props: WebPageNewFundraiserProps) {
  const history = useHistory();
  const classes = useStyles();
  const [formState, setFormState] = useState<Record<string, string | number>>({
    name: props.user.name as string,
    email: props.user.email as string,
    coverUrl: '',
    title: '',
    description: '',
    goal: 100,
  });

  const [goal, setGoal] = useState(formState.goal);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mutation = useCreateFundraiser();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
  });

  const handleChange = (
    evt: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFormState((s) => {
      const input = evt.target as HTMLTextAreaElement | HTMLInputElement;
      return { ...s, [input.id]: input.value };
    });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    mutation.mutate(formState, {
      onSettled: () => {
        setIsSubmitting(false);
      },
      onSuccess: (data) => {
        history.push(`/f/${data._id}`);
      },
    });
  };

  useUpload(acceptedFiles, {
    onSuccess: (url) => {
      setFormState((s) => {
        s.coverUrl = url;
        return s;
      });
    },
  });

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Box mt={3}>
            <Typography variant="h2">Create New Fundraiser</Typography>
          </Box>
          <form onSubmit={handleSubmit} aria-disabled={isSubmitting}>
            <Box my={3}>
              <div {...getRootProps({ className: classes.dropzone })}>
                <input disabled={isSubmitting} {...getInputProps()} />
                {formState.coverUrl ? (
                  <img
                    src={formState.coverUrl as string}
                    className={classes.coverImage}
                  />
                ) : (
                  <Typography variant="caption">
                    + Drag and drop or upload a photo that best represents your
                    fundraiser.
                  </Typography>
                )}
              </div>
            </Box>
            <Box my={3}>
              <FormControl fullWidth>
                <TextField
                  disabled={isSubmitting}
                  label="What is your fundraisertitle?"
                  variant="outlined"
                  id="title"
                  aria-describedby="title-helper-text"
                  onChange={handleChange}
                />
                <FormHelperText id="title-helper-text">
                  Try to include a person's name and the purpose.
                </FormHelperText>
              </FormControl>
            </Box>
            <Box my={3}>
              <FormControl fullWidth>
                <TextareaAutosize
                  disabled={isSubmitting}
                  placeholder={'Tell your story'}
                  minRows={10}
                  maxRows={25}
                  id="description"
                  aria-describedby="description-helper-text"
                  onChange={handleChange}
                />
                <FormHelperText id="description-helper-text">
                  Why are you fundraising?
                </FormHelperText>
              </FormControl>
            </Box>
            <Box my={3}>
              <FormControl fullWidth>
                <CurrencyTextField
                  textAlign={'left'}
                  disabled={isSubmitting}
                  label="Goal"
                  variant="outlined"
                  currencySymbol="$"
                  outputFormat="string"
                  decimalCharacter="."
                  digitGroupSeparator=","
                  value={goal}
                  onChange={(_: unknown, value: number) => {
                    setGoal(value);
                    setFormState((s) => ({ ...s, goal: value }));
                  }}
                />
                <FormHelperText id="goal-helper-text">
                  How much are you looking to raise?
                </FormHelperText>
              </FormControl>
            </Box>
            <Box my={3} display="flex" alignItems="center">
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                Submit
              </Button>
              <Box ml={2}>
                <Typography variant="subtitle2">
                  or{' '}
                  <Link color="textPrimary" component={RouterLink} to="/">
                    Cancel
                  </Link>
                </Typography>
              </Box>
            </Box>
          </form>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box pt={20} pl={5}>
            <NewIdeaImage className={classes.image} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default WebPageNewFundraiser;
