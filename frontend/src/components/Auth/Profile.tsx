import { useDispatch, useSelector } from "react-redux";
import {
  customizeUserProfile,
  productStoreSlice,
} from "../../features/ProductStoreSlice";
import "./auth.css";
import TextField from "@mui/material/TextField";
import { Avatar } from "antd";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
const AvatarMemo = React.memo(Avatar);

const Profile = () => {
  const dispatch = useDispatch();
  const [cookie] = useCookies(["token"]);

  const { user } = useSelector(productStoreSlice);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  // const [profileImage, setProfileImage] = useState("");

  const { username, email } = formData;

  const getUserDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const updateUserProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username && email) {
      dispatch(
        customizeUserProfile(
          { id: user[0]?.id, username, email },
          cookie["token"]
        )
      );

      setFormData({ ...formData, username: "", email: "" });
    }
  };

  return (
    <div className="p-[var(--padding-1)] profile_sec ">
      <h2>Profile Settings</h2>

      <form
        onSubmit={updateUserProfile}
        className="profile_form"
        action=""
        encType="multipart/formdata"
      >
        <div className="avatar_div">
          <AvatarMemo
            className="avatar"
            style={{
              backgroundColor: "var(--accent-clr)",
              verticalAlign: "middle",
              cursor: "pointer",
              fontSize: "2em",
              width: "6rem",
              height: "6rem",
            }}
            size="large"
          >
            {user[0]?.username.charAt(0).toUpperCase()}
          </AvatarMemo>

          {/* <div className="profile_input_group">
            <label htmlFor="avatar">Upload a profile image</label>
            <input
              type="file"
              accept="image/*"
              name="profileImage"
              id="profileImage"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setProfileImage(URL.createObjectURL(file));
                }
              }}
            />
          </div> */}
        </div>

        <div className="textfields  ">
          <TextField
            className="username_input input"
            id="outlined-username-input"
            label={user[0]?.username !== "" ? user[0]?.username : "Username"}
            type="text"
            name="username"
            autoComplete="on"
            onChange={getUserDetails}
            value={username}
            required
          />
          <TextField
            className="email_input input"
            id="outlined-email-input"
            label={user[0]?.email !== "" ? user[0]?.email : "Email"}
            type="email"
            name="email"
            autoComplete="on"
            onChange={getUserDetails}
            value={email}
            required
          />
        </div>
        <button className="mt-4">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
