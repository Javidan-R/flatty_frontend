import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Button from "../Button";
import { useFilters } from "../../hooks/useFilters";
import { updateFilters } from "../../store/slices/searchSlice";
import { useDispatch } from "react-redux";
import { isApplyDisabled } from "../../utils/filterUtils";
import {
  FilterSelect,
  FilterButtonGroup,
  FilterNumberRange,
  FilterToggle,
} from "../../modules/FilterModalModules";
import { Add, Subtract, Close } from "../../assets/icons";

export const FilterModal = ({ isOpen, onClose, onApply }) => {
  const {
    filters = {},
    setFilter,
    toggleFilter,
    incrementFilter,
    decrementFilter,
    clearFilters,
  } = useFilters();

  // Local state for UI interactions
  const [selectedFilters, setSelectedFilters] = useState(filters);
  const dispatch = useDispatch();

  useEffect(() => {
    // Sync selectedFilters with filters when modal opens or filters change externally
    setSelectedFilters(filters);
  }, []);

  const handleApply = () => {
    const queryParams = new URLSearchParams();
    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        if (typeof value === "object" && !Array.isArray(value)) {
          // For nested objects like 'rooms'
          Object.entries(value).forEach(([subKey, subValue]) => {
            if (subValue !== 0 && subValue !== "") {
              if (subKey === "options" && Array.isArray(subValue)) {
                subValue.forEach((option) =>
                  queryParams.append(`${key}.${subKey}`, option)
                );
              } else {
                queryParams.append(`${key}.${subKey}`, subValue);
              }
            }
          });
        } else if (Array.isArray(value)) {
          // For arrays like 'renovation', 'furniture'
          value.forEach((item) => queryParams.append(key, item));
        } else {
          queryParams.append(key, value);
        }
      }
    });

    localStorage.setItem("filters", JSON.stringify(selectedFilters));
    // Dispatch the filters to Redux store
    dispatch(updateFilters(selectedFilters));
    // Send filters to parent component with query parameters
    onApply(selectedFilters, queryParams.toString());
    onClose(); // Close modal
  };
  const handleCancel = () => {
    clearFilters();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <div className="fixed z-50 flex items-center justify-center inset-1">
        <motion.div
          className="bg-white rounded-lg w-full max-w-[638px] h-[376px] overflow-auto p-6 relative"
          animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 50, rotate: 10 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            aria-label="Close modal"
            className="absolute text-xl text-gray-500 top-4 right-4"
            onClick={onClose}
          >
            <Close />
          </button>
          <h3 className="text-[28px] font-semibold text-left mb-2">Filter</h3>

          {/* Filter Components */}
          <FilterNumberRange
            label="Area (m²)"
            category="area"
            fromKey="from"
            toKey="to"
            filters={filters}
            setFilter={setFilter}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            unit="m²"
          />
          <FilterButtonGroup
            label="Renovation"
            options={[
              "Cosmetic",
              "Designer",
              "European style",
              "Needs renovation",
            ]}
            category="renovation"
            setFilter={setFilter}
            setSelectedFilters={setSelectedFilters}
            selectedFilters={selectedFilters}
          />

          <FilterNumberRange
            label="Floor"
            category="floor"
            fromKey="from"
            toKey="to"
            filters={filters}
            setFilter={setFilter}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            additionalOptions={["Not first", "Not last", "Last"]}
            unit=""
          />

          <div className="flex flex-wrap justify-between gap-3 my-4">
            {["bathroom", "livingRoom", "bedroom", "balcony"].map((type) => (
              <div key={type} className="flex flex-wrap items-center my-2">
                <label className="block text-[10px] font-semibold capitalize text-[#525C76] leading-[16px] mr-2">
                  {type}
                </label>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      decrementFilter(`rooms.${type}`);
                      setSelectedFilters((prev) => ({
                        ...prev,
                        rooms: {
                          ...prev.rooms,
                          [type]: Math.max((prev.rooms?.[type] || 0) - 1, 0),
                        },
                      }));
                    }}
                  >
                    <Subtract />
                  </button>
                  <span className="text-[14px] align-middle font-semibold leading-[22.4px]">
                    {selectedFilters.rooms?.[type] || 0}
                  </span>
                  <button
                    onClick={() => {
                      incrementFilter(`rooms.${type}`);
                      setSelectedFilters((prev) => ({
                        ...prev,
                        rooms: {
                          ...prev.rooms,
                          [type]: (prev.rooms?.[type] || 0) + 1,
                        },
                      }));
                    }}
                  >
                    <Add />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Toggles */}
          <div className="flex justify-start gap-6 mb-4"></div>

          {/* Apply and Cancel buttons */}
          <div className="flex justify-end gap-4">
            <Button
              onClick={handleApply}
              className={`bg-[#8247E5] text-white px-4 py-2 rounded ${
                isApplyDisabled(selectedFilters)
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={isApplyDisabled(selectedFilters)}
            >
              Apply
            </Button>
            <Button
              variant="cancel"
              onClick={handleCancel}
              className="text-[#4F5B66] text-sm hover:text-[#8247E5] px-4 py-2 rounded"
            >
              Cancel
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FilterModal;
