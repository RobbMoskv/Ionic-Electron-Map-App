export interface Address {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  
  addressId?: string; // Unique ID
  placeId?: string; // ID from Google
  addressStatus?: 'GEOCODE' | 'PROVISIONED' // Status in Backend API
  latitude?: string;
  longitude?: string; 
}
