import { Box, Card, Grid, Button, Divider, Typography} from "@mui/material";
import { useRouter } from "next/router";
import userService from '../../services/user.service'
import providerService from "../../services/provider.service";
import { useState } from "react";
import { ConfirmationPopup, FormPopup } from "../Modal";
import authService from "../../services/auth/auth.service";

const style = {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'primary',
    '&:hover': {
    backgroundColor: 'secondary',
        opacity: [0.9, 0.8, 0.7],
    }
};

export default function Settings({user}) {

    const router = useRouter();

    const [error, setError] = useState({
        flag: false,
        msg: '',
    })

    const [loginError, setLoginError] = useState({
        flag: false,
        msg: ''
    })

    //open states for each modal type
    const [openConf, setOpenConf] = useState(false); //Confirmation modal open state
    const [openForm, setOpenForm] = useState(false); //Form Modal open state

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
            setOpenConf(false);
        }
    }

    //Arbitrary black list of password users should not use
    const passBlacklist = [
        'password',
        'PASSWORD',
        'password123',
        'password321',
        '123password',
        '321password'
        ]
    
        //return true if passwords are the same, false otherwise
    const validatePassword = (pass, confPass) => {
        if((pass === confPass) 
        && (pass != "" || confPass != "")
        && (!passBlacklist.includes(pass))
        ) {
            setError({
                flag: false,
                msg: ''
            })
        return true; //valid password
        }
        else {
        setError({
            flag: true,
            msg: 'Invalid Password!'
        });
        return false; //invalid password
        }
    }
    
  const validateUsername = (username) => {
    var usernameRegex = /^[a-zA-Z0-9\._-]{3,16}$/; //regular expression to match usernames
    if(username.match(usernameRegex)) {
      setError({
        flag: false,
        msg: ""
      })
      return true; //valid username
    }
    setError({
        flag: true, 
        msg: "Invalid Username! Must be 3-16 characters long, and may contain letters, numbers and/or '-', '_', '.'.",

    })
    return false; //invalid username
  }

  const validateFirstName = (name) => {
    var nameRegex = /^[a-zA-Z\-]{3,16}$/; //regular expression to match FirstName/LastName
    if(name.match(nameRegex)) {
      setError({
        flag: false, 
        msg: "",
      })
      return true; //valid FirstName/LastName
    } 
    setError({
        flag: true,
        msg: "Invalid First Name!  Must be 3-16 characters long, and may contain only letters."
    })
    return false; //invalid FirstName/LastName
  }

  const validateLastName = (name) => {
    var nameRegex = /^[a-zA-Z\-]{3,16}$/; //regular expression to match FirstName/LastName
    if(name.match(nameRegex)) {
      setError({
        flag: false,
        msg: "",
      })
      return true; //valid FirstName/LastName
    } 
    setError({
        flag: true,
        msg: "Invalid Last Name! Must be 3-16 characters long, and may contain only letters.",
    })
    return false; //invalid FirstName/LastName
  }

  const validateCompName = (compName) => {
    var compNameRegex = /^[a-zA-Z0-9\&-\s]+$/; //regular expression to match Company Name
    if(compName.match(compNameRegex)) {
      setError({
        flag: false,
        msg: "",
      })
      return true; //valid Company Name
    } 
    setError({
        flag: true,
        msg: "Invalid Company Name! May contain letters, numbers and/or '-', '&'.",
    })
    return false; //invalid Company Name
  }


    const handleClickFormModal = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        switch(modalType) {
            case 'password':
                const oldPass = data.get('old-password');
                const newPass = data.get('new-password');
                const confPass = data.get('confirm-password');
                if(user) {
                    authService.login(user.email, oldPass).then(() => {
                        if(!validatePassword(newPass, confPass)) {
                            setError({
                                flag: true,
                                msg: 'Invalid Password!'
                            })
                            return;
                        }
                        authService.updatePassword(newPass).then(() => {
                           setOpenForm(false); 
                        }).catch((err) => {console.log('Error in password update!')});
                        
                    }).catch((err) => {
                        setError({
                            flag: true,
                            msg: 'Invalid Password!'
                        })
                    })
                } else {
                    setError({
                        flag: true,
                        msg: 'User Not Found!'
                    });
                }
                return;
            case 'username':
                const pass1 = data.get('password');
                const newUsername = data.get('new-username');
             
                if(user) {
                    authService.login(user.email, pass1).then(() => {
                        if(!validateUsername(newUsername)) {
                            setError({
                                flag: true, 
                                msg: "Invalid Username! Must be 3-16 characters long, and may contain letters, numbers and/or '-', '_', '.'.",
                            })
                            return; //invalid username
                        }
                        userService.updateUser({
                            username: newUsername,
                        }).then(() => {
                            setOpenForm(false);
                        }).catch((err) => setError({
                            flag: true,
                            msg: 'Invalid Username!'
                        }));
                    }).catch((err)=> setError({
                        flag: true,
                        msg: 'Invalid Credentials!'
                    }));
                } else {
                    setError({
                        flag: true,
                        msg: 'User Not Found!'
                    });
                }
                return;
            case 'full-name':
                const pass2 = data.get('password');
                const firstName = data.get('new-first-name');
                const lastName = data.get('new-last-name');
                if(user) {
                    authService.login(user.email, pass2).then(() => {
                        if(!validateFirstName(firstName)) {
                            setError({
                                flag: true,
                                msg: "Invalid First Name! Must be 3-16 characters long, and may contain only letters.",
                            })
                            return; //Invalid First Name
                        }

                        if(!validateLastName(lastName)) {
                            setError({
                                flag: true,
                                msg: "Invalid Last Name! Must be 3-16 characters long, and may contain only letters.",
                            })
                            return;//Invalid Last Name
                        }
                        userService.updateUser({
                            u_firstname: firstName,
                            u_lastname: lastName,
                        }).then(() => {
                            setOpenForm(false);
                        }).catch((err) => setError({
                            flag: true,
                            msg: 'Invalid Data!'
                        }));
                    }).catch((err)=> setError({
                        flag: true,
                        msg: 'Invalid Credentials!'
                    }));
                } else {
                    setError({
                        flag: true,
                        msg: 'User not found!'
                    });
                }
                return;
            case 'company-name':
                const pass3 = data.get('password');
                const companyName = data.get('new-company-name');
                if(user) {
                    authService.login(user.email, pass3).then(() => {
                        if(!(validateCompName(companyName))){
                            setError({
                                flag: true,
                                msg: "Invalid Company Name! May contain letters, numbers and/or '-', '&'.",
                            })
                            return; //invalid company name
                        }
                        providerService.updateProvider({
                            pa_companyname: companyName,
                        }).then(() => {
                            setOpenForm(false);
                        }).catch((err) => setError({
                            flag: true,
                            msg: 'Invalid Data!'
                        }));
                    }).catch((err)=> setError({
                        flag: true,
                        msg: 'Invalid Credentials!'
                    }));
                } else {
                    setError({
                        flag: true,
                        msg: 'User Not Found!'
                    });
                }
                return;
        }
    }

    
    
    /**
     * These handle the setting that was selected
     * and displays a modal accordingly.
     **************************************/
    const handleDeleteUser = () => {
        setModalProps({
            title: 'Delete Account',
            message: 'Are you sure you want to PERMANENTLY DELETE your Client account and your Provider account?'
        })
        setModalType('user');
        setOpenConf(true);
    }

    const handleDeleteProvider = () => {
        setModalProps({
            title: 'Delete Provider Account',
            message: 'Are you sure you want to PERMANENTLY DELETE your Provider account?'
        })
        setModalType('provider');
        setOpenConf(true); //open confirm modal
        
    }
    
    const handleRegisterProvider = () => {
        router.push('/provider-signup')
    }

    const handleChangePassword = () => {
        setModalProps({
            title: 'Update Password',
            message: 'Enter the new password.'
        })
        setModalType('password');
        setOpenForm(true); //open form modal
    }

    const handleChangeUsername = () => {
        setModalProps({
            title: 'Update Username',
            message: 'Enter the new username.'
        })
        setModalType('username');
        setOpenForm(true); //open form modal
    }

    const handleChangeFullName = () => {
        setModalProps({
            title: 'Update Your Full Name',
            message: 'Enter the new first and last name.'
        })
        setModalType('full-name');
        setOpenForm(true); //open form modal
    }

    const handleChangeCompName = () => {
        setModalProps({
            title: "Update Your Company's Name",
            message: 'Enter the new company name.'
        })
        setModalType('company-name');
        setOpenForm(true); //open form modal
    }
    
    /*************************************/
    
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
    ]

    return (
        
        <Box sx={{ flexGrow: 0 }}> 
 
        <ConfirmationPopup
            title={modalProps.title}
            message={modalProps.message}
            handleClose={() => setOpenConf(false)}
            open={openConf}
            handleClick={handleClickConfModal}
        />
        <FormPopup
            title={modalProps.title}
            message={modalProps.message}
            handleClose={() => {
                setError({
                    flag: false,
                    msg: ''
                });
                setOpenForm(false);
            } }
            open={openForm}
            handleClick={handleClickFormModal}
            validationError={error.flag}
            errorMessage={error.msg}
            modalType={modalType}
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
                    onClick={() => {row.handler()}}
                    >
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