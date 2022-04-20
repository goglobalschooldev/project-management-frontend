import React, { useState } from "react";
import "./login.scss";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import {
  Grid,
  Box,
  Button,
  Link,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  OutlinedInput,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { withStyles } from "@material-ui/styles";
import Logo from "../../image/logo-svg.svg";
import { LOGIN } from "../../schema/login";
import AlertMessage from "../../components/alertMessage/AlertMessage";

const CssTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: 30,
      },
    },
  },
})(TextField);

const CssFormControl = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: 30,
      },
    },
  },
})(FormControl);

export default function Login() {
  // Alert Message
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccesstMessage] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const [login, { data, loading, error }] = useMutation(LOGIN, {
    onCompleted(data) {
      // localStorage.setItem("loginData", JSON.stringify(data));
      // console.log("error", error);
      if (data?.login?.userData?.token) {
        window.localStorage.setItem("token", data?.login?.userData?.token);
        setOpenSuccess(true);
        setSuccesstMessage(data?.login?.message);
        setTimeout(() => {
          navigate("/");
        }, 800);
      } else {
        // window.localStorage.removeItem("token");
        navigate("/");
        setOpenError(true);
        setErrorMessage(data?.login?.message);
      }
    },
  });

  const paperStyle = {
    padding: 30,
    borderRadius: 30,
    backgroundImage: `linear-gradient(to top, #4838eb, #5334e4, #5c31de, #642dd7, #6a29d1)`,
  };

  const UserAdminSchema = Yup.object().shape({
    mail: Yup.string().required("email is required"),
    password: Yup.string()
      .min(6, "Password must be more than 6 characters!")
      .required("password is required"),
  });

  const formik = useFormik({
    initialValues: {
      mail: "",
      password: "",
    },
    validationSchema: UserAdminSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log(values, "form values");

      login({
        variables: {
          input: {
            mail: values?.mail,
            password: values?.password,
          },
        },
      });
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box className="box-login" fluid={true}>
            <Grid
              container
              spacing={1}
              display="flex"
              sx={{ justifyContent: "center" }}
            >
              <Grid
                item
                xs={9}
                sm={5.5}
                md={4}
                lg={2.8}
                xl={2.3}
                style={paperStyle}
              >
                <Grid container spacing={1}>
                  <Grid item xs={12} md={12}>
                    <Box className="box-img">
                      <img src={`${Logo}`} width={"100"} alt="logo" />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={12} align="center">
                    <Typography variant="subtitle2" sx={{ color: "#fff" }}>
                      LOGIN TO
                    </Typography>
                    <Typography variant="subtitle2" className="system-title">
                      PROJECT MANAGEMENT SYSTEM
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Typography className="field-title">Email</Typography>

                    <FormControl
                      sx={{ width: "100%", mt: 1 }}
                      variant="outlined"
                    >
                      <OutlinedInput
                        size="small"
                        id="outlined-adornment-mail"
                        className="text-field"
                        placeholder="Enter mail"
                        {...getFieldProps("mail")}
                        error={Boolean(touched.mail && errors.mail)}
                        helperText={touched.mail && errors.mail}
                      />
                      {!!errors.mail && (
                        <FormHelperText error id="outlined-adornment-mail">
                          {errors.mail}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Typography className="field-title">Password</Typography>
                    <CssFormControl sx={{ width: "100%" }} variant="outlined">
                      <OutlinedInput
                        size="small"
                        className="text-field"
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        {...getFieldProps("password")}
                        placeholder="Enter Password"
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {/*show request error*/}
                      {!!errors.password && (
                        <FormHelperText error id="outlined-adornment-password">
                          {errors.password}
                        </FormHelperText>
                      )}
                    </CssFormControl>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Typography
                      variant="subtitle2"
                      sx={{ display: "flex", justifyContent: "right" }}
                    >
                      <Link href="#" sx={{ color: "#fff" }}>
                        You forget password?
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        fontWeight: "bold",
                        color: "#4838eb",
                        borderRadius: 7,
                        backgroundColor: "#fff",
                        padding: 1,
                        "&:hover": {
                          backgroundColor: "#d6d5ff",
                        },
                        flexGrow: 2,
                      }}
                      fullWidth
                    >
                      <Typography
                        sx={{
                          color: "#4838eb",
                          flexGrow: 1,
                          fontWeight: "bold",
                          textAlign: "left",
                          fontSize: "12px",
                          ml: 1,
                        }}
                      >
                        Log In
                      </Typography>
                      <ArrowForwardIcon />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>

          <Grid
            container
            spacing={5}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Grid
              xs={8}
              md={12}
              lg={12}
              display="flex"
              flexDirection="column"
              justifyContent="buttom"
            >
              <Typography
                variant="subtitle2"
                align="center"
                color="#4838eb"
                mt={1}
              >
                @COPYRIGHT GO GLOBAL SCHOOL | IT DEPARTMENT
              </Typography>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>

      <AlertMessage
        setOpenSuccess={setOpenSuccess}
        setOpenError={setOpenError}
        openSuccess={openSuccess}
        openError={openError}
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
    </>
  );
}
