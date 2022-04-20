import * as React from "react";
import "./UpdateSelectMulti.scss";
import {
  Grid,
  Menu,
  MenuItem,
  Box,
  Typography,
  Avatar,
  AvatarGroup,
  Stack,
} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { GET_USER_WITH_PAGINATION } from "../../../schema/users";
import { useQuery } from "@apollo/client";
// Select
import PropTypes from "prop-types";
import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
// ENd Select

// Select
const Root = styled("div")(
  ({ theme }) => `
    color: ${
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.65)"
        : "rgba(0,0,0,.85)"
    };
    font-size: 14px;
  `
);

const Label = styled("label")`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled("div")(
  ({ theme }) => `
    border: 1px solid ${theme.palette.mode === "dark" ? "#434343" : "#d9d9d9"};
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    border-radius: 4px;
    padding: 1px;
    display: flex;
    flex-wrap: wrap;
  
    &:hover {
      border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    }
  
    &.focused {
      border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
  
    & input {
      background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
      color: ${
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,0.65)"
          : "rgba(0,0,0,.85)"
      };
      height: 30px;
      box-sizing: border-box;
      padding: 4px 6px;
      width: 0;
      min-width: 30px;
      flex-grow: 1;
      border: 0;
      margin: 0;
      outline: 0;
    }
  `
);

function Tag(props) {
  const { onClick, label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onClick} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)(
  ({ theme }) => `
    display: flex;
    align-items: center;
    height: 24px;
    margin: 2px;
    line-height: 22px;
    background-color: ${
      theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "#fafafa"
    };
    border: 1px solid ${theme.palette.mode === "dark" ? "#303030" : "#e8e8e8"};
    border-radius: 2px;
    box-sizing: content-box;
    padding: 0 4px 0 10px;
    outline: 0;
    overflow: hidden;
  
    &:focus {
      border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
      background-color: ${
        theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"
      };
    }
  
    & span {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  
    & svg {
      font-size: 12px;
      cursor: pointer;
      padding: 4px;
    }
  `
);

const Listbox = styled("ul")(
  ({ theme }) => `
    margin: 2px 0 0;
    padding: 0;   
    list-style: none;   
    overflow: auto;
    max-height: 250px;
    
    & li {
      padding: 5px 12px;
      display: flex;
  
      & span {
        flex-grow: 1;
      }
  
      & svg {
        color: transparent;
      }
    }
  
    & li[aria-selected='true'] {
      background-color: ${
        theme.palette.mode === "dark" ? "#2b2b2b" : "#fafafa"
      };
      font-weight: 600;
  
      & svg {
        color: #1890ff;
      }
    }
  
    & li[data-focus='true'] {
      background-color: ${
        theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"
      };
      cursor: pointer;
  
      & svg {
        color: currentColor;
      }
    }
  `
);

// End Select
function createData(_id, firstName, lastName, profileSrc, title) {
  return { _id, firstName, lastName, profileSrc, title };
}

export default function UpdateSelectMulti({
  tasks,
  setTasks,
  responsiblePerson,
  i,
  memberInTeam,
  leaderInTeam,
}) {
  const [useData, setUserData] = React.useState([]);
  const [anchorEll, setAnchorEll] = React.useState(null);
  const [filterleader, setFilterLeader] = React.useState([]);
  //
  const open = Boolean(anchorEll);
  const handleClick = (event) => {
    setAnchorEll(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEll(null);
  };

  const [editUserData, setEditUserData] = React.useState([]);

  // GET ALL USERS
  const [keyword, setKeyword] = React.useState("");

  const { error, data, refetch } = useQuery(GET_USER_WITH_PAGINATION, {
    variables: {
      keyword: keyword,
      pagination: false,
    },
  });

  React.useEffect(() => {
    let rows = [];
    if (memberInTeam) {
      // console.log(data?.readUsers?.users, "user");
      memberInTeam?.forEach((element) => {
        let allrow = createData(
          element?._id,
          element?.firstName,
          element?.lastName,
          element?.profileSrc,
          element?.firstName + "" + element?.lastName
        );
        rows.push(allrow);
      });
    }

    if (leaderInTeam) {
      // console.log(data?.readUsers?.users, "user");
      leaderInTeam?.forEach((element) => {
        let allrow = createData(
          element?._id,
          element?.firstName,
          element?.lastName,
          element?.profileSrc,
          element?.firstName + "" + element?.lastName
        );
        rows.push(allrow);
        setFilterLeader(rows);
      });
    }
    setUserData(rows);
  }, [memberInTeam]);

  React.useEffect(() => {
    if (responsiblePerson) {
      let rows = [];
      responsiblePerson.forEach((element) => {
        let allrow = createData(
          element?._id,
          element?.firstName,
          element?.lastName,
          element?.profileSrc,
          element?.firstName + "" + element?.lastName
        );
        rows.push(allrow);
        setEditUserData(rows);
      });
    }
  }, [responsiblePerson]);
  //

  // console.log(useData, "user data");

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    getOptionSelected,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "customized-hook-demo",
    // defaultValue: [top100Films[1]],
    multiple: true,
    options: useData,
    value: editUserData,
    getOptionLabel: (option) => option.title,
    getOptionSelected: (option, value) => value._id === option._id,
  });
  // End select

  const handleSetTasks = (rowsArray) => {
    let rows = rowsArray?.map((e) => e?._id);
    console.log(rowsArray);
    // setTasks
    if (rows.length > 0) {
      const list = [...tasks];
      let newList = [];
      if (i > -1) {
        let editList = { ...list[i], responsiblePerson: rowsArray };
        newList = [...list.slice(0, i), editList, ...list.slice(i + 1)];
      }
      // console.log(newList, "newList");
      setTasks([...newList]);
    }
  };

  const handleDeleteEditUser = (e) => {
    setEditUserData(editUserData?.filter((d) => d?._id !== e));
    handleSetTasks(editUserData?.filter((d) => d?._id !== e));
  };

  const handleAddEditUser = (option) => {
    let optionSelected = editUserData?.filter((e) => e?._id === option?._id);
    if (optionSelected?.length > 0) {
      handleDeleteEditUser(option?._id);
    } else {
      setEditUserData([...editUserData, option]);
      handleSetTasks([...editUserData, option]);
    }
  };

  // console.log(responsiblePerson, "select");

  return (
    <Grid container xs={12} spacing={-20}>
      <Grid item xs={1}>
        <PersonAddAlt1Icon
          className="card-icon"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        />

        <Menu
          id="basic-menu"
          anchorEl={anchorEll}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          sx={{ height: "500px" }}
        >
          <MenuItem>
            <Box sx={{ width: "200px" }}>
              <Typography>Team Assigned</Typography>
              {value.map((option, index) => (
                <StyledTag
                  onClick={() => handleDeleteEditUser(option?._id)}
                  label={option.title}
                  {...getTagProps({ index })}
                />
              ))}
            </Box>
          </MenuItem>
          <MenuItem>
            {/* select */}
            <Box sx={{ width: "100%" }}>
              <Root>
                <div {...getRootProps()}>
                  <InputWrapper
                    ref={setAnchorEl}
                    className={focused ? "focused" : ""}
                  >
                    <input placeholder="Type name" {...getInputProps()} />
                  </InputWrapper>
                </div>
              </Root>
            </Box>
            {/* end select */}
          </MenuItem>
          <MenuItem>
            {groupedOptions.length > 0 ? (
              <Listbox {...getListboxProps()}>
                {groupedOptions.map((option, index) => (
                  <li
                    {...getOptionProps({ option, index })}
                    onClick={() => handleAddEditUser(option)}
                  >
                    <Stack direction="row" spacing={2}>
                      <Avatar
                        className="avatar"
                        alt={`${option.title}`}
                        src={`${option.profileSrc}`}
                      />

                      <Typography>{option.title}</Typography>
                      <CheckIcon fontSize="small" />
                    </Stack>
                  </li>
                ))}
              </Listbox>
            ) : null}
          </MenuItem>
        </Menu>
      </Grid>
      <Grid item xs={10} className="group-avatar">
        <AvatarGroup max={5}>
          {value.map((option, index) => (
            <Avatar
              className="avatar"
              alt={`${option.title}`}
              src={`${option.profileSrc}`}
            />
          ))}
        </AvatarGroup>
      </Grid>
    </Grid>
  );
}