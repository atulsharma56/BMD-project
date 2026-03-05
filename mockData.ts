export interface Mechanic {
  id: string;
  name: string;
  type: 'garage' | 'mobile';
  rating: number;
  reviewCount: number;
  certifications: string[];
  distance: string;
  responseTime: string;
  specialties: string[];
  image: string;
  verified: boolean;
  yearsInBusiness: number;
}

export interface QuoteLineItem {
  id: string;
  name: string;
  description: string;
  laborCost: number;
  partsCost: number;
  duration: string;
}

export interface Quote {
  id: string;
  mechanicId: string;
  lineItems: QuoteLineItem[];
  warranty: string;
  availability: string[];
  validUntil: string;
  totalCost: number;
}

export interface Service {
  id: string;
  mechanicName: string;
  mechanicType: 'garage' | 'mobile';
  serviceName: string;
  date: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  totalCost: number;
  vehicle: string;
  location?: string;
  estimatedCompletion?: string;
  currentStep?: string;
}

export const mockMechanics: Mechanic[] = [
  {
    id: '1',
    name: 'AutoCare Pro',
    type: 'garage',
    rating: 4.9,
    reviewCount: 342,
    certifications: ['ASE Certified', 'AAA Approved', 'BMW Specialist'],
    distance: '2.3 miles',
    responseTime: 'Usually responds in 1 hour',
    specialties: ['Oil Change', 'Brake Service', 'Diagnostics', 'Engine Repair'],
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80',
    verified: true,
    yearsInBusiness: 12,
  },
  {
    id: '2',
    name: 'QuickFix Mobile',
    type: 'mobile',
    rating: 4.8,
    reviewCount: 189,
    certifications: ['ASE Certified', 'Insured & Bonded'],
    distance: '1.8 miles',
    responseTime: 'Usually responds in 30 min',
    specialties: ['Oil Change', 'Battery Replacement', 'Brake Service', 'Minor Repairs'],
    image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800&q=80',
    verified: true,
    yearsInBusiness: 5,
  },
  {
    id: '3',
    name: 'Precision Motors',
    type: 'garage',
    rating: 4.7,
    reviewCount: 567,
    certifications: ['ASE Master Certified', 'Mercedes Specialist', 'AC Delco Professional'],
    distance: '4.1 miles',
    responseTime: 'Usually responds in 2 hours',
    specialties: ['Transmission', 'Engine Repair', 'AC Service', 'Diagnostics'],
    image: 'https://images.unsplash.com/photo-1632823470263-36e8c75bf280?w=800&q=80',
    verified: true,
    yearsInBusiness: 18,
  },
  {
    id: '4',
    name: 'On-The-Go Mechanics',
    type: 'mobile',
    rating: 4.9,
    reviewCount: 234,
    certifications: ['ASE Certified', 'Factory Trained', 'Insured'],
    distance: '3.5 miles',
    responseTime: 'Usually responds in 45 min',
    specialties: ['Oil Change', 'Brake Service', 'Tune-ups', 'Starter & Alternator'],
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80',
    verified: true,
    yearsInBusiness: 8,
  },
];

export const mockQuotes: Record<string, Quote> = {
  '1': {
    id: 'q1',
    mechanicId: '1',
    lineItems: [
      {
        id: 'li1',
        name: 'Oil Change (Synthetic)',
        description: 'Full synthetic oil change with filter replacement',
        laborCost: 35,
        partsCost: 45,
        duration: '30 min',
      },
      {
        id: 'li2',
        name: 'Front Brake Pad Replacement',
        description: 'Replace front brake pads with premium ceramic pads',
        laborCost: 120,
        partsCost: 85,
        duration: '1.5 hours',
      },
      {
        id: 'li3',
        name: 'Brake Fluid Flush',
        description: 'Complete brake fluid system flush and replacement',
        laborCost: 80,
        partsCost: 25,
        duration: '45 min',
      },
    ],
    warranty: '12 months / 12,000 miles',
    availability: ['Today 2:00 PM', 'Tomorrow 9:00 AM', 'Tomorrow 2:00 PM'],
    validUntil: 'Valid for 7 days',
    totalCost: 390,
  },
  '2': {
    id: 'q2',
    mechanicId: '2',
    lineItems: [
      {
        id: 'li4',
        name: 'Oil Change (Synthetic)',
        description: 'Mobile synthetic oil change at your location',
        laborCost: 45,
        partsCost: 45,
        duration: '30 min',
      },
      {
        id: 'li5',
        name: 'Front Brake Pad Replacement',
        description: 'Mobile brake pad replacement with quality pads',
        laborCost: 140,
        partsCost: 75,
        duration: '1.5 hours',
      },
      {
        id: 'li6',
        name: 'Brake Fluid Flush',
        description: 'Complete brake fluid flush at your location',
        laborCost: 90,
        partsCost: 25,
        duration: '45 min',
      },
    ],
    warranty: '12 months / 12,000 miles',
    availability: ['Today 4:00 PM', 'Tomorrow 10:00 AM', 'Tomorrow 3:00 PM'],
    validUntil: 'Valid for 5 days',
    totalCost: 420,
  },
  '3': {
    id: 'q3',
    mechanicId: '3',
    lineItems: [
      {
        id: 'li7',
        name: 'Oil Change (Synthetic)',
        description: 'Premium synthetic oil change with multi-point inspection',
        laborCost: 40,
        partsCost: 55,
        duration: '45 min',
      },
      {
        id: 'li8',
        name: 'Front Brake Pad Replacement',
        description: 'OEM-quality brake pad replacement',
        laborCost: 110,
        partsCost: 95,
        duration: '1.5 hours',
      },
      {
        id: 'li9',
        name: 'Brake Fluid Flush',
        description: 'Professional brake fluid flush with DOT 4 fluid',
        laborCost: 75,
        partsCost: 30,
        duration: '45 min',
      },
    ],
    warranty: '18 months / 18,000 miles',
    availability: ['Tomorrow 8:00 AM', 'Tomorrow 1:00 PM', 'Friday 9:00 AM'],
    validUntil: 'Valid for 10 days',
    totalCost: 405,
  },
  '4': {
    id: 'q4',
    mechanicId: '4',
    lineItems: [
      {
        id: 'li10',
        name: 'Oil Change (Synthetic)',
        description: 'Convenient mobile oil change at your home or office',
        laborCost: 50,
        partsCost: 45,
        duration: '30 min',
      },
      {
        id: 'li11',
        name: 'Front Brake Pad Replacement',
        description: 'Professional mobile brake service',
        laborCost: 135,
        partsCost: 80,
        duration: '1.5 hours',
      },
      {
        id: 'li12',
        name: 'Brake Fluid Flush',
        description: 'Mobile brake fluid replacement service',
        laborCost: 85,
        partsCost: 25,
        duration: '45 min',
      },
    ],
    warranty: '12 months / 15,000 miles',
    availability: ['Today 3:00 PM', 'Tomorrow 11:00 AM', 'Tomorrow 4:00 PM'],
    validUntil: 'Valid for 7 days',
    totalCost: 420,
  },
};

export const mockServices: Service[] = [
  {
    id: 's1',
    mechanicName: 'AutoCare Pro',
    mechanicType: 'garage',
    serviceName: 'Oil Change & Inspection',
    date: '2026-03-15',
    status: 'scheduled',
    totalCost: 89,
    vehicle: '2019 Honda Accord',
    location: '123 Main St, AutoCare Pro',
    estimatedCompletion: '11:30 AM',
  },
  {
    id: 's2',
    mechanicName: 'QuickFix Mobile',
    mechanicType: 'mobile',
    serviceName: 'Brake Pad Replacement',
    date: '2026-02-20',
    status: 'completed',
    totalCost: 245,
    vehicle: '2019 Honda Accord',
    location: 'Your Location - 456 Oak Ave',
  },
  {
    id: 's3',
    mechanicName: 'Precision Motors',
    mechanicType: 'garage',
    serviceName: 'Annual Service & Brake Fluid Flush',
    date: '2025-08-10',
    status: 'completed',
    totalCost: 420,
    vehicle: '2019 Honda Accord',
    location: '789 Service Rd, Precision Motors',
  },
  {
    id: 's4',
    mechanicName: 'On-The-Go Mechanics',
    mechanicType: 'mobile',
    serviceName: 'Battery Replacement',
    date: '2025-05-22',
    status: 'completed',
    totalCost: 180,
    vehicle: '2019 Honda Accord',
    location: 'Your Location - 456 Oak Ave',
  },
];
