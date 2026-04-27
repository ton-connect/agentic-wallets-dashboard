import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import {
    applyTheme,
    DEFAULT_THEME_MODE,
    readStoredThemeMode,
    resolveTheme,
    storeThemeMode,
    type ResolvedTheme,
    type ThemeMode,
} from './theme';

type ThemeContextValue = {
    mode: ThemeMode;
    resolvedTheme: ResolvedTheme;
    setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [mode, setModeState] = useState<ThemeMode>(() => {
        if (typeof window === 'undefined') {
            return DEFAULT_THEME_MODE;
        }

        return readStoredThemeMode();
    });
    const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => resolveTheme(mode));

    useEffect(() => {
        const updateResolvedTheme = () => {
            const nextResolvedTheme = resolveTheme(mode);
            setResolvedTheme(nextResolvedTheme);
            applyTheme(nextResolvedTheme, mode);
        };

        updateResolvedTheme();
        storeThemeMode(mode);

        if (mode !== 'auto') {
            return undefined;
        }

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', updateResolvedTheme);

        return () => mediaQuery.removeEventListener('change', updateResolvedTheme);
    }, [mode]);

    const value = useMemo<ThemeContextValue>(
        () => ({
            mode,
            resolvedTheme,
            setMode: setModeState,
        }),
        [mode, resolvedTheme],
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }

    return context;
}
