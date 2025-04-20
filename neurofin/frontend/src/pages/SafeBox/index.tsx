import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  LinearProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from '@mui/material';

interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
  monthlyContribution: number;
}

const SafeBox = () => {
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [newGoal, setNewGoal] = useState<Partial<SavingsGoal>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<SavingsGoal | null>(null);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [error, setError] = useState<string>('');

  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.targetDate || !newGoal.monthlyContribution) {
      setError('Por favor completa todos los campos');
      return;
    }

    const goal: SavingsGoal = {
      id: Date.now().toString(),
      name: newGoal.name,
      targetAmount: newGoal.targetAmount,
      currentAmount: 0,
      targetDate: new Date(newGoal.targetDate),
      monthlyContribution: newGoal.monthlyContribution
    };

    setGoals([...goals, goal]);
    setNewGoal({});
    setIsDialogOpen(false);
    setError('');
  };

  const handleWithdraw = () => {
    if (!selectedGoal) return;

    if (withdrawAmount > selectedGoal.currentAmount) {
      setError('No puedes retirar más de lo que tienes ahorrado');
      return;
    }

    const updatedGoals = goals.map(goal => {
      if (goal.id === selectedGoal.id) {
        return {
          ...goal,
          currentAmount: goal.currentAmount - withdrawAmount
        };
      }
      return goal;
    });

    setGoals(updatedGoals);
    setWithdrawDialogOpen(false);
    setWithdrawAmount(0);
    setSelectedGoal(null);
    setError('');
  };

  const calculateProgress = (goal: SavingsGoal) => {
    return (goal.currentAmount / goal.targetAmount) * 100;
  };

  const isDateLocked = (goal: SavingsGoal) => {
    return new Date() < goal.targetDate;
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5">Alcancía Digital</Typography>
              <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
                Nuevo Objetivo
              </Button>
            </Box>

            <Grid container spacing={3}>
              {goals.map((goal) => (
                <Grid item xs={12} md={6} key={goal.id}>
                  <Paper elevation={3} sx={{ p: 2 }}>
                    <Typography variant="h6">{goal.name}</Typography>
                    <Box sx={{ my: 2 }}>
                      <LinearProgress
                        variant="determinate"
                        value={calculateProgress(goal)}
                        sx={{ height: 10, borderRadius: 5 }}
                      />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          ${goal.currentAmount.toFixed(2)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ${goal.targetAmount.toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip
                        label={`Aporte Mensual: $${goal.monthlyContribution.toFixed(2)}`}
                        color="primary"
                        variant="outlined"
                      />
                      <Chip
                        label={`Meta: ${goal.targetDate.toLocaleDateString()}`}
                        color={isDateLocked(goal) ? 'warning' : 'success'}
                      />
                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        disabled={isDateLocked(goal)}
                        onClick={() => {
                          setSelectedGoal(goal);
                          setWithdrawDialogOpen(true);
                        }}
                      >
                        Retirar
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Diálogo para nuevo objetivo */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Nuevo Objetivo de Ahorro</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField
            fullWidth
            label="Nombre del objetivo"
            value={newGoal.name || ''}
            onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Cantidad objetivo"
            type="number"
            value={newGoal.targetAmount || ''}
            onChange={(e) => setNewGoal({ ...newGoal, targetAmount: Number(e.target.value) })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Aporte mensual"
            type="number"
            value={newGoal.monthlyContribution || ''}
            onChange={(e) => setNewGoal({ ...newGoal, monthlyContribution: Number(e.target.value) })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Fecha objetivo"
            type="date"
            value={newGoal.targetDate ? new Date(newGoal.targetDate).toISOString().split('T')[0] : ''}
            onChange={(e) => setNewGoal({ ...newGoal, targetDate: new Date(e.target.value) })}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleAddGoal} variant="contained">Crear</Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para retiros */}
      <Dialog open={withdrawDialogOpen} onClose={() => setWithdrawDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Retirar Fondos</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField
            fullWidth
            label="Cantidad a retirar"
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(Number(e.target.value))}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setWithdrawDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleWithdraw} variant="contained" color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SafeBox; 