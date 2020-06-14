export interface Establishment {
  id: string;
  index: number;
  guid: string;
  picture: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  registered: string;
  latitude: string;
  longitude: string;
  account?: string;
  accountDigit?: string;
  accountType?: string;
  agency?: string;
  agencyDigit?: string;
  automaticWithdraw?: string;
  bank?: string;
  city?: string;
  cpfCnpj?: string;
}