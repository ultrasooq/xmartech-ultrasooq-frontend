/**
 * @file Settings Index Page - app/my-settings/page.tsx
 * @route /my-settings
 * @description Redirect page. Immediately redirects to /my-settings/address using
 *   Next.js server-side redirect(). No UI is rendered.
 * @authentication None at this level; redirect target handles auth.
 * @key_components None -- pure redirect.
 * @data_fetching None.
 */
import { redirect } from "next/navigation";
import React from "react";

const SettingsPage = () => {
  redirect("/my-settings/address");
};

export default SettingsPage;
