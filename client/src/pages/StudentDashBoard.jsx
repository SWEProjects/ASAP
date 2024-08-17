import React, { useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchLoginStatus } from '../redux/fetchLoginStatus';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications

const apiUrl = import.meta.env.VITE_APP_API_URL;

const StudentDashBoard = () => {
  const navigate = useNavigate();

  const handleCheck = async () => {
    try {
      const response = await fetch(`${apiUrl}/validateUser`, {
        method: 'GET',
        credentials: 'include',   
      });

      if (!response.ok) {
        navigate('/');
      }
    } catch (error) {
      console.error('Failed to validate user:', error);
      navigate('/');
    }
  };

  useEffect(() => {
    handleCheck();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${apiUrl}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensure cookies are sent with the request
      });

      if (response.ok) {
        toast.success('Logged out successfully!');
        navigate("/");
      } else {
        const errorMessage = await response.text(); // Get the error message from the response
        toast.error(`Logout failed: ${errorMessage}`);
      }
    } catch (error) {
      toast.error('An error occurred during logout. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">Student Dashboard</h1>
            </div>
            <div>
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex-grow flex items-center justify-center">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">Welcome Student</h1>
      </div>
      <ToastContainer /> {/* Add the ToastContainer to your app */}
    </div>
  );
};

export default StudentDashBoard;
