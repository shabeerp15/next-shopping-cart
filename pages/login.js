import {
   Button,
   List,
   ListItem,
   TextField,
   Typography,
   Link,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import React, { useContext, useEffect, useState } from 'react'
import Meta from '../components/Meta'
import NextLink from 'next/link'
import useStyles from '../utils/styles'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Store } from '../utils/Store'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

const LoginScreen = () => {
   const router = useRouter()
   const { redirect } = router.query
   const { state, dispatch } = useContext(Store)
   const { userInfo } = state

   useEffect(() => {
      if (userInfo) {
         router.push('/')
      }
   }, [])

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const classes = useStyles()

   const submitHandler = async (e) => {
      e.preventDefault()
      try {
         const { data } = await axios.post('/api/users/login', {
            email,
            password,
         })
         dispatch({ type: 'USER_LOGIN', payload: data })
         Cookies.set('userInfo', JSON.stringify(data))
         router.push(redirect || '/')
         toast.success('Login successful')
      } catch (error) {
         toast.error(
            error.response ? error.response.data.message : error.message
         )
      }
   }

   return (
      <>
         <Meta
            title={'Login page | Amazone shopping'}
            description={'Login page'}
            keywords={'login, amazon, shopping'}
         />
         <form className={classes.form} onSubmit={submitHandler}>
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
                     onChange={(e) => setEmail(e.target.value)}
                  ></TextField>

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
                     onChange={(e) => setPassword(e.target.value)}
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
                     href={`/register?redirect=${redirect || '/'}`}
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
