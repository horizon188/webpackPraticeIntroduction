import React, { Component } from "react";
import styles from "./AntTable.css"; //导入
import { Table, Tag, Space } from "antd";
import Serv from "./AntTableServ.js";

class TestCon extends Component {
  constructor() {
    super();
    this.state = {
      tableList: [],
    };
  }
  componentDidMount() {
    console.log("Serv");
    this.getTableList();
  }
  async getTableList() {
    let res = await Serv.getSpeTypeList();

    if ("" + res.code === "200") {
      console.log("this", res.data, typeof res.data);
      let arr = res.data;
      this.setState({
        tableList: arr,
      });
    }
  }

  render() {
    let { tableList } = this.state
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "图片",
        dataIndex: "pic",
        key: "pic",
        render: (text) => {
          return (
            <img width="50"  src={text}></img>
          )
        }

      },
      {
        title: "Tags",
        key: "tags",
        dataIndex: "tags",
        render: (tags) => (
          <div>
            { tags && tags.map((tag) => {
              let color = tag.length > 5 ? "geekblue" : "green";
              if (tag === "loser") {
                color = "volcano";
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </div>
        ),
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <a>detail</a>
            <a>Delete</a>
          </Space>
        ),
      },
    ];
    console.log(tableList);
    return (
      <div className={styles.root}>
        <Table rowKey={record => record.key} columns={columns} dataSource={tableList} />
      </div>
    );
  }
}
export default TestCon;
console.log();
