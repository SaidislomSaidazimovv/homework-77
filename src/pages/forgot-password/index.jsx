import { useState, useEffect } from "react";
import { Button, TextField, Modal, Box } from "@mui/material";
import { auth } from "@service";
import { Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [timer, setTimer] = useState(60);

  const handleOpen = () => {
    setOpen(true);
    startTimer();
  };

  const handleClose = () => setOpen(false);

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await auth.forgot_password(values);
      if (response.status === 200) {
        toast.success("Parolni tiklash havolasi yuborildi");
        handleOpen();
      }
    } catch (error) {
      console.log(error);
      setErrors({
        submit: "Email manzilingiz topilmadi. Qayta urinib ko'ring.",
      });
      toast.error("Email manzilingiz topilmadi. Qayta urinib ko'ring.");
    }
    setSubmitting(false);
  };

  const handleCodeSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await auth.verify_code(values);
      if (response.status === 200) {
        toast.success("Kod muvaffaqiyatli yuborildi");
        handleClose();
      }
    } catch (error) {
      console.log(error);
      setErrors({ submit: "Kod noto'g'ri. Qayta urinib ko'ring." });
      toast.error("Kod noto'g'ri. Qayta urinib ko'ring.");
    }
    setSubmitting(false);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full sm:w-[600px] p-5">
        <h1 className="text-center my-6 text-[50px]">Forgot Password</h1>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Error email address")
              .required("Invalid email address"),
          })}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <TextField
                type="email"
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                label="Email"
                id="email"
                name="email"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              {errors.submit && (
                <p className="text-red-500 text-center">{errors.submit}</p>
              )}
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                Send Reset Link
              </Button>
            </form>
          )}
        </Formik>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2 className="text-center mb-4">Enter the Code</h2>
          <Formik
            initialValues={{ code: "" }}
            validationSchema={Yup.object({
              code: Yup.string().required("Kodni kiriting"),
            })}
            onSubmit={handleCodeSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Code"
                  id="code"
                  name="code"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.code}
                  error={touched.code && Boolean(errors.code)}
                  helperText={touched.code && errors.code}
                />
                {errors.submit && (
                  <p className="text-red-500 text-center">{errors.submit}</p>
                )}
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  disabled={isSubmitting || timer > 0}
                >
                  Submit Code
                </Button>
              </form>
            )}
          </Formik>
          <p className="text-center mt-2">
            Please wait for {timer} seconds before resubmitting.
          </p>
        </Box>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default Index;
