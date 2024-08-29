// components/withAuth.js
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function withAuth(WrappedComponent) {
  return function WithAuth(props) {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.replace('/login');
      }
    }, [loading, user, router]);

    if (loading) {
      return <div>Cargando...</div>; // Puedes reemplazar esto con un componente de carga más elaborado
    }

    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}