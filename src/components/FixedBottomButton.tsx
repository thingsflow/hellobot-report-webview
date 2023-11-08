interface IFixedBottomButton {
  title: string;
  onClick?: () => void;
}

const FixedBottomButton = ({ title, onClick }: IFixedBottomButton) => {
  return (
    <div
      className="fixed bottom-0 w-full max-w-xl p-4 bg-white cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-center font-bold h-12 bg-[#FFE967] rounded-[26px] cursor-pointer">
        {title}
      </div>
    </div>
  );
};

export default FixedBottomButton;
