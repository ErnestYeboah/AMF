import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productStoreSlice, signUp } from "../../features/ProductStoreSlice";
import { message } from "antd";
import emailjs from "@emailjs/browser";

const Signup = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [showPassword, setShowPassword] = useState(false);

  const showPendingState = () => {
    messageApi.open({
      type: "loading",
      content: "Creating an account , please wait.....",
      duration: 0,
    });
    // Dismiss manually and asynchronously
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });

  const { username, password, email, confirmPassword } = formData;

  const { status } = useSelector(productStoreSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getFormValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const serviceID = "service_23ywtw9";
  const templateID = "template_9l70bgq";
  const public_key = "cthl5Z_PUh6s4qIx2";

  const templateParams = {
    name: username,
    email: email,
  };

  const signupUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username && password && email !== "") {
      if (password !== confirmPassword) {
        messageApi.open({
          type: "error",
          content: "Passwords do not match",
          duration: 2,
        });
        return false;
      } else {
        showPendingState();
        dispatch(signUp(formData));
      }
    }
  };

  useEffect(() => {
    if (status == "failed") {
      messageApi.destroy();
    }
  }, [status]);

  useEffect(() => {
    if (
      status == "succeeded" &&
      username !== "" &&
      password !== "" &&
      email !== ""
    ) {
      messageApi.destroy();
      emailjs.send(serviceID, templateID, templateParams, public_key);
      navigate("/signin");
    }
  }, [status, dispatch]);

  return (
    <div>
      <h3 className="sign_greet">Welcome to Amaeton Fashion House</h3>
      <p>Create an account to continue</p>
      <form action="" onSubmit={signupUser} className="auth_form" method="post">
        <TextField
          className="input username_input"
          id="outlined-username-input input"
          label="Username"
          type="text"
          name="username"
          autoComplete="on"
          onChange={getFormValues}
          value={username}
          required
        />
        <TextField
          className="input email_input"
          id="outlined-username-input"
          label="Email"
          type="email"
          name="email"
          autoComplete="on"
          onChange={getFormValues}
          value={email}
          required
        />
        <FormControl sx={{ width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={getFormValues}
            required
            name="password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl sx={{ width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={getFormValues}
            required
            name="confirmPassword"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
          />
        </FormControl>

        {contextHolder}
        <button>Sign Up</button>
      </form>
      <p className="mt-[1rem]">
        Already have an account ,
        <Link className="text-[var(--accent-clr)]" to="/signin">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Signup;
