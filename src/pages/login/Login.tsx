import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import type { AppDispatch, RootState } from "../../store";
import { loginUser, revertMessageDetailsStateAsync } from "../../store/actions/authAuctions";
import { delay } from "../../util/helpers";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { Spinner } from "../../components/Spinner/Spinner";
import { AlertMessage } from "../../components/alert-message/AlertMessage";

export default function Login() {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
      username: "",
      password: ""
    });

    useEffect(() => {
      if(auth.isAuthenticated) {
        delay(true, 3000).then(() =>{
          navigate("/");
        });
      }
      if(isAuthMessage()) {
        dispatch(revertMessageDetailsStateAsync());
      }
    },[auth.isAuthenticated, auth.message.error, auth.message.success]);

  const handleChangeInputFields = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      let error = "";
      switch (name) {
        case "username":
          if (!value.trim()) {
            error = "Username is required";
          }
          if (value.trim() && value.length < 3) {
            error = "Username must be at least 3 characters";
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
      }
      setErrors((prev) => ({
        ...prev,
        [name]: error
      }));
    };
  
    const isErrors = () =>
      !username ||
      !password ||
      Object.values(errors).some((err) => err);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  const isAuthMessage = () => auth.message.error || auth.message.success;

  return (
    <div className="container max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      { isAuthMessage() ? <AlertMessage error={auth.message.error} success={auth.message.success} /> : null }
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Username</label>
          <Input
            type="text"
            value={username}
            name="username"
            onChange={handleChangeInputFields}
            className="border px-3 py-2 rounded w-full"
          />
          <small>{errors.username}</small>
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <Input
            type="password"
            value={password}
            name="password"
            onChange={handleChangeInputFields}
            className="border px-3 py-2 rounded w-full"
          />
          <small>{errors.password}</small>
        </div>
        <Button
          type="submit"
          disabled={isErrors() || auth.isAuthenticated}
          className={`primary-button w-full ${auth.isAuthenticated ? "inline-flex items-center" : ""}`}
        >
          {auth.isAuthenticated ? <> <Spinner /> "Logging in..."</> : "Login"}
        </Button>
      </form>
    </div>
  );
}