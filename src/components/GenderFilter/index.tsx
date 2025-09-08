import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import styles from "./GenderFilter.module.scss";

export interface GenderFilterProps {
  gender: string;
  setGender: (gender: string) => void;
}

export const GenderFilter = ({ gender, setGender }: GenderFilterProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
  };

  return (
    <div className={styles["filters"]}>
      <FormControl fullWidth>
        <InputLabel id="gender-select-label">Gender</InputLabel>
        <Select
          labelId="dgender-select-label"
          id="gender filter select"
          value={gender}
          label="All"
          onChange={handleChange}
        >
          <MenuItem value={"Male"}>Male</MenuItem>
          <MenuItem value={"Female"}>Female</MenuItem>
          <MenuItem value={"Fluid"}>Fluid</MenuItem>
          <MenuItem value={"Other"}>Other</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
