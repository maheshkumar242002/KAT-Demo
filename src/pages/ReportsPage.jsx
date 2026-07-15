import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, FileSpreadsheet, FileDown, Calendar, Filter, 
  Download, Loader2, CheckCircle2, TrendingUp, DollarSign, Users, RefreshCw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Button } from '../components/UI';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function ReportsPage() {
  const { studentsList, ordersList, bookingsList } = useApp();
  
  // Date range picker mock states
  const [startDate, setStartDate] = useState('2026-06-01');
  const [endDate, setEndDate] = useState('2026-07-30');
  const [businessFilter, setBusinessFilter] = useState('All');
  
  // Export loader states
  const [exportingType, setExportingType] = useState(null); // 'pdf' | 'excel' | 'csv' | null
  const [toastMessage, setToastMessage] = useState(null);

  // Financial aggregates
  const academyIncome = studentsList.filter(s => s.feeStatus === 'Paid').length * 450;
  const storeIncome = ordersList.reduce((sum, o) => sum + o.total, 0);
  const turfIncome = bookingsList.filter(b => b.status !== 'Cancelled').reduce((sum, b) => sum + b.amountPaid, 0);
  const grossTotal = academyIncome + storeIncome + turfIncome;

  const chartData = [
    { name: 'Football Academy', Revenue: academyIncome, Target: 10000 },
    { name: 'Cricket Academy', Revenue: studentsList.filter(s => s.sport === 'Cricket' && s.feeStatus === 'Paid').length * 450, Target: 8000 },
    { name: 'E-Commerce Store', Revenue: storeIncome, Target: 12000 },
    { name: 'Turf Bookings', Revenue: turfIncome, Target: 15000 }
  ];

  const handleExport = (type) => {
    setExportingType(type);
    
    // Simulate generation delay
    setTimeout(() => {
      setExportingType(null);
      setToastMessage(`Report compiled successfully. ${type.toUpperCase()} file download initiated.`);
      
      // Auto-dismiss toast
      setTimeout(() => {
        setToastMessage(null);
      }, 3500);
    }, 1500);
  };

  return (
    <div className="space-y-8 relative">
      {/* Dynamic Toast Alert */}
      {toastMessage && (
        <motion.div 
          initial={{ opacity: 0, y: -20, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -20, x: '-50%' }}
          className="fixed top-20 left-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-premium-lg border border-white/10 flex items-center gap-3 text-xs font-semibold glass-effect-dark"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 animate-bounce" />
          <span>{toastMessage}</span>
        </motion.div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 tracking-tight">
            Financial & Operational Reports
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            Export structured audits and review core performance charts.
          </p>
        </div>
      </div>

      {/* Filtering Controls */}
      <Card hoverEffect={false} className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap items-center gap-4 text-xs w-full md:w-auto">
          {/* Start Date */}
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-500 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> From:</span>
            <input 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-slate-200 bg-white rounded-lg py-1 px-2.5 text-xs focus:outline-none"
            />
          </div>
          
          {/* End Date */}
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-500 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> To:</span>
            <input 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-slate-200 bg-white rounded-lg py-1 px-2.5 text-xs focus:outline-none"
            />
          </div>

          {/* Sector */}
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-500 flex items-center gap-1"><Filter className="w-3.5 h-3.5" /> Segment:</span>
            <select 
              value={businessFilter} 
              onChange={(e) => setBusinessFilter(e.target.value)}
              className="border border-slate-200 bg-white rounded-lg py-1 px-2.5 text-xs focus:outline-none"
            >
              <option value="All">All Operations</option>
              <option value="Academy">Academy</option>
              <option value="Store">E-Commerce</option>
              <option value="Turf">Turf Bookings</option>
            </select>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex gap-2 w-full md:w-auto">
          {/* PDF */}
          <Button
            onClick={() => handleExport('pdf')}
            disabled={exportingType !== null}
            variant="outline"
            size="sm"
            icon={exportingType === 'pdf' ? Loader2 : FileDown}
            className="flex-1 md:flex-none"
          >
            {exportingType === 'pdf' ? "PDF Compile..." : "Export PDF"}
          </Button>

          {/* Excel */}
          <Button
            onClick={() => handleExport('excel')}
            disabled={exportingType !== null}
            variant="outline"
            size="sm"
            icon={exportingType === 'excel' ? Loader2 : FileSpreadsheet}
            className="flex-1 md:flex-none"
          >
            {exportingType === 'excel' ? "Excel Compile..." : "Export Excel"}
          </Button>

          {/* CSV */}
          <Button
            onClick={() => handleExport('csv')}
            disabled={exportingType !== null}
            variant="outline"
            size="sm"
            icon={exportingType === 'csv' ? Loader2 : Download}
            className="flex-1 md:flex-none"
          >
            {exportingType === 'csv' ? "CSV Compile..." : "Export CSV"}
          </Button>
        </div>
      </Card>

      {/* Aggregate Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card className="p-5 flex items-center justify-between border-l-4 border-l-blue-600">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">Gross Aggregate Turnover</span>
            <p className="text-2xl font-bold text-slate-900 mt-1">${grossTotal.toLocaleString()}.00</p>
          </div>
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100">
            <DollarSign className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between border-l-4 border-l-emerald-500">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">Settled Invoices</span>
            <p className="text-2xl font-bold text-slate-900 mt-1">{studentsList.filter(s => s.feeStatus === 'Paid').length + ordersList.length + bookingsList.filter(b => b.status === 'Completed').length} receipts</p>
          </div>
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center border border-emerald-100">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between border-l-4 border-l-amber-500">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">Utilization efficiency</span>
            <p className="text-2xl font-bold text-slate-900 mt-1">94.8%</p>
          </div>
          <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center border border-amber-100">
            <TrendingUp className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* Interactive Charts comparison */}
      <Card hoverEffect={false}>
        <CardHeader>
          <CardTitle>Division Target vs Actual Revenue</CardTitle>
          <CardDescription>Performance values against corporate milestones.</CardDescription>
        </CardHeader>
        <CardContent className="h-80 pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="Revenue" fill="#2563EB" radius={[6, 6, 0, 0]} barSize={36} name="Actual Revenue ($)" />
              <Bar dataKey="Target" fill="#94A3B8" opacity={0.3} radius={[6, 6, 0, 0]} barSize={36} name="Quota Target ($)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
