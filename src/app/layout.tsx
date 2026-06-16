import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-dark text-white min-vh-100">
        
         <Toaster
          position="top-right"
          reverseOrder={false}
        />
        {children}
      </body>
    </html>
  );
}