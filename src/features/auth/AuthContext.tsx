import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole, SchoolProfile, Organization } from '../../types';
import { StorageService, DEFAULT_USERS } from '../../services/storageService';

interface AuthContextType {
  user: UserProfile;
  role: UserRole;
  schoolProfile: SchoolProfile;
  organization: Organization;
  isLoading: boolean;
  login: (email: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (newRole: UserRole) => void;
  updateSchoolProfile: (profile: Partial<SchoolProfile>) => void;
  hasPermission: (allowedRoles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => StorageService.getCurrentUser());
  const [schoolProfile, setSchoolProfile] = useState<SchoolProfile>(() => StorageService.getSchoolProfile());
  const [organization, setOrganization] = useState<Organization>(() => StorageService.getOrganization());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    StorageService.initialize();
  }, []);

  const login = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const users = StorageService.getUsers();
      const matchedUser = users.find(u => u.email.toLowerCase() === email.toLowerCase()) || DEFAULT_USERS[4];
      StorageService.setCurrentUser(matchedUser);
      setUser(matchedUser);
      StorageService.logAudit('USER_LOGIN', 'user_profiles', matchedUser.id, { email: matchedUser.email });
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    StorageService.logAudit('USER_LOGOUT', 'user_profiles', user.id);
    const guestUser = DEFAULT_USERS[4]; // Reset to guru demo
    StorageService.setCurrentUser(guestUser);
    setUser(guestUser);
  };

  const switchRole = (newRole: UserRole) => {
    const targetUser = DEFAULT_USERS.find(u => u.role === newRole) || {
      ...user,
      role: newRole,
      fullName: `User ${newRole} (DEMO)`,
    };
    StorageService.setCurrentUser(targetUser);
    setUser(targetUser);
    StorageService.logAudit('SWITCH_ROLE', 'roles', newRole, { newRole });
  };

  const updateSchoolProfile = (profile: Partial<SchoolProfile>) => {
    const updated = StorageService.saveSchoolProfile(profile);
    setSchoolProfile(updated);
  };

  const hasPermission = (allowedRoles: UserRole[]): boolean => {
    if (user.role === 'super_admin') return true;
    return allowedRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user.role,
        schoolProfile,
        organization,
        isLoading,
        login,
        logout,
        switchRole,
        updateSchoolProfile,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
