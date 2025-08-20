// frontend/src/hooks/useSimpleRouter.jsx
import { useState, useEffect } from 'react';

const useSimpleRouter = () => {
    const getPathFromHash = () => window.location.hash.slice(1) || '/';
    const [path, setPath] = useState(getPathFromHash());
    
    useEffect(() => {
        const onHashChange = () => setPath(getPathFromHash());
        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    const navigate = (to) => { window.location.hash = to; };
    return { path, navigate };
};

export default useSimpleRouter;

