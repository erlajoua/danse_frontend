import {
  InputLabel,
  Grid,
  Select,
  MenuItem,
  TextField,
  Chip,
} from "@mui/material";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CloseIcon from "@mui/icons-material/Close";

import { DUREES, NIVEAUX, STYLES } from "../shared/interfaces";

const AddCoursCard = ({
  cours,
  index,
  setCours,
}: {
  cours: any;
  index: number;
  setCours: any;
}) => {
  const handleChange = (event: any, value: string) => {
    const newCours = [...cours];
    newCours[index] = { ...newCours[index], [value]: event };
    setCours(newCours);
  };

  function removeElementAtIndex() {
    setCours(cours.slice(0, index).concat(cours.slice(index + 1)));
  }

  return (
    <div className=" flex items-center  shadow-lg justify-center flex-col gap-4 bg-white rounded-lg p-8 w-auto relative">
      {cours.length > 1 && (
        <CloseIcon
          className="absolute top-4 right-4 cursor-pointer"
          onClick={removeElementAtIndex}
        />
      )}
      <div className="flex gap-2">
        <div>
          <InputLabel id="style-label">Style</InputLabel>
          <Select
            labelId="style-label"
            id="style"
            value={cours[index].style}
            onChange={(event) => {
              handleChange(event.target.value, "style");
            }}
            label="Style"
            displayEmpty
          >
            {Object.keys(STYLES).map((elem: any, index: number) => {
              return (
                <MenuItem value={elem} key={index}>
                  {STYLES[elem]}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        {cours[index].style !== "" &&
          NIVEAUX[cours[index].style]?.length > 0 && (
            <div>
              <InputLabel id="niveau-label">Niveau</InputLabel>
              <Select
                labelId="niveau-label"
                id="niveau"
                value={cours[index].niveau}
                onChange={(event) => {
                  handleChange(event.target.value, "niveau");
                }}
                label="Niveau"
              >
                {cours[index].style !== "" &&
                  NIVEAUX[cours[index].style]?.map(
                    (elem: any, index: number) => {
                      return (
                        <MenuItem value={elem} key={index}>
                          {elem}
                        </MenuItem>
                      );
                    }
                  )}
              </Select>
            </div>
          )}
      </div>

      <div className="flex gap-2">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date "
            value={cours[index].date}
            onChange={(event: any) => {
              {
                handleChange(event, "date");
              }
            }}
            format="dd/MM/yyyy"
            sx={{ width: 125 }}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            label="Heure"
            value={cours[index].heure}
            onChange={(event) => {
              {
                handleChange(event, "heure");
              }
            }}
            ampm={false}
            openTo="hours"
            views={["hours", "minutes"]}
            sx={{ width: 120 }}
          />
        </LocalizationProvider>
      </div>
      <div>
        <InputLabel id="duree-label" className="mb-2">
          Durée
        </InputLabel>
        <Grid container spacing={1}>
          {DUREES.map((elem: any, index2: number) => {
            return (
              <Grid
                item
                xs={3}
                key={index2}
                sx={{
                  width: "25px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Chip
                  label={elem}
                  clickable
                  color={
                    cours[index]?.duree === DUREES[index2]
                      ? "primary"
                      : "default"
                  }
                  onClick={() => {
                    handleChange(elem, "duree");
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>

      <div className="flex gap-6">
        <div className="flex items-center gap-2 flex-col">
          <InputLabel className="mb-2">Nombre de places</InputLabel>
          <TextField
            type="number"
            value={cours[index].nbPlaces}
            onChange={(event) => {
              {
                handleChange(parseInt(event.target.value), "nbPlaces");
              }
            }}
            variant="outlined"
            inputProps={{
              min: 1,
              max: 300,
            }}
          />
        </div>

        <div className="flex items-center gap-2 flex-col">
          <InputLabel className="mb-2">Prix (optionnel)</InputLabel>
          <div className="flex items-center">
            <TextField
              type="number"
              value={cours[index].prix}
              onChange={(event) => {
                handleChange(parseInt(event.target.value), "prix");
              }}
              variant="outlined"
              inputProps={{
                min: 0,
                max: 300,
              }}
            />
            <span className="ml-1">€</span>
          </div>
        </div>

      </div>

      <div className="flex items-center flex-col">
        <InputLabel className="mb-2">Lien Zoom Visio (optionnel)</InputLabel>
        <TextField
          label="Lien Zoom"
          placeholder="https://zoom.us/......"
          type="text"
          value={cours[index].zoomLink}
          onChange={(event) => {
            handleChange(event.target.value, "zoomLink");
          }}
          sx={{ minWidth: 280 }}
        />
      </div>
    </div>
  );
};

export default AddCoursCard;
