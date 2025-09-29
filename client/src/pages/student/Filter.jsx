import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const categories = [
  { id: "development", label: "Development" },
  { id: "design", label: "Design" },
  { id: "business", label: "Business" },
  { id: "data-science", label: "Data Science" },
  { id: "marketing", label: "Marketing" },
  { id: "finance", label: "Finance & Accounting" },
  { id: "personal-dev", label: "Personal Development" },
  { id: "it-software", label: "IT & Software" },
  { id: "health-fitness", label: "Health & Fitness" },
  { id: "music", label: "Music" },
];

const Filter = ({ handleFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevCategories) => {
      const newCategories = prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId];
      handleFilterChange(newCategories, sortByPrice);
      return newCategories;
    });
  };

  const selectByPriceHandler = (selectedValue) => {
    setSortByPrice(selectedValue);
    handleFilterChange(selectedCategories, selectedValue);
  };

  return (
    <div className="w-full p-4 transition-all duration-300 border shadow-md md:w-64 rounded-xl bg-white/90 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/90">
      {/* Header Section */}
      <div className="flex flex-col items-start justify-between gap-3 mb-4 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="text-base font-bold text-gray-900 dark:text-gray-100">
          Filter Options
        </h1>
        <Select onValueChange={selectByPriceHandler}>
          <SelectTrigger className="w-full sm:w-[140px] rounded-md border-gray-300 bg-gray-50/80 px-3 py-1.5 text-sm text-gray-700 shadow-sm transition hover:border-indigo-400 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="z-50 w-full sm:w-[140px] rounded-md border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
            <SelectGroup>
              <SelectLabel className="px-2 py-1 text-xs text-gray-500 uppercase dark:text-gray-400">
                Sort by price
              </SelectLabel>
              <SelectItem
                value="low"
                className="px-3 py-1.5 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Low to High
              </SelectItem>
              <SelectItem
                value="high"
                className="px-3 py-1.5 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                High to Low
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Separator className="my-3 dark:bg-gray-700" />

      {/* Categories */}
      <div>
        <h1 className="mb-2 text-xs font-semibold tracking-wide text-gray-600 uppercase dark:text-gray-300">
          Category
        </h1>
        <div className="space-y-1 max-h-[calc(100vh-300px)] overflow-y-auto">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center p-1.5 space-x-2 transition border border-transparent rounded-md hover:border-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <Checkbox
                id={category.id}
                onCheckedChange={() => handleCategoryChange(category.id)}
                className="border-gray-400 w-4 h-4 dark:border-gray-600 data-[state=checked]:bg-indigo-600"
              />
              <Label
                htmlFor={category.id}
                className="text-xs font-medium text-gray-700 transition cursor-pointer sm:text-sm hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
              >
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;