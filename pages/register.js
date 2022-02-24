import {
   Button,
   Link,
   List,
   ListItem,
   TextField,
   Typography,
} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import Meta from '../components/Meta'
import NextLink from 'next/link'
import useStyles from '../utils/styles'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Store } from '../utils/Store'
import Cookies from 'js-cookie'

const Register = () => {
   const classes = useStyles()
   const router = useRouter()
   const { redirect } = router.query
   const { state, dispatch } = useContext(Store)
   const { userInfo } = state

   useEffect(() => {
      if (userInfo) {
         router.push('/')
      }
   }, [])

   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')

   const submitHandler = async (e) => {
      e.preventDefault()
      if (password !== confirmPassword) {
         toast.error('Passwords do not match')
         return
      }
      try {
         const { data } = await axios.post('/api/users/register', {
            name,
            email,
            password,
         })
         dispatch({ type: 'USER_LOGIN', payload: data })
         Cookies.set('userInfo', JSON.stringify(data))
         router.push(redirect || '/')
      } catch (error) {
          console.log('error', error.response)
         toast.error(error.response ? error.response.data.message : error.message)
      }
   }

   return (
      <>
         <Meta
            title={'Register page | Amazone shopping'}
            description={'Register page'}
            keywords={'Register, amazon, shopping'}
         />
         <form onSubmit={submitHandler} className={classes.form}>
            <Typography component='h1' variant='h1'>
               Register
            </Typography>
            <List>
               <ListItem>
                  <TextField
                     variant='outlined'
                     fullWidth
                     id='name'
                     label='Name'
                     inputProps={{ type: 'text' }}
                     onChange={(e) => setName(e.target.value)}
                  ></TextField>
               </ListItem>
               <ListItem>
                  <TextField
                     variant='outlined'
                     fullWidth
                     id='email'
                     label='Email'
                     inputProps={{ type: 'email' }}
                     onChange={(e) => setEmail(e.target.value)}
                  ></TextField>
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
               </ListItem>
               <ListItem>
                  <TextField
                     variant='outlined'
                     fullWidth
                     id='confirmPassword'
                     label='Confirm Password'
                     inputProps={{ type: 'password' }}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                  ></TextField>
               </ListItem>
               <ListItem>
                  <Button
                     variant='contained'
                     type='submit'
                     fullWidth
                     color='primary'
                  >
                     Register
                  </Button>
               </ListItem>
               <ListItem>
                  Already have an account? &nbsp;
                  <NextLink
                     href={`/login?redirect=${redirect || '/'}`}
                     passHref
                  >
                     <Link>Login</Link>
                  </NextLink>
               </ListItem>
            </List>
         </form>
      </>
   )
}

export default Register
