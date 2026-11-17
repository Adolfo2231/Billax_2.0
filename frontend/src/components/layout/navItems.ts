import type { ComponentType } from 'react'
import { AccountsIcon, DashboardIcon, type NavIconProps } from './navIcons'

export type NavItem = {
    to: string
    label: string
    /** Compact label for AppBottomNav when it differs from `label`. */
    shortLabel?: string
    /** When true, only the exact path is active (e.g. Dashboard). */
    end?: boolean
    icon: ComponentType<NavIconProps>
}

/** Single source of truth for AppSidebar and AppBottomNav. */
export const navItems: NavItem[] = [
    {
        to: '/dashboard',
        label: 'Dashboard',
        shortLabel: 'Home',
        end: true,
        icon: DashboardIcon,
    },
    { to: '/accounts', label: 'Accounts', icon: AccountsIcon },
]
