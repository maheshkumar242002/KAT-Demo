import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, X, Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button, Drawer, Badge } from '../components/UI';

export default function UserLayout() {
  const { cart, removeFromCart, updateCartQuantity, wishlist } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Nuts', path: '/ecommerce' },
    { label: 'Book Turfs', path: '/turf' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 w-full glass-effect border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-lg font-display shadow-md">
              K
            </div>
            <span className="font-display font-bold text-slate-900 text-lg tracking-wide">
              KAT Portal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${isActive ? 'text-primary font-semibold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2">
            {/* Wishlist Link */}
            <Link
              to="/ecommerce"
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 rounded-xl transition-all"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-accent text-white rounded-full text-[9px] font-bold w-4 h-4 flex items-center justify-center ring-2 ring-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 rounded-xl transition-all cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-primary text-white rounded-full text-[9px] font-bold w-4 h-4 flex items-center justify-center ring-2 ring-white">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Login/Dashboard Toggle */}
            <Link
              to="/admin/dashboard"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-xl shadow-premium transition-all"
            >
              <User className="w-4 h-4 text-slate-500" /> Admin Board
            </Link>

            {/* Hamburger menu for mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 rounded-xl transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-30 bg-slate-900/40 backdrop-blur-sm md:hidden">
          <div className="bg-white border-b border-slate-200 px-6 py-6 flex flex-col gap-4 shadow-lg animate-in slide-in-from-top duration-250">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-semibold text-slate-700 hover:text-slate-950 py-2 border-b border-slate-50"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 text-sm font-semibold text-white bg-primary hover:bg-primary-hover py-3 rounded-xl shadow-md mt-2"
            >
              <User className="w-4 h-4" /> Go to Admin Dashboard
            </Link>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-slate-400 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-lg font-display">
                  E
                </div>
                <span className="font-display font-bold text-white text-lg tracking-wide">
                  KAT Groups
                </span>
              </div>
              <p className="text-xs leading-relaxed">
                The premier cloud infrastructure for athletic academy operations, booking management, and high-performance equipment distribution.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wide mb-4">Quick Links</h4>
              <ul className="space-y-2.5 text-xs">
                <li><Link to="/" className="hover:text-white transition-colors">Home Landing</Link></li>
                <li><Link to="/ecommerce" className="hover:text-white transition-colors">E-Commerce Store</Link></li>
                <li><Link to="/turf" className="hover:text-white transition-colors">Turf Reservations</Link></li>
                <li><Link to="/admin/dashboard" className="hover:text-white transition-colors">Super Admin Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wide mb-4">Business Sectors</h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>Football Academy</li>
                <li>Cricket Coaching Masterclass</li>
                <li>Premium Turf Ground Allocations</li>
                <li>High Performance Apparel Distribution</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wide mb-4">Help & Support</h4>
              <ul className="space-y-2.5 text-xs">
                <li><a href="#" className="hover:text-white transition-colors">User Manuals</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Corporate Licensing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">System Health Status</a></li>
              </ul>
            </div>
          </div>
          <hr className="my-8 border-slate-800" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <span>&copy; {new Date().getFullYear()} KAT Management System. All demo rights reserved.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Agreement</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <Drawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        title="Your Shopping Cart"
      >
        <div className="flex flex-col h-full justify-between">
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 text-sm">Your cart is currently empty.</p>
                <Button
                  onClick={() => { setIsCartOpen(false); navigate('/ecommerce'); }}
                  variant="outline"
                  size="sm"
                  className="mt-4"
                >
                  Browse Store
                </Button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover border border-slate-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-slate-800 truncate">{item.name}</h4>
                    <p className="text-xs text-slate-500 mb-2">{item.category}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 border border-slate-200 bg-white rounded-lg px-2 py-0.5 scale-90 origin-left">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="text-slate-400 hover:text-slate-700 p-0.5 rounded"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="text-slate-400 hover:text-slate-700 p-0.5 rounded"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-slate-400 hover:text-rose-500 p-1 self-start"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="pt-5 border-t border-slate-100 bg-white space-y-4">
              <div className="flex justify-between items-center text-slate-800">
                <span className="text-sm font-semibold">Subtotal</span>
                <span className="text-lg font-bold text-slate-900">${cartTotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-slate-400">Shipping and taxes computed at checkout stage.</p>
              <div className="grid grid-cols-1 gap-2.5">
                <Button
                  onClick={() => { setIsCartOpen(false); navigate('/ecommerce/checkout'); }}
                  variant="primary"
                  icon={CreditCard}
                  className="w-full"
                >
                  Proceed to Checkout
                </Button>
                <Button
                  onClick={() => setIsCartOpen(false)}
                  variant="ghost"
                  size="sm"
                  className="w-full text-slate-500"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
}
