/**
 * @fileoverview Banner type definitions for the Ultrasooq marketplace.
 *
 * Covers the data model for promotional banners, including full banner
 * records, creation payloads, analytics summaries, and API response
 * wrappers.
 *
 * @module utils/types/banner.types
 * @dependencies None (pure type definitions).
 */

/**
 * Represents a promotional banner record as persisted in the backend.
 *
 * @description
 * Intent: Models a single banner entity used for hero sections, sidebar
 * promotions, pop-ups, or full-width ad placements across the marketplace.
 *
 * Usage: Consumed by banner carousel components, admin banner management
 * pages, and analytics dashboards.
 *
 * Data Flow: API GET /banners -> IBanner[].
 *
 * @property id - Unique database identifier.
 * @property title - Banner headline text.
 * @property subtitle - Optional secondary text.
 * @property description - Optional longer description body.
 * @property image - URL/path to the banner image asset.
 * @property link - Optional legacy link field.
 * @property buttonText - Optional CTA button label.
 * @property position - Placement slot on the page layout.
 * @property isActive - Whether the banner is currently live.
 * @property priority - Sort order weight (lower = higher priority).
 * @property startDate - ISO date string when the banner becomes active.
 * @property endDate - ISO date string when the banner expires.
 * @property targetUrl - Destination URL when the banner is clicked.
 * @property clicks - Cumulative click count for analytics.
 * @property views - Cumulative impression count for analytics.
 * @property createdAt - ISO timestamp of record creation.
 * @property updatedAt - ISO timestamp of last update.
 */
export interface IBanner {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  link?: string;
  buttonText?: string;
  position: 'main' | 'side-top' | 'side-bottom' | 'full-width' | 'popup';
  isActive: boolean;
  priority: number;
  startDate?: string;
  endDate?: string;
  targetUrl?: string;
  clicks: number;
  views: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Request payload for creating a new banner.
 *
 * @description
 * Intent: Captures the fields needed by the backend to create a banner record.
 *
 * Usage: Submitted via the admin banner creation form.
 *
 * Data Flow: Admin form -> mutation hook -> API POST /banners.
 *
 * @property title - Banner headline text.
 * @property subtitle - Optional secondary text.
 * @property description - Optional longer description body.
 * @property image - URL/path to the uploaded banner image.
 * @property link - Optional legacy link field.
 * @property buttonText - Optional CTA button label.
 * @property position - Placement slot on the page layout.
 * @property priority - Optional sort order weight.
 * @property startDate - Optional ISO date string for activation.
 * @property endDate - Optional ISO date string for expiration.
 * @property targetUrl - Optional destination URL on click.
 */
export interface ICreateBanner {
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  link?: string;
  buttonText?: string;
  position: 'main' | 'side-top' | 'side-bottom' | 'full-width' | 'popup';
  priority?: number;
  startDate?: string;
  endDate?: string;
  targetUrl?: string;
}

/**
 * Aggregated analytics data for banner performance.
 *
 * @description
 * Intent: Provides a summary of banner engagement metrics for the admin
 * analytics dashboard.
 *
 * Usage: Consumed by the banner analytics page to display KPIs and a
 * list of top-performing banners.
 *
 * Data Flow: API GET /banners/analytics -> IBannerAnalytics.
 *
 * @property totalBanners - Total number of banner records.
 * @property activeBanners - Count of currently active banners.
 * @property totalClicks - Sum of all banner clicks.
 * @property totalViews - Sum of all banner impressions.
 * @property clickThroughRate - Calculated CTR as a percentage.
 * @property topBanners - Array of the highest-performing banners.
 */
export interface IBannerAnalytics {
  totalBanners: number;
  activeBanners: number;
  totalClicks: number;
  totalViews: number;
  clickThroughRate: number;
  topBanners: IBanner[];
}

/**
 * Generic API response wrapper for banner endpoints.
 *
 * @description
 * Intent: Provides a unified response shape for all banner-related API calls,
 * supporting single banner, array, or paginated data.
 *
 * Usage: Used as the return type for banner API service functions.
 *
 * Data Flow: API response JSON -> IBannerResponse.
 *
 * @property status - Whether the API call succeeded.
 * @property message - Human-readable status/error message.
 * @property data - Either a single banner, an array, or a paginated result set.
 */
export interface IBannerResponse {
  status: boolean;
  message: string;
  data: IBanner | IBanner[] | {
    banners: IBanner[];
    total: number;
    page: number;
    limit: number;
  };
}

