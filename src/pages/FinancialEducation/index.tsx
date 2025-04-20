import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Tabs,
  Tab
} from '@mui/material';
import { YouTube as YouTubeIcon } from '@mui/icons-material';

interface Video {
  id: string;
  title: string;
  description: string;
  platform: 'youtube' | 'udemy';
  thumbnail: string;
  url: string;
  duration: string;
  author: string;
}

const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Finanzas Personales Básicas',
    description: 'Aprende los fundamentos de las finanzas personales y cómo manejar tu dinero de manera efectiva.',
    platform: 'youtube',
    thumbnail: 'https://img.youtube.com/vi/example1/maxresdefault.jpg',
    url: 'https://youtube.com/watch?v=example1',
    duration: '15:30',
    author: 'Finance Expert'
  },
  {
    id: '2',
    title: 'Inversiones para Principiantes',
    description: 'Guía completa sobre cómo empezar a invertir en el mercado de valores.',
    platform: 'udemy',
    thumbnail: 'https://img.udemy.com/example2/thumbnail.jpg',
    url: 'https://udemy.com/course/example2',
    duration: '2h 30min',
    author: 'Investment Pro'
  },
  {
    id: '3',
    title: 'Ahorro e Inversión',
    description: 'Estrategias efectivas para ahorrar dinero y hacer crecer tu patrimonio.',
    platform: 'youtube',
    thumbnail: 'https://img.youtube.com/vi/example3/maxresdefault.jpg',
    url: 'https://youtube.com/watch?v=example3',
    duration: '20:45',
    author: 'Money Expert'
  }
];

const FinancialEducation = () => {
  const [currentPlatform, setCurrentPlatform] = React.useState<'all' | 'youtube' | 'udemy'>('all');

  const filteredVideos = currentPlatform === 'all'
    ? mockVideos
    : mockVideos.filter(video => video.platform === currentPlatform);

  const handlePlatformChange = (event: React.SyntheticEvent, newValue: 'all' | 'youtube' | 'udemy') => {
    setCurrentPlatform(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Educación Financiera
            </Typography>
            <Typography variant="body1" paragraph>
              Aprende sobre finanzas personales con estos recursos gratuitos seleccionados.
            </Typography>

            <Tabs
              value={currentPlatform}
              onChange={handlePlatformChange}
              sx={{ mb: 3 }}
            >
              <Tab label="Todos" value="all" />
              <Tab label="YouTube" value="youtube" />
              <Tab label="Udemy" value="udemy" />
            </Tabs>

            <Grid container spacing={3}>
              {filteredVideos.map((video) => (
                <Grid item xs={12} sm={6} md={4} key={video.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={video.thumbnail}
                      alt={video.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {video.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {video.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Por: {video.author}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Duración: {video.duration}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        startIcon={video.platform === 'youtube' ? <YouTubeIcon /> : null}
                        onClick={() => window.open(video.url, '_blank')}
                      >
                        Ver {video.platform === 'youtube' ? 'Video' : 'Curso'}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FinancialEducation; 