import { SvgIconProps } from '@mui/material';
import paths, { rootPaths } from './paths';
import DashboardIcon from 'components/icons/DashboardIcon';

export interface MenuItem {
  id: number;
  name: string;
  pathName: string;
  path?: string;
  active?: boolean;
  icon?: string;
  svgIcon?: (props: SvgIconProps) => JSX.Element;
  items?: MenuItem[];
}

const sitemap: MenuItem[] = [
  {
    id: 1,
    name: 'Dashboard',
    path: rootPaths.root,
    pathName: 'dashboard',
    svgIcon: DashboardIcon,
    active: true,
  },
  {
    id: 9,
    name: 'Vendor',
    pathName: 'vendor',
    icon: 'material-symbols:security-rounded',
    active: true,
    items: [
      {
        id: 10,
        name: 'Vendor-List',
        path: paths.vendorlist,
        pathName: 'vendor-list',
        active: true,
      },
      {
        id: 11,
        name: 'Office-Space-Request',
        path: paths.vendorrequest,
        pathName: 'office-space-request',
        active: true,
      },
      {
        id: 12,
        name: 'Office-Space-List',
        path: paths.officespacelist,
        pathName: 'office-space-list',
        active: true,
      },
    ],
  },
  {
    id: 12,
    name: 'Home',
    pathName: 'home',
    icon: 'material-symbols:inventory-2-rounded',
    active: true,
    items: [
      {
        id: 13,
        name: 'Boxes-List',
        path: paths.boxeslist,
        pathName: 'boxes-list',
        active: true,
      },
      {
        id: 14,
        name: 'Office-Tour',
        path: paths.officetour,
        pathName: 'office-tour',
        active: true,
      },
      {
        id: 12,
        name: 'explore-office',
        path: paths.exploreoffice,
        pathName: 'explore-office',
        active: true,
      },
      {
        id: 13,
        name: 'workbusiness',
        path: paths.workbusiness,
        pathName: 'workbusiness',
        active: true,
      },
    ],
  },
  // {
  //   id: 15,
  //   name: 'Container',
  //   pathName: 'container',
  //   icon: 'material-symbols:category-rounded',
  //   active: true,
  //   items: [
  //     {
  //       id: 16,
  //       name: 'Container-List',
  //       path: paths.containerlist,
  //       pathName: 'container-list',
  //       active: true,
  //     },
  //     {
  //       id: 17,
  //       name: 'Container-Request',
  //       path: ,
  //       pathName: 'container-request',
  //       active: true,
  //     },
  //   ],
  // },
  {
    id: 2,
    name: 'User',
    path: paths.user,
    pathName: 'user',
    icon: 'ri:bar-chart-line',
  },
  {
    id: 3,
    name: 'Booking',
    path: paths.booking,
    pathName: 'booking',
    icon: 'ph:shopping-cart-light',
  },
  {
    id: 4,
    name: 'Contact',
    path: paths.contact,
    pathName: 'contact',
    icon: 'mdi:shopping-outline',
  },
  {
    id: 5,
    name: 'Sales Report',
    path: '#!',
    pathName: 'sales-report',
    icon: 'ph:chart-line',
  },
  {
    id: 6,
    name: 'Messages',
    path: '#!',
    pathName: 'messages',
    icon: 'mdi:message-processing-outline',
  },
  {
    id: 7,
    name: 'Settings',
    path: '#!',
    pathName: 'settings',
    icon: 'fluent:settings-24-regular',
    active: true,
  },
  {
    id: 8,
    name: 'Sign Out',
    path: '#!',
    pathName: 'sign-out',
    icon: 'humbleicons:logout',
    active: true,
  },
];

export default sitemap;
