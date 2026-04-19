import { Link } from 'react-router-dom'
import SH from '/SH.png'
import StaggeredMenu from './StaggeredMenu'

const menuItems = [
  { label: 'Projects', ariaLabel: 'View projects', link: '/projects' },
  { label: 'About',    ariaLabel: 'About us',       link: '/about' },
  { label: 'E‑Board',  ariaLabel: 'View E-Board',   link: '/eboard' },
  { label: 'Events',   ariaLabel: 'View events',    link: '/events' },
  { label: 'Contact',  ariaLabel: 'Contact us',     link: '/contact' },
]

const Navbar = () => {
  return (
    <main className="fixed z-[500] w-full bg-background">

      {/* ── Laptop View (unchanged) ── */}
      <div className='hidden lg:flex flex-row justify-between max-w-[70%] items-center mx-auto'>
        <Link className='text-accent flex flex-row items-center hover:brightness-100' to='/'>
          <img src={SH} alt='logo' className='transition-transform duration-200 ease-out w-8 m-1 hover:scale-110'/>
          StackHacks
        </Link>
        <div className='gap-5 flex flex-row p-1 text-secondary items-center'>
          <Link to='/projects'>Projects</Link>
          <Link to='/about'>About</Link>
          <Link to='/eboard'>E-Board</Link>
          <Link to='/events'>Events</Link>
          <Link to='/contact'>Contact</Link>
        </div>
      </div>

      {/* Mobile View */}
      <div className='lg:hidden flex justify-between items-center p-1'>
        <Link className='text-accent flex flex-row items-center' to='/'>
          <img src={SH} alt='logo' className='w-10 m-1 ' />
          StackHacks
        </Link>

        {/* StaggeredMenu now only renders the button here; panel floats via fixed positioning */}
        <StaggeredMenu
          position="right"
          items={menuItems}
          logoUrl={SH}
          colors={['var(--color-accent)', 'var(--color-tertiary)']}
          menuButtonColor="var(--color-secondary)"
          displaySocials={false}
          displayItemNumbering={false}
          closeOnClickAway={true}
        />
      </div>

      <div className='w-screen border-b border-b-tertiary'/>
    </main>
  )
}

export default Navbar
