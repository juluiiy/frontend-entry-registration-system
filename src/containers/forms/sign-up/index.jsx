import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Link,
  TextField,
  Avatar,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { authService } from "../../../services/auth";
import { registerValidationSchema } from "../../../helpers/validation-schemas";
import { styles } from "./styles";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    username: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = registerValidationSchema.safeParse(form);

    if (result.success) {
      const formCopy = { ...form };
      delete formCopy.confirmPassword;

      authService
        .signUp(formCopy)
        .then(() => {
          toast.success("Ви успішно зареєструвались!");
          navigate("/")
        })
        .catch(() => {
          toast.error("Щось пішло не так!");
        });
    }
  };

  const updateForm = (name, value) => {
    const updatedForm = {
      ...form,
      [name]: value,
    };

    setForm(updatedForm);
    return updatedForm;
  };

  const updateErrors = (name, updatedForm) => {
    const result = registerValidationSchema.safeParse(updatedForm);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: result.success
        ? undefined
        : result.error.formErrors.fieldErrors[name],
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedForm = updateForm(name, value);
    updateErrors(name, updatedForm);
  };

  return (
    <Box sx={styles.box}>
      <Avatar sx={styles.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Реєстрація
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={styles.form}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="ПІБ"
          name="username"
          autoComplete="name"
          autoFocus
          value={form.username}
          onChange={handleChange}
          error={!!errors.username}
          helperText={errors.username && errors.username[0]}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Пошта"
          name="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email && errors.email[0]}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="phoneNumber"
          label="Номер телефону"
          name="phoneNumber"
          autoComplete="tel"
          value={form.phoneNumber}
          onChange={handleChange}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber && errors.phoneNumber[0]}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Пароль"
          type="password"
          id="password"
          autoComplete="new-password"
          value={form.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password && errors.password[0]}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Підтвердити пароль"
          type="password"
          id="confirmPassword"
          autoComplete="new-password"
          value={form.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword && errors.confirmPassword[0]}
        />

        <Button type="submit" fullWidth variant="contained" sx={styles.button}>
          Зареєструватися
        </Button>

        <Link href="/sign-in" variant="body2">
          Вже маєте аккаунт? Увійти
        </Link>
      </Box>
    </Box>
  );
};

export default SignUpForm;
