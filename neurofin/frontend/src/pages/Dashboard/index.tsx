import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import ExpensesChart from '../../components/ExpensesChart/ExpensesChart';

const mockExpenses = [
  { category: 'Alimentación', amount: 300 },
  { category: 'Transporte', amount: 150 },
  { category: 'Entretenimiento', amount: 200 },
  { category: 'Servicios', amount: 250 },
  { category: 'Otros', amount: 100 }
];

const Dashboard = () => {
  const totalExpenses = mockExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Bienvenido a NeuroFin
            </Typography>
            <Typography variant="body1" gutterBottom>
              Tu plataforma de gestión financiera personal.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Resumen de Gastos
            </Typography>
            <Typography variant="h6" gutterBottom>
              Total de Gastos: ${totalExpenses.toFixed(2)}
            </Typography>
            <ExpensesChart expenses={mockExpenses} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 