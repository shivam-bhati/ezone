// app/layout.js
import './globals.css';
import { CartProvider } from '../app/components/CartContext';


export const metadata = {
  title: 'Corporate Gifting Collection',
  description: 'Premium branded products for corporate gifting',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
