import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";
import { useRef } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
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

function App() {
  const wrapperBoxRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  return (
    <Wrapper>
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
        <FifthBox style={{ x }} drag="x" dragSnapToOrigin></FifthBox>
      </BoxesContainer>
    </Wrapper>
  );
}

export default App;
