import React from 'react';

const AdminLoginPage = () => {
  return (
    <div>
      <h2>Admin Login</h2>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
