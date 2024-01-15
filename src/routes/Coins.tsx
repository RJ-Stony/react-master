import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { useQuery } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
import { useEffect } from "react";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid white;
  a {
    padding: 20px;
    transition: color 0.15s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 28px;
  color: ${(props) => props.theme.accentColor};
`;

const BtnContainer = styled.div`
  position: absolute;
  right: 0;
  margin: 5px;
`;

const ThemeToggle = styled.button<{ $isdark: boolean }>`
  background: ${({ theme }) => theme.bgColor};
  border: 2px solid ${({ theme }) => theme.accentColor};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  font-size: 0.5rem;
  justify-content: space-between;
  margin: 0 auto;
  overflow: hidden;
  padding: 0.3rem;
  position: relative;
  width: 4rem;
  height: 2rem;
  /* svg {
    height: auto;
    width: 1.3rem;
    transition: all 0.3s linear;
    // sun icon
    &:first-child {
      transform: ${(props) =>
    props.$isdark ? "translateY(100px)" : `translateY(0px)`};
    }

    // moon icon
    &:last-child {
      transform: ${(props) =>
    !props.$isdark ? "translateY(100px)" : `translateY(0px)`};
    }
  } */
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleTheme = () => setDarkAtom((prev) => !prev);
  const { isLoading, data } = useQuery<ICoin[]>({
    queryKey: ["allCoins"],
    queryFn: fetchCoins,
  });

  useEffect(() => {
    document.title = "Coins";
  }, []);

  return (
    <Container>
      <Header>
        <Title>코인들!</Title>
        <BtnContainer>
          <ThemeToggle $isdark={isDark} onClick={toggleTheme}></ThemeToggle>
        </BtnContainer>
      </Header>
      {isLoading ? (
        <Loader>코인 정보를 불러오는 중입니다...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={coin.name}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
