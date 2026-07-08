'use client';

import { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { SessionUser } from '@/lib/auth';
import { UserDetailsContext } from '@/context/UserDetailsContext';

export function useAuth() {
  const { authUser, setAuthUser } = useContext(UserDetailsContext);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Only fetch if we don't already have the user
    if (authUser) {
      setLoading(false);
      return;
    }
    axios.get('/api/auth/me')
      .then(res => setAuthUser(res.data.user))
      .catch(() => setAuthUser(null))
      .finally(() => setLoading(false));
  }, []);

  const logout = useCallback(async () => {
    await axios.post('/api/auth/signout');
    setAuthUser(null);
    router.push('/');
    router.refresh();
  }, [router, setAuthUser]);

  return {
    user: authUser,
    loading,
    logout,
    isSignedIn: !!authUser,
  };
}
