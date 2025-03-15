"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Film, Bell, User, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { siteConfig } from "@/config/site"
import { Button } from "../../components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet"

export function MainNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      active: pathname === "/dashboard",
    },
    {
      href: "/upload",
      label: "Upload",
      active: pathname === "/upload",
    },
  ]

  return (
    <>
      <div className="flex items-center h-16 px-4 border-b border-white/10 lg:h-[60px] lg:px-6 sticky top-0 z-50 bg-primary">
        <Link href="/" className="flex items-center gap-2 font-semibold text-white">
          <Film className="h-6 w-6" />
          <span className="whitespace-nowrap">{siteConfig.name}</span>
        </Link>

        <div className="hidden md:flex items-center space-x-1 mx-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 transition-all hover:text-white",
                route.active ? "bg-white/10 font-medium text-white" : "text-white/60",
              )}
            >
              <span>{route.label}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Button variant="ghost" size="icon" className="text-white">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" className="ml-2 text-white border-white/20">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px] bg-primary">
              <nav className="grid gap-2 py-4">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-white",
                      route.active ? "bg-white/10 font-medium text-white" : "text-white/60",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <span>{route.label}</span>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  )
}

