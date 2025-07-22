import './globals.css'
import ReduxProvider from './provider'

export const metadata = {
  title: 'Dashboard App',
  description: 'Responsive dashboard using Next.js + Tailwind + Redux',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
