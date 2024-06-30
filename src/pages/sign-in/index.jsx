import { Button, TextField } from "@mui/material";
import { auth } from "@service";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Index = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await auth.sign_in(values);
      if (response.status === 200) {
        localStorage.setItem("access_token", response?.data?.access_token);
        toast.success("Loginga muvaffaqiyatli o'tildi!");
        setTimeout(() => {
          navigate("/main");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      setErrors({
        submit: "Emailingiz yoki parolingiz noto'g'ri. Qayta urinib ko'ring.",
      });
      toast.error(
        "Emailingiz yoki parolingiz noto'g'ri. Qayta urinib ko'ring."
      );
    }
    setSubmitting(false);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full sm:w-[600px] p-5">
        <h1 className="text-center my-6 text-[50px]">Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Error email address")
              .required("Invalid email address"),
            password: Yup.string().required("Invalid email address"),
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
              <TextField
                type="password"
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                label="Password"
                id="password"
                name="password"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              {errors.submit && (
                <p className="text-red-500 text-center">{errors.submit}</p>
              )}
              <NavLink to="/sign-up" className="text-blue-500 hover:underline">
                Register Page
              </NavLink>
              <NavLink
                to="/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Forgot Password
              </NavLink>
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                Sign In
              </Button>
            </form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Index;
