import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 60px;
  font-size: 14px;
  padding: 20px 20px;
  top: 0;
  color: white;
  background-color: black;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  margin-right: 20px;
  margin-bottom: 3px;
  width: 100px;
  height: 30px;
  fill: ${(props) => props.theme.red};
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
  path {
    transform: translate(0px, 86px) scale(0.1, -0.1);
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Search = styled.span`
  color: white;
  svg {
    height: 25px;
  }
`;

const Circle = styled.span`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 4px;
  bottom: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0],
    transition: {
      repeat: Infinity,
    },
  },
};

function Header() {
  const homeMatch = useMatch("/");
  const tvMatch = useMatch("tv");
  return (
    <Nav>
      <Col>
        <Logo
          variants={logoVariants}
          whileHover="active"
          initial="normal"
          xmlns="http://www.w3.org/2000/svg"
          version="1.0"
          viewBox="0 0 210.000000 70.000000"
        >
          <motion.path
            d="M412 743 c-61 -30 -67 -54 -67 -278 0 -174 2 -204 18 -233 47 -86
 203 -74 254 20 16 29 18 59 18 228 0 173 -2 199 -18 224 -35 53 -137 73 -205
 39z m118 -89 c13 -33 13 -325 0 -358 -7 -20 -16 -26 -40 -26 -46 0 -52 28 -48
 223 3 179 5 187 56 187 15 0 26 -8 32 -26z"
          />
          <motion.path
            d="M190 506 c0 -261 1 -257 -52 -270 -26 -6 -28 -10 -28 -56 l0 -49 38
 6 c57 8 95 34 120 83 21 42 22 55 22 287 l0 243 -50 0 -50 0 0 -244z"
          />
          <motion.path
            d="M654 735 c3 -9 31 -88 61 -177 51 -149 55 -166 55 -254 l0 -94 50 0
 50 0 0 98 c0 92 3 107 55 262 30 90 55 168 55 172 0 4 -20 8 -44 8 l-44 0 -25
 -82 c-14 -46 -29 -96 -33 -111 -3 -15 -9 -25 -12 -22 -4 3 -20 52 -37 108
 l-31 102 -53 3 c-46 3 -53 1 -47 -13z"
          />
          <motion.path
            d="M1020 485 l0 -265 50 0 50 0 0 115 0 115 60 0 60 0 0 40 0 40 -60 0
 -60 0 0 75 0 75 80 0 80 0 0 35 0 35 -130 0 -130 0 0 -265z"
          />
          <motion.path
            d="M1320 480 l0 -270 58 0 c31 0 87 -3 125 -7 l67 -6 0 47 0 46 -59 0
 c-98 0 -91 -18 -91 236 l0 224 -50 0 -50 0 0 -270z"
          />
          <motion.path d="M1610 470 l0 -280 50 0 50 0 0 280 0 280 -50 0 -50 0 0 -280z" />
          <motion.path
            d="M1760 746 c0 -3 20 -60 45 -127 25 -67 45 -130 45 -140 0 -9 -22 -79
 -50 -155 -27 -76 -49 -139 -47 -140 2 -2 22 -4 46 -6 l44 -3 37 110 c43 126
 38 128 85 -37 18 -65 33 -99 44 -102 9 -2 33 -7 53 -10 l37 -7 -15 53 c-9 29
 -33 106 -54 170 l-38 117 49 137 c27 76 49 139 49 141 0 2 -21 3 -47 1 l-47
 -3 -30 -92 c-17 -51 -34 -93 -38 -93 -4 0 -8 4 -8 9 0 6 -14 48 -31 95 l-31
 86 -49 0 c-27 0 -49 -2 -49 -4z"
          />
        </Logo>
        <Items>
          <Item>
            <Link to="/">Home {homeMatch && <Circle />}</Link>
          </Item>
          <Item>
            <Link to="Tv">TV Shows {tvMatch && <Circle />}</Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <button>Search</button>
      </Col>
    </Nav>
  );
}

export default Header;
