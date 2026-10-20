import { createBrowserRouter } from 'react-router';
import Index from '@/pages/index';
import Home from '@/pages/home';
import NotFound from '@/pages/not-found';

export const PATHS = {
    INDEX: '/',
    HOME: '/home',
    TIMEACTIVE: '/live'
};

const router = createBrowserRouter([
    {
        path: PATHS.INDEX,
        element: <NotFound />
    },
    {
        path: PATHS.HOME,
        element: <Home />
    },
    {
        path: `${PATHS.TIMEACTIVE}/*`,
        element: <Index />
    },
    {
        path: '*',
        element: <NotFound />
    }
]);

export default router;
