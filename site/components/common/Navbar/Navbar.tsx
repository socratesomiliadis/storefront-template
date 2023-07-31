import { FC } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import NavbarRoot from './NavbarRoot'
import { Logo, Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import LogoFull from '@components/icons/LogoFull'

interface Link {
  href: string
  label: string
}

interface NavbarProps {
  links?: Link[]
}

const Navbar: FC<NavbarProps> = ({ links }) => (
  <nav className="fixed left-0 w-full top-0 z-[997]">
    <div className="flex inner-nav w-full text-offWhite items-center justify-between  p-4 lg:px-6 lg:py-6">
      <Link
        href="/"
        aria-label="Go back home"
        className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
      >
        <LogoFull className="fill-[currentColor]" />
      </Link>

      <div className="flex flex-row items-center tracking-tight gap-8  text-lg">
        <Link href="/products">Shop</Link>
        <Link href="/about">About</Link>
      </div>
    </div>
  </nav>
  // <NavbarRoot>
  //   <Container clean className="mx-auto max-w-8xl px-6">
  //     <div className={s.nav}>
  //       <div className="flex items-center flex-1">
  //         <Link href="/" className={s.logo} aria-label="Logo">
  //           <Logo />
  //         </Link>
  //         <nav className={s.navMenu}>
  //           <Link href="/search" className={s.link}>
  //             All
  //           </Link>
  //           {links?.map((l) => (
  //             <Link href={l.href} key={l.href} className={s.link}>
  //               {l.label}
  //             </Link>
  //           ))}
  //         </nav>
  //       </div>
  //       {process.env.COMMERCE_SEARCH_ENABLED && (
  //         <div className="justify-center flex-1 hidden lg:flex">
  //           <Searchbar />
  //         </div>
  //       )}
  //       <div className="flex items-center justify-end flex-1 space-x-8">
  //         <UserNav />
  //       </div>
  //     </div>
  //     {process.env.COMMERCE_SEARCH_ENABLED && (
  //       <div className="flex pb-4 lg:px-6 lg:hidden">
  //         <Searchbar id="mobile-search" />
  //       </div>
  //     )}
  //   </Container>
  // </NavbarRoot>
)

export default Navbar
