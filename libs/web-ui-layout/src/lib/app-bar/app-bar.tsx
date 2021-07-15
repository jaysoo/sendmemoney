import React from 'react';
import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom';
import {
  Link,
  AppBar as MatAppBar,
  Button,
  Container,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useBoolean } from '@sendmemoney/shared-hooks/use-boolean';

const DIVIDER = 'DIVIDER';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    display: 'none',
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  menuList: {
    width: '100vw',
    maxWidth: 300,
  },
  active: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  button: {
    width: '100%',
  },
  icon: {
    color: theme.palette.primary.contrastText,
  },
}));

interface User {
  name?: string;
  nickname?: string;
  preferred_username?: string;
  profile?: string;
  picture?: string;
  website?: string;
  email?: string;
}

interface AppBarProps {
  user: undefined | User;
  onLogin: () => void;
  onLogout: () => void;
  items: (AppBarLink | typeof DIVIDER | false)[];
}

interface AppBarLink {
  key: string;
  to: string;
  text: string;
}

export function AppBar(props: AppBarProps) {
  const classes = useStyles();
  const [menuFlag, setMenuFlag] = useBoolean(false);

  return (
    <MatAppBar color="primary" position="fixed">
      <Container maxWidth="lg">
        <Toolbar disableGutters variant="dense">
          <IconButton onClick={setMenuFlag.toggle}>
            <MenuIcon className={classes.icon} />
          </IconButton>
          <Drawer anchor="left" open={menuFlag} onClose={setMenuFlag.off}>
            <div className={classes.menuList} role="presentation">
              <List>
                {props.user ? (
                  <ListItem>
                    <Typography variant="h6">Hi {props.user.name}!</Typography>
                  </ListItem>
                ) : null}
                {props.items.map((item, idx) =>
                  item === DIVIDER ? (
                    <Divider key={idx} />
                  ) : !item ? null : (
                    <ListItem
                      onClick={setMenuFlag.off}
                      button
                      key={item.key}
                      component={RouterNavLink}
                      to={item.to}
                      exact
                      activeClassName={classes.active}
                    >
                      <ListItemText primary={item.text} />
                    </ListItem>
                  )
                )}
                <Divider />
                <ListItem>
                  <Button
                    className={classes.button}
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={() => {
                      if (props.user) props.onLogout();
                      else props.onLogin();
                    }}
                  >
                    {props.user ? 'Logout' : 'Login'}
                  </Button>
                </ListItem>
              </List>
            </div>
          </Drawer>
          <Link
            underline="none"
            color="textPrimary"
            component={RouterLink}
            to="/"
          >
            <Typography className={classes.title} variant="h6" noWrap>
              SendMeMoney 💸
            </Typography>
          </Link>
        </Toolbar>
      </Container>
    </MatAppBar>
  );
}

AppBar.Divider = DIVIDER as typeof DIVIDER;

export default AppBar;
