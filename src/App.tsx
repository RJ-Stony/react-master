import styled from "styled-components";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

const Wrapper = styled(motion.div)`
  height: 150vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, rgb(135, 200, 146), rgb(106, 204, 204));
`;

const BoxesContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const FirstBox = styled(motion.div)`
  width: 100px;
  height: 100px;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const firstVars = {
  start: { scale: 0 },
  end: { scale: 1, rotateZ: 180, transition: { type: "spring", delay: 0.5 } },
};

const SecondBox = styled(motion.div)`
  width: 100px;
  height: 100px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const secondVars = {
  start: { opacity: 0, scale: 0.5 },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 1,
      bounce: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.25,
    },
  },
};

const Circle = styled(motion.div)`
  background-color: white;
  height: 35px;
  width: 35px;
  place-self: center;
  border-radius: 25px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const circleVars = {
  start: { opacity: 0, y: 100 },
  end: {
    opacity: 1,
    y: 0,
  },
};

const ThirdBox = styled(motion.div)`
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 30px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const thirdVars = {
  hover: { rotateZ: 90 },
  click: { scale: 1, borderRadius: "100px" },
};

const WrapperBoxForFB = styled.div`
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const FourthBox = styled(motion.div)`
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const fourthVars = {
  drag: {
    backgroundColor: "rgb(0, 132, 90)",
    transition: { duration: 0.5 },
  },
};

const FifthBox = styled(motion.div)`
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 30px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Svg = styled.svg`
  width: 100px;
  height: 100px;
  color: white;
  path {
    stroke: "white";
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

const svg = {
  start: {
    pathLength: 0,
    stroke: "rgba(255, 255, 255, 0)",
    fill: "rgba(135, 200, 146, 0)",
  },
  end: {
    pathLength: 1,
    stroke: "rgba(0, 0, 0, 1)",
    fill: "rgb(13, 158, 0)",
  },
};

const SixthBox = styled(motion.div)`
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 30px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Button = styled.button`
  width: 100px;
  height: 100px;
  font-size: 22px;
  border: none;
  border-radius: 30px;
  color: rgb(0, 132, 90);
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const sixthVars = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateZ: 360,
  },
  leaving: {
    opacity: 0,
    scale: 0,
    y: 50,
  },
};

const SeventhBox = styled(motion.div)`
  width: 100px;
  height: 100px;
  position: absolute;
  margin-left: 120px;
  font-size: 22px;
  color: rgb(0, 132, 90);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const seventhVars = {
  entry: (back: boolean) => {
    return {
      x: back ? -500 : 500,
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.3,
      },
    };
  },
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
    rotateX: 360,
  },
  exit: (back: boolean) => {
    return {
      x: back ? 500 : -500,
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.3,
      },
      rotateX: 180,
    };
  },
};

const PrevButton = styled.button`
  width: 100px;
  height: 100px;
  font-size: 22px;
  margin-left: 120px;
  border: none;
  border-radius: 30px;
  color: rgb(0, 132, 90);
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const EighthBox = styled(motion.div)`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 30px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const CircleForEB = styled(motion.div)`
  background-color: #99c3e9;
  width: 35px;
  height: 35px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const LastBox = styled(motion.div)`
  background-color: rgba(255, 255, 255, 1);
  border-radius: 20px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 80vw;
  height: 60vh;
  gap: 15px;
  div:first-child,
  div:last-child {
    grid-column: span 2;
  }
`;

const Overlay = styled(motion.div)`
  width: 80%;
  height: 60%;
  position: absolute;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const overlayVars = {
  initial: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  animate: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  exit: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
};

function App() {
  const [showing, setShowing] = useState(false);
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [id, setId] = useState<null | string>(null);

  const wrapperBoxRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-260, 0, 420], [-360, 0, 360]);
  const gradient = useTransform(
    x,
    [-260, 0, 420],
    [
      "linear-gradient(135deg, rgb(204, 130, 130), rgb(236, 204, 116))",
      "linear-gradient(135deg, rgb(135, 200, 146), rgb(106, 204, 204))",
      "linear-gradient(135deg, rgb(163, 135, 200), rgb(108, 106, 204))",
    ]
  );
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const toggleShowing = () => setShowing((prev) => !prev);
  const nextPlease = () => {
    setBack(false);
    setVisible((prev) => (prev === 10 ? 10 : prev + 1));
  };
  const prevPlease = () => {
    setBack(true);
    setVisible((prev) => (prev === 1 ? 1 : prev - 1));
  };
  const toggleClicked = () => setClicked((prev) => !prev);
  return (
    <Wrapper style={{ background: gradient }}>
      <BoxesContainer>
        <FirstBox variants={firstVars} initial="start" animate="end" />
        <SecondBox variants={secondVars} initial="start" animate="end">
          <Circle variants={circleVars} />
          <Circle variants={circleVars} />
          <Circle variants={circleVars} />
          <Circle variants={circleVars} />
        </SecondBox>
        <ThirdBox variants={thirdVars} whileHover="hover" whileTap="click" />
        <WrapperBoxForFB ref={wrapperBoxRef}>
          <FourthBox
            drag
            dragSnapToOrigin
            dragElastic={0.5}
            dragConstraints={wrapperBoxRef}
            variants={fourthVars}
            whileDrag="drag"
          ></FourthBox>
        </WrapperBoxForFB>
      </BoxesContainer>
      <BoxesContainer>
        <FifthBox
          style={{ x, rotateZ, scale }}
          drag="x"
          dragSnapToOrigin
        ></FifthBox>
        <Svg viewBox="0 0 16 18" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            variants={svg}
            initial="start"
            animate="end"
            transition={{
              default: { duration: 3 },
              fill: { duration: 1, delay: 3 },
            }}
            d="M4.89027 13.4419C14.1915 13.4419 14.9406 5.52842 14.9999 1.76847C15.0068 1.33881 14.6471 0.992243 14.2174 1.00013C1 1.24288 1 7.65066 1 13.4419V16.5541"
          />
          <motion.path
            variants={svg}
            initial="start"
            animate="end"
            transition={{
              default: { duration: 3 },
              fill: { duration: 1, delay: 3 },
            }}
            d="M1 13.4415C1 13.4415 1 8.77317 7.22443 7.99512"
          />
        </Svg>
        {showing ? (
          <Button onClick={toggleShowing}>Hide Box</Button>
        ) : (
          <Button onClick={toggleShowing}>Show Box</Button>
        )}
        <AnimatePresence>
          {showing ? (
            <>
              <SixthBox
                variants={sixthVars}
                initial="initial"
                animate="visible"
                exit="leaving"
              />
            </>
          ) : null}
        </AnimatePresence>
      </BoxesContainer>
      <BoxesContainer>
        <Button onClick={nextPlease}>Next Number</Button>
        <AnimatePresence custom={back}>
          <SeventhBox
            custom={back}
            variants={seventhVars}
            initial="entry"
            animate="center"
            exit="exit"
            key={visible}
          >
            {visible}
          </SeventhBox>
        </AnimatePresence>
        <PrevButton onClick={prevPlease}>Prev Number</PrevButton>
      </BoxesContainer>
      <BoxesContainer onClick={toggleClicked}>
        <EighthBox>
          {!clicked ? (
            <CircleForEB
              layoutId="circle"
              style={{ borderRadius: 50, scale: 1.5 }}
            />
          ) : null}
        </EighthBox>
        <EighthBox>
          {clicked ? (
            <CircleForEB layoutId="circle" style={{ borderRadius: 0 }} />
          ) : null}
        </EighthBox>
      </BoxesContainer>
      <BoxesContainer>
        <Grid>
          {["1", "2", "3", "4"].map((n) => (
            <LastBox onClick={() => setId(n)} key={n} layoutId={n} />
          ))}
        </Grid>
        <AnimatePresence>
          {id ? (
            <Overlay
              onClick={() => setId(null)}
              variants={overlayVars}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <LastBox
                layoutId={id}
                style={{ width: 250, height: 200 }}
              ></LastBox>
            </Overlay>
          ) : null}
        </AnimatePresence>
      </BoxesContainer>
    </Wrapper>
  );
}

export default App;
