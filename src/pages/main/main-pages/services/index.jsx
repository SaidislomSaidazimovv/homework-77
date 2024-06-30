import React, { useState } from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
}));

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Index = () => {
  const [open, setOpen] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [services, setServices] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddService = () => {
    const newService = {
      name: serviceName,
      description: serviceDescription,
    };
    setServices([...services, newService]);
    setServiceName("");
    setServiceDescription("");
    handleClose();
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" align="center" gutterBottom>
        Xizmatlar
      </Typography>
      <Grid container spacing={3}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StyledCard>
              <StyledCardContent>
                <Typography variant="h5" component="div">
                  {service.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {service.description}
                </Typography>
              </StyledCardContent>
            </StyledCard>
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <StyledCardContent>
              <Typography variant="h5" component="div">
                Xizmat nomi
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Xizmat tavsifi va boshqa ma'lumotlar
              </Typography>
            </StyledCardContent>
            <CardActions>
              <Button size="small" onClick={handleOpen}>
                Xizmat qo'shish
              </Button>
            </CardActions>
          </StyledCard>
        </Grid>
      </Grid>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Yangi xizmat qo'shish
          </Typography>
          <TextField
            fullWidth
            label="Xizmat nomi"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Xizmat tavsifi"
            value={serviceDescription}
            onChange={(e) => setServiceDescription(e.target.value)}
            margin="normal"
          />
          <Button
            onClick={handleAddService}
            variant="contained"
            color="primary"
          >
            Qo'shish
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default Index;
