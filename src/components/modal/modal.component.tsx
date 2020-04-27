import React, {ReactElement} from 'react';
import {createStyles, makeStyles, Theme, ThemeProvider} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {lightTheme} from "../../constants/themes";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    }),
);

interface IProps {
  children: ReactElement[]|ReactElement;
  isOpen: boolean;
  onClose: () => void;
  optionalClass?: string
}

export default function TransitionsModal(props: IProps) {
  const classes = useStyles();
  const {isOpen} = props;

  return (
      <div>
        <ThemeProvider theme={lightTheme}>
          <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal + ` ${props.optionalClass}`}
              open={isOpen}
              onClose={props.onClose}
              closeAfterTransition
              disableBackdropClick={true}
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
          >
            <Fade in={isOpen}>
              <div className={classes.paper}>
                {props.children}
              </div>
            </Fade>
          </Modal>
        </ThemeProvider>
      </div>
);
}
