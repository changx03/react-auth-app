import React from 'react'
import FacebookIcon from './FacebookIcon.svg'
import Button from '@material-ui/core/Button'
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles'

interface FacebookButtonProps extends WithStyles<typeof styles> {
  text: string
  onClick(): void
}

const FacebookButton = (props: FacebookButtonProps) => {
  const { emailContainer, emailText, emailBorder } = props.classes
  const { onClick, text } = props
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
        fullWidth
        style={{ textTransform: 'none' }}
      >
        <div>
          <FacebookIcon style={{ height: 14 }} />{text}
        </div>
      </Button>
      <div className={emailContainer}>
        <hr className={emailBorder} />
        <div className={emailText}>Or with email</div>
      </div>
    </div>
  )
}

const styles = (theme: Theme) =>
  createStyles({
    emailContainer: {
      textAlign: 'center',
      margin: 0
    },
    emailText: {
      ...theme.typography.subtitle2,
      color: theme.palette.text.secondary,
      position: 'relative',
      display: 'inline-block',
      padding: 10,
      backgroundColor: '#fff'
    },
    emailBorder: {
      border: 0,
      borderTop: '1px solid #cecece',
      marginBottom: 0,
      position: 'relative',
      top: 20
    }
  })

export default withStyles(styles)(FacebookButton)
