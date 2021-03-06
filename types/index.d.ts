type User = {
  id: number;
  name: string;
  image: string;
};

type Sample = {
  id: number;
  title: string;
  src: string;
};

type BasicInfo = {
  lastName: string;
  firstName: string;
  targetNumber: string;
  rank: string;
  fatherName: string;
  isFather: boolean;
  fatherNumber: string;
  motherName: string;
  isMother: boolean;
  motherNumber: string;
};

type AccountNumberInfo = {
  target: string;
  isCheck: boolean;
  targetBank: string;
  targetAccountNumber: string;
  accountHolder: string;
};

type WayToComeInfo = {
  title: string;
  description: string;
};

type ProductInfo = {
  [k: string]: unknown;
  id?: string;
  sampleId?: string;
  userId?: string;
  mainPhoto: string;
  male: BasicInfo;
  female: BasicInfo;
  greetingMessage: string;
  isD_day: boolean;
  weddingDate: string;
  weddingTime: string;
  weddingAddress: string;
  weddingAddressName: string;
  DetailWeddingAddress: string;
  weddingContact: string;
  noticeTitle: string;
  noticeDescription: string;
  noticeURL: string;
  noticeButtonName: string;
  galleryType: string;
  galleryPictures: string[];
  accountNumberList: AccountNumberInfo[];
  wayToComeList: WayToComeInfo[];
  isGuestBook: boolean;
  videoUrl: string;
  kakaoThumbnail: string;
  kakaoTitle: string;
  kakaoDescription: string;
  URLThumbnail: string;
  URLTitle: string;
  URLDescription: string;
};

type AccountNumber = {
  target: string;
  isCheck: boolean;
  targetBank: string;
  targetAccountNumber: string;
  accountHolder: string;
};

type GuestBook = {
  _id: string;
  id: string;
  name: string;
  password: string;
  message: string;
};
