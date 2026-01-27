"use client";

/**
 * @fileoverview Sidebar context provider for the Ultrasooq marketplace.
 *
 * Manages the open/closed and hover state of the application sidebar.
 * This is used primarily by the dashboard layout where the sidebar can be
 * toggled, collapsed, or expanded on hover.
 *
 * @module context/SidebarContext
 */

import React, { createContext, useContext, useState } from "react";

/**
 * Shape of the value exposed by {@link SidebarContext}.
 *
 * @interface SidebarContextType
 * @property {boolean} isOpen - Whether the sidebar is currently expanded / open.
 * @property {boolean} isHovered - Whether the cursor is currently hovering over the sidebar.
 * @property {() => void} openSidebar - Expands the sidebar.
 * @property {() => void} closeSidebar - Collapses the sidebar.
 * @property {() => void} toggleSidebar - Toggles the sidebar between open and closed.
 * @property {(hovered: boolean) => void} setIsHovered - Updates the hover state of the sidebar.
 */
interface SidebarContextType {
  isOpen: boolean;
  isHovered: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  setIsHovered: (hovered: boolean) => void;
}

/**
 * React context for sidebar visibility and hover state.
 * Initialized as `undefined`; consumers must be wrapped by {@link SidebarProvider}.
 */
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

/**
 * Custom hook that retrieves the sidebar context.
 *
 * @throws {Error} If called outside of a {@link SidebarProvider}.
 * @returns {SidebarContextType} The current sidebar context value.
 *
 * @example
 * ```tsx
 * const { isOpen, toggleSidebar } = useSidebar();
 * ```
 */
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

/**
 * Provider component that supplies sidebar open/close and hover state
 * to its subtree.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components that consume the sidebar context.
 *
 * @remarks
 * The sidebar defaults to closed (`isOpen = false`) and not hovered (`isHovered = false`).
 *
 * @example
 * ```tsx
 * <SidebarProvider>
 *   <DashboardLayout />
 * </SidebarProvider>
 * ```
 */
export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  /** Whether the sidebar is in its expanded (open) state. Defaults to `false`. */
  const [isOpen, setIsOpen] = useState(false);
  /** Whether the user is currently hovering over the sidebar. Defaults to `false`. */
  const [isHovered, setIsHovered] = useState(false);

  /** Sets the sidebar to its expanded state. */
  const openSidebar = () => setIsOpen(true);
  /** Sets the sidebar to its collapsed state. */
  const closeSidebar = () => setIsOpen(false);
  /** Toggles the sidebar between expanded and collapsed. */
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <SidebarContext.Provider value={{
      isOpen,
      isHovered,
      openSidebar,
      closeSidebar,
      toggleSidebar,
      setIsHovered
    }}>
      {children}
    </SidebarContext.Provider>
  );
};
