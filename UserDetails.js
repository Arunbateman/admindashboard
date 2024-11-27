// src/components/UserDetailsPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoArrowBackSharp } from 'react-icons/io5'; // Import the back arrow icon
import './UserDetails.css';

const UserDetailsPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [product, setProduct] = useState(null);

  // Fetch user and product details
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:5002/userss/${userId}`);
        const productResponse = await axios.get('http://localhost:5003/products');
        const userData = userResponse.data;
        const productData = productResponse.data.find(
          (product) => product.installationId === userData.installationId
        );
        setUser(userData);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching user or product details:', error);
      }
    };

    fetchDetails();
  }, [userId]);

  // Handle action (Accept or Deny)
  const handleAction = async (newStatus) => {
    if (user) {
      try {
        await axios.put(`http://localhost:5002/userss/${user.id}`, {
          ...user,
          status: newStatus,
        });
        setUser({ ...user, status: newStatus });
      } catch (error) {
        console.error('Error updating user status:', error);
      }
    }
  };

  if (!user || !product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="user-details-page-container">
      <div className="user-details-page">
        <h3>User Details</h3>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Status:</strong> {user.status || 'Pending'}</p>

        <h4>Product Details</h4>
        <p><strong>Brand:</strong> {product.solar_panel_brand}</p>
        <p><strong>KW:</strong> {product.kw}</p>
        <p><strong>Price:</strong> {product.price}</p>
        <p><strong>Average Power Production:</strong> {product.average_power_production} kWh</p>

        <div className="actions">
          <button onClick={() => handleAction('Accepted')}>Accept</button>
          <button onClick={() => handleAction('Denied')}>Deny</button>
        </div>

        <button className="back-btn" onClick={() => navigate('admin')}>
          <IoArrowBackSharp style={{ marginRight: '8px', fontSize: '20px' }} />
        </button>
      </div>
    </div>
  );
};

export default UserDetailsPage;
