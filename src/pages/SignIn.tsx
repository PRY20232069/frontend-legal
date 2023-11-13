import { Button, Checkbox, FormControlLabel, TextField, FormHelperText } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsersApiService } from '../services/UsersApiService';
import { SaveUserResource } from '../resources/requests/SaveUserResource';
import { UserResource } from '../resources/responses/UserResource';
import { SaveProfileResource } from '../resources/requests/SaveProfileResource';
import { ProfileResource } from '../resources/responses/ProfileResource';
import { ProfilesApiService } from '../services/ProfilesApiService';

const loginUser = async (email: string, password: string): Promise<any> => {
  try {
    const saveUserResource: SaveUserResource = { email, password };
    const userResource: UserResource = await UsersApiService.loginUser(saveUserResource);

    localStorage.setItem('token', userResource.token);

    return userResource;
  } catch (error) {
    console.error('Error during authentication', error);
  }
};

const registerProfile = async (): Promise<any> => {
  try {
    const saveProfileResource: SaveProfileResource = { name: 'string', last_name: 'string', birth_date: new Date(), district: 'string', region: 'string' };
    const profileResource: ProfileResource = await ProfilesApiService.createProfile(saveProfileResource);
    
    return profileResource
  } catch (error) {
    console.error('Error during profile creation', error);
  }
};

const getProfile = async (): Promise<any> => {
  try {
    const profileResource: ProfileResource = await ProfilesApiService.getProfile();
    return profileResource
  } catch (error) {
    console.error('Error while getting profile', error);
  }
};

export const SignIn = () => {
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
      const userResource = await loginUser(email, password);
      if (!userResource || !userResource.token) {
        return; // something was wrong
      }

      const existingProfile = await getProfile();
      if (existingProfile && existingProfile.id) {
        navigate('/'); // ideal scenario
        return;
      }
      
      const profileResource = await registerProfile();
      if (!profileResource || !profileResource.id) {
        return; // something was wrong in registration
      }
      
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign In</h3>

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
        <FormHelperText error>{emailError}</FormHelperText>
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
        <FormHelperText error>{passwordError}</FormHelperText>
      </div>
      {/* <div className="mb-3">
        <FormControlLabel
          control={<Checkbox />}
          label="Recuérdame"
        />
      </div> */}
      <div className="d-grid">
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </div>
    </form>
  );
};