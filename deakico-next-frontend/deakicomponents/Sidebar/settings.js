import { Box, Card, Grid, Button, Divider, Typography} from "@mui/material";
import { useRouter } from "next/router";
import userService from '../../services/user.service'
import providerService from "../../services/provider.service";
import { useState } from "react";
import { ConfirmationPopup } from "../Modal";



const style = {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'primary',
    '&:hover': {
    backgroundColor: 'secondary',
        opacity: [0.9, 0.8, 0.7],
    }
};

export default function Settings() {

    const router = useRouter();

    const [open, setOpen] = useState(false); //To-Do: open modal after any deletion event
    const [modalType, setModalType] = useState(''); //
    const [modalProps, setModalProps] = useState({
        title: 'Deletion',
        message: 'You sure?',
    });

    const handleClickConfModal = (event) => {
        if(event.currentTarget.id == 'confirm') {
            //commit to decision

            switch(modalType) {
                case 'user':
                    userService.deleteUser();
                    location.reload();
                    return;
                case 'provider':
                    providerService.deleteProvider();
                    location.assign('/');
                    return;   
            }
            
        }
        else if(event.currentTarget.id == 'deny'){
            //close modal
            setOpen(false);
        }
    }
    
    const handleDeleteUser = () => {
        setModalProps({
            title: 'Delete Account',
            message: 'Are you sure you want to PERMANENTLY DELETE your Client account and your Provider account?'
        })
        setModalType('user');
        setOpen(true);
    }
    
    const handleDeleteProvider = () => {
        setModalProps({
            title: 'Delete Provider Account',
            message: 'Are you sure you want to PERMANENTLY DELETE your provider account?'
        })
        setModalType('provider');
        setOpen(true);
        
    }
    const handleRegisterProvider = () => {
        router.push('/provider-signup')
    }
    const handleChangePassword = () => {

    }
    const handleChangeUsername = () => {

    }
    const handleChangeFullName = () => {

    }
    const handleChangeCompName = () => {

    }
    const handleChangeCompCat = () => {

    }

    
    function createSettings(name, action, color, handler) {
            return { name, action, color, handler };
    }

    const accountRows = [
    createSettings('Register as a Provider', 'Register', 'success', handleRegisterProvider),
    createSettings('Delete Client and Provider Account', 'Delete', 'error', handleDeleteUser),
    createSettings('Delete Only Provider Account', 'Delete', 'error', handleDeleteProvider),
    ]
    const credentialsSettingsRows = [
    createSettings('Change Password', 'Update', 'success', handleChangePassword),
    createSettings('Change Username', 'Update', 'success', handleChangeUsername),
    createSettings('Change Full Name', 'Update', 'success', handleChangeFullName),
    ]
    const providerSettingsRows = [
    createSettings('Change Company Name', 'Update', 'success', handleChangeCompName),
    createSettings('Change Company Category', 'Update', 'success', handleChangeCompCat),
    ]

    return (
        
        <Box sx={{ flexGrow: 0 }}>
        <ConfirmationPopup
            title={modalProps.title}
            message={modalProps.message}
            handleClose={() => setOpen(false)}
            open={open}
            handleClick={handleClickConfModal}
        />
        <Typography sx={{
            padding: '25px 0px',
            fontSize: '24px'
        }
        }>Account Settings</Typography>
        <Grid container spacing={2} columns={1}
            border='solid 1px grey' 
            borderRadius='5px'
            padding='0px 10px 0px 10px'
            >
        {accountRows.map((row, index) => {
            return (
            <Grid item xs={1} key={index}>
               <Box sx={style}>
                    {row.name}
                    <Button sx={{}} color={row.color}
                    onClick={() => {row.handler()}}>
                    {row.action}
                    </Button>
               </Box>
               <Divider/>
            </Grid>
            );
        })}
        </Grid> 

        <Typography sx={{
            padding: '25px 0px',
            fontSize: '24px'
            }}>Update Credentials
        </Typography>
        <Grid container spacing={2} columns={1}
            border='solid 1px grey' 
            borderRadius='5px'
            padding='0px 10px 0px 10px'
            >
        {credentialsSettingsRows.map((row, index) => {
            return (
            <Grid item xs={1} key={index}>
               <Box sx={style}>
                    {row.name}
                    <Button sx={{}} color={row.color}
                    onClick={() => {row.handler()}}>
                    {row.action}
                    </Button>
               </Box>
               <Divider/>
            </Grid>
            );
        })}
        </Grid> 

        <Typography sx={{
            padding: '25px 0px',
            fontSize: '24px'
            }}>Provider Settings
        </Typography>
        <Grid container spacing={2} columns={1}
            border='solid 1px grey' 
            borderRadius='5px'
            padding='0px 10px 0px 10px'
            >
        {providerSettingsRows.map((row, index) => {
            return (
            <Grid item xs={1} key={index}>
               <Box sx={style}>
                    {row.name}
                    <Button sx={{}} color={row.color}
                    onClick={() => {row.handler()}}>
                    {row.action}
                    </Button>
               </Box>
               <Divider/>
            </Grid>
            );
        })}
        </Grid> 
      </Box>
    )
}