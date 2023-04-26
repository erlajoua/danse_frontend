import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Box, Chip, IconButton, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CoursCardProps } from '../shared/interfaces';

const CoursCard: React.FC<CoursCardProps> = ({
  style,
  jsemaine,
  jour,
  mois,
  heure,
  duree,
  niveau,
  prix,
  restplace,
}) => {
  const [inscrit, setInscrit] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const admin = true;

  const toggleInscription = () => {
    setInscrit(!inscrit);
  };

  const isComplet = Number(restplace) === 0;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDetails = () => {
    console.log('détails');
    handleClose();
  };

  const handleEditer = () => {
    console.log('Editer');
    handleClose();
  };

  const handleSupprimer = () => {
    setOpenDialog(true);
    handleClose();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleConfirmSupprimer = () => {
    console.log('Supprimer');
    setOpenDialog(false);
  };

  return (
    <Card sx={{ width: 450, mt: 3, borderRadius: '12px', boxShadow: 0 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" gutterBottom>
            {style}
          </Typography>
          {admin && (
            <>
              <IconButton aria-label="plus" size="small" onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleDetails}>Détails</MenuItem>
                <MenuItem onClick={handleEditer}>Editer</MenuItem>
<MenuItem onClick={handleSupprimer}>Supprimer</MenuItem>
</Menu>
<Dialog
             open={openDialog}
             onClose={handleDialogClose}
             aria-labelledby="alert-dialog-title"
             aria-describedby="alert-dialog-description"
           >
<DialogTitle id="alert-dialog-title">
{"Confirmation de suppression"}
</DialogTitle>
<DialogContent>
<DialogContentText id="alert-dialog-description">
Êtes-vous sûr de vouloir supprimer ce cours ?
</DialogContentText>
</DialogContent>
<DialogActions>
<Button onClick={handleDialogClose} color="primary">
Annuler
</Button>
<Button onClick={handleConfirmSupprimer} color="primary" autoFocus>
Confirmer
</Button>
</DialogActions>
</Dialog>
</>
)}
</Box>
<Chip label={niveau} sx={{ mt: -1, mb: 2 }} />
<Box
sx={{
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
mt: 2,
}}
>
<Box>
<Box sx={{ display: 'flex', alignItems: 'center' }}>
<EventIcon fontSize="small" />
<Typography variant="subtitle2" sx={{ ml: 1 }}>
{jsemaine} {jour} {mois}
</Typography>
</Box>
<Box sx={{ display: 'flex', alignItems: 'center' }}>
<ScheduleIcon fontSize="small" />
<Typography variant="subtitle2" sx={{ ml: 1 }}>
à {heure}, durée {duree}
</Typography>
</Box>
</Box>
<Box sx={{ textAlign: 'right' }}>
<Typography variant="subtitle2">
  {isComplet ? 'Complet' : `${restplace} places restantes`}
</Typography>
<Button
variant="contained"
size="small"
sx={{
textTransform: 'none',
mt: 1,
backgroundColor: inscrit ? '#d9d9d9' : 'primary.main',
color: inscrit ? 'black' : 'white',
width: '100%',
'&:hover': {
backgroundColor: inscrit ? '#d9d9d9' : 'primary.dark',
},
}}
onClick={toggleInscription}
disabled={isComplet}
>
{inscrit ? 'Se désinscrire' : isComplet ? 'Complet' : "S'inscrire"}
</Button>
</Box>
</Box>
</CardContent>
</Card>
);
};

export default CoursCard;
