import {
  AccountNumbers,
  AddressLocation,
  Greetings,
  GreetingSample,
  Month,
  SwiperImage,
  WayToCome,
} from 'components';
import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { getTime, getWeek } from 'services';

interface Props {
  data: ProductInfo;
}

const BasicSample: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-[#f5f5f5] min-h-screen min-w-[280px] max-w-[480px] mx-auto">
      <div className="relative w-full">
        <div className="absolute w-full h-[calc(100%+60px)] p-5">
          <div className="w-full h-full border border-[#999]"></div>
        </div>
        <div>
          <img
            alt="메인 이미지"
            src="https://picsum.photos/480/650"
            className="w-full h-auto"
          />
          <Fade>
            <div className="mx-auto flex justify-around max-w-[200px] py-8 text-xl font-thin text-bold">
              <p>{data.male.lastName + data.male.firstName}</p>|
              <p>{data.female.lastName + data.female.firstName}</p>
            </div>
            <p className="text-center font-thin text-sm">
              {data.weddingDate.split('-').join('.')}{' '}
              {getWeek(data.weddingDate)}
              요일 {getTime(data.weddingTime)}
            </p>
            <p className="text-center font-thin text-sm">
              {data.weddingAddressName}
            </p>
          </Fade>
        </div>
      </div>
      <Fade>
        <div className="pt-28 pb-16">
          <Greetings
            data={data.greetingMessage}
            className={'font-thin text-sm'}
            male={{
              fatheName: data.male.fatherName,
              motherName: data.male.motherName,
              rank: data.male.rank,
              name: data.male.lastName + data.male.firstName,
            }}
            female={{
              fatheName: data.female.fatherName,
              motherName: data.female.motherName,
              rank: data.female.rank,
              name: data.female.lastName + data.female.firstName,
            }}
          />
        </div>
      </Fade>
      <Fade>
        {/* 갤러리 이미지 */}
        <div className="py-16 px-5">
          <SwiperImage
            data={[
              'https://i.picsum.photos/id/1004/5616/3744.jpg?hmac=Or7EJnz-ky5bsKa9_frdDcDCR9VhCP8kMnbZV6-WOrY',
              'https://i.picsum.photos/id/365/5616/3744.jpg?hmac=m9Chefr19BelgN9G4ErJVFBbdvNmA_xlbd0CjATLwhM',
              'https://i.picsum.photos/id/1047/3264/2448.jpg?hmac=ksy0K4uGgm79hAV7-KvsfHY2ZuPA0Oq1Kii9hqkOCfU',
              'https://i.picsum.photos/id/106/2592/1728.jpg?hmac=E1-3Hac5ffuCVwYwexdHImxbMFRsv83exZ2EhlYxkgY',
              'https://i.picsum.photos/id/1062/5092/3395.jpg?hmac=o9m7qeU51uOLfXvepXcTrk2ZPiSBJEkiiOp-Qvxja-k',
              'https://i.picsum.photos/id/1068/7117/4090.jpg?hmac=Y6xHXrzHsNlbRTbhzZ53Yk-Ux9lUECBLbbP4wb5a1qY',
              'https://i.picsum.photos/id/129/4910/3252.jpg?hmac=g1KzJMIp75lG_scR48R1baC6TjhVmkEyygSyngKYRsg',
              'https://picsum.photos/480/650',
            ]}
          />
        </div>
      </Fade>
      <Fade>
        {/* 달력 */}
        <div className="py-16 px-5 flex justify-center">
          <Month
            date={data.weddingDate}
            time={data.weddingTime}
            fontFamily={'font-thin'}
          />
        </div>
      </Fade>
      <Fade>
        {/* 예식 장소 및 지도 */}
        <div className="px-5 pt-32 pb-8">
          <AddressLocation
            addressName={data.weddingAddressName}
            address={data.weddingAddress}
            detailAddress={data.DetailWeddingAddress}
            contact={data.weddingContact}
            fontFamily={'font-thin'}
          />
        </div>
      </Fade>
      <Fade>
        {/* 오시는 길 */}
        <div className="pb-32">
          {data.wayToComeList?.map((el, i) => {
            return (
              <WayToCome
                key={i}
                title={el.title}
                description={el.description}
              />
            );
          })}
        </div>
      </Fade>
      <Fade>
        {/* 드리는 말씀 */}
        <div className="px-5 pb-32">
          <GreetingSample
            isTitle={true}
            data={data.greetingMessage}
            fontFamily={'font-thin'}
          />
        </div>
      </Fade>
      <Fade>{/* 방명록 */}</Fade>
      <Fade>
        <div className="px-5 pt-14 pb-32">
          <AccountNumbers
            male={data.male}
            female={data.female}
            data={data.accountNumberList}
            fontFamily={'font-thin'}
          />
        </div>
      </Fade>
    </div>
  );
};

export default BasicSample;
