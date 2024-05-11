import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";

import { useCreateApplicationStore } from "../../store/createApplication";
import { specialities } from "../../constants/specialities";

const columns = [
  { field: "name", headerName: "Name", width: 200 },
  { field: "number", headerName: "Number", width: 100 },
  { field: "numberOfCurses", headerName: "Number of Curses", width: 150 },
  { field: "price", headerName: "Price", width: 100 },
  { field: "avaliablePlaces", headerName: "Available Places", width: 150 },
  { field: "totalPlaces", headerName: "Total Places", width: 130 },
  { field: "budgetPlaces", headerName: "Budget Places", width: 130 },
  { field: "contractPlaces", headerName: "Contract Places", width: 150 },
  { field: "educationForm", headerName: "Education Form", width: 150 },
  { field: "faculty", headerName: "Faculty", width: 200 },
];

const SpecialtiesTable = () => {
  const { setSpecialty } = useCreateApplicationStore();

  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  const faculties = [...new Set(specialities.map((item) => item.faculty))];

  useEffect(() => {
    if (rowSelectionModel.length > 0) {
      const selectedSpecialityId = rowSelectionModel[0];
      setSpecialty(selectedSpecialityId);
    }
  }, [rowSelectionModel, setSpecialty]);

  return (
    <Stack spacing={4}>
      <Typography variant="h5">Виберіть спеціальність</Typography>

      <Autocomplete
        value={selectedFaculty}
        id="faculty-select"
        options={faculties}
        onChange={(event, newValue) => {
          setSelectedFaculty(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            key={params.id}
            variant="standard"
            label="Виберіть факультет"
            placeholder="Виберіть факультет"
          />
        )}
      />
      <Box maxWidth="lg">
        <Stack spacing={2}>
          <DataGrid
            rows={
              selectedFaculty
                ? specialities.filter(
                    (item) => item.faculty === selectedFaculty
                  )
                : specialities
            }
            columns={columns}
            hideFooterPagination
            hideFooter
            disableAutosize
            disableColumnResize
            onRowSelectionModelChange={(newRowSelectionModel) => {
              setRowSelectionModel(newRowSelectionModel);
            }}
            rowSelectionModel={rowSelectionModel}
          />
        </Stack>
      </Box>
    </Stack>
  );
};

export default SpecialtiesTable;