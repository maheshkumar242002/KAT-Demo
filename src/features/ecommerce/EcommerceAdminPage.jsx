import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, DollarSign, Package, TrendingUp, AlertTriangle, 
  Plus, Edit, Eye, Trash2, CheckCircle, Truck, RefreshCw, BarChart, ArrowUpRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Button, Modal, Tabs } from '../../components/UI';
import { ResponsiveContainer, BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';

export default function EcommerceAdminPage() {
  const { 
    productsList, 
    ordersList, 
    addNotification 
  } = useApp();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [localOrders, setLocalOrders] = useState(ordersList);
  const [localProducts, setLocalProducts] = useState(productsList);

  // States for Modals
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    category: 'Equipment',
    price: '',
    stock: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop&q=80',
    rating: 5,
    reviews: 1,
    discountBadge: null
  });

  // Basic Metrics
  const totalSales = localOrders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = localOrders.length;
  const lowStockCount = localProducts.filter(p => p.stock < 15).length;
  const avgOrderValue = totalOrdersCount > 0 ? totalSales / totalOrdersCount : 0;

  // Chart data
  const topProductsChartData = localProducts.slice(0, 4).map(p => ({
    name: p.name.split(' ').slice(0, 2).join(' '),
    Sales: p.price * 25, // Mock quantity multiplier
    color: p.category === 'Almonds' ? '#2563EB' : '#10B981'
  }));

  const inventoryStockData = localProducts.map(p => ({
    name: p.name.split(' ').slice(0, 2).join(' '),
    Stock: p.stock,
    color: p.stock < 15 ? '#EF4444' : '#10B981'
  }));

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setLocalOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    addNotification("Order Status Updated", `Order ${orderId} has been set to ${newStatus}.`, "Store");
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    const newProd = {
      id: `p${localProducts.length + 1}`,
      name: newProductForm.name,
      category: newProductForm.category,
      price: parseFloat(newProductForm.price) || 0,
      stock: parseInt(newProductForm.stock) || 0,
      description: newProductForm.description,
      image: newProductForm.image,
      rating: 5,
      reviews: 1,
      discountBadge: newProductForm.discountBadge
    };

    setLocalProducts(prev => [newProd, ...prev]);
    setIsAddProductOpen(false);
    addNotification("New Product Added", `${newProd.name} listed at $${newProd.price.toFixed(2)}.`, "Store");

    // Reset Form
    setNewProductForm({
      name: '',
      category: 'Almonds',
      price: '',
      stock: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop&q=80',
      rating: 5,
      reviews: 1,
      discountBadge: null
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 tracking-tight">
            E-Commerce Store Admin
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            Control items, review purchase lists, and update inventory counts.
          </p>
        </div>
        <Button 
          onClick={() => setIsAddProductOpen(true)} 
          variant="primary" 
          size="sm"
          icon={Plus}
        >
          Add Catalog Item
        </Button>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={[
          { id: 'dashboard', label: 'Store overview' },
          { id: 'products', label: 'Inventory Catalog' },
          { id: 'orders', label: 'Customer Orders' }
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <div className="pt-2">
        {/* OVERVIEW TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Metric Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <Card className="p-5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase">Gross Product Sales</span>
                  <p className="text-2xl font-bold text-slate-950 mt-1">${totalSales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-primary">
                  <DollarSign className="w-5 h-5" />
                </div>
              </Card>

              <Card className="p-5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase">Total Orders Logged</span>
                  <p className="text-2xl font-bold text-slate-950 mt-1">{totalOrdersCount}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <ShoppingBag className="w-5 h-5" />
                </div>
              </Card>

              <Card className="p-5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase">Avg Order Value</span>
                  <p className="text-2xl font-bold text-slate-950 mt-1">${avgOrderValue.toFixed(2)}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </Card>

              <Card className="p-5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase">Low Stock Warnings</span>
                  <p className="text-2xl font-bold text-slate-950 mt-1">{lowStockCount} Items</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500">
                  <AlertTriangle className="w-5 h-5" />
                </div>
              </Card>
            </div>

            {/* Graphs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Top Products */}
              <div className="lg:col-span-6">
                <Card hoverEffect={false} className="h-full">
                  <CardHeader>
                    <CardTitle>Top Performing Products</CardTitle>
                    <CardDescription>Aggregate revenues calculated by product type.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-72 pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <ReBarChart data={topProductsChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                        <Bar dataKey="Sales" radius={[8, 8, 0, 0]} barSize={28}>
                          {topProductsChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </ReBarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Inventory Levels */}
              <div className="lg:col-span-6">
                <Card hoverEffect={false} className="h-full">
                  <CardHeader>
                    <CardTitle>Catalog Stock Count</CardTitle>
                    <CardDescription>Direct unit quantities remaining in warehouse.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-72 pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <ReBarChart data={inventoryStockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                        <Bar dataKey="Stock" radius={[8, 8, 0, 0]} barSize={28}>
                          {inventoryStockData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </ReBarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS MANAGEMENT TAB */}
        {activeTab === 'products' && (
          <Card hoverEffect={false}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-semibold">
                    <th className="py-4 px-6">Product Item</th>
                    <th className="py-4 px-4">Category</th>
                    <th className="py-4 px-4 text-right">Price</th>
                    <th className="py-4 px-4 text-center">Remaining Stock</th>
                    <th className="py-4 px-4 text-center">Stock Health</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {localProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-3">
                          <img 
                            src={prod.image} 
                            alt={prod.name} 
                            className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                          />
                          <div>
                            <div className="font-semibold text-slate-900">{prod.name}</div>
                            <div className="text-[10px] text-slate-400">ID: {prod.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-medium">{prod.category}</td>
                      <td className="py-3.5 px-4 text-right font-bold text-slate-900">${prod.price.toFixed(2)}</td>
                      <td className="py-3.5 px-4 text-center font-bold text-slate-700">{prod.stock} units</td>
                      <td className="py-3.5 px-4 text-center">
                        <Badge variant={
                          prod.stock >= 30 ? 'success' : 
                          prod.stock >= 15 ? 'warning' : 'error'
                        }>
                          {prod.stock >= 30 ? 'In Stock' : prod.stock >= 15 ? 'Low Stock' : 'Critical Stock'}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-6 text-right">
                        <div className="flex justify-end gap-1.5">
                          <button className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-50"><Edit className="w-4 h-4" /></button>
                          <button className="p-1 text-slate-400 hover:text-rose-500 rounded hover:bg-slate-50"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* ORDERS MANAGEMENT TAB */}
        {activeTab === 'orders' && (
          <Card hoverEffect={false}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-semibold">
                    <th className="py-4 px-6">Order ID</th>
                    <th className="py-4 px-4">Customer Details</th>
                    <th className="py-4 px-4">Order Items</th>
                    <th className="py-4 px-4 text-right">Charged</th>
                    <th className="py-4 px-4 text-center">Current Status</th>
                    <th className="py-4 px-6 text-right">Fulfillment Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {localOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 px-6 font-semibold text-slate-900">{order.id}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-700">{order.customer}</div>
                        <div className="text-[10px] text-slate-400">{order.email}</div>
                        <div className="text-[9px] text-slate-400 mt-0.5">Purchased: {order.date}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5">
                          {order.items.map(item => (
                            <span key={item.id} className="block text-[10px] text-slate-500 truncate max-w-xs">
                              • {item.name} (Qty: {item.quantity})
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-slate-900">${order.total.toFixed(2)}</td>
                      <td className="py-3.5 px-4 text-center">
                        <Badge variant={
                          order.status === 'Delivered' ? 'success' : 
                          order.status === 'Shipped' ? 'info' : 'warning'
                        }>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-6 text-right">
                        <div className="flex justify-end gap-1.5 scale-90 origin-right">
                          {order.status === 'Processing' && (
                            <Button 
                              onClick={() => handleUpdateOrderStatus(order.id, 'Shipped')}
                              variant="outline" 
                              size="sm"
                              icon={Truck}
                            >
                              Ship
                            </Button>
                          )}
                          {order.status === 'Shipped' && (
                            <Button 
                              onClick={() => handleUpdateOrderStatus(order.id, 'Delivered')}
                              variant="accent" 
                              size="sm"
                              icon={CheckCircle}
                            >
                              Deliver
                            </Button>
                          )}
                          {order.status === 'Delivered' && (
                            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-lg">Completed</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>

      {/* ADD CATALOG PRODUCT MODAL */}
      <Modal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        title="Add Product to Store Catalog"
      >
        <form onSubmit={handleAddProductSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-600">Product Name</label>
            <input
              type="text"
              required
              value={newProductForm.name}
              onChange={(e) => setNewProductForm(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none"
              placeholder="e.g. Pro Kick Soccer Socks"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-600">Category</label>
              <select
                value={newProductForm.category}
                onChange={(e) => setNewProductForm(prev => ({ ...prev, category: e.target.value }))}
                className="w-full p-2 border border-slate-200 rounded-lg bg-white focus:outline-none"
              >
                <option value="Almonds">Almonds</option>
                <option value="Pistachios">Pistachios</option>
                <option value="Cashews">Cashews</option>
                <option value="Walnuts">Walnuts</option>
                <option value="Raisins">Raisins</option>
                <option value="Assorted">Assorted</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-600">Discount Badge</label>
              <input
                type="text"
                value={newProductForm.discountBadge || ''}
                onChange={(e) => setNewProductForm(prev => ({ ...prev, discountBadge: e.target.value || null }))}
                className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none"
                placeholder="e.g. 20% OFF or null"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-600">Price ($)</label>
              <input
                type="number"
                step="0.01"
                required
                value={newProductForm.price}
                onChange={(e) => setNewProductForm(prev => ({ ...prev, price: e.target.value }))}
                className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none"
                placeholder="24.99"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-600">Stock Count</label>
              <input
                type="number"
                required
                value={newProductForm.stock}
                onChange={(e) => setNewProductForm(prev => ({ ...prev, stock: e.target.value }))}
                className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none"
                placeholder="50"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-600">Description</label>
            <textarea
              value={newProductForm.description}
              onChange={(e) => setNewProductForm(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none h-20"
              placeholder="Provide product specs and features details..."
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-2.5">
            <Button type="button" onClick={() => setIsAddProductOpen(false)} variant="outline" size="sm">Cancel</Button>
            <Button type="submit" variant="primary" size="sm">Add Product</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
