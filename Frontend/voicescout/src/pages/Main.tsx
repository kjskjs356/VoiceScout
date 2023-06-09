import React, { useState, useEffect, useRef } from "react";
import style from "./Main.module.css";
import Phone from "img/phone.png";
import Logo from "img/logo.png";
import Top from "img/Arrow.png";
import CallRoom from "img/room_capture.png";
import WaitingRoom from "img/waiting_room.png";
import Vp from "img/voicephishing1.png"
import Vpwarning from "img/voicephishing.png"
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import {
  Animator,
  ScrollContainer,
  ScrollPage,
  batch,
  Fade,
  FadeIn,
  FadeOut,
  Move,
  MoveIn,
  MoveOut,
  Sticky,
  StickyIn,
  StickyOut,
  Zoom,
  ZoomIn,
  ZoomOut,
} from "react-scroll-motion";
interface Props {
  target1: number;
  target2: number;
  target3: number;
  duration: number;
}

export default function Main({ target1, target2, target3, duration }: Props) {
  const navigate = useNavigate();

  const count1Ref = useRef(0);
  const count2Ref = useRef(0);
  const count3Ref = useRef(0);
  const [count1Display, setCount1Display] = useState(0);
  const [count2Display, setCount2Display] = useState(0);
  const [count3Display, setCount3Display] = useState(0);

  const [toggleBtn, setToggleBtn] = useState(true);

  const ZoomInScrollOut = batch(FadeIn(), ZoomIn());
  const FadeUp = batch(Fade(), Move(), Sticky());

  const texts = ["아는 만큼 예방할 수 있습니다."]; // 다양한 글자들의 배열
  const forthtext1 = ["통화 체험실을 누른 후 방 생성을 할 수 있습니다."]
  const forthtext2 = ["방 목록 중 원하는 방을 선택하여 들어갑니다."]
  const forthtext3 = ["체험해보고 싶은 역할을 선택합니다."]
  const forthtext4 = ["피싱범 역할을 맡았다면 스크립트가 제공됩니다."]
  const forthtext5 = ["피해자 역할을 맡았다면 통화 중 보이스 피싱 의심되면 알림을 제공합니다."]
  const [animatedText, setAnimatedText] = useState("");

  const handleScroll = () => {
    const { scrollY } = window;

    scrollY > 200 ? setToggleBtn(true) : setToggleBtn(false);
  };

  const startAnimation = () => {
    // 이미 실행 중인 경우에는 다시 실행하지 않음
    if (intervalIdRef.current) {
      return;
    }

    let start = Date.now();
    const intervalId = setInterval(() => {
      const timePassed = Date.now() - start;
      const progress = timePassed / duration;

      if (progress >= 1) {
        count1Ref.current = target1;
        count2Ref.current = target2;
        count3Ref.current = target3;
        setCount1Display(count1Ref.current);
        setCount2Display(count2Ref.current);
        setCount3Display(count3Ref.current);
        clearInterval(intervalId); // 애니메이션이 끝나면 setInterval 클리어
      } else {
        count1Ref.current = Math.floor(target1 * progress);
        count2Ref.current = Math.floor(target2 * progress);
        count3Ref.current = Math.floor(target3 * progress);
        setCount1Display(count1Ref.current);
        setCount2Display(count2Ref.current);
        setCount3Display(count3Ref.current);
      }
    }, 10);
  };

  const intervalIdRef = useRef<number | null>(null); // intervalId를 저장할 Ref
  const elementRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          startAnimation();
        }
      },
      { threshold: 0.1 } // 교차 영역의 10% 이상이 보일 때 실행하도록 설정
    );
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, []);
  const getNumberWithUnit = (count: number) => {
    if (count >= 1000000000000) {
      return `${(count / 1000000000000).toFixed(1)}조`;
    } else if (count >= 100000000) {
      return `${(count / 100000000).toFixed(0)}억`;
    } else {
      return `${count}건`;
    }
  };

  const getTransitionDelay = (count: number) => {
    const delay = Math.floor(
      (count / (target1 + target2 + target3)) * duration
    );
    return `${delay}ms`;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const animateTexts = () => {
      let currentTextIndex = 0;
      let currentCharIndex = 0;

      const showNextChar = () => {
        setAnimatedText(
          texts[currentTextIndex].substring(0, currentCharIndex + 1)
        );

        if (currentCharIndex < texts[currentTextIndex].length) {
          currentCharIndex++;
          setTimeout(showNextChar, 150); // 한 글자씩 나타낼 시간 간격 (여기선 100ms)
        }
      };

      showNextChar();
    };

    animateTexts();
  }, []);

  return (
    <ScrollContainer className={style.main_container}>
      <ScrollPage page={0}>
        <div className={style.main_theme}>
          <div className={style.main_contents}>
            <div>
              <Animator animation={FadeIn()}>
                <img className={style.phone_img} src={Phone} alt="" />
              </Animator>
            </div>
            <div>
              <div>
                <img className={style.logo_img} src={Logo} alt="" />
              </div>
              <div className={style.main_text}>
                <span className={style.keyword}>보이스피싱</span>
                <br />
                <span>{animatedText}</span>
              </div>
            </div>
          </div>
        </div>
      </ScrollPage>
      <ScrollPage page={1}>
        <Animator animation={batch(Fade(), MoveOut(0, -200))}>
          <div className={style.guy_img}>
            <div className={style.main_second + " " + style.main_column}>
              <div className={style.guy_text}>
                <Animator animation={batch(FadeOut(50, 0))}>
                  모의 체험을 통해
                </Animator>
                <Animator animation={batch(FadeOut(100, 0))}>
                  실제 상황에서
                </Animator>
                <Animator animation={batch(FadeOut(200, 0))}>
                  대처할 수 있습니다.
                </Animator>
              </div>
            </div>
          </div>
        </Animator>
      </ScrollPage>
      <ScrollPage page={2}>
        <Animator animation={batch(Fade(), MoveOut(0, -200))}>
          <div className={style.third}>
            <div className={style.third_title}>
              통계로 확인하는 보이스 피싱 현황
            </div>
            <div className={style.numbers} ref={elementRef}>
              <div
                className={style.number}
                style={{ transitionDelay: getTransitionDelay(count1Display) }}
              >
                {getNumberWithUnit(count1Display)}
              </div>
              <div
                className={style.number}
                style={{ transitionDelay: getTransitionDelay(count2Display) }}
              >
                {count2Display.toLocaleString()}건
              </div>
              <div
                className={style.number}
                style={{ transitionDelay: getTransitionDelay(count3Display) }}
              >
                {count3Display.toLocaleString()}명
              </div>
            </div>
            <div className={style.third_textlist}>
              <div className={style.third_text}>보이스피싱 누적 피해액</div>
              <div className={style.third_text}>보이스피싱 누적 피해건수</div>
              <div className={style.third_text}>보이스피싱 누적 피해자수</div>
            </div>
            <div className={style.third_grid}>
              <div></div>
              <div></div>
              <button
                className={style.third_button}
                onClick={() => {
                  navigate(`/crime-type/*`);
                }}
              >
                보이스 피싱에 대해 더 알고 싶다면
              </button>
            </div>
          </div>
        </Animator>
      </ScrollPage>
      <ScrollPage page={3}>
        <Animator animation={batch(Fade())}>
            <div className={style.forth}>
              <div className={style.forthgrid}>
                <div>
                  <img className={style.forth_img1} src={CallRoom} alt="통화체험실" />
                  <img className={style.forth_img2} src={WaitingRoom} alt="통화대기방" />
                  </div>
                <div>
                  <img className={style.forth_img3} src={Vp} alt="보이스피싱방" />
                  <img className={style.forth_img4} src={Vpwarning} alt="보이스 피싱경고" />
                </div>
              </div> 
            </div>
              <div className={style.forth_information}>
                통화 체험실을 누른 후 방 생성을 할 수 있습니다.
                <br />
                방 목록 중 원하는 방을 선택하여 들어갑니다.
                <br />
                체험해보고 싶은 역할을 선택합니다.
                <br />
                피싱범 역할을 맡았다면 스크립트가 제공됩니다.
                <br />
                피해자 역할을 맡았다면 통화 중 보이스 피싱 의심될 때, 알림을 제공합니다.
              </div>
          </Animator>
          {toggleBtn ? (
            <img
              className={style.tothetop}
              src={Top}
              alt="맨위로"
              onClick={goToTop}
            />
          ) : null}
      </ScrollPage>
    </ScrollContainer>
  );
}
