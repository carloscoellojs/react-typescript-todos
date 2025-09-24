import type { AppDispatch, RootState } from "../../store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, revertMessageDetailsStateAsync } from "../../store/actions/authAuctions";
import { Input } from "../../components/Input/Input";
import { Label } from "../../components/label/Label";
import { Button } from "../../components/Button/Button";
import { AlertMessage } from "../../components/alert-message/AlertMessage";

export default function SignUp() {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    email: ""
  });

  useEffect(() => {
    if (auth.message.success) {
      setUsername("");
      setEmail("");
      setPassword("");
    }
    if(isAuthMessage()) {
      dispatch(revertMessageDetailsStateAsync());
    }
  }, [auth.message.success, auth.message.error]);

  const handleChangeInputFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let error = "";
    switch (name) {
      case "username":
        if (!value.trim()) {
          error = "Username is required";
        }
        if (value.trim() && value.length < 5) {
          error = "Username must be at least 5 characters";
        }
        setUsername(value);
        break;
      case "password":
        if (!value.trim()) {
          error = "Password is required";
        }
        if (value.trim() && !/^(?=.*[A-Z])(?=.*\d).{6,}$/.test(value)) {
          error = "Must be at least 6 characters, have one uppercase letter and one number";
        }
        setPassword(value);
        break;
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        }
        if (value.trim() && !/\S+@\S+\.\S+/.test(value)) {
          error = "Email is invalid";
        }
        setEmail(value);
        break;
    }
    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));
  };

  const isErrors = () =>
    !username ||
    !password ||
    !email ||
    Object.values(errors).some((err) => err);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser({ username, password, email }));
  };

  const isAuthMessage = () => auth.message.error || auth.message.success;

  return (
    <div className="container max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
      { isAuthMessage() ? <AlertMessage error={auth.message.error} success={auth.message.success} /> : null }
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="block mb-1 font-medium">Username</Label>
          <Input
            type="text"
            name="username"
            value={username}
            onChange={handleChangeInputFields}
            className="border px-3 py-2 rounded w-full"
          />
          <small>{errors.username}</small>
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={handleChangeInputFields}
            className="border px-3 py-2 rounded w-full"
          />
          <small>{errors.email}</small>
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={handleChangeInputFields}
            className="border px-3 py-2 rounded w-full"
          />
          <small>{errors.password}</small>
        </div>
        <Button
          type="submit"
          disabled={isErrors()}
          className="primary-button w-full"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}
