import React from "react";
import styled from "styled-components";
import "antd/dist/antd.css";
import { Table } from "antd";
import { HEADERS } from "../../constants";
import getLatestHistory from "../../apis/getLatestHistory";
import getPastHistory from "../../apis/getPastHistory";
import getArrayIndexByCurrency from "./utils/getArrayElementByCurrency";
import sortArrayByMkt from "./utils/sortArrayByMkt";
import toThousands from "./utils/toThousands";

const Layout = styled.div`
  padding: 20vh 20vw;
`;

class CurrencyTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };

    this.setChangeDifference = this.setChangeDifference.bind(
      this.setChangeDifference
    );
  }

  setChangeDifference = (currencies, data, days) => {
    return getPastHistory(currencies.pop(), days).then((pastHistory) => {
      const index = getArrayIndexByCurrency(data, pastHistory.currency);
      if (days === 1)
        data[index].day = (pastHistory.close / data[index].price - 1) * 100;
      else if (days === 7)
        data[index].week = (pastHistory.close / data[index].price - 1) * 100;

      if (currencies.length !== 0)
        return this.setChangeDifference(currencies, data, days);
    });
  };

  componentDidMount() {
    let data = [];
    let currencies = [];

    getLatestHistory()
      .then((histories) => {
        histories.forEach((history) => {
          currencies.push(history.currency);
          data.push({
            key: history.id,
            coin: history.currency,
            price: history.close,
            day: "0.0%",
            week: "0.0%",
            volume: history.volume,
            mkt_cap: history.market_cap,
          });
        });
      })
      .then(() => {
        let currencies_copy = [];
        currencies.forEach((currency) => {
          currencies_copy.push(currency);
        });
        this.setChangeDifference(currencies_copy, data, 1).then(() => {
          let currencies_copy = [];
          currencies.forEach((currency) => {
            currencies_copy.push(currency);
          });
          this.setChangeDifference(currencies_copy, data, 7).then(() =>
            this.setState({ data: data })
          );
        });
      });
  }

  render() {
    const { data } = this.state;
    const sortedData = sortArrayByMkt(data);
    let displayData = [];
    sortedData.forEach((d) => {
      displayData.push({
        key: d.key,
        coin: d.coin,
        price: "$" + toThousands(d.price),
        day: parseFloat(d.day).toFixed(2) + "%",
        week: parseFloat(d.week).toFixed(2) + "%",
        volume: "$" + toThousands(d.volume),
        mkt_cap: "$" + toThousands(d.mkt_cap),
      });
    });

    return (
      <Layout>
        <Table columns={HEADERS} dataSource={displayData} />
      </Layout>
    );
  }
}

export default CurrencyTable;
