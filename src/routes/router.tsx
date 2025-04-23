import { Suspense, lazy } from 'react';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import paths, { rootPaths } from './paths';

const App = lazy(() => import('App'));
const MainLayout = lazy(() => import('layouts/main-layout'));
const Dashboard = lazy(() => import('pages/dashboard/Dashboard'));
const Page404 = lazy(() => import('pages/errors/Page404'));

import PageLoader from 'components/loading/PageLoader';
import Progress from 'components/loading/Progress';
import VendorList from 'pages/vendor/VendorList';
import VendorRequest from 'pages/vendor/VendorRequest';
import User from 'pages/user/User';
import Booking from 'pages/booking/Booking';
import Contact from 'pages/contact/Contact';
import Boxes from 'pages/boxes/Boxes';
import OfficeTour from 'pages/officetour/OfficeTour';
import ExploreOffice from 'pages/exploreoffice/ExploreOffice';
import OfficeSpaceList from 'pages/vendor/OfficeSpaceList';
import Workbusiness from 'pages/workbusiness/Workbusiness';

export const routes = [
  {
    element: (
      <Suspense fallback={<Progress />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: rootPaths.root,
        element: (
          <MainLayout>
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </MainLayout>
        ),
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: paths.vendorlist,
            element: <VendorList />,
          },
          {
            path: paths.officespacelist,
            element: <OfficeSpaceList />,
          },
          {
            path: paths.vendorrequest,
            element: <VendorRequest />,
          },
          {
            path: paths.user,
            element: <User />,
          },
          {
            path: paths.booking,
            element: <Booking />,
          },
          {
            path: paths.contact,
            element: <Contact />,
          },
          {
            path: paths.boxeslist,
            element: <Boxes />,
          },
          {
            path: paths.officetour,
            element: <OfficeTour />,
          },
          {
            path: paths.exploreoffice,
            element: <ExploreOffice />,
          },
          {
            path: paths.workbusiness,
            element: <Workbusiness />,
          },
        ],
      },
      {
        path: '*',
        element: <Page404 />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, { basename: '/dabang' });

export default router;
