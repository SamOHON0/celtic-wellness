export type Customer = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
};

export type AccountOrderItem = {
  name: string;
  quantity: number;
  total: string; // minor units
};

export type AccountOrder = {
  id: number;
  number: string;
  date: string; // ISO
  status: string; // processing | completed | refunded | ...
  total: string; // minor units
  items: AccountOrderItem[];
};

export type LoginResult =
  | { ok: true; customer: Customer }
  | { ok: false; error: string };
