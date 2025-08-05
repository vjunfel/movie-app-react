import { useState } from 'react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    alert(`Registering with: ${email}`);
    // API register goes here
  };

  return (
    <form onSubmit={handleRegister} className="mx-auto d-flex flex-column justify-content-center align-items-center mt-5" style={{ maxWidth: "400px" }}>
      <h2 className='mt-5 pt-5 pb-4'>Register</h2>
      <div className="mb-3 w-100">
        <label>Email:</label>
        <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="mb-3 w-100">
        <label>Password:</label>
        <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button className="btn btn-primary w-100">Register</button>
    </form>
  );
};

export default Register;
