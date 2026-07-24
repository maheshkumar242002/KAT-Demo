import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button, Card } from '../components/UI';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@kat-groups.com');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      navigate('/admin/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen w-screen bg-[#F8FAFC] flex items-center justify-center p-4 md:p-0">
      <div className="max-w-5xl w-full h-[600px] bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-premium-lg grid grid-cols-1 md:grid-cols-12">
        {/* Left Side: Testimonial & Graphics */}
        <div className="hidden md:flex md:col-span-5 bg-gradient-to-tr from-slate-900 via-[#0F172A] to-slate-800 p-8 flex-col justify-between relative text-white">
          {/* Subtle mesh background grid */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-base font-display">
                E
              </div>
              <span className="font-display font-bold text-lg tracking-wider">KAT Groups</span>
            </div>
            <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Enterprise cloud suite</p>
          </div>

          {/* Floating graphic mock */}
          <div className="relative z-10 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5 space-y-3.5 my-8">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-300">Sandbox Database Connect</span>
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-1.5 bg-white/20 rounded-full w-full" />
              <div className="h-1.5 bg-white/20 rounded-full w-4/5" />
              <div className="h-1.5 bg-white/10 rounded-full w-3/5" />
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
              <span>db_sync: OK</span>
              <span>latency: 18ms</span>
            </div>
          </div>

          <div className="relative z-10 space-y-4">
            <p className="text-xs italic text-slate-300 leading-relaxed font-light">
              "Switching our multi-facility academy operations and e-commerce distribution to KAT reduced overhead by 40%. The calendar bookings are absolute magic."
            </p>
            <div>
              <p className="text-xs font-bold text-white">Jonathan Vance</p>
              <p className="text-[10px] text-slate-500">Managing Director, Global Sports Group</p>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="col-span-1 md:col-span-7 flex flex-col justify-center px-8 sm:px-14 py-8 bg-white relative">
          <div className="max-w-sm w-full mx-auto space-y-6">
            <div className="space-y-1.5">
              <h2 className="font-display font-bold text-2xl text-slate-900 tracking-tight">Super Admin Portal</h2>
              <p className="text-xs text-slate-400">Enter credentials to access the centralized system.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4.5">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Business Email</label>
                <div className="relative">
                  <Mail className="w-4.5 h-4.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-600">Security Password</label>
                  <a href="#" className="text-xs font-semibold text-primary hover:text-primary-hover">Forgot?</a>
                </div>
                <div className="relative">
                  <Lock className="w-4.5 h-4.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between py-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-500 font-medium">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded text-primary focus:ring-primary border-slate-200"
                  />
                  Remember my session
                </label>
                <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold bg-emerald-50 border border-emerald-100 rounded-md px-1.5 py-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Sandbox Ready
                </span>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="primary"
                className="w-full font-semibold shadow-md py-3 text-sm"
                disabled={isLoading}
                icon={isLoading ? null : ArrowRight}
                iconPosition="right"
              >
                {isLoading ? "Validating Session..." : "Sign In to Dashboard"}
              </Button>
            </form>

            <div className="pt-2 border-t border-slate-100 text-center">
              <span className="text-xs text-slate-400">
                Are you a customer?{' '}
                <button
                  onClick={() => navigate('/')}
                  className="font-semibold text-primary hover:text-primary-hover"
                >
                  Go to Store & Booking Portal
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
