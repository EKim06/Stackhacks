import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import SH from '/SH.png'
import StaggeredMenu from './StaggeredMenu'

const menuItems = [
  { label: 'Projects', ariaLabel: 'View projects', link: '/projects' },
  { label: 'About',    ariaLabel: 'About us',       link: '/about' },
  { label: 'E-Board',  ariaLabel: 'View E-Board',   link: '/eboard' },
  { label: 'Events',   ariaLabel: 'View events',    link: '/events' },
  { label: 'Contact',  ariaLabel: 'Contact us',     link: '/contact' },
]

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-[500] w-full backdrop-blur-md bg-background/85 border-b border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2.5 text-primary group font-semibold tracking-tight text-base focus:outline-none"
        >
          <img
            src={SH}
            alt="StackHacks Logo"
            className="w-7 h-7 object-contain transition-transform duration-200 group-hover:scale-105"
          />
          <span className="font-medium tracking-tight text-primary">
            Stack<span className="text-accent">Hacks</span>
          </span>
        </NavLink>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
          {menuItems.map((item) => (
            <NavLink
              key={item.link}
              to={item.link}
              className={({ isActive }) =>
                `relative py-1 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-primary'
                    : 'text-secondary hover:text-primary'
                }`
              }
            >
              {({ isActive }) => (
                <div className="relative flex flex-col items-center">
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="navbar-underline"
                      className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-accent rounded-full shadow-[0_1px_6px_rgba(254,178,58,0.4)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Mobile View with StaggeredMenu */}
        <div className="lg:hidden flex items-center">
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
      </div>
    </header>
  )
}

export default Navbar
