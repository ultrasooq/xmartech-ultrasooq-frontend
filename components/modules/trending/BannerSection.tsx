/**
 * @file BannerSection.tsx
 * @description Static promotional banner component for the trending products page.
 *   Displays a hardcoded hero banner with breadcrumb navigation, heading text,
 *   date range, description, "Shop Now" button, and a decorative product image.
 *
 * @props None
 *
 * @behavior
 *   - Renders a full-width banner with a background image and overlaid content.
 *   - Breadcrumb: "Home > Trending Products" with chevron separator.
 *   - Displays fixed text: "Big Deal Days", date "18 Sep 2024 - 20 Sep 2024",
 *     promotional description, and a "Shop Now" link button.
 *   - Right side shows a decorative product image.
 *   - Entirely static with hardcoded content (no props or dynamic data).
 *
 * @dependencies
 *   - Static image imports (trending banner, chevron, inner banner).
 *   - Link (next/link) - Navigation for breadcrumb and shop button.
 */
import React from "react";
import Image from "next/image";
import TrendingBannerImage from "@/public/images/trending-product-inner-banner.png";
import ChevronRightIcon from "@/public/images/nextarow.svg";
import InnerBannerImage from "@/public/images/trending-product-inner-banner-pic.png";
import Link from "next/link";

const BannerSection = () => {
  return (
    <div className="custom-inner-banner-s1">
      <div className="container m-auto px-3">
        <div className="custom-inner-banner-s1-captionBox relative">
          <Image
            src={TrendingBannerImage}
            alt="trending-banner"
            className="bg-image"
            fill
          />
          <div className="text-container">
            <ul className="page-indicator">
              <li>
                <Link href="/home">Home</Link>
                <Image
                  src={ChevronRightIcon}
                  alt="next-icon"
                  width={8}
                  height={12}
                />
              </li>
              <li>
                <Link href="/trending">Shop</Link>
                <Image
                  src={ChevronRightIcon}
                  alt="next-icon"
                  width={8}
                  height={12}
                />
              </li>
              <li>Phones & Accessories</li>
            </ul>
            <h2>sed do eiusmod tempor incididunt</h2>
            <h5>Only 2 days:</h5>
            <h4>21/10 & 22/10</h4>
            <div className="action-btns">
              <button type="button" className="theme-primary-btn custom-btn">
                Shop Now
              </button>
            </div>
          </div>
          <div className="relative h-[250px] w-full md:h-[360px] md:w-[548px]">
            <Image
              src={InnerBannerImage}
              alt="inner-banner"
              fill
              className="h-auto md:h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
