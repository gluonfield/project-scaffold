import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { site } from '../lib/site'
import { Button } from './ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

const navigation = [
  { label: 'Product', to: '/', hash: 'product' },
  { label: 'Pricing', to: '/demo', hash: 'pricing' },
  { label: 'Guide', to: '/demo', hash: 'guide' },
] as const

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 769px)')
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false)
    }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

  return (
    <header className="site-header page-container">
      <Link to="/" className="brand" aria-label={`${site.name} home`}>
        {site.name}
      </Link>
      <nav className="site-nav main-nav" aria-label="Main navigation">
        {navigation.map(({ label, ...destination }) => (
          <Link key={label} {...destination}>
            {label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <Button asChild size="sm">
          <Link to="/demo">Get started</Link>
        </Button>
        <div className="mobile-nav">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Navigation menu"
              >
                <Menu aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent size="full" className="mobile-navigation">
              <SheetHeader>
                <SheetTitle>{site.name}</SheetTitle>
                <SheetDescription>A calmer way to catch up.</SheetDescription>
              </SheetHeader>
              <nav className="mobile-menu-links" aria-label="Mobile navigation">
                {navigation.map(({ label, ...destination }) => (
                  <SheetClose key={label} asChild>
                    <Link {...destination}>
                      {label}
                      <ArrowUpRight aria-hidden="true" />
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <SheetFooter>
                <SheetClose asChild>
                  <Button asChild size="lg">
                    <Link to="/demo">Get started</Link>
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
