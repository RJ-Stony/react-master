import styled from "styled-components";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Wrapper = styled(motion.div)`
  height: 200vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, rgb(135, 200, 146), rgb(106, 204, 204));
`;

const BoxesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const FirstBox = styled(motion.div)`
  width: 150px;
  height: 150px;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const firstVars = {
  start: { scale: 0 },
  end: { scale: 1, rotateZ: 180, transition: { type: "spring", delay: 0.5 } },
};

const SecondBox = styled(motion.div)`
  width: 150px;
  height: 150px;
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
  height: 52.5px;
  width: 52.5px;
  place-self: center;
  border-radius: 30px;
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
  width: 150px;
  height: 150px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 30px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const thirdVars = {
  hover: { rotateZ: 90 },
  click: { scale: 1, borderRadius: "100px" },
};

const WrapperBoxForFB = styled.div`
  width: 150px;
  height: 150px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const FourthBox = styled(motion.div)`
  width: 75px;
  height: 75px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 12px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const fourthVars = {
  drag: {
    backgroundColor: "rgb(0, 132, 90)",
    transition: { duration: 0.5 },
  },
};

const FifthBox = styled(motion.div)`
  width: 150px;
  height: 150px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 30px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Svg = styled.svg`
  width: 150px;
  height: 150px;
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

function App() {
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
  const scale = useTransform(scrollYProgress, [0, 1], [0, 1.2]);
  // useMotionValueEvent(x, "change", (I) => {
  //   console.log(I);
  // });
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
        <FifthBox
          style={{ x, rotateZ, scale }}
          drag="x"
          dragSnapToOrigin
        ></FifthBox>
        <Svg viewBox="0 0 16 18" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            variants={svg}
            initial={"start"}
            animate={"end"}
            transition={{
              default: { duration: 3 },
              fill: { duration: 1, delay: 3 },
            }}
            d="M4.89027 13.4419C14.1915 13.4419 14.9406 5.52842 14.9999 1.76847C15.0068 1.33881 14.6471 0.992243 14.2174 1.00013C1 1.24288 1 7.65066 1 13.4419V16.5541"
          />
          <motion.path
            variants={svg}
            initial={"start"}
            animate={"end"}
            transition={{
              default: { duration: 3 },
              fill: { duration: 1, delay: 3 },
            }}
            d="M1 13.4415C1 13.4415 1 8.77317 7.22443 7.99512"
          />
        </Svg>
      </BoxesContainer>
    </Wrapper>
  );
}

export default App;
