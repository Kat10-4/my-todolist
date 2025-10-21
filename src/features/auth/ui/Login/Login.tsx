import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "../../lib/schemas"
import styles from "./Login.module.css"
import { useNavigate } from "react-router"
import { CircularProgress, Grid2, Link, Paper, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../../common/hooks"
import { useState } from "react"
import { setAppErrorAC } from "../../../../app/app-slice"
import { login } from "../../model/auth-slice"
import { Path } from "../../../../common/routing"

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

  const dispatch = useAppDispatch()

  const token = useAppSelector((state) => state.auth.token)
  // User is authenticated if token exists
  const isAuthenticated = !!token

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    setIsLoading(true)
    try {
      // Dispatch login action - this should be an async thunk
      await dispatch(
        login({
          username: data.login,
          password: data.password,
          rememberMe: data.rememberMe,
        }),
      ).unwrap()

      reset()
      navigate(Path.Main)
    } catch (error: any) {
      dispatch(setAppErrorAC({ error: error.message || "Login failed" }))
    } finally {
      setIsLoading(false)
    }
  }

return (
  <Grid2 container justifyContent={"center"} spacing={4} p={4}>
    {isAuthenticated ? (
      <Typography variant="h6" component="p" gutterBottom fontWeight="bold">
        You are already logged-in
      </Typography>
    ) : ( // ← Added this opening parenthesis
      <>
        {/* Testing credentials box on the left */}
        <Grid2 size={{ xs: 12, sm: 8, md: 4 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h6" component="p" gutterBottom fontWeight="bold">
              Testing Credentials:
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Login:</strong> host
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Password:</strong> 0000
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Or contact{" "}
              <Link
                href="mailto:diachenko.k.v@gmail.com?subject=Registration Request&body=Hello, I would like to request access to the Todo App."
                sx={{
                  color: "text.primary",
                  cursor: "pointer",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                    color: "primary.light",
                  },
                }}
              >
                diachenko.k.v@gmail.com
              </Link>{" "}
              for registration permissions
            </Typography>
          </Paper>
        </Grid2>

        {/* Login form on the right */}
        <Grid2 size={{ xs: 12, sm: 8, md: 4 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth>
                <FormLabel>
                  <Typography variant="h6" component="p" gutterBottom>
                    🔐 Please enter your login credentials to continue
                  </Typography>
                </FormLabel>
                <FormGroup>
                  <TextField
                    label="Login"
                    margin="normal"
                    fullWidth
                    error={!!errors.login}
                    {...register("login")}
                    inputProps={{
                      autoComplete: "username",
                    }}
                  />
                  {errors.login && <span className={styles.errorMessage}>{errors.login?.message}</span>}

                  <TextField
                    type="password"
                    label="Password"
                    margin="normal"
                    fullWidth
                    error={!!errors.password}
                    {...register("password")}
                    inputProps={{
                      autoComplete: "current-password",
                    }}
                  />
                  {errors.password && <span className={styles.errorMessage}>{errors.password?.message}</span>}

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
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isLoading}
                    sx={{ mt: 2, mb: 2 }}
                  >
                    {isLoading ? <CircularProgress size={24} /> : "Login"}
                  </Button>
                </FormGroup>
              </FormControl>
            </form>
          </Paper>
        </Grid2>
      </>
    )}
  </Grid2>
)
}

type LoginInputs = {
  login: string
  password: string
  rememberMe: boolean
}
