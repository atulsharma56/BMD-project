import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Compare } from './pages/Compare';
import { QuoteDetails } from './pages/QuoteDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { BookingConfirmed } from './pages/BookingConfirmed';
import { Bookings } from './pages/Bookings';
import { ServiceHistory } from './pages/ServiceHistory';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { ForgotPassword } from './pages/ForgotPassword';
import { Account } from './pages/Account';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'compare', Component: Compare },
      { path: 'quote/:mechanicId', Component: QuoteDetails },
      { path: 'cart', Component: Cart },
      { path: 'checkout', Component: Checkout },
      { path: 'booking-confirmed', Component: BookingConfirmed },
      { path: 'bookings', Component: Bookings },
      { path: 'history', Component: ServiceHistory },
      { path: 'account', Component: Account },
    ],
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/signup',
    Component: SignUp,
  },
  {
    path: '/forgot-password',
    Component: ForgotPassword,
  },
]);
