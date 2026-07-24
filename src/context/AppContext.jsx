import React, { createContext, useContext, useState } from 'react';
import {
  students as initialStudents,
  coaches as initialCoaches,
  products as initialProducts,
  orders as initialOrders,
  bookings as initialBookings,
  notifications as initialNotifications,
  activityTimeline as initialTimeline,
  turfs as initialTurfs
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Database state
  const [studentsList, setStudentsList] = useState(initialStudents);
  const [coachesList, setCoachesList] = useState(initialCoaches);
  const [productsList, setProductsList] = useState(initialProducts);
  const [ordersList, setOrdersList] = useState(initialOrders);
  const [bookingsList, setBookingsList] = useState(initialBookings);
  const [turfsList, setTurfsList] = useState(initialTurfs);
  const [notificationList, setNotificationList] = useState(initialNotifications);
  const [timeline, setTimeline] = useState(initialTimeline);

  // E-commerce user state
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // System settings state
  const [settings, setSettings] = useState({
    companyName: "KAT Groups Management System",
    email: "admin@kat-groups.com",
    phone: "+1 (555) 019-2834",
    currency: "USD",
    taxRate: 18,
    paymentGateway: "Stripe",
    smsGateway: "Twilio",
    enableNotifications: true,
    accentColor: "#2563EB",
    logoUrl: ""
  });

  // Notifications functions
  const addNotification = (title, message, category = "System") => {
    const newNotif = {
      id: `n_${Date.now()}`,
      title,
      message,
      category,
      read: false,
      timestamp: "Just now"
    };
    setNotificationList(prev => [newNotif, ...prev]);
  };

  const markAllNotificationsRead = () => {
    setNotificationList(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markNotificationRead = (id) => {
    setNotificationList(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  // Cart functions
  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + qty } : item);
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity: qty } : item));
  };

  const clearCart = () => setCart([]);

  // Wishlist functions
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  // Checkout flow
  const placeOrder = (customerDetails) => {
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: customerDetails.name,
      email: customerDetails.email,
      date: new Date().toISOString().split('T')[0],
      items: cart.map(item => ({ id: item.id, name: item.name, quantity: item.quantity, price: item.price })),
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      status: "Processing"
    };

    setOrdersList(prev => [newOrder, ...prev]);
    addNotification("New E-Commerce Order", `${customerDetails.name} placed order ${newOrder.id} for $${newOrder.total.toFixed(2)}.`, "Store");

    // Log in timeline
    const newAct = {
      id: `act_${Date.now()}`,
      type: "Store",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      user: customerDetails.name,
      desc: `Placed order ${newOrder.id} in store.`
    };
    setTimeline(prev => [newAct, ...prev]);
    clearCart();
    return newOrder;
  };

  // Turf booking flow
  const placeBooking = (bookingDetails) => {
    const newBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      turfId: bookingDetails.turfId,
      turfName: bookingDetails.turfName,
      customerName: bookingDetails.name,
      customerEmail: bookingDetails.email,
      date: bookingDetails.date,
      timeSlot: bookingDetails.timeSlot,
      slotType: bookingDetails.slotType,
      amountPaid: bookingDetails.price,
      status: "Confirmed"
    };

    setBookingsList(prev => [newBooking, ...prev]);
    addNotification("New Turf Booking", `${bookingDetails.name} booked ${bookingDetails.turfName} on ${bookingDetails.date} at ${bookingDetails.timeSlot}.`, "Turf");

    // Log in timeline
    const newAct = {
      id: `act_${Date.now()}`,
      type: "Turf",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      user: bookingDetails.name,
      desc: `Booked ${bookingDetails.turfName} for $${bookingDetails.price}.`
    };
    setTimeline(prev => [newAct, ...prev]);
    return newBooking;
  };

  // Academy admin functions
  const addStudent = (student) => {
    const newStudent = {
      id: `s${studentsList.length + 1}`,
      ...student,
      joinDate: new Date().toISOString().split('T')[0],
      timeline: [{ id: `t_${Date.now()}`, date: new Date().toISOString().split('T')[0], title: "Enrolled in Academy", desc: `Successfully enrolled in the ${student.assignedBatch} batch.` }]
    };
    setStudentsList(prev => [newStudent, ...prev]);
    addNotification("New Student Enrolled", `${student.name} joined the ${student.assignedBatch} academy.`, "Academy");
  };

  const updateStudentFeeStatus = (studentId, status) => {
    setStudentsList(prev => prev.map(s => {
      if (s.id === studentId) {
        const updatedTimeline = [
          { id: `t_fee_${Date.now()}`, date: new Date().toISOString().split('T')[0], title: `Fee Status Updated`, desc: `Fee status changed to ${status}.` },
          ...s.timeline
        ];
        return { ...s, feeStatus: status, timeline: updatedTimeline };
      }
      return s;
    }));
    addNotification("Student Fee Status Updated", `Fee status for Student ID ${studentId} updated to ${status}.`, "Academy");
  };

  return (
    <AppContext.Provider value={{
      studentsList,
      coachesList,
      productsList,
      ordersList,
      bookingsList,
      turfsList,
      notificationList,
      timeline,
      cart,
      wishlist,
      settings,
      setSettings,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      toggleWishlist,
      placeOrder,
      placeBooking,
      addStudent,
      updateStudentFeeStatus,
      addNotification,
      markAllNotificationsRead,
      markNotificationRead
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
