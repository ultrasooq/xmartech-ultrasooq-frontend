import React, { useEffect, useState } from "react";
import Products from "@/components/modules/vendorOperations/Products";
import Operations from "@/components/modules/vendorOperations/Operations";
import QuestionAndAnswers from "./QuestionAndComments";
import ServiceQuestionAndAnswers from "./ServiceQuestionAndComments";

/**
 * Container component for the vendor operations page. Orchestrates
 * three child panels:
 *
 * 1. **{@link Operations}** -- Left sidebar with operation tabs.
 * 2. **{@link Products}** -- Middle panel listing the vendor's products
 *    and services. Selecting one passes its data to the right panel.
 * 3. **{@link QuestionAndAnswers}** or **{@link ServiceQuestionAndAnswers}**
 *    -- Right panel showing the Q&A section for the selected product
 *    or service, respectively.
 *
 * The component manages the selected operation, product/service, and
 * product type (`"PRODUCT"` or `"SERVICE"`) as local state.
 *
 * @returns The full vendor operations three-panel layout.
 */
const VendorOperations = () => {
  const [selectedOperation, setSelectedOperation] = useState<string>(
    "questions_n_comments",
  );
  const [selectedProduct, setSelectedProduct] = useState<{[key: string]: any}>();
  const [selectedService, setSelectedService] = useState<{[key: string]: any}>();
  const [productType, setProductType] = useState<"PRODUCT" | "SERVICE">("PRODUCT");

  return (
    <>
      <div className="flex w-full flex-wrap rounded-sm border border-solid border-gray-300">
        <Operations onSelect={(operation) => setSelectedOperation(operation)} />

        <Products 
          onSelectProduct={(product) => {
            setSelectedProduct(product);
            setProductType("PRODUCT");
          }} 
          onSelectService={(service) => {
            setSelectedService(service);
            setProductType("SERVICE");
          }} 
        />

        {selectedOperation == "admin_n_support" && selectedProduct ? (
          <div className="w-full border-r border-solid border-gray-300 lg:w-[67%]">
            <div className="flex min-h-[55px] w-full items-center justify-between border-b border-solid border-gray-300 px-[10px] py-[10px] text-base font-normal text-[#333333]">
              <span>Admin & Support</span>
            </div>
          </div>
        ) : null}

        {selectedOperation == "questions_n_comments" && productType == "PRODUCT" && selectedProduct ? (
          <QuestionAndAnswers 
            productId={selectedProduct.productId} 
            productAddedBy={selectedProduct.userId}
          />
        ) : null}

        {selectedOperation == "questions_n_comments" && productType == "SERVICE" && selectedService ? (
          <ServiceQuestionAndAnswers 
            serviceId={selectedService?.id} 
            serviceAddedBy={selectedService?.sellerId}
          />
        ) : null}

        {selectedOperation == "rate_n_review" && selectedProduct ? (
          <div className="w-full border-r border-solid border-gray-300 lg:w-[67%]">
            <div className="flex min-h-[55px] w-full items-center justify-between border-b border-solid border-gray-300 px-[10px] py-[10px] text-base font-normal text-[#333333]">
              <span>Rate & Review</span>
            </div>
          </div>
        ) : null}

        {selectedOperation == "complains" && selectedProduct ? (
          <div className="w-full border-r border-solid border-gray-300 lg:w-[67%]">
            <div className="flex min-h-[55px] w-full items-center justify-between border-b border-solid border-gray-300 px-[10px] py-[10px] text-base font-normal text-[#333333]">
              <span>Complains</span>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default VendorOperations;
