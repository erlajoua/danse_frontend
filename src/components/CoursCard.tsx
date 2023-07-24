import React, { useState, useContext, useEffect } from 'react';
import { Button, Chip, IconButton, Menu, MenuItem, Box } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import { CoursCardProps } from '../shared/interfaces';
import DeleteModal from './DeleteModal'
import DetailsModal from './DetailsModal'
import VisioModal from './VisioModal'
import { STYLES } from '../shared/interfaces'
import { Context } from '../contexts/store'
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import VisioIcon from '../icons/VisioIcon';

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
  zoomLink,
  isEnrolled
}) => {
  const navigate = useNavigate();
  const [inscrit, setInscrit] = useState(isEnrolled);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialogDetails, setOpenDialogDetails] = useState(false);
  const [openDialogVisio, setOpenDialogVisio] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [coursDetails, setCoursDetails] = useState<any>(null);
  const { token, admin } = useContext(Context);

  const toggleInscription = () => {
    setInscrit(prev => !prev);
    try {

      if (!inscrit) {
        api.post('/enroll/add', token, { idcours: id }).then(() => {
          console.log("success");
          console.log("Cours details = ", coursDetails);
        })
      } else {
        api.post('/enroll/delete', token, { idcours: id }).then(() => {
          console.log("success");
        })
      }
    }
    catch {
      setInscrit(prev => !prev)
    }
  };

  const isComplet = Number(restplace) === 0;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    api.get(`/cours/${id}`, token).then((response) => {
      setCoursDetails(response.data);
    }).catch((error) => {
      console.error(error);
    });
  }, [])

  const handleVisio = () => {
    setOpenDialogVisio(true);
    handleClose();
  };

  const handleDetails = () => {
    setOpenDialogDetails(true);
    handleClose();
  };

  const handleEditer = () => {
    navigate("/editCours", { state: { id } });
    handleClose();
  };

  const handleSupprimer = () => {
    setOpenDialogDelete(true);
    handleClose();
  };

  const handleConfirmSupprimer = () => {
    api.post('/cours/delete', token, { idcours: id }).then(() => {
      console.log("success cours deleted");
    })
    setOpenDialogDelete(false);
  };
  console.log("ZoomLink = ", zoomLink);

  return (
    <div
      className="h-[200px] w-[425px] shadow-md rounded-lg flex flex-col bg-white justify-between justify-self-start"
    >
      <div
        className="flex flex-col rounded-t-lg"
      >
        <div className="flex justify-between w-full bg-[#f46ef6] px-2 py-1 items-center rounded-t-lg shadow-lg">
          <div className="flex gap-1 items-center">
            <span className="ml-[2px] font-bold text-white">
              {STYLES[style]}
            </span>
            {coursDetails?.zoomLink && coursDetails?.zoomLink !== '' && (
              <>
                <span className="font-bold text-white italic"> - VISIO </span>
                <VisioIcon />
              </>
            )}
          </div>
          {admin === true && (
            <>
              <IconButton aria-label="plus" size="small" sx={{ color: 'white', height: 10 }} onClick={handleClick}>
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
        </div>
        <div className="mt-4 pl-2 flex flex-col items-start">
          <div>
            {niveau && <Chip label={niveau} sx={{ height: 25, mt: -1, mb: 2, mr: 1, color: 'black', backgroundColor: "#fea4ff" }} />}
            {prix?.toString() !== "0" && <Chip label={`${prix}€`} sx={{ height: 25, mt: -1, mb: 2 }} />}
          </div>
          {coursDetails?.zoomLink && coursDetails?.zoomLink !== '' && inscrit && (
            <Button variant="outlined" color="primary" onClick={handleVisio}>
              REJOINDRE LA VISIO
            </Button>
          )}
        </div>

      </div>
      <div
        className="flex justify-between items-end p-2 text-sm"
      >
        <div className="flex flex-col h-full justify-around">
          <div className="flex items-center">
            <EventIcon fontSize="small" style={{ opacity: 0.6 }} />
            <span className="ml-1">
              {jsemaine} {jour} {mois}
            </span>
          </div>
          <div className="flex items-center">
            <ScheduleIcon fontSize="small" style={{ opacity: 0.6 }} />
            <span className="ml-1">
              {heure}
            </span>
          </div>
          <div className="flex items-center">
            <TimelapseIcon fontSize="small" style={{ opacity: 0.6 }} />
            <span className="ml-1">
              {duree}
            </span>
          </div>
        </div>
        <div
          className="text-right w-1/3 flex flex-col items-center justify-center"
        >
          <span className="mb-[1px]">
            {isComplet ? '' : `${restplace} place${Number(restplace) > 1 ? 's' : ''} restante${Number(restplace) > 1 ? 's' : ''}`}
          </span>
          <Button
            variant="contained"
            size="small"
            sx={{
              textTransform: 'none',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: inscrit ? 'rgba(0, 0, 0, 0.08)' : 'primary.main',
              color: inscrit ? 'black' : 'white',
              width: '100%',
              '&:hover': {
                backgroundColor: inscrit ? '#c7bbc9' : 'primary.dark',
              },
            }}
            onClick={toggleInscription}
            disabled={isComplet && !inscrit}
          >
            {inscrit ? 'Se désinscrire' : isComplet ? 'Complet' : "S'inscrire"}
          </Button>
        </div>
      </div>
      <DeleteModal isOpen={openDialogDelete} setIsOpen={setOpenDialogDelete} action={handleConfirmSupprimer} />
      <DetailsModal isOpen={openDialogDetails} setIsOpen={setOpenDialogDetails} coursDetails={coursDetails} />
      <VisioModal isOpen={openDialogVisio} setIsOpen={setOpenDialogVisio} coursDetails={coursDetails} />
    </div>
  );
};

export default CoursCard;