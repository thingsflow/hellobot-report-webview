const COLOR_VARIANT = {
  gray: 'bg-gray-200',
  lightGray: 'bg-[#f5f5f5]',
};

interface IDivider {
  color?: keyof typeof COLOR_VARIANT;
}
const Divider = ({ color = 'lightGray' }: IDivider) => {
  return <div className={`w-full h-2 ${COLOR_VARIANT[color]}`} />;
};

export default Divider;
