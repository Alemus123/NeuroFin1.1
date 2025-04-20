import * as React from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Chip,
  InputAdornment
} from '@mui/material';
import { Avatar } from '../../components/Avatar/Avatar';

interface UserProfile {
  name: string;
  email: string;
  income: number;
  hobbies: string[];
}

const Profile = () => {
  const [profile, setProfile] = React.useState<UserProfile>({
    name: '',
    email: '',
    income: 0,
    hobbies: []
  });
  const [newHobby, setNewHobby] = React.useState('');

  const handleProfileChange = (field: keyof UserProfile) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProfile((prev) => ({
      ...prev,
      [field]: field === 'income' ? Number(event.target.value) : event.target.value
    }));
  };

  const handleAddHobby = () => {
    if (newHobby.trim()) {
      setProfile((prev) => ({
        ...prev,
        hobbies: [...prev.hobbies, newHobby.trim()]
      }));
      setNewHobby('');
    }
  };

  const handleDeleteHobby = (hobbyToDelete: string) => {
    setProfile((prev) => ({
      ...prev,
      hobbies: prev.hobbies.filter((hobby) => hobby !== hobbyToDelete)
    }));
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <Box sx={{ mr: 3 }}>
                <Avatar size={100} />
              </Box>
              <Button variant="contained" color="primary">
                Cambiar Avatar
              </Button>
            </Box>

            <Typography variant="h5" gutterBottom>
              Información Personal
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nombre"
                  value={profile.name}
                  onChange={handleProfileChange('name')}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={profile.email}
                  onChange={handleProfileChange('email')}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Ingresos Mensuales"
                  type="number"
                  value={profile.income}
                  onChange={handleProfileChange('income')}
                  margin="normal"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Hobbies e Intereses
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Añadir hobby"
                    value={newHobby}
                    onChange={(e) => setNewHobby(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    onClick={handleAddHobby}
                    sx={{ minWidth: '120px' }}
                  >
                    Añadir
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {profile.hobbies.map((hobby) => (
                    <Chip
                      key={hobby}
                      label={hobby}
                      onDelete={() => handleDeleteHobby(hobby)}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" color="primary">
                Guardar Cambios
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile; 