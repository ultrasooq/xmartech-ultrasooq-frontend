import React, { useEffect, useState } from "react";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";

const AddServiceToCartModal: React.FC<any> = ({ selectedServiceDetails, open }) => {
  const t = useTranslations();
  const { langDir } = useAuth();
  const [selectedFeatures, setSelectedFeatures] = useState<number[]>([]);

  const toggleFeature = (id: number) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const features = [
    {
      id: 5,
      serviceId: 5,
      name: "service type 2 test",
      serviceCostType: "FLAT",
      serviceCost: "22",
    },
    {
      id: 6,
      serviceId: 5,
      name: "service type 3 test",
      serviceCostType: "HOURLY",
      serviceCost: "15",
    },
  ];

  useEffect(() => {
    if (!open) {
      setSelectedFeatures([]);
    }
  }, [open]);

  // Handler for the Add to Cart button
  const handleAddToCart = () => {
    // Add your logic here, e.g., send selectedFeatures to a cart
    console.log("Selected Features:", selectedFeatures);
    // You can close the modal after adding to cart if needed
    // setOpen(false); // Uncomment and manage this with parent state if needed
  };

  return (
    <DialogContent className="custom-action-type-chose-picker">
      <div className="modal-headerpart">
        <DialogTitle dir={langDir} className="text-lg font-semibold text-gray-800">
          {t("select_services")}
        </DialogTitle>
      </div>
      <div className="modal-bodypart">
        <div
          className="import-pickup-type-selector-lists"
          dir={langDir}
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {features.map((feature) => {
            const isSelected = selectedFeatures.includes(feature.id);
            return (
              <div
                key={feature.id}
                className="import-pickup-type-selector-item"
                style={{ maxWidth: "100%" }}
              >
                <div
                  className={`import-pickup-type-selector-box flex items-center gap-3 p-4 border rounded-xl cursor-pointer ${
                    isSelected ? "bg-green-50 border-green-500" : "bg-white border-gray-200"
                  }`}
                  style={{
                    minHeight: "0px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleFeature(feature.id)}
                    className="h-5 w-5 text-green-600 focus:ring-green-500"
                  />
                  <div className="text-container flex-1">
                    <h5 dir={langDir} className="text-sm text-gray-800">
                      {feature.name}
                    </h5>
                    <p className="text-xs text-gray-500">
                      {feature.serviceCostType.toLowerCase()} — ₹{feature.serviceCost}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Add to Cart Button */}
        <div className="modal-footerpart" style={{ marginTop: "1rem", textAlign: "center" }}>
          <button
            onClick={handleAddToCart}
            className="bg-orange-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-orange-600 transition-colors"
            style={{ minWidth: "150px" }}
          >
            {t("add_to_cart")}
          </button>
        </div>
      </div>
    </DialogContent>
  );
};

export default AddServiceToCartModal;