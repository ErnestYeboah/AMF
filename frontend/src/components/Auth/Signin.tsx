import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useCallback, useEffect, useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productStoreSlice, signIn } from "../../features/ProductStoreSlice";
import { useCookies } from "react-cookie";
import { message } from "antd";
// import emailjs from "@emailjs/browser";

const Signin = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [showPassword, setShowPassword] = useState(false);
  // const { user } = useSelector(productStoreSlice);
  const showPendingState = useCallback(() => {
    messageApi.open({
      type: "loading",
      content: "Authenticatin user , please wait.....",
      duration: 0,
    });
    // Dismiss manually and asynchronously
  }, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;
  const [rememberMe, setRememberMe] = useState(true);

  const { token, status } = useSelector(productStoreSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["token"]);

  const getFormValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const signInUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username && password !== "") {
      showPendingState();
      dispatch(signIn(formData));
    }
  };

  useEffect(() => {
    if (token) {
      setCookie("token", token);
      navigate("/products");
    }
  }, [token]);

  useEffect(() => {
    if (status == "failed") {
      messageApi.destroy();
    }
  }, [status]);

  return (
    <div>
      <h3 className="sign_greet">Welcome to Amaeton Fashion House</h3>
      <p>Type your username and password or create an account to continue</p>
      <form action="" onSubmit={signInUser} className="auth_form" method="post">
        <TextField
          className="username_input"
          id="outlined-username-input"
          label="Username"
          type="text"
          name="username"
          autoComplete="on"
          onChange={getFormValues}
          value={username}
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
        <label htmlFor="remember_me">
          <input
            type="checkbox"
            name="remember_me"
            id="remember_me"
            checked={rememberMe}
            className="mr-1 cursor-pointer "
            onChange={() => setRememberMe((x) => !x)}
          />
          Remember Me
        </label>
        {contextHolder}
        <button>Sign In</button>
      </form>
      <p className="mt-[1rem]">
        Do not have an account ,{" "}
        <Link className="text-[var(--accent-clr)]" to="/signup">
          Sign Up
        </Link>{" "}
        to create one
      </p>
    </div>
  );
};

export default Signin;
