import { environment } from '../../environments/environment';

// pathname: '/'를 포함한 경로
const getShareUrl = (pathname?: string) => {
  return `${environment.url}${pathname}?share=true`;
};

export default getShareUrl;
