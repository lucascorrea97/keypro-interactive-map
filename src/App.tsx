// Libraries
import React, { useState } from 'react';

// Features
import InteractiveMap from './features/interactive-map/pages/interactive-map';
import Authentication from './features/authentication/pages/authentication';

// Types
import { User } from './features/authentication/services/types/user.types';

// Design System
import { Box } from '../src/design-system';

const App: React.FC = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState<User | undefined>(
    undefined
  );

  const handleOnAuthentication = (user: User) => {
    setAuthenticatedUser(user);
  };

  const handleOnLogout = () => {
    setAuthenticatedUser(undefined);
  };

  return (
    <Box>
      <Box
        height={!authenticatedUser ? '100vh' : '100%'}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Authentication
          authenticatedUser={authenticatedUser}
          onLogoutSuccess={handleOnLogout}
          onAuthenticationSuccess={handleOnAuthentication}
        />
      </Box>
      {authenticatedUser && (
        <InteractiveMap authenticatedUser={authenticatedUser} />
      )}
    </Box>
  );
};

export default App;
