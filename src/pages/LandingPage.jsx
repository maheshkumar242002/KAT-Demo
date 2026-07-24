import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  GraduationCap, ShoppingBag, CalendarDays, BarChart3, 
  CreditCard, Bell, ShieldAlert, Activity, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { Button, Card, CardTitle, CardDescription, Badge } from '../components/UI';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    { name: 'Academy Management', desc: 'Complete registry for students, coaches, batch schedules, attendance trackers, and fee structures.', icon: GraduationCap, color: 'text-blue-500 bg-blue-50 border-blue-100' },
    { name: 'E-Commerce Portal', desc: 'Dynamic digital storefront for sportswear and equipment, backed by full inventory and order tracking.', icon: ShoppingBag, color: 'text-amber-500 bg-amber-50 border-amber-100' },
    { name: 'Turf Bookings', desc: 'Live booking timeline with scheduling slots, automated price computation, and digital invoice payment.', icon: CalendarDays, color: 'text-emerald-500 bg-emerald-50 border-emerald-100' },
    { name: 'Interactive Reports', desc: 'Consolidated analytical reviews of payments, member counts, and inventory status with PDF/CSV exports.', icon: BarChart3, color: 'text-purple-500 bg-purple-50 border-purple-100' },
    { name: 'Unified Payments', desc: 'Secure billing gateway configurations with multi-tax (GST) calculations and fee collection summaries.', icon: CreditCard, color: 'text-rose-500 bg-rose-50 border-rose-100' },
    { name: 'Smart Notifications', desc: 'Real-time alert notifications for inventory thresholds, booking updates, and enrollment alerts.', icon: Bell, color: 'text-cyan-500 bg-cyan-50 border-cyan-100' },
    { name: 'Role Management', desc: 'Granular workspace authorizations (Admin, Editor, Staff) with checkbox access controls.', icon: ShieldAlert, color: 'text-slate-600 bg-slate-100 border-slate-200' },
    { name: 'Advanced Analytics', desc: 'Real-time sales, utilization, and attendance graphs tracking business performance.', icon: Activity, color: 'text-indigo-500 bg-indigo-50 border-indigo-100' }
  ];

  const stats = [
    { value: '500+', label: 'Students', sub: 'Football & Cricket Academy' },
    { value: '200+', label: 'Products', sub: 'Active Store Inventory' },
    { value: '1500+', label: 'Bookings', sub: 'Completed Turf Hours' },
    { value: '99.9%', label: 'Uptime', sub: 'Enterprise SLA Guarantee' }
  ];

  return (
    <div className="overflow-x-hidden bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-36 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <Badge variant="success" className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              ✦ Release v2.4 Active
            </Badge>
            <h1 className="font-display font-extrabold text-slate-900 tracking-tight leading-[1.1] text-4xl sm:text-5xl md:text-6xl">
              One Platform. <br />
              <span className="text-primary bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Multiple Businesses.
              </span>
            </h1>
            <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Manage Football Academy, Cricket Academy, Turf Booking and E-Commerce from one centralized, enterprise-grade cloud workspace.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Button 
                onClick={() => navigate('/admin/dashboard')} 
                variant="primary" 
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                className="shadow-premium transition-transform hover:scale-[1.02]"
              >
                View Live Demo
              </Button>
              <Button 
                onClick={() => navigate('/login')} 
                variant="outline" 
                size="lg"
                className="bg-white hover:bg-slate-50"
              >
                Super Admin Login
              </Button>
            </div>
            
            {/* Value Props */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-6 text-xs text-slate-500 font-semibold">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> No Card Required</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Instant Sandbox Setup</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Multi-Tenant Architecture</span>
            </div>
          </div>

          {/* Hero Right: Premium CSS Mockup of Dashboard */}
          <div className="lg:col-span-6 relative">
            {/* Background Glow */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-blue-500/10 to-emerald-500/10 blur-2xl -z-10" />
            
            {/* Mockup Frame */}
            <div className="bg-[#0F172A] rounded-2xl p-4 shadow-premium-lg border border-slate-800 relative overflow-hidden aspect-[4/3] flex flex-col">
              {/* Header Dots */}
              <div className="flex items-center gap-1.5 mb-3">
                <div className="w-3 h-3 rounded-full bg-rose-500/70" />
                <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                <div className="text-[10px] text-slate-500 ml-2 font-mono">https://dashboard.kat-management.com</div>
              </div>

              {/* Layout Content */}
              <div className="flex-grow flex gap-3 overflow-hidden text-slate-400">
                {/* Mini Sidebar */}
                <div className="w-16 md:w-20 bg-slate-900/50 rounded-xl p-2 flex flex-col gap-2.5 items-center">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-bold font-display">K</div>
                  <div className="w-full h-px bg-slate-800" />
                  <div className="w-6 h-6 rounded-md bg-slate-800/80 flex items-center justify-center text-slate-500"><GraduationCap className="w-3.5 h-3.5" /></div>
                  <div className="w-6 h-6 rounded-md bg-slate-800/80 flex items-center justify-center text-slate-500"><ShoppingBag className="w-3.5 h-3.5" /></div>
                  <div className="w-6 h-6 rounded-md bg-slate-800/80 flex items-center justify-center text-slate-500"><CalendarDays className="w-3.5 h-3.5" /></div>
                  <div className="w-6 h-6 rounded-md bg-slate-800/80 flex items-center justify-center text-slate-500"><BarChart3 className="w-3.5 h-3.5" /></div>
                </div>

                {/* Dashboard Main Mockup */}
                <div className="flex-1 flex flex-col gap-3 overflow-hidden">
                  {/* Top Bar */}
                  <div className="bg-slate-900/30 border border-slate-800 rounded-xl px-3 py-2 flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-slate-400">Operations Overview</span>
                    <div className="w-4 h-4 rounded-full bg-blue-500" />
                  </div>

                  {/* Cards Grid */}
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-2.5 flex flex-col">
                      <span className="text-[8px] text-slate-500">REVENUE</span>
                      <span className="text-xs font-bold text-white mt-1">$45,280</span>
                      <span className="text-[8px] text-emerald-400 mt-0.5">▲ 12.4%</span>
                    </div>
                    <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-2.5 flex flex-col">
                      <span className="text-[8px] text-slate-500">BOOKINGS</span>
                      <span className="text-xs font-bold text-white mt-1">1,500</span>
                      <span className="text-[8px] text-emerald-400 mt-0.5">▲ 8.1%</span>
                    </div>
                    <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-2.5 flex flex-col">
                      <span className="text-[8px] text-slate-500">ACTIVE STD</span>
                      <span className="text-xs font-bold text-white mt-1">512</span>
                      <span className="text-[8px] text-rose-400 mt-0.5">▼ 2.3%</span>
                    </div>
                  </div>

                  {/* Chart and Table Panel */}
                  <div className="flex-grow grid grid-cols-12 gap-3 overflow-hidden">
                    {/* Mock Chart */}
                    <div className="col-span-7 bg-slate-900/30 border border-slate-800 rounded-xl p-2.5 flex flex-col justify-between">
                      <span className="text-[8px] text-slate-500">MONTHLY INCOME TREND</span>
                      <div className="h-16 flex items-end gap-1.5 pb-1">
                        <div className="w-full bg-slate-800 rounded-t h-[40%]" />
                        <div className="w-full bg-slate-800 rounded-t h-[55%]" />
                        <div className="w-full bg-slate-800 rounded-t h-[70%]" />
                        <div className="w-full bg-primary rounded-t h-[85%]" />
                        <div className="w-full bg-primary rounded-t h-[95%]" />
                      </div>
                    </div>

                    {/* Quick Activity List */}
                    <div className="col-span-5 bg-slate-900/30 border border-slate-800 rounded-xl p-2.5 flex flex-col gap-1.5 overflow-hidden">
                      <span className="text-[8px] text-slate-500">LATEST NOTIFICATIONS</span>
                      <div className="space-y-1.5">
                        <div className="h-2 bg-slate-850 rounded w-full" />
                        <div className="h-2 bg-slate-850 rounded w-10/12" />
                        <div className="h-2 bg-slate-850 rounded w-8/12" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Counter Statistics Section */}
      <section className="bg-white border-y border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="space-y-1.5"
              >
                <div className="font-display font-extrabold text-3xl md:text-4xl text-slate-900">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-slate-700">{stat.label}</div>
                <div className="text-[11px] text-slate-400">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="font-display font-bold text-3xl text-slate-900">
            Enterprise SaaS Features
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            All your operations, inventory tracking, financial analytics, and workspace access rules integrated in a modern UI dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:-translate-y-1 hover:shadow-premium-lg transition-all flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${feature.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-slate-900 text-base">{feature.name}</CardTitle>
                    <CardDescription className="text-xs text-slate-500 leading-normal">
                      {feature.desc}
                    </CardDescription>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Interactive CTA Section */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto text-center px-6 space-y-8 relative z-10">
          <h2 className="font-display font-bold text-3xl sm:text-4xl leading-tight">
            Ready to streamline your sports business?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Experience the mock portal workspace now. No credentials needed to view the live dashboard demo panel.
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              onClick={() => navigate('/admin/dashboard')} 
              variant="accent" 
              size="lg"
              className="px-8 font-semibold shadow-lg hover:shadow-emerald-500/20"
            >
              Start Live Sandbox
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
