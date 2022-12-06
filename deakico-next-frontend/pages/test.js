import { Box } from "@mui/material";
import { useState } from "react";
import { LogInPopUp } from "../deakicomponents/Modal";
import { ProductCard } from "../deakicomponents/Reusable/Card";


export default function Test() {
  // Modal **
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  function handleLogInOpen(title) {
    setModalTitle(title);
    setOpen(true);
  };
  const handleLogInClose = () => setOpen(false);

  return (
    <Box
      sx={{
        width: '100vh',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ProductCard
        id={e.id}
        title={e.name}
        description={e.desc}
        price={e.price}
        category={e.category}
        rating={e.rating}
        provider={e.pa_id}
        liked={e.liked}
        LogIn={handleLogInOpen}
        src="https://img.freepik.com/free-psd/cosmetic-product-packaging-mockup_1150-40281.jpg?w=2000"
      />
    </Box>
  )
}