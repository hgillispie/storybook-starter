import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  CardActions, 
  CardActionArea,
  CardHeader,
  Typography, 
  Button, 
  Avatar,
  Box,
  Stack
} from '@mui/material';

const meta: Meta<typeof Card> = {
  title: 'Material UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Card component with various layouts and content types.',
      },
    },
  },
  argTypes: {
    elevation: {
      control: { type: 'number', min: 0, max: 24 },
      description: 'Shadow depth, corresponds to dp in the spec.',
    },
    raised: {
      control: { type: 'boolean' },
      description: 'If true, the card will use raised styling.',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Card Title
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is a simple card with some content. Cards are surfaces that display content and actions on a single topic.
        </Typography>
      </CardContent>
    </Card>
  ),
};

export const WithMedia: Story = {
  render: () => (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
        alt="Green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
          across all continents except Antarctica.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card with media image, content, and action buttons.',
      },
    },
  },
};

export const WithHeader: Story = {
  render: () => (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            R
          </Avatar>
        }
        action={
          <Button size="small" color="primary">
            More
          </Button>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="https://mui.com/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card with header containing avatar, title, subtitle, and action button.',
      },
    },
  },
};

export const ActionArea: Story = {
  render: () => (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
          alt="Green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Clickable Card
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This card is clickable. CardActionArea provides hover effects and click handling.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Clickable card with hover effects using CardActionArea.',
      },
    },
  },
};

export const ElevationVariants: Story = {
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap" gap={2}>
      <Card elevation={0} sx={{ width: 200 }}>
        <CardContent>
          <Typography variant="h6">No Elevation</Typography>
          <Typography variant="body2">elevation={0}</Typography>
        </CardContent>
      </Card>
      <Card elevation={1} sx={{ width: 200 }}>
        <CardContent>
          <Typography variant="h6">Low Elevation</Typography>
          <Typography variant="body2">elevation={1}</Typography>
        </CardContent>
      </Card>
      <Card elevation={8} sx={{ width: 200 }}>
        <CardContent>
          <Typography variant="h6">High Elevation</Typography>
          <Typography variant="body2">elevation={8}</Typography>
        </CardContent>
      </Card>
      <Card elevation={24} sx={{ width: 200 }}>
        <CardContent>
          <Typography variant="h6">Maximum Elevation</Typography>
          <Typography variant="body2">elevation={24}</Typography>
        </CardContent>
      </Card>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Cards with different elevation levels to show shadow depth.',
      },
    },
  },
};

export const ComplexLayout: Story = {
  render: () => (
    <Card sx={{ maxWidth: 400 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            A
          </Avatar>
        }
        title="Complex Card Layout"
        subheader="With multiple sections"
      />
      <CardMedia
        component="img"
        height="140"
        image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
        alt="Card media"
      />
      <CardContent>
        <Typography variant="body1" paragraph>
          This card demonstrates a complex layout with header, media, content, and actions.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          It includes an avatar, title, subtitle, image, description text, and action buttons.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">Action 1</Button>
        <Button size="small" color="secondary">Action 2</Button>
        <Button size="small">Action 3</Button>
      </CardActions>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complex card layout combining all card components.',
      },
    },
  },
}; 