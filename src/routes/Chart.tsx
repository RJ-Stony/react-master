import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexCharts from 'react-apexcharts';

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>({
    queryKey: ['ohlcv', coinId],
    queryFn: () => fetchCoinHistory(coinId),
  });
  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexCharts
          type="line"
          series={[
            {
              name: 'Price',
              data: data?.map((price) => parseFloat(price.close)) ?? [],
            },
          ]}
          options={{
            colors: ['#fbc531'],
            theme: {
              mode: 'dark',
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              background: 'transparent',
            },
            grid: {
              show: false,
            },
            stroke: {
              curve: 'smooth',
              width: 4,
            },
            xaxis: {
              axisBorder: {
                show: false,
              },
              labels: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              categories: data?.map((price) =>
                new Date(price.time_close * 1000).toUTCString()
              ),
            },
            yaxis: {
              show: false,
            },
            fill: {
              type: 'gradient',
              gradient: { gradientToColors: ['#e84118'], stops: [0, 100] },
            },
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(1)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
