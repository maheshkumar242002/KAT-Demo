// KAT Groups Management System Mock Database

// Helper for generating relative dates
const daysAgo = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
};

export const coaches = [
  {
    id: "c1",
    name: "Alex Mercer",
    sport: "Football",
    experience: "8 Years",
    contact: "+1 (555) 019-2834",
    email: "alex.m@esm-academy.com",
    status: "Active",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80",
    specialty: "Tactical Play & Striker Training",
    batches: ["U-16 Elite", "U-12 Rookies"]
  },
  {
    id: "c2",
    name: "Sarah Jenkins",
    sport: "Cricket",
    experience: "12 Years",
    contact: "+1 (555) 014-9988",
    email: "sarah.j@esm-academy.com",
    status: "Active",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80",
    specialty: "Spin Bowling & Fielder Positioning",
    batches: ["Cricket Juniors", "Advanced Bowling Masterclass"]
  },
  {
    id: "c3",
    name: "Marcus Aurelius",
    sport: "Athletics & Turf",
    experience: "6 Years",
    contact: "+1 (555) 017-3344",
    email: "marcus.a@esm-academy.com",
    status: "Active",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&q=80",
    specialty: "Speed, Agility & Plyometrics",
    batches: ["Turf Speed Demons"]
  },
  {
    id: "c4",
    name: "Elena Rostova",
    sport: "Football",
    experience: "5 Years",
    contact: "+1 (555) 018-7711",
    email: "elena.r@esm-academy.com",
    status: "On Leave",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&q=80",
    specialty: "Goalkeeping & Ball Control",
    batches: ["U-10 Mini Kickers"]
  }
];

export const students = [
  {
    id: "s1",
    name: "Rohan Sharma",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80",
    guardianName: "Alok Sharma",
    guardianPhone: "+1 (555) 019-3388",
    guardianEmail: "alok.sharma@example.com",
    guardianRelation: "Father",
    medicalNotes: "Mild Asthma. Uses inhaler occasionally during high exertion.",
    bloodGroup: "A+",
    feeStatus: "Paid",
    feeAmount: "$450 / term",
    attendancePercent: 94,
    sport: "Football",
    assignedBatch: "U-16 Elite",
    assignedCoach: "Alex Mercer",
    joinDate: daysAgo(180),
    timeline: [
      { id: "t1_1", date: daysAgo(2), title: "Scored 2 goals", desc: "Showed exceptional striking skills in U-16 friendly." },
      { id: "t1_2", date: daysAgo(15), title: "Fee Paid", desc: "Term 3 tuition fees paid successfully." },
      { id: "t1_3", date: daysAgo(30), title: "Medical Checkup", desc: "Fit for tournament, inhaler cleared by academy doctor." }
    ]
  },
  {
    id: "s2",
    name: "Zoya Patel",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&q=80",
    guardianName: "Farhan Patel",
    guardianPhone: "+1 (555) 012-7744",
    guardianEmail: "farhan.patel@example.com",
    guardianRelation: "Father",
    medicalNotes: "No known allergies or medical conditions.",
    bloodGroup: "O+",
    feeStatus: "Pending",
    feeAmount: "$450 / term",
    attendancePercent: 88,
    sport: "Cricket",
    assignedBatch: "Cricket Juniors",
    assignedCoach: "Sarah Jenkins",
    joinDate: daysAgo(120),
    timeline: [
      { id: "t2_1", date: daysAgo(5), title: "Promoted to Opening Batswoman", desc: "Awarded top order batting spot based on nets performance." },
      { id: "t2_2", date: daysAgo(20), title: "Warning Issued: Fees Pending", desc: "First notice sent to guardian for Term 3 fees." }
    ]
  },
  {
    id: "s3",
    name: "Aryan Kapoor",
    photo: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&h=150&fit=crop&q=80",
    guardianName: "Neelam Kapoor",
    guardianPhone: "+1 (555) 013-1122",
    guardianEmail: "neelam.k@example.com",
    guardianRelation: "Mother",
    medicalNotes: "Allergic to Penicillin and Peanuts.",
    bloodGroup: "B-",
    feeStatus: "Paid",
    feeAmount: "$450 / term",
    attendancePercent: 97,
    sport: "Football",
    assignedBatch: "U-16 Elite",
    assignedCoach: "Alex Mercer",
    joinDate: daysAgo(240),
    timeline: [
      { id: "t3_1", date: daysAgo(1), title: "Named Match Captain", desc: "Captain of the week for Saturday's regional league game." },
      { id: "t3_2", date: daysAgo(12), title: "New Boots Logged", desc: "Equipment inspection approved for turf use." }
    ]
  },
  {
    id: "s4",
    name: "Neha Reddy",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&q=80",
    guardianName: "Vikram Reddy",
    guardianPhone: "+1 (555) 016-8899",
    guardianEmail: "vikram.reddy@example.com",
    guardianRelation: "Father",
    medicalNotes: "Recovering from ankle sprain. Avoid heavy jumps.",
    bloodGroup: "AB+",
    feeStatus: "Partially Paid",
    feeAmount: "$350 / term",
    attendancePercent: 76,
    sport: "Athletics",
    assignedBatch: "Turf Speed Demons",
    assignedCoach: "Marcus Aurelius",
    joinDate: daysAgo(90),
    timeline: [
      { id: "t4_1", date: daysAgo(3), title: "Physio Clearance", desc: "Approved for light sprints (60% capacity)." },
      { id: "t4_2", date: daysAgo(25), title: "Partial Invoice Settled", desc: "Paid $200 of the total $350 fee." }
    ]
  },
  {
    id: "s5",
    name: "Karan Malhotra",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&q=80",
    guardianName: "Raj Malhotra",
    guardianPhone: "+1 (555) 018-9900",
    guardianEmail: "raj.m@example.com",
    guardianRelation: "Father",
    medicalNotes: "No known medical issues.",
    bloodGroup: "O-",
    feeStatus: "Paid",
    feeAmount: "$450 / term",
    attendancePercent: 99,
    sport: "Cricket",
    assignedBatch: "Cricket Juniors",
    assignedCoach: "Sarah Jenkins",
    joinDate: daysAgo(300),
    timeline: [
      { id: "t5_1", date: daysAgo(8), title: "Perfect Attendance Award", desc: "Recognized for 3 consecutive months of 100% attendance." },
      { id: "t5_2", date: daysAgo(40), title: "Hat-trick in Practice", desc: "Took 3 wickets in 3 balls during internal match." }
    ]
  }
];

export const products = [
  {
    id: "p1",
    name: "ESM Elite Match Football",
    price: 49.99,
    rating: 4.8,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=300&h=300&fit=crop&q=80",
    category: "Equipment",
    discountBadge: "15% OFF",
    originalPrice: 59.99,
    stock: 45,
    description: "FIFA Quality Pro certified matches ball designed for grass & turf. Features textured casing and reinforced bladder for optimal control and air retention."
  },
  {
    id: "p2",
    name: "Carbon Fiber English Willow Bat",
    price: 189.99,
    rating: 4.9,
    reviews: 84,
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=300&h=300&fit=crop&q=80",
    category: "Equipment",
    discountBadge: "Hot Deal",
    originalPrice: 220.00,
    stock: 12,
    description: "Handcrafted English Willow with a carbon fiber insert in the handle for extreme shock absorption and explosive power transfer. Built for professionals."
  },
  {
    id: "p3",
    name: "Turf Pro Speed Cleats",
    price: 85.00,
    rating: 4.6,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop&q=80",
    category: "Footwear",
    discountBadge: null,
    originalPrice: 85.00,
    stock: 28,
    description: "Multi-ground cleats with lightweight synthetic upper and high-density rubber studs. Optimal acceleration and pivots on turf and dry grass."
  },
  {
    id: "p4",
    name: "Breathable Academy Polo",
    price: 24.99,
    rating: 4.5,
    reviews: 95,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=300&h=300&fit=crop&q=80",
    category: "Apparel",
    discountBadge: "Best Seller",
    originalPrice: 29.99,
    stock: 110,
    description: "Official ESM Academy training polo with moisture-wicking technology. Keeps you cool, dry, and professional-looking during training and travel."
  },
  {
    id: "p5",
    name: "Pro Cricket Protective Kit",
    price: 129.99,
    rating: 4.7,
    reviews: 62,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=300&h=300&fit=crop&q=80",
    category: "Equipment",
    discountBadge: "10% OFF",
    originalPrice: 145.00,
    stock: 8,
    description: "Complete defense set including padded leg guards, lightweight batting gloves, forearm shield, and a custom-fitted abdominal guard."
  },
  {
    id: "p6",
    name: "Academy Duffle Bag with Wheels",
    price: 39.99,
    rating: 4.4,
    reviews: 47,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop&q=80",
    category: "Accessories",
    discountBadge: null,
    originalPrice: 39.99,
    stock: 64,
    description: "Heavy-duty polyester duffle with specialized side pockets for bats/studs and a massive central compartment. Fitted with durable inline wheels."
  }
];

export const orders = [
  {
    id: "ORD-9988",
    customer: "Amit Singhal",
    email: "amit.s@gmail.com",
    date: daysAgo(1),
    items: [
      { id: "p1", name: "ESM Elite Match Football", quantity: 2, price: 49.99 }
    ],
    total: 99.98,
    status: "Processing"
  },
  {
    id: "ORD-9972",
    customer: "Priya Rajan",
    email: "priya.rajan@yahoo.com",
    date: daysAgo(3),
    items: [
      { id: "p3", name: "Turf Pro Speed Cleats", quantity: 1, price: 85.00 },
      { id: "p4", name: "Breathable Academy Polo", quantity: 2, price: 24.99 }
    ],
    total: 134.98,
    status: "Shipped"
  },
  {
    id: "ORD-9951",
    customer: "Vikram Sen",
    email: "v.sen@gmail.com",
    date: daysAgo(6),
    items: [
      { id: "p2", name: "Carbon Fiber English Willow Bat", quantity: 1, price: 189.99 },
      { id: "p5", name: "Pro Cricket Protective Kit", quantity: 1, price: 129.99 }
    ],
    total: 319.98,
    status: "Delivered"
  },
  {
    id: "ORD-9940",
    customer: "Kiran Shah",
    email: "kiran.shah@live.com",
    date: daysAgo(10),
    items: [
      { id: "p6", name: "Academy Duffle Bag with Wheels", quantity: 1, price: 39.99 }
    ],
    total: 39.99,
    status: "Delivered"
  }
];

export const turfs = [
  {
    id: "t1",
    name: "Santiago Bernabéu Arena (5v5)",
    location: "Sector 4, Elite Tech Park",
    pricePerHour: 40,
    rating: 4.9,
    reviews: 215,
    type: "5-a-side Football",
    image: "https://images.unsplash.com/photo-1556012018-50cf53d47a21?w=450&h=300&fit=crop&q=80",
    amenities: ["Floodlights", "Locker Room", "Water Dispenser", "Bibs & Balls Provided"]
  },
  {
    id: "t2",
    name: "Old Trafford Turf (7v7)",
    location: "Greenway Hub, Sector 15",
    pricePerHour: 60,
    rating: 4.7,
    reviews: 189,
    type: "7-a-side Football / Cricket Nets",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=450&h=300&fit=crop&q=80",
    amenities: ["Pro Floodlights", "Showers", "Cafeteria Nearby", "Ample Parking"]
  },
  {
    id: "t3",
    name: "Lord's Premium Cricket Nets",
    location: "Sector 4, Elite Tech Park",
    pricePerHour: 30,
    rating: 4.8,
    reviews: 124,
    type: "Cricket Bowling & Batting Nets",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=450&h=300&fit=crop&q=80",
    amenities: ["Bowling Machines", "Pro Netting", "High Speed Cameras", "Equipment Rental"]
  }
];

export const bookings = [
  {
    id: "BK-4402",
    turfId: "t1",
    turfName: "Santiago Bernabéu Arena (5v5)",
    customerName: "Gaurav Mehta",
    customerEmail: "g.mehta@example.com",
    date: daysAgo(0), // Today
    timeSlot: "18:00 - 19:00",
    slotType: "Evening",
    amountPaid: 40,
    status: "Confirmed"
  },
  {
    id: "BK-4395",
    turfId: "t2",
    turfName: "Old Trafford Turf (7v7)",
    customerName: "Rohan Patil",
    customerEmail: "rohan.p@gmail.com",
    date: daysAgo(0), // Today
    timeSlot: "20:00 - 21:00",
    slotType: "Evening",
    amountPaid: 60,
    status: "Confirmed"
  },
  {
    id: "BK-4381",
    turfId: "t3",
    turfName: "Lord's Premium Cricket Nets",
    customerName: "Sanjay Dutta",
    customerEmail: "s.dutta@yahoo.com",
    date: daysAgo(1),
    timeSlot: "09:00 - 11:00",
    slotType: "Morning",
    amountPaid: 60,
    status: "Completed"
  },
  {
    id: "BK-4355",
    turfId: "t1",
    turfName: "Santiago Bernabéu Arena (5v5)",
    customerName: "Zain Mallik",
    customerEmail: "zain.m@gmail.com",
    date: daysAgo(2),
    timeSlot: "15:00 - 16:00",
    slotType: "Afternoon",
    amountPaid: 40,
    status: "Completed"
  },
  {
    id: "BK-4320",
    turfId: "t2",
    turfName: "Old Trafford Turf (7v7)",
    customerName: "Nitin Joshi",
    customerEmail: "n.joshi@outlook.com",
    date: daysAgo(4),
    timeSlot: "19:00 - 20:00",
    slotType: "Evening",
    amountPaid: 60,
    status: "Cancelled"
  }
];

export const notifications = [
  {
    id: "n_1",
    title: "New Booking Confirmed",
    message: "Gaurav Mehta booked Santiago Bernabéu Arena for today at 18:00.",
    category: "Turf",
    read: false,
    timestamp: "10 mins ago"
  },
  {
    id: "n_2",
    title: "Academy Fee Pending Warning",
    message: "Zoya Patel's Term 3 fees ($450) remain outstanding. Notification sent.",
    category: "Academy",
    read: false,
    timestamp: "1 hour ago"
  },
  {
    id: "n_3",
    title: "E-Commerce Stock Alert",
    message: "English Willow Bats stock has dropped below 15 units (Current: 12).",
    category: "Store",
    read: false,
    timestamp: "3 hours ago"
  },
  {
    id: "n_4",
    title: "System Update Complete",
    message: "The database migrations and SSL configurations have been updated successfully.",
    category: "System",
    read: true,
    timestamp: "1 day ago"
  },
  {
    id: "n_5",
    title: "New Student Enrollment",
    message: "Karan Malhotra has successfully enrolled in the Cricket Juniors batch under Sarah Jenkins.",
    category: "Academy",
    read: true,
    timestamp: "2 days ago"
  }
];

export const attendanceData = [
  { day: "01", Rohan: "Present", Zoya: "Present", Aryan: "Present", Neha: "Late" },
  { day: "02", Rohan: "Present", Zoya: "Present", Aryan: "Present", Neha: "Present" },
  { day: "03", Rohan: "Present", Zoya: "Absent", Aryan: "Present", Neha: "Present" },
  { day: "04", Rohan: "Late", Zoya: "Present", Aryan: "Present", Neha: "Present" },
  { day: "05", Rohan: "Present", Zoya: "Present", Aryan: "Absent", Neha: "Present" },
  { day: "06", Rohan: "Present", Zoya: "Present", Aryan: "Present", Neha: "Late" },
  { day: "07", Rohan: "Present", Zoya: "Present", Aryan: "Present", Neha: "Present" }
];

export const revenueAnalytics = [
  { month: "Jan", Academy: 4500, ECommerce: 2100, Turf: 3200 },
  { month: "Feb", Academy: 5200, ECommerce: 2800, Turf: 3900 },
  { month: "Mar", Academy: 6100, ECommerce: 3200, Turf: 4300 },
  { month: "Apr", Academy: 5800, ECommerce: 3900, Turf: 4800 },
  { month: "May", Academy: 6900, ECommerce: 4800, Turf: 5600 },
  { month: "Jun", Academy: 7500, ECommerce: 5400, Turf: 6400 }
];

export const categorySales = [
  { name: "Football Gear", value: 3400 },
  { name: "Cricket Gear", value: 4500 },
  { name: "Turf Footwear", value: 2900 },
  { name: "Apparel", value: 1800 },
  { name: "Accessories", value: 1200 }
];

export const activityTimeline = [
  { id: "act_1", type: "Academy", time: "09:30 AM", user: "Sarah Jenkins", desc: "Updated cricket attendance list." },
  { id: "act_2", type: "Turf", time: "11:15 AM", user: "System", desc: "Automated booking reminder sent to Sanjay Dutta." },
  { id: "act_3", type: "Store", time: "02:40 PM", user: "Amit Singhal", desc: "Placed order ORD-9988 for Footballs." },
  { id: "act_4", type: "Settings", time: "04:00 PM", user: "Super Admin", desc: "Modified Tax rate to 18% GST." }
];
