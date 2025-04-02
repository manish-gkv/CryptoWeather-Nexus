import './globals.css'
import Header from '../components/Header.jsx';
import { Analytics } from "@vercel/analytics/react"

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body className={'bg-gray-50'}>
        <Header /> 
        <main className={'mt-25 px-5 pb-10 lg:px-20 lg:pb-20'}>{children}</main>
      </body>
    </html>
  )
}