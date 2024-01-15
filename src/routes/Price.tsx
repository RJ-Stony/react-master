import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinHistory, fetchCoinTickers } from "../api";

const Container = styled.div`
  padding: 0;
  max-width: inherit;
  margin: 10px 0;
  color: ${(props) => props.theme.textColor};
`;

const Overview = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.cardColor};
  margin: 10px 0;
  border-radius: 15px;
  padding: 15px 10px 10px 10px;
`;

const Arrow = styled.div<{ isPos: boolean }>`
  font-size: 20px;
  margin-right: 10px;
  color: ${(props) =>
    props.isPos ? props.theme.greenColor : props.theme.redColor};
`;

const Amount = styled.div`
  margin-right: 10px;
  font-size: 20px;
`;

const Diff = styled.div<{ isPos: boolean }>`
  margin-right: 70px;
  padding-top: 3px;
  font-size: 15px;
  color: ${(props) =>
    props.isPos ? props.theme.greenColor : props.theme.redColor};
`;

const UpdatedAt = styled.div`
  padding-top: 7px;
  font-size: 10px;
`;

const DetailsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-between;
  background-color: ${(props) => props.theme.cardColor};
  padding-top: 20px;
  padding-bottom: 15px;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 15px;
  font-size: 13px;
`;

const Detail = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 10px;
  margin-bottom: 10px;
  padding-bottom: 0.1rem;
  border-bottom: 0.05rem solid ${(props) => props.theme.textColor};
`;

interface PriceProps {
  coinId: string;
}

interface IPriceState {
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

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Price({ coinId }: PriceProps) {
  const { isLoading: priceLoading, data: priceData } = useQuery<IPriceState>(
    "price",
    () => fetchCoinTickers(coinId),
    { refetchInterval: 5000 }
  );
  const { isLoading: ohlcLoading, data: ohlcData } = useQuery<IHistorical[]>(
    "ohlcv",
    () => fetchCoinHistory(coinId),
    { refetchInterval: 5000 }
  );
  const isPos = priceData?.quotes.USD.percent_change_24h
    ? priceData.quotes.USD.percent_change_24h > 0
    : false;
  const isLoading = priceLoading || ohlcLoading;

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <Container>
      <Overview>
        <Arrow isPos={isPos}>{isPos ? "↑" : "↓"}</Arrow>
        <Amount>
          ${parseFloat(priceData!.quotes.USD.price.toFixed(0)).toLocaleString()}
        </Amount>
        <Diff isPos={isPos}>
          {isPos ? "+" : null}
          {parseFloat(
            (
              (priceData!.quotes.USD.percent_change_24h *
                priceData!.quotes.USD.price) /
              100
            ).toFixed(0)
          ).toLocaleString()}{" "}
          ({isPos ? "+" : null}
          {priceData!.quotes.USD.percent_change_24h.toFixed(1)}% )
        </Diff>
        <UpdatedAt>
          updated at {priceData?.last_updated.slice(11, 19)}
        </UpdatedAt>
      </Overview>
      <DetailsContainer>
        <Detail>
          <div>Volume</div>
          <div>
            {parseFloat(
              priceData!.quotes.USD.volume_24h.toFixed(0)
            ).toLocaleString()}
          </div>
        </Detail>
        <Detail>
          <div>1-Day Vol. Change</div>
          <div>{priceData!.quotes.USD.volume_24h_change_24h}</div>
        </Detail>
        <Detail>
          <div>Highest Price</div>
          <div>
            {parseFloat(
              priceData!.quotes.USD.ath_price.toFixed(0)
            ).toLocaleString()}
          </div>
        </Detail>
        <Detail>
          <div>Highest Date</div>
          <div>{priceData?.quotes.USD.ath_date.slice(0, 10)}</div>
        </Detail>
        <Detail>
          <div>24-hour change</div>
          <div>{priceData?.quotes.USD.percent_change_24h}%</div>
        </Detail>
        <Detail>
          <div>7-day change</div>
          <div>{priceData?.quotes.USD.percent_change_7d}%</div>
        </Detail>
        <Detail>
          <div>30-day change</div>
          <div>{priceData?.quotes.USD.percent_change_30d}%</div>
        </Detail>
        <Detail>
          <div>1-year change</div>
          <div>{priceData?.quotes.USD.percent_change_1y}%</div>
        </Detail>
      </DetailsContainer>
    </Container>
  );
}

export default Price;
