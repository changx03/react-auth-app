import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles, WithStyles, Theme, createStyles } from '@material-ui/core/styles'

@observer
class Login extends React.Component<WithStyles<typeof styles>, {}> {
  @observable password = ''
  @observable email = ''

  private _onChange = (fieldName: string) => event => {
    this[fieldName] = event.target.value
  }

  private _onBtnClick = () => {}

  render() {
    const { classes } = this.props
    const { root, textField, formPaper, title } = classes
    return (
      <div className={root}>
        <Paper className={formPaper} elevation={1}>
          <form autoComplete="off">
            <h3 className={title}>Sign in</h3>
            <TextField
              id="filled-email-input"
              label="Email"
              value={this.email}
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
              value={this.password}
              onChange={this._onChange('password')}
              placeholder="******"
              type="password"
              autoComplete="current-password"
              className={textField}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={this._onBtnClick}
            >
              Sign in
            </Button>
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
      ...theme.typography.title
    }
  })

export default withStyles(styles)(Login)
