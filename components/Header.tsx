import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const Header = ({ children, className }: HeaderProps) => {
  return (
    <div className={cn("header", className)}>
      <Link href="/landing" className="flex items-center">
        {/* Logo */}
        <Image 
          src="/assets/images/logo.png"
          alt="Logo with name"
          width={50}
          height={32}
          className="mr-2" 
        />
       
        <span className="text-3xl font-semibold bg-gradient-to-r from-blue-300 to-white text-transparent bg-clip-text">
          SyncSlate
        </span>
      </Link>
      {children}
    </div>
  )
}

export default Header