import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { makeStyles, Typography } from '@material-ui/core';
import { AppBar } from '@sendmemoney/web-ui-layout';
import { WebPageNewFundraiser } from '@sendmemoney/web-page-new-fundraiser';
import { WebPageLanding } from '@sendmemoney/web-page-landing';
import { WebPageViewFundraiser } from '@sendmemoney/web-page-view-fundraiser';
import { WebPageMyFundraisers } from '@sendmemoney/web-page-my-fundraisers';
import { WebPageDonate } from '@sendmemoney/web-page-donate';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 48,
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export function App() {
  const classes = useStyles();
  const { isAuthenticated, isLoading, user, loginWithRedirect, logout } =
    useAuth0();

  return (
    <div className={classes.root}>
      <AppBar
        user={user}
        onLogin={loginWithRedirect}
        onLogout={logout}
        items={[
          { key: 'top-fundraisers', to: '/', text: 'Top fundraisers' },
          AppBar.Divider,
          isAuthenticated && {
            key: 'my-fundraisers',
            to: '/my-fundraisers',
            text: 'My fundraisers',
          },
          isAuthenticated && {
            key: 'new-fundraiser',
            to: '/new-fundraiser',
            text: 'Create new fundraiser',
          },
        ]}
      />
      <Switch>
        <Route path="/" exact>
          <WebPageLanding />
        </Route>
        <Route path="/my-fundraisers">
          {user ? (
            <WebPageMyFundraisers ownedBy={user.email as string} />
          ) : isLoading ? null : (
            <Redirect to={'/'} />
          )}
        </Route>
        <Route path="/new-fundraiser">
          {user ? (
            <WebPageNewFundraiser user={user} />
          ) : isLoading ? null : (
            <Redirect to={'/'} />
          )}
        </Route>
        <Route
          exact
          path="/f/:id"
          render={(props) => {
            return (
              <WebPageViewFundraiser fundraiserId={props.match.params.id} />
            );
          }}
        />
        <Route
          path="/f/:id/donate"
          render={(props) => {
            return <WebPageDonate fundraiserId={props.match.params.id} />;
          }}
        />
        <Route path="*">
          <Typography variant="h1">Not Found</Typography>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
