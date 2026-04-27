export type ThemeMode = 'auto' | 'light' | 'dark';
export type ResolvedTheme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'agentic-wallets-theme';
export const DEFAULT_THEME_MODE: ThemeMode = 'auto';

const THEME_MODES: readonly ThemeMode[] = ['auto', 'light', 'dark'];

export function isThemeMode(value: unknown): value is ThemeMode {
    return typeof value === 'string' && THEME_MODES.includes(value as ThemeMode);
}

export function getSystemTheme(): ResolvedTheme {
    if (typeof window === 'undefined') {
        return 'light';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function resolveTheme(mode: ThemeMode): ResolvedTheme {
    return mode === 'auto' ? getSystemTheme() : mode;
}

export function readStoredThemeMode(): ThemeMode {
    if (typeof window === 'undefined') {
        return DEFAULT_THEME_MODE;
    }

    try {
        const value = window.localStorage.getItem(THEME_STORAGE_KEY);
        return isThemeMode(value) ? value : DEFAULT_THEME_MODE;
    } catch {
        return DEFAULT_THEME_MODE;
    }
}

export function storeThemeMode(mode: ThemeMode) {
    try {
        window.localStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch {
        // Ignore storage failures so private browsing modes can still switch theme.
    }
}

export function applyTheme(resolvedTheme: ResolvedTheme, mode: ThemeMode) {
    const root = document.documentElement;
    root.dataset.theme = resolvedTheme;
    root.dataset.themeMode = mode;
    root.style.colorScheme = resolvedTheme;
}
