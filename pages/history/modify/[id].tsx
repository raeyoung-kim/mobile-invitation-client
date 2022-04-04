import {
  AccountNumberForm,
  CheckInfo,
  InputTextarea,
  TargetInfo,
  Input,
  FileInput,
  Textarea,
  ModalLayout,
  Map,
  Loading,
} from 'components';
import { GreetingSampleModal } from 'containers';
import { NextPage } from 'next';
import React, { ChangeEvent, useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import DaumPostcode from 'react-daum-postcode';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import request from 'services/api';
import { useData, useUser } from 'services';
import axios from 'axios';

const HistoryModifyPage: NextPage = () => {
  const { push, query } = useRouter();
  const token = Cookies.get('refreshToken');

  const { user } = useUser();
  const { data, setData } = useData();

  const [isLoading, setIsLoading] = useState(false);

  const [imageFile, setImageFile] = useState<{
    mainPhoto: null | File;
    kakaoThumbnail: null | File;
    URLThumbnail: null | File;
    galleryPictures: File[];
  }>({
    mainPhoto: null,
    kakaoThumbnail: null,
    URLThumbnail: null,
    galleryPictures: [],
  });

  const [modal, setModal] = useState({
    isGreetingSample: false,
    isPostcode: false,
  });

  const handleModify = async () => {
    try {
      setIsLoading(true);
      /* 수정하기 */

      // await request.put('/sample', {
      //   id: query.id,
      //   data,
      // });
      // push('/history');
    } catch {
      console.error;
    } finally {
      setIsLoading(false);
    }
  };

  const onTargetClick = (i: number) => {
    const targetList = JSON.parse(JSON.stringify(data.accountNumberList));
    targetList.splice(i, 1, {
      ...data.accountNumberList[i],
      isCheck: !data.accountNumberList[i].isCheck,
    });
    setData({
      ...data,
      accountNumberList: targetList,
    });
  };

  const onChangeTagetBank = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const targetList = JSON.parse(JSON.stringify(data.accountNumberList));
    targetList.splice(i, 1, {
      ...data.accountNumberList[i],
      targetBank: e.target.value,
    });
    setData({
      ...data,
      accountNumberList: targetList,
    });
  };

  const onChangeTagetAccountNumber = (
    e: ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const targetList = JSON.parse(JSON.stringify(data.accountNumberList));
    targetList.splice(i, 1, {
      ...data.accountNumberList[i],
      targetAccountNumber: e.target.value,
    });
    setData({
      ...data,
      accountNumberList: targetList,
    });
  };

  const onChageAccountHolder = (
    e: ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const targetList = JSON.parse(JSON.stringify(data.accountNumberList));
    targetList.splice(i, 1, {
      ...data.accountNumberList[i],
      accountHolder: e.target.value,
    });
    setData({
      ...data,
      accountNumberList: targetList,
    });
  };

  const onGreetingModal = () => {
    setModal({
      ...modal,
      isGreetingSample: !modal.isGreetingSample,
    });
  };

  const setGreetingMessage = (val: string) => {
    setData({
      ...data,
      greetingMessage: val,
    });
    onGreetingModal();
  };

  const load = useCallback(async () => {
    try {
      const { data } = await request.get('/sample', {
        params: {
          id: query.id,
        },
      });

      setData(data);
    } catch {
      console.error;
    }
  }, [query.id, setData]);

  useEffect(() => {
    !token && push('/login');
  }, [push, token]);

  useEffect(() => {
    query.id && load();
  }, [load, query.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] m-auto px-5 pb-[120px] lg:pt-[40px] lg:pb-[280px] lg:px-0">
      {/* 메인사진 */}
      <section className="mt-10">
        <strong className="font-jua text-[19px]">
          메인사진을 선택해주세요 📸
        </strong>
        <p className="description">가로, 세로에 상관 없이 추가 가능합니다.</p>
        <FileInput
          data={[data.mainPhoto]}
          limit={1}
          handleFile={(val: File) => {
            setImageFile({
              ...imageFile,
              mainPhoto: val,
            });
          }}
        />
      </section>

      {/* 신랑측 정보 */}
      <section className="mt-10 lg:w-[40%]">
        <TargetInfo
          target={'신랑'}
          data={data.male}
          setData={(value) => {
            setData({
              ...data,
              male: value,
            });
          }}
        />
      </section>

      {/* 신부측 정보 */}
      <section className="mt-10 lg:w-[40%]">
        <TargetInfo
          target={'신부'}
          data={data.female}
          setData={(value) => {
            setData({
              ...data,
              female: value,
            });
          }}
        />
      </section>

      {/* 인사말 정보 */}
      <section className="mt-10">
        <strong className="font-jua text-[19px]">인사말을 알려주세요 📝</strong>
        <p className="description">
          원하시는 인사말으로 직접 추가도 가능합니다.
        </p>
        <div className="mt-4">
          <Textarea
            placeholder={'인사말'}
            value={data.greetingMessage}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setData({
                ...data,
                greetingMessage: e.target.value,
              });
            }}
          />
        </div>
        <div className="mt-4">
          <button
            onClick={onGreetingModal}
            className="bg-black text-white text-center p-3 shadow rounded-md"
          >
            샘플 인사말 보기
          </button>
          {modal.isGreetingSample && (
            <GreetingSampleModal
              onClose={onGreetingModal}
              onClick={setGreetingMessage}
            />
          )}
        </div>
      </section>

      {/* 예식장 위치, 예식일자 정보 */}
      <section className="mt-10 lg:w-[40%]">
        <strong className="font-jua text-[19px]">
          예식장 위치와 <br /> 예식일자를 알려주세요 🗓
        </strong>
        <div className="mt-4">
          <p className="description">예식 일자</p>
          <div className="mt-4">
            <div className="mt-3">
              <Input
                type={'date'}
                value={data.weddingDate}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setData({
                    ...data,
                    weddingDate: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mt-3">
              <Input
                type={'time'}
                value={data.weddingTime}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setData({
                    ...data,
                    weddingTime: e.target.value,
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <div className="flex items-center ml-4">
            <input
              type={'checkbox'}
              defaultChecked={data.isD_day}
              onChange={(e) =>
                setData({
                  ...data,
                  isD_day: e.target.checked,
                })
              }
            />
            <p className="ml-2 description">디데이 표시</p>
          </div>
        </div>
        <div className="mt-4">
          <Input
            placeholder={'예식장 주소'}
            value={data.weddingAddress}
            onFocus={() =>
              setModal({
                ...modal,
                isPostcode: true,
              })
            }
          />
          {/* 주소 검색 */}
          {modal.isPostcode && (
            <ModalLayout
              onClose={() => {
                setModal({
                  ...modal,
                  isPostcode: false,
                });
              }}
            >
              <DaumPostcode
                style={{ height: '100vh' }}
                onComplete={(resData) => {
                  setData({
                    ...data,
                    weddingAddress: resData.address,
                  });

                  setModal({
                    ...modal,
                    isPostcode: false,
                  });
                }}
              />
            </ModalLayout>
          )}
          {data?.weddingAddress ? (
            <div className="mt-4">
              <Map address={data.weddingAddress} />
            </div>
          ) : null}
        </div>
        <div className="mt-4">
          <Input
            placeholder={'예식장 명'}
            value={data.weddingAddressName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setData({
                ...data,
                weddingAddressName: e.target.value,
              });
            }}
          />
        </div>
        <div className="mt-4">
          <Input
            placeholder={'예식장 층과 홀'}
            value={data.DetailWeddingAddress}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setData({
                ...data,
                DetailWeddingAddress: e.target.value,
              });
            }}
          />
        </div>
        <div className="mt-4">
          <Input
            type="tel"
            placeholder={'예식장 연락처'}
            value={data.weddingContact}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setData({
                ...data,
                weddingContact: e.target.value,
              });
            }}
          />
        </div>
      </section>

      <section className=" mt-6 lg:w-[40%]">
        <CheckInfo
          isData={
            data.wayToComeList.find((el) => el.title !== '') ? true : false
          }
          title={'오시는길 🚶 🏃'}
        >
          <div>
            {data?.wayToComeList.map((el, i) => {
              return (
                <InputTextarea
                  key={i}
                  inputValue={el.title}
                  inputPlaceholder={`교통수단 ${i + 1} (지하철, 자가용, 버스)`}
                  textareaValue={el.description}
                  textareaPlaceholder={'오시는길 내용'}
                  onChageInput={(e) => {
                    const result = data.wayToComeList;
                    result.splice(i, 1, {
                      title: e.target.value,
                      description: result[i].description,
                    });
                    setData({
                      ...data,
                      wayToComeList: result,
                    });
                  }}
                  onChangeTextarea={(e) => {
                    const result = data.wayToComeList;
                    result.splice(i, 1, {
                      title: result[i].title,
                      description: e.target.value,
                    });
                    setData({
                      ...data,
                      wayToComeList: result,
                    });
                  }}
                />
              );
            })}
          </div>
        </CheckInfo>
        <CheckInfo
          isData={data.noticeTitle || data.noticeURL ? true : false}
          title={'공지사항 📃'}
        >
          <>
            <p className="mt-2 description">
              코로나 안내, 전세버스 안내, 라이브 안내 등 필요하신 공지사항을
              추가하실 수 있습니다.
              <br /> (링크를 추가하시면 공지사항 아래에 버튼이 생성됩니다)
            </p>
            <InputTextarea
              inputValue={data.noticeTitle}
              inputPlaceholder="공지사항 제목"
              textareaValue={data.noticeDescription}
              textareaPlaceholder="공지사항 내용"
              onChageInput={(e) =>
                setData({
                  ...data,
                  noticeTitle: e.target.value,
                })
              }
              onChangeTextarea={(e) => {
                setData({
                  ...data,
                  noticeDescription: e.target.value,
                });
              }}
            />
            <p className="mt-4 description">
              (선택) 링크를 추가하시면 공지사항 아래에 링크로 이동가능한 버튼이
              생성됩니다.
              <br /> (예. https://www.youtube.com)
            </p>
            <div className="mt-4">
              <Input
                placeholder={'링크 URL'}
                value={data.noticeURL}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setData({
                    ...data,
                    noticeURL: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mt-4">
              <Input
                placeholder={'링크 버튼 제목'}
                value={data.noticeButtonName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setData({
                    ...data,
                    noticeButtonName: e.target.value,
                  });
                }}
              />
            </div>
          </>
        </CheckInfo>
        <CheckInfo
          isData={data.galleryPictures?.length ? true : false}
          title={'갤러리 사진 🖼 (최대 15장)'}
        >
          <div>
            <section className="mt-5">
              <FileInput
                limit={15}
                data={data.galleryPictures}
                handleFile={(val: File) => {
                  if (imageFile.galleryPictures) {
                    setImageFile({
                      ...imageFile,
                      galleryPictures: [...imageFile.galleryPictures, val],
                    });
                  } else {
                    setImageFile({
                      ...imageFile,
                      galleryPictures: [val],
                    });
                  }
                }}
              />
            </section>
          </div>
        </CheckInfo>
        <CheckInfo
          isData={
            data.accountNumberList?.find((el) => el.isCheck) ? true : false
          }
          title={'계좌번호 🎀'}
        >
          <>
            <div>
              <div className="grid grid-cols-2 gap-4 py-5">
                {data.accountNumberList?.map((button, i) => {
                  return (
                    <button
                      onClick={() => {
                        onTargetClick(i);
                      }}
                      key={button.target}
                      className={classNames('button', {
                        'bg-black text-white': button.isCheck,
                      })}
                    >
                      {button.target}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              {data.accountNumberList?.map((el, i) => {
                return (
                  <AccountNumberForm
                    key={el.target}
                    target={el.target}
                    isCheck={el.isCheck}
                    targetBank={el.targetBank}
                    onChangeTagetBank={(e: ChangeEvent<HTMLInputElement>) => {
                      onChangeTagetBank(e, i);
                    }}
                    targetAccountNumber={el.targetAccountNumber}
                    onChangeTagetAccountNumber={(
                      e: ChangeEvent<HTMLInputElement>
                    ) => {
                      onChangeTagetAccountNumber(e, i);
                    }}
                    accountHolder={el.accountHolder}
                    onChageAccountHolder={(
                      e: ChangeEvent<HTMLInputElement>
                    ) => {
                      onChageAccountHolder(e, i);
                    }}
                  />
                );
              })}
            </div>
          </>
        </CheckInfo>
        <CheckInfo title={'방명록 추가 📖'}>
          <></>
        </CheckInfo>
        <CheckInfo isData={data.videoUrl ? true : false} title={'식전 영상 📽'}>
          <div className="pt-2">
            <p className="description">
              식전영상은 유투브에 업로드 후 <br /> URL을 복사하여 추가해주시면
              됩니다.
            </p>
            <div className="mt-4">
              <Input
                placeholder={'유투부 URL'}
                value={data.videoUrl}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setData({
                    ...data,
                    videoUrl: e.target.value,
                  });
                }}
              />
            </div>
          </div>
        </CheckInfo>
        <CheckInfo
          isData={data.kakao.thumbnail ? true : false}
          title={'카카오톡 공유 시'}
        >
          <div className="pt-2">
            <p className="description">카카오 썸네일 사진</p>
            <p className="description">(최적화 사이즈 400 * 550)</p>
            <FileInput
              limit={1}
              handleFile={(val: File) => {
                setImageFile({
                  ...imageFile,
                  kakaoThumbnail: val,
                });
              }}
            />
            <InputTextarea
              inputValue={data.kakao.title}
              inputPlaceholder="카카오톡 제목 (철수 💗 영희 결혼합니다)"
              textareaValue={data.kakao.description}
              textareaPlaceholder="카카오톡 내용 (ex. 식장명, 예식일자)"
              onChageInput={(e) =>
                setData({
                  ...data,
                  kakao: {
                    ...data.kakao,
                    title: e.target.value,
                  },
                })
              }
              onChangeTextarea={(e) =>
                setData({
                  ...data,
                  kakao: {
                    ...data.kakao,
                    description: e.target.value,
                  },
                })
              }
            />
          </div>
        </CheckInfo>
        <CheckInfo
          isData={data.URL.thumbnail ? true : false}
          title={'URL 공유 시'}
        >
          <div className="pt-2">
            <p className="description">URL 썸네일 사진</p>
            <p className="description">(최적화 사이즈 1200 * 630)</p>
            <FileInput
              limit={1}
              handleFile={(val: File) => {
                setImageFile({
                  ...imageFile,
                  URLThumbnail: val,
                });
              }}
            />
            <InputTextarea
              inputValue={data.URL.title}
              inputPlaceholder="URL 제목 (철수 💗 영희 결혼합니다)"
              textareaValue={data.URL.description}
              textareaPlaceholder="URL 내용 (ex. 식장명, 예식일자)"
              onChageInput={(e) =>
                setData({
                  ...data,
                  URL: {
                    ...data.URL,
                    title: e.target.value,
                  },
                })
              }
              onChangeTextarea={(e) =>
                setData({
                  ...data,
                  URL: {
                    ...data.URL,
                    description: e.target.value,
                  },
                })
              }
            />
          </div>
        </CheckInfo>
        <button
          onClick={handleModify}
          className="mt-16 block m-auto bg-black text-white text-center p-3 shadow rounded-md"
        >
          수정하기
        </button>
      </section>
    </div>
  );
};

export default HistoryModifyPage;