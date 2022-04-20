import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { GET_USER_WITH_PAGINATION } from "../../../schema/users";
import { useQuery } from "@apollo/client";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const options = [
  { id: "10", text: "One" },
  { id: "20", text: "Two" },
  { id: "30", text: "Three" },
];

function createData(_id, firstName, lastName, profileSrc, title) {
  return { _id, firstName, lastName, profileSrc, title };
}

export default function UpdateAutoComplete({ editData }) {
  const [value, setValue] = useState([
    { id: "10", text: "One" },
    { id: "20", text: "Two" },
  ]);

  // Get All Data User
  const [useData, setUserData] = React.useState([]);
  const [keyword, setKeyword] = React.useState("");
  const { error, data, refetch } = useQuery(GET_USER_WITH_PAGINATION, {
    variables: {
      keyword: keyword,
      pagination: false,
    },
  });

  React.useEffect(() => {
    if (data) {
      // console.log(data?.readUsers?.users, "user");
      let rows = [];
      data?.readUsers?.users.forEach((element) => {
        let allrow = createData(
          element?._id,
          element?.firstName,
          element?.lastName,
          element?.profileSrc,
          element?.firstName + "" + element?.lastName
        );
        rows.push(allrow);
        setUserData(rows);
      });
    }
  }, [data]);

  // End All

  return (
    <Autocomplete
      id="combo-box-demo"
      multiple
      disableCloseOnSelect
      value={editData}
      options={useData}
      getOptionLabel={(options) => options.title}
      getOptionSelected={(option, value) => value._id === option._id}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Combo box" variant="outlined" fullWidth />
      )}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </React.Fragment>
      )}
      onChange={(_, selectedOptions) => setValue(selectedOptions)}
    />
  );
}
