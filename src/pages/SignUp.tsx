import { Button, TextField, FormHelperText } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsersApiService } from '../services/UsersApiService';
import { UserResource } from '../resources/UserResource';
import { SaveUserResource } from '../resources/SaveUserResource';

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    // Validación del email
    if (!/\S+@\S+\.\S+/.test(newEmail)) {
      setEmailError('El email no es válido');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    // Validación de la contraseña
    if (newPassword.length < 8) {
      setPasswordError('Mínimo 8 caracteres');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    let error = false;
    if (!email) {
      setEmailError('El email es obligatorio');
      error = true;
    }
    if (!password) {
      setPasswordError('La contraseña es obligatoria');
      error = true;
    }

    if (!emailError && !passwordError && !error) {
      try {
        const saveUserResource: SaveUserResource = { email, password };
        const userResource: UserResource = await UsersApiService.registerUser(saveUserResource);
        console.log(userResource);
        localStorage.setItem('token', userResource.token);
        navigate('/');
      } catch (error) {
        console.error('Error during registration', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Registrar</h3>

      <div className="mb-3">
        <TextField
          label="Email address"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={handleEmailChange}
          error={!!emailError}
        />
        <FormHelperText error style={{ maxWidth: '100%' }}>{emailError}</FormHelperText>
      </div>
      <div className="mb-3">
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={handlePasswordChange}
          error={!!passwordError}
        />
        <FormHelperText error style={{ maxWidth: '100%' }}>{passwordError}</FormHelperText>
      </div>
      <div className="d-grid">
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </div>
    </form>
  );
};