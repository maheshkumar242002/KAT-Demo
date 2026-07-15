import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, User, Lock, Building, FileText, 
  CreditCard, ShieldCheck, Check, Key, Bell, Phone, Save
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Button, Tabs } from '../components/UI';

export default function SettingsPage() {
  const { settings, setSettings, addNotification } = useApp();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [localSettings, setLocalSettings] = useState(settings);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states for password change
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  // Roles permissions grid mock
  const [rolesPermissions, setRolesPermissions] = useState({
    SuperAdmin: { academy: true, ecommerce: true, turf: true, reports: true, settings: true },
    Editor: { academy: true, ecommerce: true, turf: true, reports: false, settings: false },
    Staff: { academy: true, ecommerce: false, turf: true, reports: false, settings: false }
  });

  const handleTogglePermission = (role, module) => {
    setRolesPermissions(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [module]: !prev[role][module]
      }
    }));
  };

  const handleSettingsSave = (e) => {
    e.preventDefault();
    setSettings(localSettings);
    setSaveSuccess(true);
    addNotification("System Settings Saved", "Company branding and gateway parameters updated.", "System");
    
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    addNotification("Password Updated", "Security access tokens refreshed successfully.", "System");
    setPasswordForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 tracking-tight">
            Account & System Settings
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            Control gateway keys, access tables, branding attributes, and roles.
          </p>
        </div>
        {saveSuccess && (
          <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 rounded-lg px-2.5 py-1.5 animate-bounce">
            <Check className="w-3.5 h-3.5" /> Synced & Saved!
          </span>
        )}
      </div>

      {/* Tabs */}
      <Tabs
        tabs={[
          { id: 'profile', label: 'My profile dossier' },
          { id: 'general', label: 'Company details' },
          { id: 'taxes', label: 'Taxes & GST' },
          { id: 'gateways', label: 'Payment Gateway' },
          { id: 'roles', label: 'Roles & Authorizations' }
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <div className="pt-2">
        {/* PROFILE DOSSIER TAB */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Profile Card */}
              <div className="md:col-span-5">
                <Card hoverEffect={false} className="text-center p-6 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold text-2xl mx-auto shadow-sm">
                    SA
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-slate-900 text-base">Super Admin User</h3>
                    <p className="text-xs text-slate-400">Owner & System Architect</p>
                  </div>
                  <div className="pt-3.5 border-t border-slate-50 space-y-2 text-left text-xs">
                    <div className="flex justify-between"><span className="text-slate-500">Security Clearance</span> <Badge variant="dark">Tier 1 Admin</Badge></div>
                    <div className="flex justify-between"><span className="text-slate-500">Two Factor Status</span> <Badge variant="success">Enabled</Badge></div>
                    <div className="flex justify-between"><span className="text-slate-500">Workspace Tenant</span> <span className="font-semibold text-slate-800">ESM HQ Org</span></div>
                  </div>
                </Card>
              </div>

              {/* Password update form */}
              <div className="md:col-span-7">
                <Card hoverEffect={false}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-1.5"><Lock className="w-5 h-5 text-slate-500" /> Security Access Keys</CardTitle>
                    <CardDescription>Refresh security tokens or change system password.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordSubmit} className="space-y-4 text-xs">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-600">Current Security Key</label>
                        <input
                          type="password"
                          required
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                          className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none"
                          placeholder="••••••••"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-600">New Security Key</label>
                        <input
                          type="password"
                          required
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                          className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none"
                          placeholder="••••••••"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-600">Confirm Security Key</label>
                        <input
                          type="password"
                          required
                          value={passwordForm.confirmNewPassword}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmNewPassword: e.target.value }))}
                          className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none"
                          placeholder="••••••••"
                        />
                      </div>
                      <Button type="submit" variant="primary" size="sm" icon={Save}>
                        Change Password
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Login history logs */}
            <Card hoverEffect={false}>
              <h3 className="font-display font-semibold text-sm text-slate-900 border-b border-slate-100 pb-3 mb-4 flex items-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600" /> Security Access Logins
              </h3>
              <div className="space-y-3.5 text-xs text-slate-600">
                <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                  <div>
                    <span className="font-bold text-slate-800">192.168.1.144 (This session)</span>
                    <span className="block text-[10px] text-slate-400">Chrome, Windows • Pune, IN</span>
                  </div>
                  <span className="font-semibold text-slate-500">Active now</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-800">102.33.1.28</span>
                    <span className="block text-[10px] text-slate-400">Firefox, macOS • Mumbai, IN</span>
                  </div>
                  <span className="font-semibold text-slate-400">2 days ago</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* GENERAL COMPANY DETAILS TAB */}
        {activeTab === 'general' && (
          <Card hoverEffect={false}>
            <CardHeader>
              <CardTitle className="flex items-center gap-1.5"><Building className="w-5 h-5 text-slate-500" /> Workspace Settings</CardTitle>
              <CardDescription>Configure organizational values and client-facing branding.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSettingsSave} className="space-y-4.5 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-600">Organizational Name</label>
                  <input
                    type="text"
                    required
                    value={localSettings.companyName}
                    onChange={(e) => setLocalSettings(prev => ({ ...prev, companyName: e.target.value }))}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none text-slate-800 font-semibold"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-600">Support Email</label>
                    <input
                      type="email"
                      required
                      value={localSettings.email}
                      onChange={(e) => setLocalSettings(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-600">Support Phone</label>
                    <input
                      type="text"
                      required
                      value={localSettings.phone}
                      onChange={(e) => setLocalSettings(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-600">Base Currency</label>
                    <select
                      value={localSettings.currency}
                      onChange={(e) => setLocalSettings(prev => ({ ...prev, currency: e.target.value }))}
                      className="w-full p-2.5 border border-slate-200 rounded-xl bg-white focus:outline-none"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="INR">INR (₹)</option>
                      <option value="EUR">EUR (€)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-600">Default Accent Palette</label>
                    <div className="flex gap-2.5 pt-1">
                      {['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'].map(col => (
                        <button 
                          key={col}
                          type="button"
                          onClick={() => setLocalSettings(prev => ({ ...prev, accentColor: col }))}
                          className="w-6.5 h-6.5 rounded-full border border-slate-200 flex items-center justify-center cursor-pointer"
                          style={{ backgroundColor: col }}
                        >
                          {localSettings.accentColor === col && <Check className="w-3.5 h-3.5 text-white" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <Button type="submit" variant="primary" size="sm" icon={Save}>
                  Save Workspace Configurations
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* TAXES TAB */}
        {activeTab === 'taxes' && (
          <Card hoverEffect={false}>
            <CardHeader>
              <CardTitle className="flex items-center gap-1.5"><FileText className="w-5 h-5 text-slate-500" /> Tax & GST Calculations</CardTitle>
              <CardDescription>Setup regional tax codes and rates automatically added to e-commerce and turf invoices.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSettingsSave} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-600">GST Registration Number</label>
                    <input
                      type="text"
                      className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none"
                      placeholder="e.g. 27AAAAA0000A1Z5"
                      defaultValue="27AAACS8920C1Z8"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-600">Corporate Service Tax Rate (%)</label>
                    <input
                      type="number"
                      required
                      value={localSettings.taxRate}
                      onChange={(e) => setLocalSettings(prev => ({ ...prev, taxRate: parseInt(e.target.value) || 0 }))}
                      className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 cursor-pointer select-none text-slate-500 font-semibold pt-1">
                  <input type="checkbox" id="addTax" defaultChecked className="w-4 h-4 rounded text-primary focus:ring-primary border-slate-200" />
                  <label htmlFor="addTax">Automatically add GST surcharge to turf checkout flows.</label>
                </div>

                <Button type="submit" variant="primary" size="sm" icon={Save}>
                  Save Taxes Config
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* PAYMENT GATEWAY TAB */}
        {activeTab === 'gateways' && (
          <Card hoverEffect={false}>
            <CardHeader>
              <CardTitle className="flex items-center gap-1.5"><CreditCard className="w-5 h-5 text-slate-500" /> Secure Payment API integrations</CardTitle>
              <CardDescription>Toggle and configure transaction handlers.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSettingsSave} className="space-y-4.5 text-xs">
                <div className="space-y-2 border border-slate-100 rounded-xl p-4 bg-slate-50/40">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5"><Key className="w-4.5 h-4.5 text-slate-500" /> Stripe integration</span>
                    <select
                      value={localSettings.paymentGateway}
                      onChange={(e) => setLocalSettings(prev => ({ ...prev, paymentGateway: e.target.value }))}
                      className="border border-slate-200 bg-white rounded-lg py-1 px-2.5 text-xs focus:outline-none"
                    >
                      <option value="Stripe">Stripe API (Active)</option>
                      <option value="PayPal">PayPal SDK</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-600">Webhook Secret Key</label>
                      <input
                        type="password"
                        className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none font-mono"
                        placeholder="whsec_••••••••••••••••••••"
                        defaultValue="whsec_892839djas8da288921"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-600">Publishable Key</label>
                      <input
                        type="text"
                        className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none font-mono"
                        placeholder="pk_test_••••••••••••••••••••"
                        defaultValue="pk_test_83jjasd8a2da892dja289"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 border border-slate-100 rounded-xl p-4 bg-slate-50/40">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5"><Phone className="w-4.5 h-4.5 text-slate-500" /> Twilio SMS Config</span>
                    <Badge variant="success">Active</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-600">Account SID</label>
                      <input
                        type="text"
                        className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none font-mono"
                        defaultValue="AC898239ada82da8da238da"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-600">Sender Number</label>
                      <input
                        type="text"
                        className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none"
                        defaultValue="+1 (855) 902-2839"
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" variant="primary" size="sm" icon={Save}>
                  Save Integrations Config
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* ROLES & PERMISSIONS TAB */}
        {activeTab === 'roles' && (
          <Card hoverEffect={false}>
            <CardHeader>
              <CardTitle className="flex items-center gap-1.5"><ShieldCheck className="w-5 h-5 text-emerald-600" /> Roles Access Permissions Grid</CardTitle>
              <CardDescription>Grant or restrict directory module accesses per workspace security role.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-semibold">
                      <th className="py-3 px-4">Role Title</th>
                      <th className="py-3 px-4 text-center">Academy</th>
                      <th className="py-3 px-4 text-center">E-Commerce</th>
                      <th className="py-3 px-4 text-center">Turf Book</th>
                      <th className="py-3 px-4 text-center">Reports</th>
                      <th className="py-3 px-4 text-center">Settings</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
                    {Object.entries(rolesPermissions).map(([role, perms]) => (
                      <tr key={role} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-4 font-bold text-slate-800">{role}</td>
                        {Object.entries(perms).map(([module, val]) => (
                          <td key={module} className="py-4 px-4 text-center">
                            <input
                              type="checkbox"
                              checked={val}
                              onChange={() => handleTogglePermission(role, module)}
                              className="w-4 h-4 rounded text-primary focus:ring-primary border-slate-200 cursor-pointer"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 border-t border-slate-100 pt-4 flex justify-end">
                <Button 
                  onClick={() => {
                    addNotification("Security Roles Synced", "Authorizations map successfully refreshed in db.", "System");
                    setSaveSuccess(true);
                    setTimeout(() => setSaveSuccess(false), 3000);
                  }}
                  variant="primary" 
                  size="sm"
                  icon={Save}
                >
                  Save Access Matrix
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
