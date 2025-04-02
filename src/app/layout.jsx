import './globals.css'
import Header from '../components/Header.jsx';

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body className={'bg-gray-50'}>
        <Header /> 
        <main className={'mt-25 px-5 lg:px-20'}>{children}</main>
      </body>
    </html>
  )
}