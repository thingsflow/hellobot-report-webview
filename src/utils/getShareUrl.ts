// pathname: '/'를 포함한 경로
const getShareUrl = (pathname?: string) => {
  return `${process.env.NEXT_PUBLIC_SKILLSTORE_URL}${pathname}?share=true`;
};

export default getShareUrl;
