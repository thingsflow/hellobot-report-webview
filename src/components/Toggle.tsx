const Toggle = ({
  isOn,
  onToggle,
}: {
  isOn: boolean;
  onToggle: () => void;
}) => {
  return (
    <div>
      <div className="relative cursor-pointer" onClick={onToggle}>
        <div
          className={`w-[52px] h-8 rounded-[32px]  ${
            isOn
              ? 'transition-all duration-200 bg-[#FFD31A]'
              : 'transition-all duration-200 bg-[#DDDEE1]'
          }`}
        />
        <div
          className={`absolute top-[2px] w-[28px] h-[28px] rounded-full transition-all duration-500 bg-white ${
            isOn ? 'left-[22px]' : 'left-[2px]'
          }`}
        />
      </div>
    </div>
  );
};

export default Toggle;
