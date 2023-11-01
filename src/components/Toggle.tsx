import { useState } from 'react';




export const Toggle = ({ isOn, onToggle}: any) => {

  return (
    <div>
      <div className="relative cursor-pointer"
        onClick={onToggle}
      >
        <div className={`w-[52px] h-8 rounded-[32px] bg-[#FFD31A] ${isOn ? "transition-all duration-200" : "transition-all duration-200 bg-[#DDDEE1]"}`}/>
        <div className={`absolute top-[2px] w-[28px] h-[28px] rounded-full transition-all duration-500 bg-white ${isOn ? "left-[22px]" : "left-[2px]"}`}/>
      </div>
    </div>
  );
};