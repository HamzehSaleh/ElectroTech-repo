import { ReactNode } from "react";

export type reactElementProps = {
  children: JSX.Element | ReactNode;
};

export type productType = {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
};

export type categoryType = {
  id: string;
  name: string;
};

export type billType = {
  customerName: string;
  customerPhone: string;
  paymentMethod: string;
  totalAmount: string;
  cartItems: string[];
};
