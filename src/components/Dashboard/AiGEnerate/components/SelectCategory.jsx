import React from 'react'
import categories from '../data/categorydatat'
import { useSelector,useDispatch } from 'react-redux';
import { setCourseInput } from '../../../../slices/courseinputSlice';

const SelectCategory = () => {
  const dispatch = useDispatch();
  const { courseinput } = useSelector((state) => state.courseinput);

  const handleCategoryClick = (category) => {
    dispatch(
      setCourseInput({
        ...courseinput, // Retain existing fields in `courseinput`
        category: category.name, // Update only the `category` field
      })
    );
  };
  

  return (
    <div className="flex flex-row items-center justify-center  gap-x-14 bg-navy-800 mt-10 ">
      {categories.map((item, index) => (
        <div
          key={index}
          onClick={() => handleCategoryClick(item)}
          className={`h-2/4 flex flex-col items-center justify-center p-2 bg-navy-900 rounded-lg shadow-md transition-all duration-300 cursor-pointer ${
            courseinput.category === item.name
              ? "border-4 border-caribbeangreen-400 visible"
              : "hover:border-1 border-caribbeangreen-50"
          }`}
        >
          {/* Icon */}
          <img
            src={item.icon}
            alt={item.name}
            className="w-60 h-60 object-contain mb-4"
          />
          {/* Name */}
          <h2 className="text-lg font-bold text-white">{item.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default SelectCategory;