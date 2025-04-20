import { Box, Typography, Paper, Container } from "@mui/material";
import { useAuthStore } from "../../store/authStore";

export default function Profile() {
  const { user } = useAuthStore();

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Perfil de Usuario
          </Typography>
          {user && (
            <Box>
              <Typography variant="body1">
                <strong>Nombre:</strong> {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {user.email}
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
}
