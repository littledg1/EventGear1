export type Attendee = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
};

export type Equipment = {
  id: string;
  serialNumber: string;
  type: string;
  status: 'available' | 'checked-out' | 'in-repair' | 'lost';
  imageUrl: string;
  assignedTo?: string; // Attendee ID
};

export type Issue = {
  id: string;
  equipmentId: string;
  description: string;
  reportedAt: Date;
  category: string;
  severity: 'low' | 'medium' | 'high';
  resolved: boolean;
};

export const attendees: Attendee[] = [
  { id: 'att-1', name: 'John Doe', email: 'john.d@example.com', phone: '123-456-7890', avatarUrl: 'https://picsum.photos/seed/avatar1/100/100' },
  { id: 'att-2', name: 'Jane Smith', email: 'jane.s@example.com', phone: '234-567-8901', avatarUrl: 'https://picsum.photos/seed/avatar2/100/100' },
];

export const equipment: Equipment[] = [
  { id: 'eq-1', serialNumber: 'HP-00123', type: 'Headphones', status: 'checked-out', imageUrl: 'https://picsum.photos/seed/equip1/200/200', assignedTo: 'att-1' },
  { id: 'eq-2', serialNumber: 'VR-00456', type: 'VR Headset', status: 'available', imageUrl: 'https://picsum.photos/seed/equip2/200/200' },
  { id: 'eq-3', serialNumber: 'HP-00789', type: 'Headphones', status: 'in-repair', imageUrl: 'https://picsum.photos/seed/equip3/200/200' },
  { id: 'eq-4', serialNumber: 'HP-00101', type: 'Headphones', status: 'available', imageUrl: 'https://picsum.photos/seed/equip4/200/200' },
];

export const issues: Issue[] = [
  { id: 'is-1', equipmentId: 'HP-00789', description: 'Left ear has no sound.', reportedAt: new Date(), category: 'Audio', severity: 'medium', resolved: false },
];
