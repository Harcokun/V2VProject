import React, { useEffect, useState } from "react";

interface DropDownProps {
  carsData: Array<any>;
  /**function from the parent to pull back the selected station from this component.*/
  getCarFromDropDown: (car: any) => void;
}

const DropDownButton: React.FC<DropDownProps> = ({
  carsData,
  getCarFromDropDown,
}) => {
  const [selectedCar, setSelectedCar] = useState<any>();

  /** Necessary for closing the dropdown after choosing a station. */
  const [isListOpen, setListOpen] = useState(false);

  const toggleList = () => {
    setListOpen(!isListOpen);
  };

  const selectCar = (car: any) => {
    setSelectedCar(car);
    getCarFromDropDown(car);
    setListOpen(false);
  };

  useEffect(() => {
    console.log(carsData);
  }, [carsData]);

  return (
    <>
      <button
        id="dropdownDividerButton"
        data-dropdown-toggle="dropdownDivider"
        className="
        text-black
        bg-white border-[1px] 
        border-gray-500
         font-medium 
         rounded-lg 
         text-sm
         px-4 py-2.5 
         text-center 
         inline-flex
         items-center
         shadow-md
         mb-1
         w-44
         justify-between"
        type="button"
        onClick={toggleList}
      >
        <p className="truncate text-base">
          {selectedCar ? selectedCar.model : "Select a car"}
        </p>
        <div>
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
      </button>

      {isListOpen && (
        <div
          id="dropdownDivider"
          className=" 
          z-10 
          absolute 
          w-44 
          text-base 
          list-none 
          bg-white 
          rounded-lg 
          divide-y 
        divide-gray-100 
          shadow "
        >
          <ul className="rounded-lg" aria-labelledby="dropdownDividerButton">
            {carsData.map((car, i) => (
              <li
                key={i}
                className="
                block 
                py-3 px-4 
                text-sm 
                text-gray-700 
                hover:bg-gray-100 
                border-b-[1px] 
                border-gray-800
                truncate"
                onClick={() => selectCar(car)}
              >
                {car.Model}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default DropDownButton;
