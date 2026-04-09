/**
 * Reusable UI primitives following the TON design language.
 */

import type { ReactNode, ButtonHTMLAttributes, HTMLAttributes } from 'react';
import { forwardRef } from 'react';

// ─── Button ──────────────────────────────────────────────────────────────────

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    children: ReactNode;
}

const BUTTON_BASE =
    'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0098EA]/50';

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
    primary:
        'bg-[#0098EA] text-white hover:bg-[#22A9F0] active:bg-[#0088D0] shadow-[0_0_16px_rgba(0,152,234,0.3)] hover:shadow-[0_0_20px_rgba(0,152,234,0.45)]',
    secondary:
        'border border-white/[0.1] bg-white/[0.04] text-neutral-200 hover:bg-white/[0.08] hover:border-white/[0.16] hover:text-white',
    ghost:
        'text-neutral-400 hover:text-white hover:bg-white/[0.06]',
    danger:
        'border border-red-500/25 bg-red-500/[0.08] text-red-300 hover:border-red-500/50 hover:bg-red-500/[0.15] hover:text-red-200',
    outline:
        'border border-[#0098EA]/30 bg-[#0098EA]/[0.06] text-[#0098EA] hover:border-[#0098EA]/50 hover:bg-[#0098EA]/[0.12]',
};

const BUTTON_SIZES: Record<ButtonSize, string> = {
    sm: 'px-3.5 py-1.5 text-xs',
    md: 'px-5 py-2 text-sm',
    lg: 'px-7 py-2.5 text-sm',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = 'secondary', size = 'md', fullWidth = false, className = '', children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={`${BUTTON_BASE} ${BUTTON_VARIANTS[variant]} ${BUTTON_SIZES[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
                {...props}
            >
                {children}
            </button>
        );
    },
);
Button.displayName = 'Button';

// ─── Card ─────────────────────────────────────────────────────────────────────

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    hover?: boolean;
    accent?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

const CARD_PADDING: Record<NonNullable<CardProps['padding']>, string> = {
    none: '',
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
};

export function Card({ children, hover = false, accent = false, padding = 'md', className = '', ...props }: CardProps) {
    const base = 'rounded-2xl border bg-white/[0.02]';
    const borderClass = accent
        ? 'border-[#0098EA]/20'
        : 'border-white/[0.06]';
    const hoverClass = hover
        ? 'card-hover cursor-pointer'
        : '';

    return (
        <div
            className={`${base} ${borderClass} ${hoverClass} ${CARD_PADDING[padding]} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

// ─── Badge ────────────────────────────────────────────────────────────────────

type BadgeVariant = 'accent' | 'success' | 'warning' | 'danger' | 'neutral';

interface BadgeProps {
    children: ReactNode;
    variant?: BadgeVariant;
    dot?: boolean;
    className?: string;
}

const BADGE_VARIANTS: Record<BadgeVariant, string> = {
    accent: 'border-[#0098EA]/30 bg-[#0098EA]/[0.1] text-[#0098EA]',
    success: 'border-green-500/25 bg-green-500/[0.08] text-green-400',
    warning: 'border-amber-500/25 bg-amber-500/[0.08] text-amber-400',
    danger: 'border-red-500/25 bg-red-500/[0.08] text-red-400',
    neutral: 'border-white/10 bg-white/[0.04] text-neutral-400',
};

const BADGE_DOT: Record<BadgeVariant, string> = {
    accent: 'bg-[#0098EA]',
    success: 'bg-green-500',
    warning: 'bg-amber-500',
    danger: 'bg-red-500',
    neutral: 'bg-neutral-500',
};

export function Badge({ children, variant = 'neutral', dot = false, className = '' }: BadgeProps) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${BADGE_VARIANTS[variant]} ${className}`}
        >
            {dot && <span className={`h-1.5 w-1.5 rounded-full ${BADGE_DOT[variant]}`} />}
            {children}
        </span>
    );
}

// ─── SectionLabel ─────────────────────────────────────────────────────────────

export function SectionLabel({ children, className = '' }: { children: ReactNode; className?: string }) {
    return (
        <h2 className={`text-xs font-semibold uppercase tracking-[0.15em] text-neutral-600 ${className}`}>
            {children}
        </h2>
    );
}

// ─── Divider ──────────────────────────────────────────────────────────────────

export function Divider({ className = '' }: { className?: string }) {
    return <div className={`border-t border-white/[0.05] ${className}`} />;
}

// ─── Spinner ──────────────────────────────────────────────────────────────────

export function Spinner({ className = '' }: { className?: string }) {
    return (
        <div
            className={`h-5 w-5 animate-spin rounded-full border-2 border-white/10 border-t-[#0098EA] ${className}`}
        />
    );
}

// ─── IconButton ───────────────────────────────────────────────────────────────

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    label: string;
    size?: 'sm' | 'md';
}

export function IconButton({ children, label, size = 'md', className = '', ...props }: IconButtonProps) {
    const sizeClass = size === 'sm' ? 'h-7 w-7' : 'h-8 w-8';
    return (
        <button
            aria-label={label}
            title={label}
            className={`inline-flex items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-neutral-400 transition-colors hover:bg-white/[0.08] hover:text-white ${sizeClass} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
