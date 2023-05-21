import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '@/Components/Navbar'
import Services from '@/Components/Services'
import Partners from '@/Components/Partners'
import Footer from '@/Components/Footer'
import Home from '@/Components/Home'

const inter = Inter({ subsets: ['latin'] })

export default function Route() {
  return (
    <main>
      <Navbar />
      <Home />
      <Partners />
      <Footer />
    </main>
  )
}
