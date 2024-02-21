import { FormEvent, useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import { alpha, useTheme } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

import { useRouter } from "../routers/hooks";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { fetchLoginMockToken, isSessionExpired } from "../store/modules/auth";

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isSessionExpiredData = useAppSelector(isSessionExpired);

  useEffect(() => {
    // Check if the user is already authenticated
    // TODO: Use middleware to check this
    if (!isSessionExpiredData) {
      router.push("/");
    }
  }, [isSessionExpiredData, router]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(
      fetchLoginMockToken({
        username,
        password,
      })
    );
  };

  const renderForm = (
    <>
      <form onSubmit={(event) => onSubmit(event)} autoComplete="off">
        <Stack spacing={3}>
          <TextField
            required
            name="username"
            label="Username"
            value={username}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setUsername(event.target.value);
            }}
          />

          <TextField
            required
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(event.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityRoundedIcon />
                    ) : (
                      <VisibilityOffRoundedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ my: 3 }}
        >
          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
        >
          Login
        </LoadingButton>
      </form>
    </>
  );

  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to NetFlip</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5 }}>
              Get started
            </Link>
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
