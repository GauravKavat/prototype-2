export type OrderStatus = 'Pending' | 'Confirmed' | 'Shipped' | 'In Transit' | 'Delivered' | 'Failed' | 'Returned';
export type ShipmentStatus = 'Pending' | 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Failed' | 'RTO';
export type ExceptionStatus = 'Open' | 'In Progress' | 'Resolved';
export type RTOStatus = 'Initiated' | 'In Transit' | 'Received' | 'Refunded';
export type AlertSeverity = 'info' | 'warning' | 'error';
export type PickupStatus = 'Pending' | 'Scheduled' | 'In Transit' | 'Completed' | 'Cancelled';
export type VehicleType = '2-wheeler' | '4-wheeler' | 'SUV' | 'Truck';
export type VendorName = 'DHL' | 'DTDC' | 'FedEx' | 'Bluedart' | 'Local';

export interface Order {
  id: string;
  customer: string;
  phone: string;
  address: string;
  pincode: string;
  status: OrderStatus;
  createdAt: Date;
  cost: number;
}

export interface Shipment {
  awb: string;
  customer: string;
  courier: string;
  status: ShipmentStatus;
  eta: Date;
  cost: number;
  createdAt: Date;
}

export interface Exception {
  id: string;
  reason: string;
  lastAttempt: Date;
  status: ExceptionStatus;
  orderId: string;
}

export interface RTO {
  id: string;
  status: RTOStatus;
  reason: string;
  returnDate: Date;
  customer: string;
}

export interface Courier {
  id: string;
  name: string;
  successRate: number;
  avgDeliveryTime: number;
  costEfficiency: number;
  activeShipments: number;
}

export interface Activity {
  id: string;
  type: 'order' | 'shipment' | 'exception' | 'rto';
  description: string;
  timestamp: Date;
  orderId?: string;
}

export interface Alert {
  id: string;
  type: 'auto_processed' | 'ai_validated' | 'action_required';
  message: string;
  severity: AlertSeverity;
  timestamp: Date;
  actionRequired?: boolean;
}

export interface MetricCard {
  label: string;
  value: number | string;
  change: number;
  icon: React.ReactNode;
}

export interface PickupRequest {
  id: string;
  orderId: string;
  customer: string;
  phone: string;
  deliveryAddress: string;
  billingAddress: string;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  numberOfBoxes: number;
  preferredVendor: VendorName;
  vehicleType: VehicleType;
  requestedPickupTime: Date;
  scheduledPickupTime?: Date;
  status: PickupStatus;
  vehicleNumber?: string;
  driverName?: string;
  driverPhone?: string;
  estimatedPickupTime?: Date;
  actualPickupTime?: Date;
  notes?: string;
  createdAt: Date;
}
