import React, { useState } from "react";
import "./formUser.scss";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import {
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  FormControl,
  Avatar,
  Badge,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { withStyles } from "@material-ui/styles";
import { useMutation } from "@apollo/client";
import { CREATE_USER, UPDATE_USER } from "../../../schema/users";
import imageDefault from "../../../image/empty-image.png";
// upload Image
import { storage } from "../../../firebase";
import { getDownloadURL, ref } from "@firebase/storage";
import { uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";
import moment from "moment";

const CssTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: 10,
      },
    },
  },
})(TextField);

const CssFormControl = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: 10,
      },
    },
  },
})(FormControl);

export default function CreateUser({
  checkFunction,
  editData,
  buttonTitle,
  setLoading,
  setRefetch,
  handleClose,
  setErrorMessage,
  setSuccesstMessage,
  setOpenSuccess,
  setOpenError,
}) {
  // Upload Image
  const [imageFile, setImageFile] = React.useState(null);
  const newDate = moment(new Date()).format("MMdYYYY");

  const [createUser, { data, loading, error }] = useMutation(CREATE_USER, {
    onCompleted: ({ createUser }) => {
      // setRefetch();
      // console.log(createUser, "create admin");
      if (createUser?.success === true) {
        setOpenSuccess(true);
        setSuccesstMessage(createUser?.message);
        handleClose();
        setRefetch();
      } else {
        setOpenError(true);
        setErrorMessage(createUser?.message);
      }
    },

    onError: (error) => {
      console.log(error.message, "error message");
    },
  });

  //update function
  const [updateUser, { data: updateData }] = useMutation(UPDATE_USER, {
    onCompleted: ({ updateUser }) => {
      // setRefetch();
      console.log(updateUser?.success, "update users");
      if (updateUser?.success === true) {
        setOpenSuccess(true);
        setSuccesstMessage(updateUser?.message);
        handleClose();
        setLoading(true);
      } else {
        setOpenError(true);
        setErrorMessage(updateUser?.message);
      }
    },

    onError: (error) => {
      console.log(error.message, "error message");
    },
  });

  // upload Image
  const uploadFiles = async (file, newValue, checkState) => {
    //
    if (!file) return;

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    const compressedFile = await imageCompression(file, options);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    let newName = `${uuidv4()}${newDate}${file.name.split(".").pop()}`;

    var newFile = new File([compressedFile], `${newName}.png`, {
      type: "image/png",
    });

    // const storageRef = ref(storage, `files/${newFile}`);
    console.log(newFile, "New File");

    // tO firbase
    const storageRef = ref(storage, `files/${newFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, compressedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        // setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("upload image success");

          if (checkState === "create") {
            createUser({
              variables: {
                input: {
                  ...newValue,
                  profilePicture: newFile.name,
                  profileSrc: url,
                },
              },
            });
          }

          if (checkState === "update") {
            updateUser({
              variables: {
                input: {
                  ...newValue,
                  profilePicture: newFile.name,
                  profileSrc: url,
                  _id: editData?._id,
                },
              },
            });
          }
        });
      }
    );
  };

  //show password function
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const UserSchema = Yup.object().shape({
    mail: Yup.string().email("Invalid email."),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    gender: Yup.string(),
    hashPassword: Yup.string().min(
      6,
      "Password must be more than 6 characters!"
    ),
  });

  const formik = useFormik({
    initialValues: {
      mail: editData?.mail,
      firstName: editData?.firstName,
      lastName: editData?.lastName,
      gender: editData?.gender,
      hashPassword: editData?.hashPassword,
    },
    validationSchema: UserSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      console.log(values);
      if (checkFunction === "create") {
        // Image
        const checkState = "create";

        if (imageFile) {
          uploadFiles(imageFile, values, checkState);
          return;
        }

        createUser({
          variables: {
            input: {
              ...values,
              profilePicture: "",
              profileSrc: "",
            },
          },
        });
      }
      //update function
      if (checkFunction === "update") {
        // Image
        const checkState = "update";

        if (imageFile) {
          uploadFiles(imageFile, values, checkState);
          return;
        }

        updateUser({
          variables: {
            input: {
              ...values,
              _id: editData?._id,
            },
          },
        });
      }
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <Box item container className="modal-user">
      <Grid item xs={12} className="close-icon">
        <Box className="box-icon">
          <CloseIcon onClick={handleClose} className="box-icon" />
        </Box>
      </Grid>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid item container spacing={3} xs={12} className="grid-layout">
            <Grid item container spacing={2} xs={6}>
              <Grid item xs={12} className="grid-avatar">
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <Box className="box-upload-icon">
                      <TextField
                        type="file"
                        id="image"
                        sx={{ display: "none" }}
                        onChange={(e) => setImageFile(e.target.files[0])}
                      />
                      <label for="image">
                        <CameraAltOutlinedIcon className="cam-icon" />
                      </label>
                    </Box>
                  }
                >
                  {editData?.profileSrc !== "" ? (
                    <>
                      {imageFile ? (
                        <>
                          <Avatar
                            className="avatar-create"
                            sx={{
                              ":hover": {
                                opacity: "70%",
                              },
                            }}
                            alt="userPicture"
                            src={`${URL.createObjectURL(imageFile)}`}
                          />
                        </>
                      ) : (
                        <>
                          <Avatar
                            className="avatar-create"
                            sx={{
                              ":hover": {
                                opacity: "70%",
                              },
                            }}
                            alt="userPicture"
                            src={`${editData?.profileSrc}`}
                          />
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {imageFile ? (
                        <>
                          <Avatar
                            className="avatar-create"
                            sx={{
                              ":hover": {
                                opacity: "70%",
                              },
                            }}
                            alt="userPicture"
                            src={`${URL.createObjectURL(imageFile)}`}
                          />
                        </>
                      ) : (
                        <>
                          <Avatar
                            className="avatar-create"
                            sx={{
                              ":hover": {
                                opacity: "70%",
                              },
                            }}
                            alt="userPicture"
                            src={`${imageDefault}`}
                          />
                        </>
                      )}
                    </>
                  )}
                </Badge>
              </Grid>
              <Grid item xs={12} className="grid-username">
                <Typography className="field-title">Email</Typography>
                <CssTextField
                  fullWidth
                  placeholder="Type email"
                  {...getFieldProps("mail")}
                  error={Boolean(touched.mail && errors.mail)}
                  helperText={touched.mail && errors.mail}
                />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid item container spacing={2} xs={12}>
                <Grid item xs={12}>
                  <Typography className="field-title">First Name</Typography>
                  <CssTextField
                    fullWidth
                    placeholder="First Name"
                    {...getFieldProps("firstName")}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography className="field-title">Last Name</Typography>
                  <CssTextField
                    fullWidth
                    placeholder="Last Name"
                    {...getFieldProps("lastName")}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography className="field-title">Gender</Typography>
                  <CssFormControl sx={{ width: "100%" }}>
                    <Select
                      placeholder="Gender"
                      {...getFieldProps("gender")}
                      error={Boolean(touched.gender && errors.gender)}
                    >
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Male">Male</MenuItem>
                    </Select>
                  </CssFormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography className="field-title">Password</Typography>
                  <CssFormControl sx={{ width: "100%" }} variant="outlined">
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      {...getFieldProps("hashPassword")}
                      placeholder="Enter Password"
                      error={Boolean(
                        touched.hashPassword && errors.hashPassword
                      )}
                      helperText={touched.hashPassword && errors.hashPassword}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {/*show request error*/}
                    {!!errors.hashPassword && (
                      <FormHelperText error id="outlined-adornment-password">
                        {errors.hashPassword}
                      </FormHelperText>
                    )}
                  </CssFormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                size="large"
                type="submit"
                variant="contained"
                className="button-create"
              >
                {buttonTitle}
              </Button>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Box>
  );
}
