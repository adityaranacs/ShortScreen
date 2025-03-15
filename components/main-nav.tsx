"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, LayoutDashboard, Upload, Bell, User, Menu, Film, Search, TvMinimalPlay } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./ui/sheet"
import { cn } from "../lib/utils"
import { Input } from "./ui/input"

export function MainNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      active: pathname === "/",
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
    {
      href: "/upload",
      label: "Upload",
      icon: Upload,
      active: pathname === "/upload",
    },
  ]

  return (
    <>
      <div className="flex items-center h-16 px-4 border-b border-white/10 lg:h-[60px] lg:px-6 sticky top-0 z-50 bg-[#0c0a09] backdrop-blur-md bg-opacity-95">
        <Link href="/" className="flex items-center gap-2 font-semibold text-white">
          <TvMinimalPlay className="h-6 w-6" />
          <span className="whitespace-nowrap text-lg">ShortScreen</span>
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
              <route.icon className="h-5 w-5" />
              <span>{route.label}</span>
            </Link>
          ))}
        </div>

        <div className="hidden md:flex relative mx-auto max-w-md w-full">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-white/60" />
          <Input
            placeholder="Search videos..."
            className="pl-10 py-2 bg-white/5 border-white/10 text-white w-full focus-visible:ring-white/20"
          />
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
            <SheetContent side="left" className="w-[240px] sm:w-[300px] bg-[hsl(180,2.90%,6.90%)]">
              <SheetTitle className="text-white"></SheetTitle>
              <SheetDescription className="text-white/60">
              </SheetDescription>
              
              <div className="flex items-center gap-2 mb-6 mt-4">
                <TvMinimalPlay className="h-6 w-6 text-white" />
                <Film className="h-6 w-6 text-white" />
                <span className="font-semibold text-white text-lg">ShortScreen</span>
              </div>

              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                  <Input
                    placeholder="Search videos..."
                    className="pl-10 bg-white/5 border-white/10 text-white w-full focus-visible:ring-white/20"
                  />
                </div>
              </div>

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
                    <route.icon className="h-5 w-5" />
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
