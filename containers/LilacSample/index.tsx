import {
  AccountNumbers,
  Greetings,
  Month,
  WayToCome,
  GreetingSample,
  AddressLocation,
  SwiperImage,
  Share,
  ImageGallery,
  GuestBook,
} from 'components';
import React, { FC } from 'react';
import { Fade } from 'react-awesome-reveal';
import { getContvertToEmbeddedURL, getTime, getWeek } from 'services';

interface Props {
  data: ProductInfo;
}

const LilacSample: FC<Props> = ({ data }) => {
  return (
    <div className="bg-[#e7e7f5] min-h-screen min-w-[280px] max-w-[480px] mx-auto">
      <p className="font-stylish text-center text-3xl py-8">저희, 결혼합니다</p>
      <div className="relative w-full">
        <div className="px-12">
          <img
            alt="메인 이미지"
            src={data.mainPhoto}
            className="w-full h-auto"
          />
        </div>
      </div>
      <div className="mx-auto text-right px-12 py-5 text-xl font-stylish">
        <p>{data.male.lastName + data.male.firstName}</p>
        <p className="text-xs font-stylish">그리고,</p>
        <p>{data.female.lastName + data.female.firstName}</p>
      </div>
      <Fade>
        <div className=" pb-12">
          <Greetings
            data={data.greetingMessage}
            className={'font-stylish text-sm'}
            male={{
              fatheName: data.male.fatherName,
              isFather: data.male.isFather,
              motherName: data.male.motherName,
              isMother: data.male.isMother,
              rank: data.male.rank,
              name: data.male.lastName + data.male.firstName,
            }}
            female={{
              fatheName: data.female.fatherName,
              isFather: data.female.isFather,
              motherName: data.female.motherName,
              isMother: data.female.isMother,
              rank: data.female.rank,
              name: data.female.lastName + data.female.firstName,
            }}
          />
        </div>
      </Fade>
      <Fade>
        {/* 달력 */}
        <div className="pb-40 px-5 flex justify-center">
          <Month
            isD_day={data.isD_day}
            male={data.male.firstName}
            female={data.female.firstName}
            date={data.weddingDate}
            time={data.weddingTime}
            fontFamily={'font-stylish'}
          />
        </div>
      </Fade>
      <Fade>
        {/* 갤러리 이미지 */}
        {data.galleryPictures?.length ? (
          <div className="pb-40 px-5">
            {data.galleryType === 'slider' ? (
              <SwiperImage data={data.galleryPictures} />
            ) : (
              <ImageGallery data={data.galleryPictures} />
            )}
          </div>
        ) : null}
      </Fade>
      <Fade>
        {/* 예식 장소 및 지도 */}
        <div className="px-5 pb-40">
          <AddressLocation
            addressName={data.weddingAddressName}
            address={data.weddingAddress}
            detailAddress={data.DetailWeddingAddress}
            contact={data.weddingContact}
            fontFamily={'font-stylish'}
          />
        </div>
      </Fade>
      <Fade>
        {/* 오시는 길 */}
        {data.wayToComeList.filter((el) => el.title !== '')?.length ? (
          <div className="-mt-32 pb-40">
            {data.wayToComeList
              .filter((el) => el.title !== '')
              .map((el, i) => {
                return (
                  <WayToCome
                    key={i}
                    title={el.title}
                    description={el.description}
                  />
                );
              })}
          </div>
        ) : null}
      </Fade>
      <Fade>
        {/* 드리는 말씀 */}
        <div className="px-5 pb-40">
          <GreetingSample
            isTitle={true}
            data={data.greetingMessage}
            fontFamily={'font-stylish'}
          />
        </div>
      </Fade>
      <Fade>
        {/* 방명록 */}
        {data.isGuestBook && data?.id ? (
          <div className="px-5 pb-40">
            <GuestBook
              id={data.id}
              userId={data?.userId || ''}
              fontFamily={'font-thin'}
            />
          </div>
        ) : null}
      </Fade>
      <Fade>
        {/* 식전 영상 */}
        {data?.videoUrl ? (
          <iframe
            className="w-full h-80 mb-40"
            src={getContvertToEmbeddedURL(data.videoUrl)}
          />
        ) : null}
      </Fade>
      <Fade>
        <div className="px-5 pb-40">
          <AccountNumbers
            male={data.male}
            female={data.female}
            data={data.accountNumberList}
            fontFamily={'font-stylish'}
          />
        </div>
      </Fade>
      <Share
        imgUrl={data.kakaoThumbnail || data.mainPhoto}
        date={data.weddingDate}
        time={data.weddingTime}
        kakaoTitle={data.kakaoTitle}
        kakaoDescription={data.kakaoDescription}
      />
    </div>
  );
};

export default LilacSample;
