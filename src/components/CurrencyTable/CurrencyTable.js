import React from "react";
import styled from "styled-components";
import "antd/dist/antd.css";
import { Table } from "antd";
import { HEADERS } from "../../constants";
import getLatestHistory from "../../apis/getLatestHistory";

const Layout = styled.div`
  padding: 20vh 20vw;
`;

class CurrencyTable extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    let data = [];

    getLatestHistory()
      .then((histories) => {
        histories.forEach((history) => {
          data.push({
            key: history.id,
            coin: history.currency,
            price: "$" + history.close,
            volume: "$" + history.volume,
            mkt_cap: "$" + history.market_cap,
          });
        });
      })
      .then(() =>
        this.setState({
          data: data,
        })
      );
  }

  render() {
    const { data } = this.state;
    return (
      <Layout>
        <Table columns={HEADERS} dataSource={data}></Table>
      </Layout>
    );
  }
}

export default CurrencyTable;
