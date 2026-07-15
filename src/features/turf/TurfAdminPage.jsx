import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarDays, DollarSign, Activity, Users, Plus, Edit, 
  Trash2, XCircle, CheckCircle2, ChevronRight, BarChart, Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Button, Modal, Tabs } from '../../components/UI';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function TurfAdminPage() {
  const { turfsList, bookingsList, placeBooking, addNotification } = useApp();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [localBookings, setLocalBookings] = useState(bookingsList);
  const [localTurfs, setLocalTurfs] = useState(turfsList);

  // States for modal
  const [isAddTurfOpen, setIsAddTurfOpen] = useState(false);
  const [newTurfForm, setNewTurfForm] = useState({
    name: '',
    location: '',
    pricePerHour: '',
    type: '5-a-side Football',
    amenities: 'Floodlights, Locker Room, Water Dispenser',
    image: 'https://images.unsplash.com/photo-1556012018-50cf53d47a21?w=450&h=300&fit=crop&q=80'
  });

  // Calculate Metrics
  const grossRevenue = localBookings.reduce((sum, b) => sum + (b.status !== 'Cancelled' ? b.amountPaid : 0), 0);
  const activeBookingsCount = localBookings.filter(b => b.status === 'Confirmed').length;
  const totalBookingsCount = localBookings.length;
  // Utilisation percentage mock
  const utilizationRate = 78.4;

  const monthlyUtilizationData = [
    { name: 'Mon', Bookings: 12, Revenue: 480 },
    { name: 'Tue', Bookings: 14, Revenue: 560 },
    { name: 'Wed', Bookings: 18, Revenue: 720 },
    { name: 'Thu', Bookings: 15, Revenue: 600 },
    { name: 'Fri', Bookings: 22, Revenue: 980 },
    { name: 'Sat', Bookings: 32, Revenue: 1480 },
    { name: 'Sun', Bookings: 28, Revenue: 1220 }
  ];

  const handleCancelBooking = (bookingId) => {
    setLocalBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'Cancelled' } : b));
    addNotification("Booking Cancelled", `Turf reservation ${bookingId} has been marked as Cancelled.`, "Turf");
  };

  const handleAddTurfSubmit = (e) => {
    e.preventDefault();
    const cleanAmenities = newTurfForm.amenities.split(',').map(a => a.trim());
    const newTurfObj = {
      id: `t${localTurfs.length + 1}`,
      name: newTurfForm.name,
      location: newTurfForm.location,
      pricePerHour: parseInt(newTurfForm.pricePerHour) || 30,
      type: newTurfForm.type,
      image: newTurfForm.image,
      rating: 5,
      reviews: 1,
      amenities: cleanAmenities
    };

    setLocalTurfs(prev => [...prev, newTurfObj]);
    setIsAddTurfOpen(false);
    addNotification("New Turf Ground Added", `${newTurfObj.name} listed at $${newTurfObj.pricePerHour}/hr.`, "Turf");

    // Reset Form
    setNewTurfForm({
      name: '',
      location: '',
      pricePerHour: '',
      type: '5-a-side Football',
      amenities: 'Floodlights, Locker Room, Water Dispenser',
      image: 'https://images.unsplash.com/photo-1556012018-50cf53d47a21?w=450&h=300&fit=crop&q=80'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 tracking-tight">
            Turf Bookings Admin
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            Configure grounds slots, collect hourly pitch fees, and control schedules.
          </p>
        </div>
        <Button 
          onClick={() => setIsAddTurfOpen(true)} 
          variant="primary" 
          size="sm"
          icon={Plus}
        >
          Add Turf Ground
        </Button>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={[
          { id: 'dashboard', label: 'Turf overview' },
          { id: 'grounds', label: 'Grounds Listing' },
          { id: 'bookings', label: 'Reservations log' }
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <div className="pt-2">
        {/* OVERVIEW TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <Card className="p-5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase">Gross Turf Income</span>
                  <p className="text-2xl font-bold text-slate-950 mt-1">${grossRevenue.toLocaleString()}.00</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-primary">
                  <DollarSign className="w-5 h-5" />
                </div>
              </Card>

              <Card className="p-5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase">Active Bookings</span>
                  <p className="text-2xl font-bold text-slate-950 mt-1">{activeBookingsCount} Slots</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <CalendarDays className="w-5 h-5" />
                </div>
              </Card>

              <Card className="p-5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase">Average Utilization</span>
                  <p className="text-2xl font-bold text-slate-950 mt-1">{utilizationRate}%</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                  <Activity className="w-5 h-5" />
                </div>
              </Card>

              <Card className="p-5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase">Total Reservations</span>
                  <p className="text-2xl font-bold text-slate-950 mt-1">{totalBookingsCount} Bookings</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                  <Users className="w-5 h-5" />
                </div>
              </Card>
            </div>

            {/* Income graph */}
            <Card hoverEffect={false}>
              <CardHeader>
                <CardTitle>Daily Turf Performance (7 Days)</CardTitle>
                <CardDescription>Slot reservation volume and cash intake.</CardDescription>
              </CardHeader>
              <CardContent className="h-72 pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyUtilizationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                    <Area type="monotone" dataKey="Revenue" stroke="#10B981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {/* GROUNDS LISTING TAB */}
        {activeTab === 'grounds' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {localTurfs.map((turf) => (
              <Card key={turf.id} className="p-0 overflow-hidden flex flex-col justify-between h-full" hoverEffect={false}>
                <div>
                  <div className="aspect-[16/10] w-full relative">
                    <img src={turf.image} alt={turf.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5 space-y-2.5">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-display font-semibold text-slate-900 text-sm">{turf.name}</h3>
                      <Badge variant="secondary">{turf.type.split(' ')[0]}</Badge>
                    </div>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {turf.location}</p>
                    <p className="text-[11px] font-bold text-slate-900">Price: ${turf.pricePerHour}/hr</p>
                    <div className="flex flex-wrap gap-1 pt-1.5 border-t border-slate-50">
                      {turf.amenities.map(a => (
                        <span key={a} className="text-[8px] bg-slate-100 text-slate-500 font-semibold px-2 py-0.5 rounded-md border border-slate-200">{a}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 border-t border-slate-50 bg-slate-50/20 flex gap-2">
                  <Button variant="outline" size="sm" className="w-full" icon={Edit}>Edit</Button>
                  <Button variant="danger" size="sm" className="w-full" icon={Trash2}>Remove</Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* BOOKINGS TABLE TAB */}
        {activeTab === 'bookings' && (
          <Card hoverEffect={false}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-semibold">
                    <th className="py-4 px-6">Booking ID</th>
                    <th className="py-4 px-4">Reserved Field</th>
                    <th className="py-4 px-4">Customer Details</th>
                    <th className="py-4 px-4 text-center">Allocated Time</th>
                    <th className="py-4 px-4 text-right">Fee Rate</th>
                    <th className="py-4 px-4 text-center">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {localBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 px-6 font-semibold text-slate-900">{b.id}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-700">{b.turfName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">Turf ID: {b.turfId}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-700">{b.customerName}</div>
                        <div className="text-[10px] text-slate-400">{b.customerEmail}</div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="font-semibold text-slate-800">{b.date}</div>
                        <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1"><Clock className="w-3 h-3 text-slate-400" /> {b.timeSlot}</div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-slate-900">${b.amountPaid}.00</td>
                      <td className="py-3.5 px-4 text-center">
                        <Badge variant={
                          b.status === 'Confirmed' ? 'info' : 
                          b.status === 'Completed' ? 'success' : 'error'
                        }>
                          {b.status}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-6 text-right">
                        {b.status === 'Confirmed' ? (
                          <Button 
                            onClick={() => handleCancelBooking(b.id)}
                            variant="danger" 
                            size="sm"
                            className="scale-90"
                            icon={XCircle}
                          >
                            Cancel Slot
                          </Button>
                        ) : b.status === 'Completed' ? (
                          <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-lg">Settled</span>
                        ) : (
                          <span className="text-[10px] text-rose-500 font-bold bg-rose-50 px-2 py-1 rounded-lg">Cancelled</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>

      {/* ADD NEW TURF MODAL */}
      <Modal
        isOpen={isAddTurfOpen}
        onClose={() => setIsAddTurfOpen(false)}
        title="Add New Turf Ground"
      >
        <form onSubmit={handleAddTurfSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-600">Turf Name</label>
            <input
              type="text"
              required
              value={newTurfForm.name}
              onChange={(e) => setNewTurfForm(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none"
              placeholder="e.g. Anfield Arena Football (5v5)"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-600">Location</label>
              <input
                type="text"
                required
                value={newTurfForm.location}
                onChange={(e) => setNewTurfForm(prev => ({ ...prev, location: e.target.value }))}
                className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none"
                placeholder="e.g. Sector 12, Elite Hub"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-600">Hourly Rate ($)</label>
              <input
                type="number"
                required
                value={newTurfForm.pricePerHour}
                onChange={(e) => setNewTurfForm(prev => ({ ...prev, pricePerHour: e.target.value }))}
                className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none"
                placeholder="40"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-600">Pitches Type</label>
              <select
                value={newTurfForm.type}
                onChange={(e) => setNewTurfForm(prev => ({ ...prev, type: e.target.value }))}
                className="w-full p-2 border border-slate-200 rounded-lg bg-white focus:outline-none"
              >
                <option value="5-a-side Football">5-a-side Football</option>
                <option value="7-a-side Football">7-a-side Football</option>
                <option value="Cricket Nets">Cricket Nets</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-600">Featured Image URL</label>
              <input
                type="text"
                value={newTurfForm.image}
                onChange={(e) => setNewTurfForm(prev => ({ ...prev, image: e.target.value }))}
                className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-600">Amenities (comma-separated)</label>
            <input
              type="text"
              value={newTurfForm.amenities}
              onChange={(e) => setNewTurfForm(prev => ({ ...prev, amenities: e.target.value }))}
              className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none"
              placeholder="Floodlights, Locker Room, Water Station"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-2.5">
            <Button type="button" onClick={() => setIsAddTurfOpen(false)} variant="outline" size="sm">Cancel</Button>
            <Button type="submit" variant="primary" size="sm">List Turf Ground</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
