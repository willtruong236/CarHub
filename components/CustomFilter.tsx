"use client";

import { useState } from "react";
import Image from "next/image";
import { CustomFilterProps } from "@/types";
import { Listbox } from "@headlessui/react";

export default function CustomFilter<T>({
  options,
  setFilter,
}: CustomFilterProps<T>) {
  const [selected, setSelected] = useState(options[0]);

  return (
    <div className="w-fit">
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e);
          setFilter(e.value as unknown as T);
        }}
      >
        <div className="relative w-fit z-10">
          <Listbox.Button className="custom-filter__btn">
            <span className="block truncate">{selected.title}</span>
            <Image
              src="/chevron-up-down.svg"
              width={20}
              height={20}
              className="ml-4 object-contain"
              alt="up down"
            />
          </Listbox.Button>

          <Listbox.Options className="custom-filter__options">
            {options.map((option) => (
              <Listbox.Option
                key={option.title}
                value={option}
                className={({ active }) =>
                  "relative cursor-default select-none py-2 px-4 " +
                  (active ? "bg-primary-blue text-white" : "text-gray-900")
                }
              >
                {({ selected }) => (
                  <span
                    className={
                      "block truncate " +
                      (selected ? "font-medium" : "font-normal")
                    }
                  >
                    {option.title}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
