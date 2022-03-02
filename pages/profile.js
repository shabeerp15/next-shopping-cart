import dynamic from 'next/dynamic'
import {
   Button,
   Card,
   Grid,
   List,
   ListItem,
   ListItemText,
   TextField,
   Typography,
} from '@mui/material'
import React, { useContext, useEffect } from 'react'
import Meta from '../components/Meta'
import NextLink from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { Store } from '../utils/Store'
import { toast } from 'react-toastify'
import useStyles from '../utils/styles'
import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from 'js-cookie'
import { getError } from '../utils/error'

const Profile = () => {
   const { state, dispatch } = useContext(Store)
   const {
      handleSubmit,
      control,
      formState: { errors },
      setValue,
   } = useForm()
   const router = useRouter()
   const classes = useStyles()
   const { userInfo } = state

   useEffect(() => {
      if (!userInfo) {
         return router.push('/login')
      }
      setValue('name', userInfo.name)
      setValue('email', userInfo.email)
   }, [])

   const submitHandler = async ({ name, email, password, confirmPassword }) => {
      if (password !== confirmPassword) {
         toast.error('Passwords do not match')
         return
      }
      try {
         const { data } = await axios.put(
            '/api/users/profile',
            {
               name,
               email,
               password,
            },
            { headers: { authorization: `Bearer ${userInfo.token}` } }
         )
         dispatch({ type: 'USER_LOGIN', payload: data })
         Cookies.set('userInfo', JSON.stringify(data))
         toast.success('Profile updated successfully')
         router.reload()
      } catch (err) {
         toast.error(getError(err))
      }
   }

   return (
      <>
         <Meta
            title={`${userInfo} Profile`}
            description='User Profile Page'
            keywords='User Profile, User Profile Page'
         />
         <Grid container spacing={1}>
            <Grid item md={3} xs={12}>
               <Card className={classes.section}>
                  <List>
                     <NextLink href='/profile' passHref>
                        <ListItem selected button component='a'>
                           <ListItemText primary='User Profile'></ListItemText>
                        </ListItem>
                     </NextLink>
                     <NextLink href='/order-history' passHref>
                        <ListItem button component='a'>
                           <ListItemText primary='Order History'></ListItemText>
                        </ListItem>
                     </NextLink>
                  </List>
               </Card>
            </Grid>
            <Grid item md={9} xs={12}>
               <Card className={classes.section}>
                  <List>
                     <ListItem>
                        <Typography component='h1' variant='h1'>
                           Profile
                        </Typography>
                     </ListItem>
                     <ListItem>
                        <form
                           onSubmit={handleSubmit(submitHandler)}
                           className={classes.form}
                        >
                           <List>
                              <ListItem>
                                 <Controller
                                    name='name'
                                    control={control}
                                    defaultValue=''
                                    rules={{
                                       required: true,
                                       minLength: 2,
                                    }}
                                    render={({ field }) => (
                                       <TextField
                                          variant='outlined'
                                          fullWidth
                                          id='name'
                                          label='Name'
                                          inputProps={{ type: 'name' }}
                                          error={Boolean(errors.name)}
                                          helperText={
                                             errors.name
                                                ? errors.name.type ===
                                                  'minLength'
                                                   ? 'Name length is more than 1'
                                                   : 'Name is required'
                                                : ''
                                          }
                                          {...field}
                                       ></TextField>
                                    )}
                                 ></Controller>
                              </ListItem>
                              <ListItem>
                                 <Controller
                                    name='email'
                                    control={control}
                                    defaultValue=''
                                    rules={{
                                       required: true,
                                       pattern:
                                          /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                    }}
                                    render={({ field }) => (
                                       <TextField
                                          variant='outlined'
                                          fullWidth
                                          id='email'
                                          label='Email'
                                          inputProps={{ type: 'email' }}
                                          error={Boolean(errors.email)}
                                          helperText={
                                             errors.email
                                                ? errors.email.type ===
                                                  'pattern'
                                                   ? 'Email is not valid'
                                                   : 'Email is required'
                                                : ''
                                          }
                                          {...field}
                                       ></TextField>
                                    )}
                                 ></Controller>
                              </ListItem>
                              <ListItem>
                                 <Controller
                                    name='password'
                                    control={control}
                                    defaultValue=''
                                    rules={{
                                       //    required: true,
                                       validate: (value) =>
                                          value === '' ||
                                          value.length > 5 ||
                                          'Password length is more than 5',
                                    }}
                                    render={({ field }) => (
                                       <TextField
                                          variant='outlined'
                                          fullWidth
                                          id='password'
                                          label='Password'
                                          inputProps={{ type: 'password' }}
                                          error={Boolean(errors.password)}
                                          helperText={
                                             errors.password
                                                ? 'Password length is more than 5'
                                                : ''
                                          }
                                          {...field}
                                       ></TextField>
                                    )}
                                 ></Controller>
                              </ListItem>
                              <ListItem>
                                 <Controller
                                    name='confirmPassword'
                                    control={control}
                                    defaultValue=''
                                    rules={{
                                       validate: (value) =>
                                          value === '' ||
                                          value.length > 5 ||
                                          'Confirm Password length is more than 5',
                                    }}
                                    render={({ field }) => (
                                       <TextField
                                          variant='outlined'
                                          fullWidth
                                          id='confirmPassword'
                                          label='Confirm Password'
                                          inputProps={{ type: 'password' }}
                                          error={Boolean(
                                             errors.confirmPassword
                                          )}
                                          helperText={
                                             errors.password
                                                ? 'Confirm Password length is more than 5'
                                                : ''
                                          }
                                          {...field}
                                       ></TextField>
                                    )}
                                 ></Controller>
                              </ListItem>
                              <ListItem>
                                 <Button
                                    variant='contained'
                                    type='submit'
                                    fullWidth
                                    color='primary'
                                 >
                                    Update
                                 </Button>
                              </ListItem>
                           </List>
                        </form>
                     </ListItem>
                  </List>
               </Card>
            </Grid>
         </Grid>
      </>
   )
}

export default dynamic(() => Promise.resolve(Profile), { ssr: false })
