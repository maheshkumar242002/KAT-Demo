import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  DollarSign, CalendarDays, ShoppingBag, GraduationCap,
  Package, ChevronRight, ArrowUpRight, TrendingUp, Clock, AlertCircle
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { useApp } from '../context/AppContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Button } from '../components/UI';

export default function SuperAdminDashboard() {
  const navigate = useNavigate();
  const {
    ordersList,
    bookingsList,
    studentsList,
    productsList,
    timeline,
    notificationList
  } = useApp();

  // Financial aggregation
  const academyRevenue = studentsList.reduce((sum, s) => {
    // Parse numeric value e.g. "$450 / term" -> 450
    const amt = parseInt(s.feeAmount.replace(/[^0-9]/g, '')) || 0;
    return sum + (s.feeStatus === 'Paid' ? amt : s.feeStatus === 'Partially Paid' ? amt * 0.5 : 0);
  }, 0);
  const ecommerceRevenue = ordersList.reduce((sum, o) => sum + o.total, 0);
  const turfRevenue = bookingsList.reduce((sum, b) => sum + (b.status !== 'Cancelled' ? b.amountPaid : 0), 0);
  const totalRevenue = academyRevenue + ecommerceRevenue + turfRevenue;

  // Recent data items
  const recentOrders = ordersList.slice(0, 4);
  const recentBookings = bookingsList.slice(0, 4);
  const recentTimeline = timeline.slice(0, 4);

  // Charts Mock Data matching live context
  const monthlyRevenueData = [
    { name: 'Jan', Academy: 3800, ECommerce: 1200, Turf: 2000 },
    { name: 'Feb', Academy: 4100, ECommerce: 1500, Turf: 2400 },
    { name: 'Mar', Academy: 4500, ECommerce: 1800, Turf: 2900 },
    { name: 'Apr', Academy: 4800, ECommerce: 2200, Turf: 3300 },
    { name: 'May', Academy: 5200, ECommerce: 2800, Turf: 3800 },
    { name: 'Jun', Academy: academyRevenue * 0.8, ECommerce: ecommerceRevenue * 0.8, Turf: turfRevenue * 0.8 },
  ];

  const categorySalesData = [
    { name: 'Football', Sales: 3400, color: '#2563EB' },
    { name: 'Cricket', Sales: 4100, color: '#10B981' },
    { name: 'Apparel', Sales: 2300, color: '#F59E0B' },
    { name: 'Turf Rentals', Sales: 5800, color: '#8B5CF6' }
  ];

  const turfPieData = [
    { name: 'Santiago Bernabéu', value: bookingsList.filter(b => b.turfId === 't1').length, color: '#2563EB' },
    { name: 'Old Trafford', value: bookingsList.filter(b => b.turfId === 't2').length, color: '#10B981' },
    { name: 'Lord\'s Nets', value: bookingsList.filter(b => b.turfId === 't3').length, color: '#8B5CF6' }
  ];

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: "bg-blue-50 text-blue-600 border-blue-100",
      desc: "Academy fees, shop and turf",
      trend: "+12.4%",
      trendDir: "up"
    },
    {
      title: "Turf Reservations",
      value: bookingsList.length,
      icon: CalendarDays,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      desc: "Total slots requested",
      trend: "+8.1%",
      trendDir: "up"
    },
    {
      title: "Shop Orders",
      value: ordersList.length,
      icon: ShoppingBag,
      color: "bg-amber-50 text-amber-600 border-amber-100",
      desc: "Apparel & equipment sales",
      trend: "+15.3%",
      trendDir: "up"
    },
    {
      title: "Academy Students",
      value: studentsList.length,
      icon: GraduationCap,
      color: "bg-purple-50 text-purple-600 border-purple-100",
      desc: "Football & cricket cadets",
      trend: "+4.2%",
      trendDir: "up"
    },
    {
      title: "Inventory Catalog",
      value: productsList.length,
      icon: Package,
      color: "bg-slate-100 text-slate-700 border-slate-200",
      desc: "Items listed on portal",
      trend: "Stable",
      trendDir: "flat"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 tracking-tight">
            Super Admin Overview
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            Operational and commercial tracking metrics for KAT Groups.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => navigate('/admin/reports')}
            variant="outline"
            size="sm"
          >
            Review Reports
          </Button>
          <Button
            onClick={() => navigate('/admin/settings')}
            variant="primary"
            size="sm"
          >
            Configure Settings
          </Button>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card hoverEffect={true} className="p-5 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {stat.title}
                    </span>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${stat.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="font-display font-bold text-xl md:text-2xl text-slate-900">
                      {stat.value}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50 text-[10px] text-slate-400">
                  <span>{stat.desc}</span>
                  {stat.trendDir === 'up' ? (
                    <span className="text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 rounded px-1 flex items-center gap-0.5">
                      <TrendingUp className="w-2.5 h-2.5" /> {stat.trend}
                    </span>
                  ) : stat.trendDir === 'down' ? (
                    <span className="text-rose-600 font-bold bg-rose-50 border border-rose-100 rounded px-1">
                      {stat.trend}
                    </span>
                  ) : (
                    <span className="text-slate-500 font-semibold bg-slate-100 border border-slate-200 rounded px-1">
                      {stat.trend}
                    </span>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Revenue line chart */}
        <div className="lg:col-span-8">
          <Card hoverEffect={false} className="h-full">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 pb-4">
              <div>
                <CardTitle>Sector Revenue Trends</CardTitle>
                <CardDescription>Monthly income distributions across core businesses.</CardDescription>
              </div>
              <Badge variant="success">Live Synced</Badge>
            </CardHeader>
            <CardContent className="h-80 pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAcademy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorTurf" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorEcom" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ background: '#FFF', border: '1px solid #E2E8F0', borderRadius: '12px', fontSize: '12px' }}
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="Academy" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorAcademy)" />
                  <Area type="monotone" dataKey="Turf" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorTurf)" />
                  <Area type="monotone" dataKey="ECommerce" stroke="#F59E0B" strokeWidth={2} fillOpacity={1} fill="url(#colorEcom)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Categories Bar chart */}
        <div className="lg:col-span-4">
          <Card hoverEffect={false} className="h-full">
            <CardHeader className="border-b border-slate-50 pb-4">
              <CardTitle>Commercial Categories</CardTitle>
              <CardDescription>Product sales breakdown ($).</CardDescription>
            </CardHeader>
            <CardContent className="h-80 pt-4 flex flex-col justify-between">
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categorySalesData} layout="vertical" margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                    <XAxis type="number" stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis dataKey="name" type="category" stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ background: '#FFF', border: '1px solid #E2E8F0', borderRadius: '12px', fontSize: '11px' }}
                    />
                    <Bar dataKey="Sales" radius={[0, 8, 8, 0]} barSize={16}>
                      {categorySalesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex flex-wrap gap-3 items-center text-[10px] text-slate-500 font-semibold border-t border-slate-50 pt-3">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-blue-600 inline-block" /> Football</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block" /> Cricket</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-500 inline-block" /> Apparel</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-purple-500 inline-block" /> Turf Rentals</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Lists and Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent E-Commerce Orders */}
        <div className="lg:col-span-8 space-y-6">
          <Card hoverEffect={false}>
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 pb-4">
              <div>
                <CardTitle>Recent E-Commerce Orders</CardTitle>
                <CardDescription>Latest transactions recorded on storefront.</CardDescription>
              </div>
              <Button
                onClick={() => navigate('/admin/ecommerce')}
                variant="ghost"
                size="sm"
                icon={ChevronRight}
                iconPosition="right"
                className="text-xs"
              >
                All Orders
              </Button>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-semibold">
                    <th className="py-3.5 px-3">Order ID</th>
                    <th className="py-3.5 px-3">Customer</th>
                    <th className="py-3.5 px-3">Date</th>
                    <th className="py-3.5 px-3 text-right">Total</th>
                    <th className="py-3.5 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-slate-900">{order.id}</td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-700">{order.customer}</div>
                        <div className="text-[10px] text-slate-400">{order.email}</div>
                      </td>
                      <td className="py-3 px-3 text-slate-500">{order.date}</td>
                      <td className="py-3 px-3 text-right font-bold text-slate-900">${order.total.toFixed(2)}</td>
                      <td className="py-3 px-3 text-center">
                        <Badge variant={
                          order.status === 'Delivered' ? 'success' :
                            order.status === 'Shipped' ? 'info' : 'warning'
                        }>
                          {order.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Recent Turf Bookings */}
          <Card hoverEffect={false}>
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 pb-4">
              <div>
                <CardTitle>Recent Turf Reservations</CardTitle>
                <CardDescription>Live slot allocations and reservations.</CardDescription>
              </div>
              <Button
                onClick={() => navigate('/admin/turf')}
                variant="ghost"
                size="sm"
                icon={ChevronRight}
                iconPosition="right"
                className="text-xs"
              >
                Calendar Panel
              </Button>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-semibold">
                    <th className="py-3.5 px-3">Booking ID</th>
                    <th className="py-3.5 px-3">Ground</th>
                    <th className="py-3.5 px-3">Date/Time</th>
                    <th className="py-3.5 px-3 text-right">Fee</th>
                    <th className="py-3.5 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-slate-900">{booking.id}</td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-700">{booking.turfName}</div>
                        <div className="text-[10px] text-slate-400">{booking.customerName}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="text-slate-700">{booking.date}</div>
                        <div className="text-[10px] text-slate-400">{booking.timeSlot}</div>
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-slate-900">${booking.amountPaid}.00</td>
                      <td className="py-3 px-3 text-center">
                        <Badge variant={
                          booking.status === 'Confirmed' ? 'info' :
                            booking.status === 'Completed' ? 'success' : 'error'
                        }>
                          {booking.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar logs: Activity Timeline and Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Live System Activity Timeline */}
          <Card hoverEffect={false}>
            <CardHeader className="border-b border-slate-50 pb-4">
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-slate-500" /> Operational Logs
              </CardTitle>
              <CardDescription>Live actions across modules.</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="relative border-l border-slate-100 pl-4 space-y-6.5">
                {recentTimeline.map((item) => (
                  <div key={item.id} className="relative">
                    {/* Circle timeline bullet */}
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-slate-300 ring-4 ring-white" />
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold mb-1">
                      <span>{item.user} • {item.type}</span>
                      <span>{item.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Turf Booking Pie Allocation */}
          <Card hoverEffect={false}>
            <CardHeader className="border-b border-slate-50 pb-4">
              <CardTitle>Turf Bookings Ratio</CardTitle>
              <CardDescription>Load split between turf sizes.</CardDescription>
            </CardHeader>
            <CardContent className="h-56 pt-2 flex flex-col justify-between">
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={turfPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {turfPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-3.5 text-[9px] text-slate-500 font-bold">
                {turfPieData.map(d => (
                  <span key={d.name} className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: d.color }} />
                    {d.name.split(' ')[0]}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
