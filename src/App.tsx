import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Payment as PaymentIcon,
  School as SchoolIcon,
  AccountBalance as AccountBalanceIcon
} from '@mui/icons-material';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import RecurringPayments from './pages/RecurringPayments';
import FinancialEducation from './pages/FinancialEducation';
import SafeBox from './pages/SafeBox';

const drawerWidth = 240;

function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Perfil', icon: <PersonIcon />, path: '/profile' },
    { text: 'Pagos Domiciliados', icon: <PaymentIcon />, path: '/payments' },
    { text: 'Educación Financiera', icon: <SchoolIcon />, path: '/education' },
    { text: 'Caja Fuerte', icon: <AccountBalanceIcon />, path: '/safebox' }
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          NeuroFin
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} component={Link} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              NeuroFin
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Container maxWidth="lg">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/payments" element={<RecurringPayments />} />
              <Route path="/education" element={<FinancialEducation />} />
              <Route path="/safebox" element={<SafeBox />} />
            </Routes>
          </Container>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
