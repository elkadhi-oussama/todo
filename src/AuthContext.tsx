// AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
    userId: string | null;
    login: (userId: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(null);

    const login = (id: string) => {
        setUserId(id);
    };

    const logout = () => {
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ userId, login, logout }}>
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
