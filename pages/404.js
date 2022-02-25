import React from 'react'
import Meta from '../components/Meta'
import Link from 'next/link'

const ErrorPage = () => {
   return (
      <>
         <style jsx>{`
            .error-page {
               display: flex;
               flex-direction: column;
               align-items: center;
               justify-content: center;
               height: 100vh;
            }
            .error-page__title {
               font-size: 3rem;
               font-weight: 700;
               margin-bottom: 1rem;
            }
            .error-page__subtitle {
               font-size: 1.5rem;
               font-weight: 400;
               margin-bottom: 1rem;
            }
            .error-page__link {
               font-size: 1.5rem;
               font-weight: 400;
               text-decoration: none;
               color: #fff;
               background-color: #000;
               padding: 0.2rem 1rem;
               border-radius: 5px;
               transition: all 0.2s ease-in-out;
               margin-bottom: 1rem;
            }
            .error-page__link:hover {
               background-color: #fff;
               color: #000;
            }
         `}</style>
         <Meta title='Error' description='Error' keywords='Error' />
         <div className='error-page'>
            <h1 className='error-page__title'>404</h1>
            <h2 className='error-page__subtitle'>Page not found</h2>
            <Link href='/'>
               <a className='error-page__link'>Go to Homepage</a>
            </Link>
         </div>
      </>
   )
}

export default ErrorPage
