import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import UserRoles from '../pages/UserRoles';
import UserManagement from '../pages/UserManagement';
import Dashboard from '../pages/Dashboard';
import AutoResponse from '../pages/AutoResponse';
import Customers from '../pages/Customers';
import Subscriptions from '../pages/Subscriptions';
import Books from '../pages/Books';
import BookCreate from '../components/books/BookCreate';
import BookEdit from '../components/books/BookEdit';
import BookDetail from '../components/books/BookDetail';
import VehicleManufacturer from '../pages/VehicleManufacturer';
import CreateVehicleManufacturer from '../components/vehicle/CreateVehicleManufacturer';
import EditVehicleManufacturer from '../components/vehicle/EditVehicleManufacturer';
import VehicleManufacturerDetail from '../components/vehicle/VehicleManufacturerDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/admin',
    element: <App />,
    children: [
      {
        path: 'home',
        element: <Dashboard />,
      },
      {
        path: 'user-roles',
        element: <UserRoles />,
      },
      {
        path: 'user-management',
        element: <UserManagement />,
      },
      {
        path: 'auto-response',
        element: <AutoResponse />,
      },
      {
        path: 'customers',
        element: <Customers />,
      },
      {
        path: 'subscriptions',
        element: <Subscriptions />,
      },
      {
        path: 'books',
        element: <Books />,
        children: [
          {
            path: 'create',
            element: <BookCreate />
          },
          {
            path: ':id/edit',
            element: <BookEdit />
          },
          {
            path: ':id/detail',
            element: <BookDetail />
          }
        ]
      },
      {
        path: 'vehicles',
        element: <VehicleManufacturer />,
        children: [
          {
            path: 'create',
            element: <CreateVehicleManufacturer />
          },
          {
            path: ':id/edit',
            element: <EditVehicleManufacturer />
          },
          {
            path: ':id/detail',
            element: <VehicleManufacturerDetail />
          }
        ]
      }
    ],
  },
]);

export default router;
