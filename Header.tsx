import { Link, useLocation } from 'react-router';
import { Car, Menu, User, History, Search, ShoppingCart, LogOut, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function Header() {
  const location = useLocation();
  const { items } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  
  const navItems = [
    { label: 'Find Service', path: '/', icon: Search },
    { label: 'My Bookings', path: '/bookings', icon: Car },
    { label: 'Service History', path: '/history', icon: History },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold text-xl">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
            <Car className="w-6 h-6 text-white" />
          </div>
          <span className="hidden sm:inline">AutoTrust</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                isActive(item.path)
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/cart">
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="w-5 h-5" />
              {items.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-blue-600">
                  {items.length}
                </Badge>
              )}
            </Button>
          </Link>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  {user?.name?.split(' ')[0]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/bookings" className="cursor-pointer">
                    <Car className="w-4 h-4 mr-2" />
                    My Bookings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/history" className="cursor-pointer">
                    <History className="w-4 h-4 mr-2" />
                    Service History
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/account" className="cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" />
                    Account Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2">
          <Link to="/cart">
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="w-5 h-5" />
              {items.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-blue-600">
                  {items.length}
                </Badge>
              )}
            </Button>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-8">
                <Link
                  to="/cart"
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative ${
                    isActive('/cart')
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Cart
                  {items.length > 0 && (
                    <Badge className="ml-auto bg-blue-600">
                      {items.length}
                    </Badge>
                  )}
                </Link>
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                ))}
                {isAuthenticated && (
                  <Link
                    to="/account"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive('/account')
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Settings className="w-5 h-5" />
                    Account Settings
                  </Link>
                )}
                <div className="border-t pt-4 mt-4 flex flex-col gap-2">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2">
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      <Button variant="outline" className="w-full text-red-600" onClick={logout}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/login">
                        <Button variant="outline" className="w-full">
                          <User className="w-4 h-4 mr-2" />
                          Sign In
                        </Button>
                      </Link>
                      <Link to="/signup">
                        <Button className="w-full">Get Started</Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
