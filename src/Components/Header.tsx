import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";

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
  display: flex;
  align-items: center;
  position: relative;
  svg {
    width: 16px;
    height: 16px;
    fill: ${(props) => props.theme.white.lighter};
  }
`;

const Circle = styled(motion.span)`
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

const Input = styled(motion.input)`
  border-radius: 5px;
  transform-origin: right center;
  position: absolute;
  left: -150px;
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
  const [searchOpen, setSearchOpen] = useState(false);
  // useMatch: Route에 따른 Circle의 위치 변화를 주기 위함.
  const homeMatch = useMatch("/");
  const tvMatch = useMatch("tv");

  const toggleSearch = () => setSearchOpen((prev) => !prev);
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
            <Link to="/">Home {homeMatch && <Circle layoutId="circle" />}</Link>
          </Item>
          <Item>
            <Link to="Tv">
              TV Shows {tvMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search onClick={toggleSearch}>
          <motion.svg
            animate={{ x: searchOpen ? -172 : 0 }}
            transition={{ ease: "linear" }}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.3833 12.8767C7.76953 12.8767 9.04785 12.4285 10.0938 11.6814L14.0283 15.616C14.2109 15.7986 14.4517 15.8899 14.709 15.8899C15.2485 15.8899 15.6304 15.4749 15.6304 14.9436C15.6304 14.6946 15.5474 14.4539 15.3647 14.2795L11.4551 10.3616C12.2769 9.28247 12.7666 7.94604 12.7666 6.49341C12.7666 2.98218 9.89453 0.110107 6.3833 0.110107C2.88037 0.110107 0 2.97388 0 6.49341C0 10.0046 2.87207 12.8767 6.3833 12.8767ZM6.3833 11.4988C3.64404 11.4988 1.37793 9.23267 1.37793 6.49341C1.37793 3.75415 3.64404 1.48804 6.3833 1.48804C9.12256 1.48804 11.3887 3.75415 11.3887 6.49341C11.3887 9.23267 9.12256 11.4988 6.3833 11.4988Z" />
          </motion.svg>
          <Input
            transition={{ ease: "linear" }}
            animate={{ scaleX: searchOpen ? 1 : 0 }}
            placeholder="시청할 항목을 검색해주세요 :)"
          />
        </Search>
      </Col>
    </Nav>
  );
}

export default Header;
