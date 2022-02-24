import {
   Button,
   List,
   ListItem,
   TextField,
   Typography,
   Link,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import React from 'react'
import Meta from '../components/Meta'
import NextLink from 'next/link'
import useStyles from '../utils/styles'

const LoginScreen = () => {
   const classes = useStyles()

   return (
      <>
         <Meta
            title={'Login page | Amazone shopping'}
            description={'Login page'}
            keywords={'login, amazon, shopping'}
         />
         <form className={classes.form}>
            <Typography component='h1' variant='h1'>
               Login
            </Typography>
            <List>
               <ListItem>
                  <TextField
                     variant='outlined'
                     fullWidth
                     id='email'
                     label='Email'
                     inputProps={{ type: 'email' }}
                  >
                     {' '}
                  </TextField>

                  {/* <Controller
                     name='email'
                    //  control={control}
                     defaultValue=''
                     rules={{
                        required: true,
                        pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
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
                                 ? errors.email.type === 'pattern'
                                    ? 'Email is not valid'
                                    : 'Email is required'
                                 : ''
                           }
                           {...field}
                        ></TextField>
                     )}
                  ></Controller> */}
               </ListItem>

               <ListItem>
                  <TextField
                     variant='outlined'
                     fullWidth
                     id='password'
                     label='Password'
                     inputProps={{ type: 'password' }}
                  ></TextField>

                  {/* <Controller
                     name='password'
                    //  control={control}
                     defaultValue=''
                     rules={{
                        required: true,
                        minLength: 6,
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
                                 ? errors.password.type === 'minLength'
                                    ? 'Password length is more than 5'
                                    : 'Password is required'
                                 : ''
                           }
                           {...field}
                        ></TextField>
                     )}
                  ></Controller> */}
               </ListItem>
               <ListItem>
                  <Button
                     variant='contained'
                     type='submit'
                     fullWidth
                     color='primary'
                  >
                     Login
                  </Button>
               </ListItem>
               <ListItem>
                  Don&apos;t have an account? &nbsp;
                  <NextLink
                    //  href={`/register?redirect=${redirect || '/'}`}
                        href={`/register`}
                        passHref
                  >
                     <Link>Register</Link>
                  </NextLink>
               </ListItem>
            </List>
         </form>
      </>
   )
}

export default LoginScreen
