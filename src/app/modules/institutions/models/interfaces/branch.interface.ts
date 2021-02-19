export interface Branch {
  id: number;
  address: string;
  manager_name: string;
  institution_id: number;
  created_at: Date;
  updated_at: Date;
  personal: any[];
}
