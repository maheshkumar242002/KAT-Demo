import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, Heart, Star, CheckCircle, Search, 
  ArrowRight, ShieldCheck, CreditCard, ChevronRight, X, ShoppingCart, Plus, Minus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card, Badge, Button, Modal } from '../../components/UI';


export default function EcommerceUserPage({ view }) {
  const { 
    productsList, 
    cart, 
    addToCart, 
    wishlist, 
    toggleWishlist, 
    placeOrder 
  } = useApp();

  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState(view || 'shop'); // 'shop' | 'checkout' | 'success'
  const [placedOrderDetails, setPlacedOrderDetails] = useState(null);

  useEffect(() => {
    if (view) {
      setCurrentView(view);
    } else {
      setCurrentView('shop');
    }
  }, [view]);
  
  // Catalog filters
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Quick View Product
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickViewQty, setQuickViewQty] = useState(1);

  // Form states for checkout
  const [billingForm, setBillingForm] = useState({
    name: 'Sarah Connor',
    email: 'sarah.c@skyline.org',
    address: '42 Techno Dr, Suite 500',
    city: 'Palo Alto',
    zip: '94301',
    cardName: 'Sarah Connor',
    cardNumber: '4111 2222 3333 4444',
    cardExpiry: '12/28',
    cardCvc: '189'
  });

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const categories = ['All', 'Almonds', 'Pistachios', 'Cashews', 'Walnuts', 'Raisins', 'Assorted'];

  // Filtering products
  const filteredProducts = productsList.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    const order = placeOrder(billingForm);
    setPlacedOrderDetails(order);
    setCurrentView('success');
  };

  const handleQuickViewAdd = () => {
    addToCart(quickViewProduct, quickViewQty);
    setQuickViewProduct(null);
    setQuickViewQty(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* SHOP VIEW */}
      {currentView === 'shop' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Hero Banner */}
          <div className="relative rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 text-white p-8 md:p-12 overflow-hidden shadow-premium">
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-80 h-80 bg-white/10 rounded-full blur-2xl" />
            <div className="relative z-10 max-w-lg space-y-4">
              <Badge variant="dark" className="bg-white/20 border-transparent text-white font-semibold">
                ★ Midseason Gear Sale
              </Badge>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight leading-tight">
                Unlock High Performance Gear
              </h2>
              <p className="text-sm text-blue-100 leading-relaxed font-normal">
                Official KAT academy apparel, English Willow bats, premium footballs, and high-traction turf cleats.
              </p>
              <Button 
                onClick={() => {
                  const target = document.getElementById('catalog-start');
                  target?.scrollIntoView({ behavior: 'smooth' });
                }}
                variant="accent" 
                size="md"
                className="mt-2"
              >
                Browse Catalog
              </Button>
            </div>
          </div>

          {/* Catalog Controls */}
          <div id="catalog-start" className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 border border-slate-100 rounded-2xl shadow-premium">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search catalog items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
                    selectedCategory === cat 
                      ? 'bg-slate-900 border-slate-900 text-white' 
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <ShoppingBag className="w-12 h-12 text-slate-350 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">No gear items match your searches.</p>
              </div>
            ) : (
              filteredProducts.map((prod) => {
                const isWishlisted = wishlist.some(w => w.id === prod.id);
                return (
                  <Card 
                    key={prod.id} 
                    className="flex flex-col justify-between h-full p-4 relative group"
                    hoverEffect={true}
                  >
                    <div>
                      {/* Image Frame */}
                      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-50 border border-slate-100 mb-4">
                        <img 
                          src={prod.image} 
                          alt={prod.name} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {prod.discountBadge && (
                          <Badge variant="error" className="absolute top-2.5 left-2.5 font-bold">
                            {prod.discountBadge}
                          </Badge>
                        )}
                        <button
                          onClick={() => toggleWishlist(prod)}
                          className={`absolute top-2.5 right-2.5 p-2 rounded-xl border backdrop-blur-md shadow-premium-lg transition-all ${
                            isWishlisted 
                              ? 'bg-rose-50 border-rose-100 text-rose-500' 
                              : 'bg-white/80 border-white/40 text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          <Heart className="w-4 h-4 fill-current" />
                        </button>
                      </div>

                      {/* Info */}
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 font-semibold uppercase">{prod.category}</span>
                        <h4 
                          onClick={() => setQuickViewProduct(prod)}
                          className="font-semibold text-slate-900 text-sm leading-snug group-hover:text-primary cursor-pointer hover:underline transition-colors truncate"
                        >
                          {prod.name}
                        </h4>
                        
                        {/* Rating */}
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                          <span className="text-xs font-bold text-slate-700">{prod.rating}</span>
                          <span className="text-[10px] text-slate-400">({prod.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base font-bold text-slate-900">${prod.price.toFixed(2)}</span>
                        {prod.originalPrice > prod.price && (
                          <span className="text-xs text-slate-400 line-through">${prod.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                      <Button 
                        onClick={() => addToCart(prod)}
                        variant="primary" 
                        size="sm"
                        className="scale-90"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* CHECKOUT VIEW */}
      {currentView === 'checkout' && (
        <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom duration-250">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-2">
            <button onClick={() => navigate('/ecommerce')} className="hover:text-slate-800">Shop Catalog</button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-800">Payment Checkout</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Form */}
            <div className="md:col-span-7">
              <Card hoverEffect={false}>
                <h3 className="font-display font-semibold text-lg text-slate-900 border-b border-slate-100 pb-3 mb-5">
                  Secure Checkout Billing
                </h3>
                <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-600">Full Name</label>
                    <input
                      type="text"
                      required
                      value={billingForm.name}
                      onChange={(e) => setBillingForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-600">Email Address</label>
                    <input
                      type="email"
                      required
                      value={billingForm.email}
                      onChange={(e) => setBillingForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-600">Delivery Address</label>
                    <input
                      type="text"
                      required
                      value={billingForm.address}
                      onChange={(e) => setBillingForm(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-600">City</label>
                      <input
                        type="text"
                        required
                        value={billingForm.city}
                        onChange={(e) => setBillingForm(prev => ({ ...prev, city: e.target.value }))}
                        className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-600">Zip Code</label>
                      <input
                        type="text"
                        required
                        value={billingForm.zip}
                        onChange={(e) => setBillingForm(prev => ({ ...prev, zip: e.target.value }))}
                        className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Payment */}
                  <div className="border-t border-slate-100 pt-4.5 space-y-4">
                    <h4 className="font-semibold text-slate-500 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-primary" /> Credit Card Details
                    </h4>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-600">Name on Card</label>
                      <input
                        type="text"
                        required
                        value={billingForm.cardName}
                        onChange={(e) => setBillingForm(prev => ({ ...prev, cardName: e.target.value }))}
                        className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-600">Card Number</label>
                      <input
                        type="text"
                        required
                        value={billingForm.cardNumber}
                        onChange={(e) => setBillingForm(prev => ({ ...prev, cardNumber: e.target.value }))}
                        className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-600">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          required
                          value={billingForm.cardExpiry}
                          onChange={(e) => setBillingForm(prev => ({ ...prev, cardExpiry: e.target.value }))}
                          className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-600">CVC Code</label>
                        <input
                          type="text"
                          required
                          value={billingForm.cardCvc}
                          onChange={(e) => setBillingForm(prev => ({ ...prev, cardCvc: e.target.value }))}
                          className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    variant="primary"
                    className="w-full shadow-md py-3 text-sm mt-4 font-semibold"
                  >
                    Confirm Purchase (${cartTotal.toFixed(2)})
                  </Button>
                </form>
              </Card>
            </div>

            {/* Cart Summary */}
            <div className="md:col-span-5 space-y-4">
              <Card hoverEffect={false}>
                <h3 className="font-display font-semibold text-sm text-slate-900 border-b border-slate-100 pb-3 mb-4">
                  Cart Breakdown
                </h3>
                <div className="space-y-3.5 max-h-64 overflow-y-auto pr-1">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-xs text-slate-600 gap-2 border-b border-slate-50 pb-2">
                      <div className="truncate max-w-[70%]">
                        <span className="font-semibold text-slate-800">{item.name}</span>
                        <span className="text-[10px] text-slate-400 block">Qty: {item.quantity} x ${item.price}</span>
                      </div>
                      <span className="font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-100 pt-4 mt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-500"><span>Subtotal</span> <span className="font-semibold text-slate-800">${cartTotal.toFixed(2)}</span></div>
                  <div className="flex justify-between text-slate-500"><span>Estimated Shipping</span> <span className="font-semibold text-slate-800">FREE</span></div>
                  <div className="flex justify-between text-slate-500"><span>Taxes</span> <span className="font-semibold text-slate-800">Calculated</span></div>
                  <hr className="border-slate-100 my-2" />
                  <div className="flex justify-between items-baseline text-sm font-bold text-slate-900">
                    <span>Total Due</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              </Card>
              <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 flex items-start gap-2.5 text-[11px] text-slate-500">
                <ShieldCheck className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">Payments are securely encrypted under our PCI DSS enterprise certification framework.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ORDER SUCCESS VIEW */}
      {currentView === 'success' && placedOrderDetails && (
        <div className="max-w-md mx-auto py-12 text-center space-y-6 animate-in zoom-in duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-500 shadow-md">
            <CheckCircle className="w-8 h-8" />
          </div>
          
          <div className="space-y-2">
            <h2 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">Order Logged Successfully!</h2>
            <p className="text-xs text-slate-400">Thank you for your purchase. Your invoice receipt has been finalized.</p>
          </div>

          <Card hoverEffect={false} className="p-5 text-xs text-left space-y-3 bg-slate-50/50">
            <div className="flex justify-between font-mono text-[10px] text-slate-400">
              <span>ORDER TICKET ID</span> <span>{placedOrderDetails.id}</span>
            </div>
            <hr className="border-slate-150" />
            <div className="space-y-1.5">
              <p className="font-semibold text-slate-700">Shipping To:</p>
              <p className="text-slate-500">{billingForm.name}</p>
              <p className="text-slate-500">{billingForm.address}, {billingForm.city} ({billingForm.zip})</p>
            </div>
            <hr className="border-slate-150" />
            <div className="flex justify-between items-baseline">
              <span className="font-bold text-slate-700">Amount Charged</span>
              <span className="text-sm font-extrabold text-slate-900">${placedOrderDetails.total.toFixed(2)}</span>
            </div>
          </Card>

          <Button 
            onClick={() => { navigate('/ecommerce'); }} 
            variant="primary" 
            className="w-full py-3 font-semibold shadow-md"
          >
            Continue Gear Shopping
          </Button>
        </div>
      )}

      {/* QUICK VIEW PRODUCT MODAL */}
      <Modal
        isOpen={quickViewProduct !== null}
        onClose={() => { setQuickViewProduct(null); setQuickViewQty(1); }}
        title="Sports Gear Details"
        size="lg"
      >
        {quickViewProduct && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-xs text-slate-600">
            {/* Image */}
            <div className="md:col-span-5 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden aspect-square">
              <img src={quickViewProduct.image} alt={quickViewProduct.name} className="w-full h-full object-cover" />
            </div>

            {/* Details */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div>
                  <Badge variant="secondary">{quickViewProduct.category}</Badge>
                  <h3 className="font-display font-semibold text-slate-900 text-lg mt-1">{quickViewProduct.name}</h3>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  <span className="font-bold text-slate-800">{quickViewProduct.rating}</span>
                  <span className="text-slate-400">({quickViewProduct.reviews} reviews)</span>
                </div>

                <p className="leading-relaxed text-slate-500">{quickViewProduct.description}</p>
                
                <div className="text-base font-bold text-slate-900">
                  Price: ${quickViewProduct.price.toFixed(2)}
                </div>
              </div>

              {/* Quantity Selection */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-1 bg-white">
                  <button 
                    onClick={() => setQuickViewQty(q => Math.max(1, q - 1))}
                    className="p-1 hover:bg-slate-50 rounded"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-bold text-sm text-center w-6">{quickViewQty}</span>
                  <button 
                    onClick={() => setQuickViewQty(q => q + 1)}
                    className="p-1 hover:bg-slate-50 rounded"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                
                <Button 
                  onClick={handleQuickViewAdd} 
                  variant="primary" 
                  icon={ShoppingCart}
                  className="flex-1"
                >
                  Add To Basket
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Float Checkout Shortcut Banner if cart has items and in shop view */}
      {cart.length > 0 && currentView === 'shop' && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 max-w-md w-[90%] bg-slate-950 text-white p-4.5 rounded-2xl shadow-premium-lg border border-white/10 flex items-center justify-between glass-effect-dark">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-primary/20 text-primary border border-primary/20 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-4.5 h-4.5" />
            </div>
            <div className="text-xs">
              <p className="font-bold">{cartItemsCount} Sports Items In Cart</p>
              <p className="text-[10px] text-slate-400">Total Charged: ${cartTotal.toFixed(2)}</p>
            </div>
          </div>
          <Button 
            onClick={() => setCurrentView('checkout')}
            variant="accent"
            size="sm"
            icon={ArrowRight}
            iconPosition="right"
          >
            Checkout Now
          </Button>
        </div>
      )}
    </div>
  );
}
