import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import Grid from "@mui/material/Grid2"
import TextField from "@mui/material/TextField"
import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "../../lib/schemas"
import styles from "./Login.module.css"

export const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema), //validation in runtime of loginization
    defaultValues: { login: "", password: "", rememberMe: false },
  })

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    console.log(data)
    reset()
  }

  return (
    <Grid container justifyContent={"center"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>
            <p>🔐 Please enter your login credentials to continue</p>
          </FormLabel>
          <FormGroup>
            <TextField
              label="Login"
              margin="normal"
              error={!!errors.login}
              {...register("login")} // REMOVE the inline validation
            />
            {errors.login && <span className={styles.errorMessage}>{errors.login?.message}</span>}
            <TextField
              type="password"
              label="Password"
              margin="normal"
              error={!!errors.password}
              {...register("password")}
            />
            {errors.login && <span className={styles.errorMessage}>{errors.password?.message}</span>}
            <FormControlLabel
              label="Remember me"
              control={
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Checkbox onChange={(e) => onChange(e.target.checked)} checked={value} />
                  )}
                />
              }
            />{" "}
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  )
}

type LoginInputs = {
  login: string
  password: string
  rememberMe: boolean
}
