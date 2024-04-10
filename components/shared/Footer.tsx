"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import TermsContent from "./TermsContent";
import PolicyContent from "./PolicyContent";
import { Button } from "../ui/button";

const Footer = () => {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const handleToggleTermsModal = () => setIsTermsModalOpen(!isTermsModalOpen);
  const handleTogglePrivacyModal = () =>
    setIsPrivacyModalOpen(!isPrivacyModalOpen);

  return (
    <footer className="w-full pt-16">
      <div className="container m-auto">
        <div className="flex flex-wrap">
          <div className="mb-5 w-full px-3.5 sm:w-6/12 md:w-3/12 lg:w-3/12">
            <h3 className="mb-2 text-lg font-semibold capitalize text-color-dark md:mb-3.5">
              Quick Links
            </h3>
            <ul>
              <li className="w-full py-1.5">
                <Button
                  variant="link"
                  onClick={handleTogglePrivacyModal}
                  className="p-0 text-base font-normal text-light-gray"
                >
                  Policy
                </Button>
              </li>
              <li className="w-full py-1.5">
                <Button
                  variant="link"
                  onClick={handleToggleTermsModal}
                  className="p-0 text-base font-normal text-light-gray"
                >
                  Term & Condition
                </Button>
              </li>
              <li className="w-full py-1.5 text-base font-normal capitalize text-light-gray">
                <a href="#" className="text-light-gray">
                  Shipping
                </a>
              </li>
              <li className="w-full py-1.5 text-base font-normal capitalize text-light-gray">
                <a href="#" className="text-light-gray">
                  Return
                </a>
              </li>
              <li className="w-full py-1.5 text-base font-normal capitalize text-light-gray">
                <a href="#" className="text-light-gray">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-5 w-full px-3.5 sm:w-6/12 md:w-2/12 lg:w-3/12">
            <h3 className="mb-2 text-lg font-semibold capitalize text-color-dark md:mb-3.5">
              Company
            </h3>
            <ul>
              <li className="w-full py-1.5 text-base font-normal capitalize text-light-gray">
                <a href="#" className="text-light-gray">
                  About Us
                </a>
              </li>
              <li className="w-full py-1.5 text-base font-normal capitalize text-light-gray">
                <a href="#" className="text-light-gray">
                  Affilate
                </a>
              </li>
              <li className="w-full py-1.5 text-base font-normal capitalize text-light-gray">
                <a href="#" className="text-light-gray">
                  Career
                </a>
              </li>
              <li className="w-full py-1.5 text-base font-normal capitalize text-light-gray">
                <a href="#" className="text-light-gray">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-5 w-full px-3.5 sm:w-6/12 md:w-2/12 lg:w-2/12">
            <h3 className="mb-2 text-lg font-semibold capitalize text-color-dark md:mb-3.5">
              Business
            </h3>
            <ul>
              <li className="w-full py-1.5 text-base font-normal capitalize text-light-gray">
                <a href="#" className="text-light-gray">
                  Our Press
                </a>
              </li>
              <li className="w-full py-1.5 text-base font-normal capitalize text-light-gray">
                <a href="#" className="text-light-gray">
                  Checkout
                </a>
              </li>
              <li className="w-full py-1.5 text-base font-normal capitalize text-light-gray">
                <a href="#" className="text-light-gray">
                  My Account
                </a>
              </li>
              <li className="w-full py-1.5 text-base font-normal capitalize text-light-gray">
                <a href="#" className="text-light-gray">
                  Shop
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-5 w-full px-3.5 sm:w-6/12 md:w-5/12 lg:w-4/12">
            <h3 className="mb-2 text-lg font-semibold capitalize text-color-dark md:mb-3.5">
              Newsletter
            </h3>
            <div className="mt-3 inline-block w-full">
              <input
                type="email"
                name=""
                placeholder="Email Address"
                className="h-12 w-3/4 rounded-l border border-solid border-gray-200 px-3 py-2.5 text-sm font-normal capitalize focus:outline-none md:px-5 md:py-3.5"
              />
              <button
                type="button"
                className="h-12 w-1/4 rounded-r border border-solid border-dark-orange bg-dark-orange text-xs font-medium text-white md:text-sm"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="flex w-full flex-wrap items-center justify-center border-t border-solid border-gray-200 py-5 lg:justify-between">
            <div className="mb-3 flex w-auto items-center justify-start text-base font-normal capitalize text-light-gray lg:mb-0">
              <p>©2021 Puremoon All Rights Reserved</p>
            </div>
            <div className="flex w-auto flex-wrap items-center justify-center text-base font-normal capitalize text-light-gray lg:justify-end">
              <p className="w-full text-center sm:w-auto">
                We Using Safe Payment For:
              </p>
              <img src="images/all-card.png" className="mt-3 sm:ml-3 sm:mt-0" />
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isTermsModalOpen} onOpenChange={handleToggleTermsModal}>
        <DialogContent className="md:!max-w-4xl">
          <DialogHeader className="border-b border-light-gray pb-3">
            <DialogTitle className="text-center">Terms Of Use</DialogTitle>
          </DialogHeader>
          <DialogDescription className="max-h-[500px] min-h-[300px] overflow-y-auto text-sm font-normal leading-7 text-color-dark">
            <TermsContent />
          </DialogDescription>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isPrivacyModalOpen}
        onOpenChange={handleTogglePrivacyModal}
        style={{ borderRadius: "3px" }}
      >
        <DialogContent className="md:!max-w-4xl">
          <DialogHeader className="border-b border-light-gray pb-3">
            <DialogTitle className="text-center">Privacy Policy</DialogTitle>
          </DialogHeader>
          <DialogDescription className="max-h-[500px] min-h-[300px] overflow-y-auto text-sm font-normal leading-7 text-color-dark">
            <PolicyContent />
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;
