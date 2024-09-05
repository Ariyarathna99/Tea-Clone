import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Notiflix from 'notiflix';
import usersService from '../services/Users.service';
import env from '../data/env';
import EventEmitter from '../utils/EventEmitter';
import Footer from '../components/footer/Footer';

const Signup = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('User');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(null);

  const handleUserRoleChange = (e) => {
    setUserRole(e.target.value);
  };

  const handleSignUp = async () => {
    if (firstName === '') {
      Notiflix.Report.failure(
        'Registration Failed',
        'First Name is required for Registration',
        'Okay',
      );
      return;
    }

    if (lastName === '') {
      Notiflix.Report.failure(
        'Registration Failed',
        'Last Name is required for Registration',
        'Okay',
      );
      return;
    }

    if (email === '') {
      Notiflix.Report.failure(
        'Registration Failed',
        'Email is required for Registration',
        'Okay',
      );
      return;
    }

    if (password === '') {
      Notiflix.Report.failure(
        'Registration Failed',
        'Password cannot be empty',
        'Okay',
      );
      return;
    }

    if (!(password === confirmPassword)) {
      Notiflix.Report.failure(
        'Registration Failed',
        'Password doesn\'t match with confirmation password',
        'Okay',
      );
      return;
    }

    // Cloudinary Upload
    const formData = new FormData();
    formData.append('file', avatar);
    formData.append('upload_preset', 'gtnnidje'); 

    try {
      // const response = await fetch('https://api.cloudinary.com/v1_1/dkox7lwxe/image/upload', {
      //   method: 'POST',
      //   body: formData,
      // });

      // const cloudinaryData = await response.json();

      let obj = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        role: userRole,
        avatar: '',
      };

      await usersService.addUser(obj).then(() => {
        Notiflix.Report.success(
          'Success',
          `Registration Successful as a ${userRole}`,
          'Okay',
        );
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('username', email);
        localStorage.setItem('role', userRole);
        localStorage.setItem('avatar', 'https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png');
        EventEmitter.emit("loginCompleted", { logged: true });
        navigate('/sign-in');
        
        // window.location.reload();
      });

    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      Notiflix.Notify.failure('Error uploading image. Please try again.');
    }
  };

  useEffect(() => {
    let listener = EventEmitter.addListener("registerCompleted", () => {
      Notiflix.Report.success(
        'Success',
        'Registration Successful',
        'Okay',
      );
      navigate('/survey');
    });
    let listener2 = EventEmitter.addListener("registerFailed", () => {
      Notiflix.Notify.failure('Provided email is already being used.');
    });

    return () => {
      listener.remove();
      listener2.remove();
    }
  }, [])

  return (
    <>
      <div className='form-body' style={{overflowY:'hidden'}}>
        <video autoPlay loop muted className='video-background'>
          <source src={process.env.PUBLIC_URL + '/videos/sample.mp4'} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
        <div className="max-w-md mx-auto mt-2 p-6 rounded-md shadow-md container form-container">
          <div className='logo-container text-center'>
            <img src={process.env.PUBLIC_URL + '/images/logo-em.png'} height={60} alt='background' />
            <span className='custom-title'>TeaPlant</span>
          </div>
          <h1 className="text-3xl font-semibold mb-1">Sign Up</h1>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Create Your Free Account
          </label>

          <div className="mb-1">
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={firstName}
              placeholder='First Name'
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="mb-1">
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={lastName}
              placeholder='Last Name'
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="mb-1">
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={email}
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-1">
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-1">
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={confirmPassword}
              placeholder='Retype Password'
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* <div className="mb-4">
            <input
              type="file"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
          </div> */}

          <div className='text-center'>
            <button
              className="custom-button primary mr-3"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>

          <p className="mt-4 text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/sign-in" className="custom-link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Signup;
