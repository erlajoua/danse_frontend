import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Box, Chip, IconButton, Menu, MenuItem, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CoursCardProps } from '../shared/interfaces';
import { api } from '../services/api';
import { Dialog, Transition } from '@headlessui/react';

const CoursCard: React.FC<CoursCardProps> = ({
  id,
  style,
  jsemaine,
  jour,
  mois,
  heure,
  duree,
  niveau,
  prix,
  restplace,
  isEnrolled
}) => {
  const [inscrit, setInscrit] = useState(isEnrolled);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [coursDetails, setCoursDetails] = useState<any>(null); // Utilisez le type de données approprié pour les détails du cours
  const admin = true;

  const toggleInscription = () => {
    setInscrit(prev => !prev);
    if (!inscrit) {
      api.post('/enroll/add', {idcours: id }).then(() => {
        console.log("success");
      })
    } else {
      api.post('/enroll/delete', { idcours: id}).then(() => {
        console.log("success");
      })
    }
  };

  const isComplet = Number(restplace) === 0;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDetails = () => {
    api.get(`/cours/${id}`).then((response) => {
      setCoursDetails(response.data);
      setOpenDialog(true);
      handleClose();
    }).catch((error) => {
      console.error(error);
    });
  };

  const handleEditer = () => {
    handleClose();
  };

  const handleSupprimer = () => {
    setOpenDialogDelete(true);
    handleClose();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setOpenDialogDelete(false);
  };

  const handleConfirmSupprimer = () => {
    api.post('/cours/delete', {idcours: id}).then(() => {
      console.log("success cours deleted");
    })
    setOpenDialogDelete(false);
  };

  return (
    <>
      <Card sx={{ width: 450, height: 198, mt: 3, borderRadius: '12px', boxShadow: 0 }}>
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
            {isComplet ? '' : `${restplace} places restantes`}
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
  <Transition.Root show={openDialog || openDialogDelete} as="div">
  <Dialog
    as="div"
    className="fixed z-10 inset-0 overflow-y-auto"
    open={openDialog}
    onClose={handleDialogClose}
      
  >
    <div className="flex items-center justify-center min-h-screen">
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />

      {coursDetails && (
        <div className="bg-white rounded-lg  z-[10000] overflow-hidden max-w-lg w-full opacity-100">
          <div className="bg-gray-100 px-4 py-2 flex justify-between items-center">
            <Typography variant="h5">{coursDetails.style}</Typography>
          </div>
          <CardContent>
            <Typography variant="body1">{coursDetails.niveau}</Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EventIcon fontSize="small" />
                <span>
                  {coursDetails.jsemaine} {coursDetails.jour} {coursDetails.mois}
                </span>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <ScheduleIcon fontSize="small" />
                <span>
                  à {coursDetails.heure}, durée {coursDetails.duree}
                </span>
              </Box>
            </Typography>
            {coursDetails.enrolledUsers.length ? (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Utilisateurs inscrits :</Typography>
                <ul>
                  {coursDetails.enrolledUsers.length && coursDetails.enrolledUsers.map((user: any, index: number) => (
                    <li key={index}>
                      <Typography>
                        {user.prenom} {user.nom} | {user.tel} | {user.email}
                      </Typography>
                    </li>
                  )) }
                </ul>
              </Box>
            ): <span>Aucun élève inscrit</span>}
          </CardContent>
        </div>
      )}
    </div>
  </Dialog>
    <div className="flex items-center justify-center min-h-screen">
  <Dialog
                open={openDialogDelete}
                onClose={handleDialogClose}
                className="fixed z-10 inset-0 overflow-y-auto"
              >
  <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />

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
    </div>

</Transition.Root>

  </>
  );
  };
  
  export default CoursCard;