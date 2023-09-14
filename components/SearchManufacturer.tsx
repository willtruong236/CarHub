"use client";

import { useState } from "react";
import { SearchManufacturerProps } from "@/types";
import { manufacturers } from "@/constants";
import { Combobox } from "@headlessui/react";
import Image from "next/image";

const SearchManufacturer = ({
  selected,
  setSelected,
}: SearchManufacturerProps) => {
  const [query, setQuery] = useState("");

  const filteredManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="search-manufacturer">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative w-full">
          <Combobox.Button className="absolute top-[14px]">
            <Image
              src="/model-icon.png"
              width={20}
              height={20}
              className="ml-4"
              alt="icon"
            />
          </Combobox.Button>

          <Combobox.Input
            className="search-manufacturer__input"
            placeholder="Make"
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Combobox.Options className="absolute w-full z-50 overflow-y-auto h-60 bg-white">
            {filteredManufacturers.map((item) => (
              <Combobox.Option
                key={item}
                className={({ active }) =>
                  "relative search-manufacturer__option " +
                  (active ? "bg-primary-blue text-white" : "text-gray-900")
                }
                value={item}
              >
                {item}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>

      <button
        type="button"
        className="absolute top-[14px] right-[14px] self-start"
        onClick={() => setSelected("")}
      >
        <p>Clear</p>
      </button>
    </div>
  );
};

export default SearchManufacturer;
