import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import { observer } from 'mobx-react'
import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles, WithStyles, Theme, createStyles } from '@material-ui/core/styles'
import LoginStore from './LoginStore'
import { observable, toJS } from 'mobx';
import { Link } from 'react-router-dom'
import FacebookButton from './FacebookButton';
import http from './http';

@observer
class Signup extends React.Component<WithStyles<typeof styles>, {}> {
  store = LoginStore.instance

  private _onChange = (fieldName: string) => event => {
    this.store.setValue(fieldName, event.target.value)
  }

  private _onSubmit = () => {
    http('/user/signup', 'POST', toJS(this.store));
  }

  render() {
    const { email, password, firstname, lastname, username } = this.store
    const { classes } = this.props
    const { root, textField, formPaper, title, subTitle } = classes

    return (
      <div className={root}>
        <Paper className={formPaper} elevation={1}>
          <FacebookButton onClick={() => {}} text="Sign up with Facebook" />
          <form onSubmit={this._onSubmit}>
            <h3 className={title}>Sign up</h3>
            <h4 className={subTitle}>Let's get started and create your account</h4>
            <TextField
              id="filled-firstname"
              label="First name"
              value={firstname}
              onChange={this._onChange('firstname')}
              className={textField}
              type="text"
              name="firstname"
              autoComplete="true"
              margin="normal"
              fullWidth
            />
            <TextField
              id="filled-lastname"
              label="Last name"
              value={lastname}
              onChange={this._onChange('lastname')}
              className={textField}
              type="text"
              name="lastname"
              autoComplete="true"
              margin="normal"
              fullWidth
            />
            <TextField
              id="filled-username"
              label="Username"
              value={username}
              onChange={this._onChange('username')}
              className={textField}
              type="text"
              name="username"
              autoComplete="true"
              margin="normal"
              fullWidth
            />
            <TextField
              id="filled-email-input"
              label="Email"
              value={email}
              onChange={this._onChange('email')}
              placeholder="name@example.com"
              className={textField}
              type="email"
              name="email"
              autoComplete="true"
              margin="normal"
              fullWidth
            />
            <TextField
              id="filled-password-input"
              label="Password"
              value={password}
              onChange={this._onChange('password')}
              placeholder="******"
              type="password"
              name="password"
              autoComplete="true"
              className={textField}
              fullWidth
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
              <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button color="primary">
                Go to login page
              </Button>
              </Link>
              <Button variant="contained" color="primary" onClick={this._onSubmit}>
                Sign up
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    )
  }
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    textField: {
      display: 'block',
      marginBottom: theme.spacing.unit * 2
    },
    formPaper: {
      padding: theme.spacing.unit * 4,
      margin: `${theme.spacing.unit * 6}px auto`,
      maxWidth: 300,
      position: 'relative'
    },
    title: {
      ...theme.typography.title,
      textAlign: 'center'
    },
    subTitle: {
      ...theme.typography.subtitle1,
      textAlign: 'center'
    },
    a: {}
  })

export default withStyles(styles)(Signup)
