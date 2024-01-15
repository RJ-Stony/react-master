import {
  Link,
  Route,
  Routes,
  useLocation,
  useParams,
  useMatch,
} from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
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

const Homes = styled.div`
  display: inline-block;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  font-size: 0%.9rem;
  color: ${(props) => props.theme.accentColor};
  padding: 10px 20px;
  margin-top: 10px;
`;

const BtnContainer = styled.div`
  position: absolute;
  right: 0;
  margin: 5px;
`;

const ThemeToggle = styled.button<{ isdark: boolean }>`
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
    props.isdark ? "translateY(100px)" : `translateY(0px)`};
    }

    // moon icon
    &:last-child {
      transform: ${(props) =>
    !props.isdark ? "translateY(100px)" : `translateY(0px)`};
    }
  } */
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 10px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ $isactive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.$isactive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface IRouterState {
  state: { name: string };
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams();
  const { state } = useLocation() as IRouterState;
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>({
    queryKey: ["info", coinId],
    queryFn: () => fetchCoinInfo(coinId),
  });

  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    {
      queryKey: ["tickers", coinId],
      queryFn: () => fetchCoinTickers(coinId),
    }
  );

  useEffect(() => {
    // 타이틀 설정 로직
    document.title = state?.name
      ? state.name
      : infoLoading
      ? "Loading..."
      : infoData?.name || "Coin";
  }, [state, infoLoading, infoData]);

  const loading = infoLoading || tickersLoading;
  const isdark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleTheme = () => setDarkAtom((prev) => !prev);

  return (
    <Container>
      {/* <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet> */}
      <Homes>
        <Link to={`/`}>Back</Link>
      </Homes>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
        <BtnContainer>
          <ThemeToggle isdark={isdark} onClick={toggleTheme}></ThemeToggle>
        </BtnContainer>
      </Header>
      {loading ? (
        <Loader>코인 정보를 불러오는 중입니다...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickersData?.quotes?.USD?.price?.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <Description>{infoData?.description}</Description>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <span>Total Supply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab $isactive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
            <Tab $isactive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
          </Tabs>
          <Routes>
            <Route path="price" element={<Price />} />
            <Route
              path="chart"
              element={<Chart coinId={coinId!} isdark={isdark} />}
            />
          </Routes>
        </>
      )}
    </Container>
  );
}

export default Coin;
