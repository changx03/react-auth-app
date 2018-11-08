import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { observer } from 'mobx-react'
import React from 'react'
import { Link } from 'react-router-dom'
import FacebookButton from './FacebookButton'
import http from './http'
import LoginStore from './LoginStore'

@observer
class Login extends React.Component<WithStyles<typeof styles>, {}> {
  store = LoginStore.instance

  private _onChange = (fieldName: string) => event => {
    this.store.setValue(fieldName, event.target.value)
  }

  private _onBtnClick = () => {
    http('api/user/login', 'POST', { email: this.store.email, password: this.store.password })
  }

  render() {
    const { email, password } = this.store
    const { classes } = this.props
    const { root, textField, formPaper, title, subTitle } = classes

    return (
      <div className={root}>
        <Paper className={formPaper} elevation={1}>
          <FacebookButton onClick={() => {}} text="Connect with Facebook" />
          <form>
            <h3 className={title}>Login</h3>
            <h4 className={subTitle}>Continue to Tendolo</h4>
            <TextField
              id="filled-email-input"
              label="Email"
              value={email}
              onChange={this._onChange('email')}
              placeholder="name@example.com"
              className={textField}
              type="email"
              name="email"
              autoComplete="email"
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
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                <Button color="primary">Sign up</Button>
              </Link>
              <Button variant="contained" color="primary" onClick={this._onBtnClick}>
                Login
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

export default withStyles(styles)(Login)
