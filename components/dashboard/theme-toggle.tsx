'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      disabled={!mounted}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="rounded-lg p-2 hover:bg-muted transition-colors"
      aria-label="Toggle theme"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {!mounted ? (
        <Moon className="h-5 w-5 text-muted-foreground transition-colors" />
      ) : isDark ? (
        <Sun className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
      ) : (
        <Moon className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
      )}
    </button>
  );
}
