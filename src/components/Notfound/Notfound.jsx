import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // assuming you're using React Router
import Style from './Notfound.module.css';
import { userContext } from '../../Context/UserContext';
import { Helmet } from 'react-helmet';

export default function Notfound() {
  const {userLogin} = useContext(userContext);
  console.log(userLogin);
  return (
    <>
     <Helmet>
                <title>Not Found</title>
            </Helmet>

    <div className={`text-center ${Style.notFoundContainer}`}>
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-4">Oops! Page Not Found</h2>
      <p className="text-lg text-gray-500 mb-8">
        We can't seem to find the page you're looking for.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
      > 
        {userLogin ?  'Go Back to Homepage' : 'Go Back to Login'}
        
      </Link>
    </div>
    </>
  );
}
