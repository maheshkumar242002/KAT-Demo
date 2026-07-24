import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, GraduationCap, ShoppingBag, CalendarDays,
  BarChart3, Settings, LogOut, Menu, X, Bell, Mail, Search, User, ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button, Drawer, Badge } from '../components/UI';

export default function AdminLayout() {
  const { notificationList, markAllNotificationsRead, markNotificationRead } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const unreadNotifications = notificationList.filter(n => !n.read);

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Academy', path: '/admin/academy', icon: GraduationCap },
    { name: 'E-Commerce', path: '/admin/ecommerce', icon: ShoppingBag },
    { name: 'Turf', path: '/admin/turf', icon: CalendarDays },
    { name: 'Reports', path: '/admin/reports', icon: BarChart3 },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#0F172A] text-slate-300">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-lg font-display shadow-md">
            K
          </div>
          {(!isSidebarCollapsed || isMobileSidebarOpen) && (
            <span className="font-display font-bold text-white text-lg tracking-wide">
              KAT Groups
            </span>
          )}
        </Link>
        {isMobileSidebarOpen && (
          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded-lg lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileSidebarOpen(false)}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${isActive
                  ? 'bg-primary text-white shadow-md'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-105 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
              {(!isSidebarCollapsed || isMobileSidebarOpen) && (
                <span>{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer / Logout */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {(!isSidebarCollapsed || isMobileSidebarOpen) && (
            <span>Logout</span>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50">
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: isSidebarCollapsed ? 80 : 260 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="hidden lg:block h-full bg-[#0F172A] border-r border-slate-800 flex-shrink-0"
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile Sidebar overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            {/* Sidebar drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="relative flex flex-col w-[280px] h-full bg-[#0F172A]"
            >
              <SidebarContent />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Content wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setIsMobileSidebarOpen(true);
                } else {
                  setIsSidebarCollapsed(!isSidebarCollapsed);
                }
              }}
              className="text-slate-500 hover:text-slate-800 p-2 hover:bg-slate-50 rounded-xl transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search resources, users..."
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 w-64 bg-slate-50 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button
              onClick={() => setIsNotificationOpen(true)}
              className="relative p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifications.length > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-rose-500 text-white rounded-full text-[10px] font-bold w-4 h-4 flex items-center justify-center ring-2 ring-white animate-pulse">
                  {unreadNotifications.length}
                </span>
              )}
            </button>

            {/* Messages */}
            <button className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all">
              <Mail className="w-5 h-5" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-primary font-semibold text-sm">
                  SA
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-semibold text-slate-700 leading-tight">Super Admin</p>
                  <p className="text-[10px] text-slate-400">admin@kat.com</p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute right-0 mt-2.5 w-52 bg-white border border-slate-100 rounded-2xl shadow-premium-lg z-20 py-2"
                    >
                      <Link
                        to="/admin/settings"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                      >
                        <User className="w-4 h-4" /> My Profile
                      </Link>
                      <Link
                        to="/admin/settings"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                      >
                        <Settings className="w-4 h-4" /> Account Settings
                      </Link>
                      <hr className="my-1.5 border-slate-100" />
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          handleLogout();
                        }}
                        className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Dynamic sub-view outlet */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>

      {/* Notifications Drawer */}
      <Drawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        title="Notifications Center"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Recent Alerts
            </span>
            {unreadNotifications.length > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="text-xs font-semibold text-primary hover:text-primary-hover"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="flex-1 space-y-3.5 overflow-y-auto pr-1">
            {notificationList.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400 text-sm">No notifications yet.</p>
              </div>
            ) : (
              notificationList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => markNotificationRead(item.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${item.read
                      ? 'bg-white border-slate-100 text-slate-600 opacity-70'
                      : 'bg-blue-50/40 border-blue-100 hover:bg-blue-50/60'
                    }`}
                >
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <span className="font-semibold text-sm text-slate-900 leading-snug">
                      {item.title}
                    </span>
                    <Badge variant={
                      item.category === 'Academy' ? 'info' :
                        item.category === 'Turf' ? 'success' :
                          item.category === 'Store' ? 'warning' : 'secondary'
                    }>
                      {item.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 leading-normal mb-2">{item.message}</p>
                  <span className="text-[10px] text-slate-400 font-medium">{item.timestamp}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </Drawer>
    </div>
  );
}
