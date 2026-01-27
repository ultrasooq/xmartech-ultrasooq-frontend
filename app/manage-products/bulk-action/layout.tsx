/**
 * @file Bulk Action Layout - app/manage-products/bulk-action/layout.tsx
 * @route /manage-products/bulk-action/*
 * @description Minimal pass-through server-side layout for the bulk product action section.
 *   Simply renders child content with no additional wrapping UI.
 * @authentication None at layout level; authentication is handled by child pages.
 * @key_components None -- renders children as a React fragment.
 * @data_fetching None.
 */
export default function BulkActionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
