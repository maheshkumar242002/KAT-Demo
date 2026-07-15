import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Filter, Plus, UserPlus, Phone, Mail, FileText, 
  CheckCircle, AlertTriangle, Calendar, Award, ShieldAlert,
  DollarSign, Check, X, User, ChevronLeft, ChevronRight, BarChart
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Button, Drawer, Modal, Tabs } from '../../components/UI';
import { ResponsiveContainer, BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, PieChart, Pie } from 'recharts';

export default function AcademyPage() {
  const { 
    studentsList, 
    coachesList, 
    addStudent, 
    updateStudentFeeStatus,
    addNotification
  } = useApp();

  const [activeTab, setActiveTab] = useState('dashboard');
  
  // States for student actions
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [studentSearch, setStudentSearch] = useState('');
  const [sportFilter, setSportFilter] = useState('All');
  const [feeFilter, setFeeFilter] = useState('All');

  // Form states for adding student
  const [newStudentForm, setNewStudentForm] = useState({
    name: '',
    sport: 'Football',
    assignedBatch: 'U-16 Elite',
    assignedCoach: 'Alex Mercer',
    feeAmount: '$450 / term',
    feeStatus: 'Pending',
    guardianName: '',
    guardianPhone: '',
    guardianEmail: '',
    guardianRelation: 'Father',
    bloodGroup: 'A+',
    medicalNotes: ''
  });

  // State for recording payment
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentStudentId, setPaymentStudentId] = useState('');

  // 1. Academy calculations
  const totalStudents = studentsList.length;
  const paidCount = studentsList.filter(s => s.feeStatus === 'Paid').length;
  const pendingCount = studentsList.filter(s => s.feeStatus === 'Pending').length;
  const averageAttendance = Math.round(studentsList.reduce((sum, s) => sum + s.attendancePercent, 0) / totalStudents) || 0;

  // Sport distribution for pie chart
  const sportData = [
    { name: 'Football', value: studentsList.filter(s => s.sport === 'Football').length, color: '#2563EB' },
    { name: 'Cricket', value: studentsList.filter(s => s.sport === 'Cricket').length, color: '#10B981' },
    { name: 'Athletics', value: studentsList.filter(s => s.sport === 'Athletics').length, color: '#F59E0B' }
  ];

  // Filtering students
  const filteredStudents = studentsList.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(studentSearch.toLowerCase()) || 
                          s.guardianName.toLowerCase().includes(studentSearch.toLowerCase());
    const matchesSport = sportFilter === 'All' || s.sport === sportFilter;
    const matchesFee = feeFilter === 'All' || s.feeStatus === feeFilter;
    return matchesSearch && matchesSport && matchesFee;
  });

  const handleAddStudentSubmit = (e) => {
    e.preventDefault();
    addStudent(newStudentForm);
    setIsAddStudentOpen(false);
    // Reset form
    setNewStudentForm({
      name: '',
      sport: 'Football',
      assignedBatch: 'U-16 Elite',
      assignedCoach: 'Alex Mercer',
      feeAmount: '$450 / term',
      feeStatus: 'Pending',
      guardianName: '',
      guardianPhone: '',
      guardianEmail: '',
      guardianRelation: 'Father',
      bloodGroup: 'A+',
      medicalNotes: ''
    });
  };

  const handleRecordPayment = (id) => {
    setPaymentStudentId(id);
    setIsPaymentModalOpen(true);
  };

  const confirmPayment = () => {
    updateStudentFeeStatus(paymentStudentId, 'Paid');
    setIsPaymentModalOpen(false);
    if (selectedStudent && selectedStudent.id === paymentStudentId) {
      setSelectedStudent(prev => ({ ...prev, feeStatus: 'Paid' }));
    }
  };

  // Mock Calendar data for Attendance tab (July 2026)
  const calendarDays = Array.from({ length: 31 }, (_, i) => {
    const dayNum = i + 1;
    // Set random attendance state for demo aesthetics
    const state = dayNum % 7 === 0 || dayNum % 7 === 6 ? 'Weekend' : 
                  dayNum % 11 === 0 ? 'Absent' : 
                  dayNum % 13 === 0 ? 'Late' : 'Present';
    return { day: dayNum, state };
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 tracking-tight">
            Academy Management
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            Control rosters, coaches, calendars, and fee invoices.
          </p>
        </div>
        <Button 
          onClick={() => setIsAddStudentOpen(true)} 
          variant="primary" 
          size="sm"
          icon={UserPlus}
        >
          Enroll Cadet
        </Button>
      </div>

      {/* Tabs */}
      <Tabs 
        tabs={[
          { id: 'dashboard', label: 'Overview' },
          { id: 'students', label: 'Students Roster' },
          { id: 'coaches', label: 'Coaches Board' },
          { id: 'attendance', label: 'Attendance logs' },
          { id: 'fees', label: 'Fee Manager' }
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Tab Contents */}
      <div className="pt-2">
        {/* OVERVIEW TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <Card className="p-5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase">Total Enrolled</span>
                  <p className="text-2xl font-bold text-slate-950 mt-1">{totalStudents}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-primary">
                  <User className="w-5 h-5" />
                </div>
              </Card>

              <Card className="p-5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase">Average Attendance</span>
                  <p className="text-2xl font-bold text-slate-950 mt-1">{averageAttendance}%</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <Calendar className="w-5 h-5" />
                </div>
              </Card>

              <Card className="p-5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase">Fees Invoiced</span>
                  <p className="text-2xl font-bold text-slate-950 mt-1">{paidCount} Paid</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                  <DollarSign className="w-5 h-5" />
                </div>
              </Card>

              <Card className="p-5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase">Pending Invoices</span>
                  <p className="text-2xl font-bold text-slate-950 mt-1">{pendingCount} Accounts</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500">
                  <AlertTriangle className="w-5 h-5" />
                </div>
              </Card>
            </div>

            {/* Dashboard Graphics */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Sport Distribution Chart */}
              <div className="lg:col-span-4">
                <Card hoverEffect={false} className="h-full">
                  <CardHeader>
                    <CardTitle>Sport Enrollments</CardTitle>
                    <CardDescription>Roster split by discipline.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-60 flex flex-col justify-between items-center">
                    <div className="flex-grow w-full relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={sportData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={75}
                            paddingAngle={4}
                            dataKey="value"
                          >
                            {sportData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-2xl font-bold text-slate-900">{totalStudents}</span>
                        <span className="text-[10px] text-slate-400 font-semibold uppercase">Cadets</span>
                      </div>
                    </div>
                    <div className="flex gap-4 text-xs font-semibold text-slate-500 mt-2">
                      {sportData.map(d => (
                        <span key={d.name} className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: d.color }} />
                          {d.name} ({d.value})
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Batches & Details */}
              <div className="lg:col-span-8">
                <Card hoverEffect={false} className="h-full">
                  <CardHeader>
                    <CardTitle>Active Coaching Batches</CardTitle>
                    <CardDescription>Status and allocations per division.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border border-slate-100 rounded-xl divide-y divide-slate-100">
                      <div className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">U-16 Elite Football Academy</p>
                          <p className="text-xs text-slate-500">Coach: Alex Mercer • Timings: Mon, Wed, Fri 4PM-6PM</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="success">Active</Badge>
                          <p className="text-xs text-slate-400 font-medium mt-1">18 Registered</p>
                        </div>
                      </div>
                      <div className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">Cricket Juniors (Co-ed)</p>
                          <p className="text-xs text-slate-500">Coach: Sarah Jenkins • Timings: Tue, Thu 3PM-5PM</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="success">Active</Badge>
                          <p className="text-xs text-slate-400 font-medium mt-1 =">14 Registered</p>
                        </div>
                      </div>
                      <div className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">Turf Speed Demons (Athletics)</p>
                          <p className="text-xs text-slate-500">Coach: Marcus Aurelius • Timings: Sat 9AM-11AM</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="success">Active</Badge>
                          <p className="text-xs text-slate-400 font-medium mt-1">10 Registered</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* STUDENTS ROSTER TAB */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            <Card hoverEffect={false}>
              {/* Search & Filters */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 border-b border-slate-100 bg-slate-50/40 rounded-t-2xl">
                <div className="relative w-full md:w-80">
                  <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search name, guardian..."
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 bg-white"
                  />
                </div>
                
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                    <Filter className="w-3.5 h-3.5" /> Filter by:
                  </div>
                  
                  {/* Sport Filter */}
                  <select 
                    value={sportFilter} 
                    onChange={(e) => setSportFilter(e.target.value)}
                    className="border border-slate-200 bg-white rounded-lg text-xs py-1.5 px-3 focus:outline-none"
                  >
                    <option value="All">All Sports</option>
                    <option value="Football">Football</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Athletics">Athletics</option>
                  </select>

                  {/* Fee Status Filter */}
                  <select 
                    value={feeFilter} 
                    onChange={(e) => setFeeFilter(e.target.value)}
                    className="border border-slate-200 bg-white rounded-lg text-xs py-1.5 px-3 focus:outline-none"
                  >
                    <option value="All">All Payments</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Partially Paid">Partially Paid</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-semibold">
                      <th className="py-4 px-6">Student Cadet</th>
                      <th className="py-4 px-4">Discipline</th>
                      <th className="py-4 px-4">Division Batch</th>
                      <th className="py-4 px-4">Guardian Contact</th>
                      <th className="py-4 px-4 text-center">Attendance</th>
                      <th className="py-4 px-4 text-center">Fee Status</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="py-12 text-center text-slate-400">
                          No students matched filters.
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((student) => (
                        <tr 
                          key={student.id} 
                          onClick={() => setSelectedStudent(student)}
                          className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                        >
                          <td className="py-3.5 px-6">
                            <div className="flex items-center gap-3">
                              <img 
                                src={student.photo} 
                                alt={student.name}
                                className="w-9 h-9 rounded-full object-cover border border-slate-200"
                              />
                              <div>
                                <div className="font-semibold text-slate-900 group-hover:text-primary transition-colors">{student.name}</div>
                                <div className="text-[10px] text-slate-400 font-mono">ID: {student.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-700 font-medium">{student.sport}</td>
                          <td className="py-3.5 px-4 text-slate-500">{student.assignedBatch}</td>
                          <td className="py-3.5 px-4">
                            <div className="text-slate-700 font-semibold">{student.guardianName}</div>
                            <div className="text-[10px] text-slate-400">{student.guardianPhone}</div>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <span className={`font-bold text-sm ${
                              student.attendancePercent >= 90 ? 'text-emerald-600' : 
                              student.attendancePercent >= 80 ? 'text-blue-600' : 'text-amber-500'
                            }`}>{student.attendancePercent}%</span>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <Badge variant={
                              student.feeStatus === 'Paid' ? 'success' : 
                              student.feeStatus === 'Pending' ? 'error' : 'warning'
                            }>
                              {student.feeStatus}
                            </Badge>
                          </td>
                          <td className="py-3.5 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                            {student.feeStatus !== 'Paid' ? (
                              <Button 
                                onClick={() => handleRecordPayment(student.id)} 
                                variant="outline" 
                                size="sm" 
                                className="scale-90"
                              >
                                Record Pay
                              </Button>
                            ) : (
                              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-lg">Settled</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* COACHES BOARD TAB */}
        {activeTab === 'coaches' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coachesList.map((coach) => (
              <Card key={coach.id} className="flex flex-col justify-between h-full hover:-translate-y-1 transition-all">
                <div className="space-y-4">
                  {/* Photo & Status */}
                  <div className="flex items-center justify-between">
                    <img 
                      src={coach.photo} 
                      alt={coach.name} 
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                    />
                    <Badge variant={coach.status === 'Active' ? 'success' : 'warning'}>
                      {coach.status}
                    </Badge>
                  </div>
                  
                  {/* Details */}
                  <div>
                    <h3 className="font-display font-semibold text-slate-900 text-base">{coach.name}</h3>
                    <p className="text-xs text-primary font-bold mt-0.5">{coach.sport} Expert</p>
                  </div>

                  <p className="text-xs text-slate-500 leading-normal">{coach.specialty}</p>

                  <div className="space-y-2 pt-2 border-t border-slate-50 text-[11px] text-slate-500">
                    <div className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5" /> Experience: {coach.experience}</div>
                    <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {coach.contact}</div>
                    <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {coach.email}</div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-50 flex flex-wrap gap-1.5">
                  {coach.batches.map(b => (
                    <span key={b} className="text-[9px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-lg border border-slate-200">{b}</span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* ATTENDANCE CALENDAR TAB */}
        {activeTab === 'attendance' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <Card hoverEffect={false}>
                <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 pb-4">
                  <div>
                    <CardTitle>Attendance Log</CardTitle>
                    <CardDescription>Daily checklist status for July 2026.</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-slate-100 rounded-lg text-slate-500"><ChevronLeft className="w-4 h-4" /></button>
                    <span className="text-xs font-bold text-slate-700">July 2026</span>
                    <button className="p-1 hover:bg-slate-100 rounded-lg text-slate-500"><ChevronRight className="w-4 h-4" /></button>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2.5 text-center text-xs">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <span key={day} className="font-semibold text-slate-400 uppercase py-1">{day}</span>
                    ))}
                    
                    {/* Padding cells for layout starting day */}
                    <div className="py-3 border border-transparent" />
                    <div className="py-3 border border-transparent" />
                    <div className="py-3 border border-transparent" />
                    
                    {calendarDays.map((d) => (
                      <div 
                        key={d.day}
                        className={`py-3.5 border rounded-xl flex flex-col items-center justify-center font-bold transition-colors ${
                          d.state === 'Weekend' ? 'bg-slate-50 text-slate-400 border-slate-100' :
                          d.state === 'Absent' ? 'bg-rose-50 border-rose-100 text-rose-600' :
                          d.state === 'Late' ? 'bg-amber-50 border-amber-100 text-amber-600' :
                          'bg-emerald-50 border-emerald-100 text-emerald-600'
                        }`}
                      >
                        <span>{d.day}</span>
                        <span className="text-[8px] font-medium mt-0.5 opacity-80">{
                          d.state === 'Weekend' ? 'Off' : 
                          d.state === 'Absent' ? 'Abs' : 
                          d.state === 'Late' ? 'Late' : 'Pres'
                        }</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-4 space-y-6">
              <Card hoverEffect={false}>
                <CardHeader className="border-b border-slate-50 pb-4">
                  <CardTitle>Attendance Stats</CardTitle>
                  <CardDescription>Aggregates across divisions.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  <div className="flex items-center justify-between text-xs border-b border-slate-50 pb-3">
                    <span className="flex items-center gap-1.5 font-medium text-slate-500"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" /> Present rate</span>
                    <span className="font-bold text-slate-800">89.4%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-b border-slate-50 pb-3">
                    <span className="flex items-center gap-1.5 font-medium text-slate-500"><span className="w-2.5 h-2.5 bg-amber-500 rounded-full" /> Late arrivals</span>
                    <span className="font-bold text-slate-800">6.1%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pb-1">
                    <span className="flex items-center gap-1.5 font-medium text-slate-500"><span className="w-2.5 h-2.5 bg-rose-500 rounded-full" /> Unexcused absences</span>
                    <span className="font-bold text-slate-800">4.5%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* FEES MANAGEMENT TAB */}
        {activeTab === 'fees' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Payment Summary */}
              <div className="lg:col-span-4">
                <Card hoverEffect={false} className="h-full">
                  <CardHeader className="border-b border-slate-50 pb-4">
                    <CardTitle>Roster Fees Balance</CardTitle>
                    <CardDescription>Paid vs Pending ratios.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-56 pt-2 flex flex-col justify-between items-center">
                    <div className="flex-grow w-full relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Paid', value: paidCount, color: '#10B981' },
                              { name: 'Pending', value: pendingCount, color: '#F59E0B' }
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={45}
                            outerRadius={65}
                            paddingAngle={3}
                            dataKey="value"
                          >
                            <Cell fill="#10B981" />
                            <Cell fill="#EF4444" />
                          </Pie>
                          <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-xl font-bold text-slate-900">
                          {Math.round((paidCount / totalStudents) * 100)}%
                        </span>
                        <span className="text-[9px] text-slate-400 font-semibold uppercase">Collected</span>
                      </div>
                    </div>
                    <div className="flex gap-4 text-xs font-semibold text-slate-500 mt-2">
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-full inline-block" /> Paid ({paidCount})</span>
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-rose-500 rounded-full inline-block" /> Outstanding ({pendingCount})</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Invoice List */}
              <div className="lg:col-span-8">
                <Card hoverEffect={false} className="h-full">
                  <CardHeader className="border-b border-slate-50 pb-4">
                    <CardTitle>Outstanding Academy Invoices</CardTitle>
                    <CardDescription>Term 3 tuition balances.</CardDescription>
                  </CardHeader>
                  <CardContent className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-semibold">
                          <th className="py-3 px-2">Student</th>
                          <th className="py-3 px-2">Assigned Coach</th>
                          <th className="py-3 px-2 text-right">Fee Rate</th>
                          <th className="py-3 px-2 text-center">Status</th>
                          <th className="py-3 px-2 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {studentsList.map((student) => (
                          <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="py-3 px-2 font-semibold text-slate-900">{student.name}</td>
                            <td className="py-3 px-2 text-slate-500">{student.assignedCoach}</td>
                            <td className="py-3 px-2 text-right font-bold text-slate-900">{student.feeAmount}</td>
                            <td className="py-3 px-2 text-center">
                              <Badge variant={
                                student.feeStatus === 'Paid' ? 'success' : 
                                student.feeStatus === 'Pending' ? 'error' : 'warning'
                              }>
                                {student.feeStatus}
                              </Badge>
                            </td>
                            <td className="py-3 px-2 text-right">
                              {student.feeStatus !== 'Paid' ? (
                                <Button 
                                  onClick={() => handleRecordPayment(student.id)} 
                                  variant="primary" 
                                  size="sm" 
                                  className="scale-90"
                                >
                                  Collect
                                </Button>
                              ) : (
                                <span className="text-[10px] text-slate-400 font-bold pr-3">Settled</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* STUDENT DETAIL DRAWER */}
      <Drawer
        isOpen={selectedStudent !== null}
        onClose={() => setSelectedStudent(null)}
        title="Student Cadet Dossier"
      >
        {selectedStudent && (
          <div className="space-y-6">
            {/* Header info */}
            <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
              <img 
                src={selectedStudent.photo} 
                alt={selectedStudent.name} 
                className="w-16 h-16 rounded-2xl object-cover border border-slate-200"
              />
              <div>
                <h3 className="font-display font-semibold text-lg text-slate-900 leading-tight">
                  {selectedStudent.name}
                </h3>
                <p className="text-xs text-primary font-bold mt-1">
                  {selectedStudent.sport} • {selectedStudent.assignedBatch}
                </p>
                <div className="mt-2 flex gap-1.5">
                  <Badge variant={
                    selectedStudent.feeStatus === 'Paid' ? 'success' : 
                    selectedStudent.feeStatus === 'Pending' ? 'error' : 'warning'
                  }>
                    Fees: {selectedStudent.feeStatus}
                  </Badge>
                  <Badge variant="secondary">
                    Blood: {selectedStudent.bloodGroup}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Guardian section */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Guardian Details</h4>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-slate-500">Contact Person</span> <span className="font-semibold text-slate-800">{selectedStudent.guardianName} ({selectedStudent.guardianRelation})</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Primary Phone</span> <span className="font-semibold text-slate-800">{selectedStudent.guardianPhone}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Email Address</span> <span className="font-semibold text-slate-800">{selectedStudent.guardianEmail}</span></div>
              </div>
            </div>

            {/* Medical notes */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Medical Information</h4>
              <div className="bg-rose-50/30 border border-rose-100 rounded-xl p-4 text-xs text-slate-600 flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">{selectedStudent.medicalNotes || "No emergency medical directives logged."}</p>
              </div>
            </div>

            {/* Assigned support */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-center">
                <p className="text-[10px] text-slate-400 font-semibold uppercase">Assigned Coach</p>
                <p className="text-xs font-bold text-slate-800 mt-1">{selectedStudent.assignedCoach}</p>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-center">
                <p className="text-[10px] text-slate-400 font-semibold uppercase">Attendance Rate</p>
                <p className="text-xs font-bold text-emerald-600 mt-1">{selectedStudent.attendancePercent}%</p>
              </div>
            </div>

            {/* Activity History */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Cadet Activity Timeline</h4>
              <div className="border-l border-slate-150 pl-3.5 space-y-4">
                {selectedStudent.timeline.map(log => (
                  <div key={log.id} className="relative">
                    <div className="absolute -left-[20px] top-1 w-2 h-2 rounded-full bg-slate-350 ring-4 ring-white" />
                    <span className="text-[9px] text-slate-400 font-semibold">{log.date}</span>
                    <p className="text-xs font-bold text-slate-800 mt-0.5">{log.title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">{log.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Drawer Actions */}
            {selectedStudent.feeStatus !== 'Paid' && (
              <div className="pt-2 border-t border-slate-100">
                <Button 
                  onClick={() => handleRecordPayment(selectedStudent.id)}
                  variant="primary"
                  className="w-full shadow-md py-2.5 text-sm"
                >
                  Record Fee Settlement
                </Button>
              </div>
            )}
          </div>
        )}
      </Drawer>

      {/* ENROLL CADET MODAL */}
      <Modal
        isOpen={isAddStudentOpen}
        onClose={() => setIsAddStudentOpen(false)}
        title="Academy Cadet Enrollment Form"
      >
        <form onSubmit={handleAddStudentSubmit} className="space-y-4 text-xs">
          {/* Personal Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-600">Full Name</label>
              <input
                type="text"
                required
                value={newStudentForm.name}
                onChange={(e) => setNewStudentForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:outline-none"
                placeholder="Rohan Patel"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-600">Discipline</label>
              <select
                value={newStudentForm.sport}
                onChange={(e) => setNewStudentForm(prev => ({ ...prev, sport: e.target.value }))}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none"
              >
                <option value="Football">Football</option>
                <option value="Cricket">Cricket</option>
                <option value="Athletics">Athletics</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-600">Batch Division</label>
              <input
                type="text"
                value={newStudentForm.assignedBatch}
                onChange={(e) => setNewStudentForm(prev => ({ ...prev, assignedBatch: e.target.value }))}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-600">Assigned Coach</label>
              <select
                value={newStudentForm.assignedCoach}
                onChange={(e) => setNewStudentForm(prev => ({ ...prev, assignedCoach: e.target.value }))}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none"
              >
                {coachesList.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
          </div>

          {/* Guardian Info */}
          <div className="border-t border-slate-100 pt-3.5 space-y-3">
            <h4 className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">Guardian Details</h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1 col-span-2">
                <label className="font-semibold text-slate-600">Name</label>
                <input
                  type="text"
                  required
                  value={newStudentForm.guardianName}
                  onChange={(e) => setNewStudentForm(prev => ({ ...prev, guardianName: e.target.value }))}
                  className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-slate-600">Relation</label>
                <select
                  value={newStudentForm.guardianRelation}
                  onChange={(e) => setNewStudentForm(prev => ({ ...prev, guardianRelation: e.target.value }))}
                  className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none"
                >
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Guardian">Guardian</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-slate-600">Contact Phone</label>
                <input
                  type="text"
                  required
                  value={newStudentForm.guardianPhone}
                  onChange={(e) => setNewStudentForm(prev => ({ ...prev, guardianPhone: e.target.value }))}
                  className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-slate-600">Email Address</label>
                <input
                  type="email"
                  required
                  value={newStudentForm.guardianEmail}
                  onChange={(e) => setNewStudentForm(prev => ({ ...prev, guardianEmail: e.target.value }))}
                  className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Medical */}
          <div className="border-t border-slate-100 pt-3.5 grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-600">Blood Group</label>
              <select
                value={newStudentForm.bloodGroup}
                onChange={(e) => setNewStudentForm(prev => ({ ...prev, bloodGroup: e.target.value }))}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
              </select>
            </div>
            <div className="space-y-1 col-span-2">
              <label className="font-semibold text-slate-600">Medical Notes / Allergies</label>
              <input
                type="text"
                value={newStudentForm.medicalNotes}
                onChange={(e) => setNewStudentForm(prev => ({ ...prev, medicalNotes: e.target.value }))}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:outline-none"
                placeholder="Mild asthma, nut allergy..."
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-2.5">
            <Button type="button" onClick={() => setIsAddStudentOpen(false)} variant="outline" size="sm">Cancel</Button>
            <Button type="submit" variant="primary" size="sm">Enroll Student</Button>
          </div>
        </form>
      </Modal>

      {/* RECORD PAYMENT MODAL */}
      <Modal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        title="Record Fee Payment Balance"
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-500 leading-normal">
            Are you sure you want to mark the invoiced balance for student ID <span className="font-bold text-slate-800">#{paymentStudentId}</span> as <span className="text-emerald-600 font-bold bg-emerald-50 px-1 rounded">Paid</span>?
          </p>
          <p className="text-[11px] text-slate-400">
            This action will update the cash collections ledger, record a system notification audit, and sync the dashboards instantly.
          </p>
          <div className="pt-4 flex justify-end gap-2.5">
            <Button onClick={() => setIsPaymentModalOpen(false)} variant="outline" size="sm">Cancel</Button>
            <Button onClick={confirmPayment} variant="accent" size="sm" icon={Check}>Record Payment</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
