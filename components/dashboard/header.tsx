'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Truck,
  AlertCircle,
  RotateCcw,
  Users,
  BarChart3,
  CreditCard,
  Settings,
  ArrowUpRight,
  Bell,
  CircleUser,
  Search,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ThemeToggle } from '@/components/dashboard/theme-toggle';
import { searchAllEntities } from '@/lib/global-search';
import { toast } from '@/hooks/use-toast';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/orders', label: 'Orders', icon: Package },
  { href: '/dashboard/pickups', label: 'Pickups', icon: ArrowUpRight },
  { href: '/dashboard/shipments', label: 'Shipments', icon: Truck },
  { href: '/dashboard/exceptions', label: 'Exceptions', icon: AlertCircle },
  { href: '/dashboard/rto', label: 'RTO', icon: RotateCcw },
  { href: '/dashboard/couriers', label: 'Couriers', icon: Users },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/billing', label: 'Billing', icon: CreditCard },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const searchResults = useMemo(() => searchAllEntities(searchQuery, 10), [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSelect = (href: string, label: string) => {
    router.push(href);
    setSearchQuery(label);
    setIsSearchOpen(false);
    toast({
      title: 'Search result opened',
      description: `Navigated to ${label}`,
    });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">M</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Move All</h1>
              <p className="text-xs text-muted-foreground">Logistics</p>
            </div>
          </div>

          <div ref={searchRef} className="relative hidden flex-1 md:flex md:min-w-[420px] md:mx-6 lg:mx-10 lg:ml-8">
            <div className="flex w-full items-center gap-3 rounded-lg bg-muted px-5 py-2.5">
              <Search className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search orders, shipments, pickups, RTO, exceptions, couriers..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchResults.length > 0) {
                    handleSearchSelect(searchResults[0].href, searchResults[0].title);
                  }
                }}
                className="h-full border-0 bg-transparent p-2 text-sm shadow-none placeholder-muted-foreground transition-colors hover:bg-card/70 hover:border-transparent focus:bg-transparent focus:outline-none focus-visible:ring-0"
              />
            </div>

            {isSearchOpen && searchQuery.trim() && (
              <div className="absolute top-[calc(100%+8px)] z-50 w-full rounded-lg border border-border bg-card p-2 shadow-lg">
                {searchResults.length > 0 ? (
                  <div className="max-h-72 overflow-y-auto">
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        className="flex w-full items-start justify-between rounded-md px-3 py-2 text-left hover:bg-muted"
                        onClick={() => handleSearchSelect(result.href, result.title)}
                      >
                        <div>
                          <p className="text-sm font-medium text-foreground">{result.title}</p>
                          <p className="text-xs text-muted-foreground">{result.subtitle}</p>
                        </div>
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                          {result.category}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="px-3 py-2 text-sm text-muted-foreground">
                    No matching records found.
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              className="rounded-lg p-2 transition-colors hover:bg-muted md:hidden"
              onClick={() =>
                toast({
                  title: 'Search is available on desktop',
                  description: 'Use the full-width search bar on larger screens.',
                })
              }
            >
              <Search className="h-5 w-5 text-muted-foreground" />
            </button>

            <button
              className="group relative rounded-lg p-2 transition-colors hover:bg-muted"
              onClick={() =>
                toast({
                  title: 'Notifications',
                  description: 'You have 3 actionable operational alerts.',
                })
              }
            >
              <Bell className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-accent"></span>
            </button>

            <ThemeToggle />

            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="rounded-lg p-2 transition-colors hover:bg-muted"
              >
                <CircleUser className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-lg border border-border bg-card shadow-lg">
                  <button
                    onClick={() => {
                      router.push('/dashboard/settings');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full rounded-t-lg px-4 py-2.5 text-left text-sm text-foreground hover:bg-muted"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      router.push('/dashboard/settings');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm text-foreground hover:bg-muted"
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      toast({
                        title: 'Prototype mode',
                        description: 'Logout is disabled in demo mode.',
                      });
                    }}
                    className="w-full rounded-b-lg px-4 py-2.5 text-left text-sm text-red-600 hover:bg-muted"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border/50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex w-full items-center py-0">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/dashboard' && pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-1 items-center justify-center gap-2 border-b-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'border-accent text-foreground'
                      : 'border-transparent text-muted-foreground hover:bg-muted/20 hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
