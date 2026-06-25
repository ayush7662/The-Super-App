import './globals.css'

export const metadata = {
  title: 'The Super App',
  description: 'A multi-feature dashboard application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
