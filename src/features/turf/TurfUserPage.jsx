import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CalendarDays, MapPin, Star, CheckCircle, ShieldCheck, 
  CreditCard, ChevronRight, CheckCircle2, Clock, DollarSign, ListOrdered, Calendar
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card, Badge, Button, Modal } from '../../components/UI';

export default function TurfUserPage() {
  const { turfsList, bookingsList, placeBooking } = useApp();

  const [currentView, setCurrentView] = useState('list'); // 'list' | 'book' | 'payment' | 'success' | 'history'
  const [selectedTurf, setSelectedTurf] = useState(null);
  const [placedBookingDetails, setPlacedBookingDetails] = useState(null);

  // Form states for booking
  const [bookingForm, setBookingForm] = useState({
    date: new Date().toISOString().split('T')[0],
    timeSlot: '18:00 - 19:00',
    slotType: 'Evening',
    name: 'Sarah Connor',
    email: 'sarah.c@skyline.org',
    cardName: 'Sarah Connor',
    cardNumber: '4111 2222 3333 4444',
    cardExpiry: '12/28',
    cardCvc: '189'
  });

  const slots = {
    Morning: ['07:00 - 08:00', '08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00'],
    Afternoon: ['12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00'],
    Evening: ['17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00', '20:00 - 21:00']
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const finalBooking = placeBooking({
      turfId: selectedTurf.id,
      turfName: selectedTurf.name,
      price: selectedTurf.pricePerHour,
      ...bookingForm
    });
    setPlacedBookingDetails(finalBooking);
    setCurrentView('success');
  };

  const handleSelectSlot = (slot, type) => {
    setBookingForm(prev => ({ ...prev, timeSlot: slot, slotType: type }));
  };

  const myBookings = bookingsList.filter(b => b.customerEmail === 'sarah.c@skyline.org' || b.customerEmail === 'g.mehta@example.com');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* View Header Tabs */}
      <div className="flex justify-between items-center bg-white border border-slate-100 p-4 rounded-2xl shadow-premium">
        <div>
          <h2 className="font-display font-bold text-lg text-slate-900">Turf Booking Center</h2>
          <p className="text-xs text-slate-500">Rent premium sports pitches on demand.</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => setCurrentView('list')} 
            variant={currentView === 'list' ? 'secondary' : 'outline'} 
            size="sm"
          >
            Available Turfs
          </Button>
          <Button 
            onClick={() => setCurrentView('history')} 
            variant={currentView === 'history' ? 'secondary' : 'outline'} 
            size="sm"
            icon={ListOrdered}
          >
            My Reservations ({myBookings.length})
          </Button>
        </div>
      </div>

      {/* LIST OF TURFS VIEW */}
      {currentView === 'list' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
          {turfsList.map((turf) => (
            <Card key={turf.id} className="flex flex-col justify-between h-full p-0 overflow-hidden" hoverEffect={true}>
              <div>
                {/* Photo */}
                <div className="aspect-[4/3] w-full relative">
                  <img src={turf.image} alt={turf.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-xl text-[10px] font-bold text-white border border-white/10 uppercase tracking-wide">
                    {turf.type}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-display font-semibold text-slate-900 text-base leading-snug">{turf.name}</h3>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                      <span className="text-xs font-bold text-slate-700">{turf.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-slate-400 flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {turf.location}</p>
                  
                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {turf.amenities.map(a => (
                      <span key={a} className="text-[9px] font-semibold text-slate-500 bg-slate-50 border border-slate-100 rounded-lg px-2 py-0.5">{a}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-slate-50 bg-slate-50/20 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">hourly rate</span>
                  <span className="text-lg font-extrabold text-slate-900">${turf.pricePerHour}.00</span>
                </div>
                <Button 
                  onClick={() => { setSelectedTurf(turf); setCurrentView('book'); }}
                  variant="primary" 
                  size="sm"
                >
                  Book Slot
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* BOOKING DETAILS & SLOT SELECTION VIEW */}
      {currentView === 'book' && selectedTurf && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in slide-in-from-bottom duration-200">
          {/* Calendar Slot Selector */}
          <div className="lg:col-span-8 space-y-6">
            <Card hoverEffect={false}>
              <h3 className="font-display font-semibold text-lg text-slate-900 border-b border-slate-100 pb-3 mb-5">
                Reserve Pitch Slot
              </h3>
              
              <div className="space-y-5 text-xs">
                {/* Date Picker */}
                <div className="space-y-1.5 max-w-sm">
                  <label className="font-semibold text-slate-600 flex items-center gap-1"><Calendar className="w-4 h-4 text-primary" /> Select Date</label>
                  <input
                    type="date"
                    required
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full p-2.5 border border-slate-200 rounded-xl font-semibold text-slate-700 focus:outline-none"
                  />
                </div>

                {/* Slots Grid */}
                <div className="space-y-4">
                  <label className="font-semibold text-slate-600 flex items-center gap-1"><Clock className="w-4 h-4 text-primary" /> Available Time Windows</label>
                  
                  {Object.entries(slots).map(([type, timeList]) => (
                    <div key={type} className="space-y-2 border border-slate-100 rounded-xl p-3.5 bg-slate-50/30">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{type} Slots</span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {timeList.map(s => {
                          const isSelected = bookingForm.timeSlot === s && bookingForm.slotType === type;
                          return (
                            <button
                              key={s}
                              type="button"
                              onClick={() => handleSelectSlot(s, type)}
                              className={`py-2 px-3 rounded-lg border text-center font-semibold transition-all text-xs cursor-pointer ${
                                isSelected 
                                  ? 'bg-primary border-primary text-white shadow-md' 
                                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                              }`}
                            >
                              {s.split(' ')[0]}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Pricing & Checkout Summary Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <Card hoverEffect={false}>
              <h3 className="font-display font-semibold text-sm text-slate-900 border-b border-slate-100 pb-3 mb-4">
                Booking Calculations
              </h3>
              <div className="space-y-3.5 text-xs text-slate-600">
                <div className="flex justify-between"><span>Pitch Field</span> <span className="font-semibold text-slate-800">{selectedTurf.name}</span></div>
                <div className="flex justify-between"><span>Reserved Date</span> <span className="font-semibold text-slate-800">{bookingForm.date}</span></div>
                <div className="flex justify-between"><span>Selected Slot</span> <span className="font-semibold text-slate-800">{bookingForm.timeSlot} ({bookingForm.slotType})</span></div>
                <hr className="border-slate-100 my-2" />
                <div className="flex justify-between items-baseline text-sm font-bold text-slate-900">
                  <span>Price / Hour</span>
                  <span>${selectedTurf.pricePerHour}.00</span>
                </div>
              </div>
              <Button 
                onClick={() => setCurrentView('payment')}
                variant="primary"
                className="w-full shadow-md py-3 text-sm font-semibold mt-5"
              >
                Proceed to Payment
              </Button>
            </Card>
          </div>
        </div>
      )}

      {/* PAYMENT SCREEN VIEW */}
      {currentView === 'payment' && selectedTurf && (
        <div className="max-w-md mx-auto animate-in slide-in-from-bottom duration-200">
          <Card hoverEffect={false}>
            <h3 className="font-display font-semibold text-lg text-slate-900 border-b border-slate-100 pb-3 mb-5">
              Confirm Turf Billing
            </h3>
            
            <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-600">Full Name</label>
                <input
                  type="text"
                  required
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-600">Email Address</label>
                <input
                  type="email"
                  required
                  value={bookingForm.email}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none"
                />
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-4">
                <h4 className="font-semibold text-slate-500 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-primary" /> Credit Card Details
                </h4>
                
                <div className="space-y-1">
                  <label className="font-semibold text-slate-600">Card Name</label>
                  <input
                    type="text"
                    required
                    value={bookingForm.cardName}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, cardName: e.target.value }))}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-600">Card Number</label>
                  <input
                    type="text"
                    required
                    value={bookingForm.cardNumber}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, cardNumber: e.target.value }))}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-600">Expiry</label>
                    <input
                      type="text"
                      required
                      value={bookingForm.cardExpiry}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, cardExpiry: e.target.value }))}
                      className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-600">CVC</label>
                    <input
                      type="text"
                      required
                      value={bookingForm.cardCvc}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, cardCvc: e.target.value }))}
                      className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                variant="accent" 
                className="w-full py-3 shadow-md font-semibold text-sm mt-4"
              >
                Pay ${selectedTurf.pricePerHour}.00 & Confirm Booking
              </Button>
            </form>
          </Card>
        </div>
      )}

      {/* BOOKING SUCCESS SCREEN VIEW */}
      {currentView === 'success' && placedBookingDetails && (
        <div className="max-w-md mx-auto py-12 text-center space-y-6 animate-in zoom-in duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-500 shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">Reservation Confirmed!</h2>
            <p className="text-xs text-slate-400">Your ground allocation invoice has been successfully registered.</p>
          </div>

          <Card hoverEffect={false} className="p-5 text-xs text-left space-y-3.5 bg-slate-50/50">
            <div className="flex justify-between font-mono text-[10px] text-slate-400">
              <span>BOOKING TICKET ID</span> <span>{placedBookingDetails.id}</span>
            </div>
            <hr className="border-slate-150" />
            <div className="space-y-1.5 text-slate-600">
              <div className="flex justify-between"><span>Pitch Reserved:</span> <span className="font-semibold text-slate-800">{placedBookingDetails.turfName}</span></div>
              <div className="flex justify-between"><span>Reservation Date:</span> <span className="font-semibold text-slate-800">{placedBookingDetails.date}</span></div>
              <div className="flex justify-between"><span>Scheduled Slot:</span> <span className="font-semibold text-slate-800">{placedBookingDetails.timeSlot}</span></div>
            </div>
            <hr className="border-slate-150" />
            <div className="flex justify-between items-baseline">
              <span className="font-bold text-slate-700">Gross Charge Paid</span>
              <span className="text-sm font-extrabold text-slate-900">${placedBookingDetails.amountPaid}.00</span>
            </div>
          </Card>

          <Button 
            onClick={() => { setCurrentView('list'); }} 
            variant="primary" 
            className="w-full py-3 font-semibold shadow-md"
          >
            Review Available Pitches
          </Button>
        </div>
      )}

      {/* MY RESERVATIONS VIEW */}
      {currentView === 'history' && (
        <Card hoverEffect={false} className="animate-in fade-in duration-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-semibold">
                  <th className="py-4 px-6">Booking ID</th>
                  <th className="py-4 px-4">Reserved Ground</th>
                  <th className="py-4 px-4">Allocated Date</th>
                  <th className="py-4 px-4">Time Slot</th>
                  <th className="py-4 px-4 text-right">Fee Charge</th>
                  <th className="py-4 px-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {myBookings.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-slate-400">
                      No reservations found for your account email.
                    </td>
                  </tr>
                ) : (
                  myBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 px-6 font-semibold text-slate-900">{b.id}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700">{b.turfName}</td>
                      <td className="py-3.5 px-4 text-slate-500">{b.date}</td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">{b.timeSlot} ({b.slotType})</td>
                      <td className="py-3.5 px-4 text-right font-bold text-slate-900">${b.amountPaid}.00</td>
                      <td className="py-3.5 px-6 text-center">
                        <Badge variant={
                          b.status === 'Confirmed' ? 'info' : 
                          b.status === 'Completed' ? 'success' : 'error'
                        }>
                          {b.status}
                        </Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
