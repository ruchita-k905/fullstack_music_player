import React, { useState } from 'react';
import Input from '../common/Input';
import { useDispatch, useSelector } from 'react-redux';
import { closeAuthModal, switchAuthMode } from '../../redux/slices/uiSlices';
import {
  clearError,
  setError,
  setLoading,
  setUser,
} from '../../redux/slices/authSlice';
import { CiUser } from 'react-icons/ci';
import '../../css/auth/Signup.css';
import axios from 'axios';

const Signup = () => {
  const dispatch = useDispatch();

  const { isLoading, error } = useSelector((state) => state.auth);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // avatar states
  const [previewImage, setPreviewImage] = useState('');
  const [base64Image, SetBase64Image] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPreviewImage(reader.result);
      SetBase64Image(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    if (!fullName || !email || !password) {
      dispatch(setError('Please fill all fields'));
      return;
    }
    dispatch(setLoading(true));
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/signup`,
        {
          name: fullName,
          email,
          password,
          avatar: base64Image ? base64Image : undefined,
        },
      );
      const data = res.data || {};
      dispatch(
        setUser({
          user: data.user,
          token: data.token,
        }),
      );
      localStorage.setItem('token', data.token);
      dispatch(closeAuthModal());
      console.log('Signup Successfull');
    } catch (error) {
      const serverMessage =
        error?.response?.data?.message || error?.response?.data?.error;
      dispatch(setError(serverMessage || 'Signup failed. Please try again'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="signup-wrappper">
      <h3 className="signup-title">Create an account</h3>
      <p className="signup-subtitle">Join us today by entering the details</p>

      <form className="signup-form" onSubmit={handleSubmit}>
        <div>
          <div className="profile-image-container">
            {previewImage ? (
              <img src={previewImage} alt="avatar" className="profile-image" />
            ) : (
              <div className="profile-placeholder">
                <CiUser size={40} />
              </div>
            )}

            <label className="image-upload-icon">
              📷
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </label>
          </div>
          <Input
            label={'Name'}
            type={'text'}
            placeholder={'Enter your name'}
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />

          <Input
            label={'Email'}
            type={'email'}
            placeholder={'Enter your email id'}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            label={'Password'}
            type={'password'}
            placeholder={'Enter your Password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <span
          className="forgot-link"
          onClick={() => {
            dispatch(clearError());
            dispatch(switchAuthMode('login'));
          }}
        >
          Do you already have an Account?
        </span>
        {error && <div className="signup-error">{error}</div>}

        <div className="signup-actions">
          <button
            className="signup-btn-submit"
            disabled={isLoading}
            type="submit"
          >
            <span>{isLoading ? 'Signing in' : 'Signup'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
