import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { MDBBtn } from "mdbreact";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div> 
      <MDBBtn outline color="white" onClick={handleClickOpen} >
        Cadastre-se
      </MDBBtn>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Fazer Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Favor informar seus dados de acesso para logar no painel do Cliente
          </DialogContentText>
                  <TextField
            autoFocus
            margin="dense"
            id="name 1"
            label="Nome"
            type="name"
            fullWidth
          />
          <TextField
            margin="dense"
            id="name 2"
            label="Sobre Nome"
            type="name"
            fullWidth
          />
          <TextField
            margin="dense"
            id="name 3"
            label="Genero"
            type="name"
            fullWidth
          />
         <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Seu Email"
            type="email"
            fullWidth
          />
         <TextField
            autoFocus
            margin="dense"
            id="name 4"
            label="Usuário"
            type="name"
            fullWidth
          />
          <TextField
            margin="dense"
            id="name 5"
            label="Senha"
            type="password"
            fullWidth
          />
          <TextField
            margin="dense"
            id="name 6"
            label="Repetir Senha"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Sair
          </Button>
          <Button onClick={handleClose} color="primary">
            Acessar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
