import {
  AccountNumbers,
  Greetings,
  ImageGallery,
  Month,
  WayToCome,
  GreetingSample,
  AddressLocation,
} from 'components';
import React, { FC } from 'react';
import { Fade } from 'react-awesome-reveal';
import { getTime, getWeek } from 'services';

interface Props {
  data: ProductInfo;
}

const SimpleSample: FC<Props> = ({ data }) => {
  return (
    <div className="bg-white min-h-screen min-w-[280px] max-w-[480px] mx-auto">
      <div className="pt-8 pb-6 mx-auto">
        <div className="font-thin text-[20px] text-center">
          <span className="border-b border-[#999]">
            {data.weddingDate.slice(0, 4).split('').join(' ')}
          </span>
        </div>
        <div className="font-thin text-[30px] text-center text-bold">
          <span className="border-b border-[#999]">
            {data.weddingDate.slice(5, 7)}.{data.weddingDate.slice(8, 10)}
          </span>
        </div>
        <p className="font-thin text-center text-[20px]">{`${
          data.male.lastName + data.male.firstName
        }·${data.female.lastName + data.female.firstName}`}</p>
      </div>
      <div className="relative w-full">
        <div>
          <img
            alt="메인 이미지"
            src="https://picsum.photos/480/350"
            className="w-full h-auto"
          />
        </div>
      </div>
      <div className=" pt-2 pb-8">
        {/* <div className="mx-auto flex justify-around max-w-[200px] text-2xl font-thin">
          <p>{data.male.lastName + data.male.firstName}</p>
          {'&'}
          <p>{data.female.lastName + data.female.firstName}</p>
        </div> */}

        <p className="text-center font-thin text-sm mt-8">
          {data.weddingDate.split('-').join('.')} {getWeek(data.weddingDate)}
          요일 {getTime(data.weddingTime)}
        </p>
        <p className="text-center font-thin text-sm">
          {data.weddingAddressName}
        </p>
      </div>
      <Fade>
        {/* 달력 */}
        <div className="px-5 flex justify-center">
          <Month
            isTitle={false}
            date={data.weddingDate}
            time={data.weddingTime}
            fontFamily={'font-thin'}
          />
        </div>
      </Fade>
      <Fade>
        <div className="pt-8 pb-16">
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
        <div className="pt-16 pb-32 px-5">
          <ImageGallery
            data={[
              'https://picsum.photos/480/650',
              'https://picsum.photos/480/650',
              'https://picsum.photos/480/650',
              'https://picsum.photos/480/650',
              'https://picsum.photos/480/650',
              'https://picsum.photos/480/650',
              'https://picsum.photos/480/650',
            ]}
          />
        </div>
      </Fade>
      <Fade>
        {/* 예식 장소 및 지도 */}
        <div className="px-5 pt-8 pb-8">
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
        <div className="pb-12">
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
        <div className="px-5">
          <GreetingSample
            isTitle={true}
            data={data.greetingMessage}
            fontFamily={'font-thin'}
          />
        </div>
      </Fade>
      <Fade>{/* 방명록 */}</Fade>
      <Fade>
        <div className="px-5 py-[100px]">
          <AccountNumbers
            male={data.male}
            female={data.female}
            data={data.accountNumberList}
          />
        </div>
      </Fade>
    </div>
  );
};

export default SimpleSample;