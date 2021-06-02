import React, { Component } from "react";
import styles from "./AntTable.css"; //导入
import { Table, Tag, Space } from "antd";
import Serv from "./AntTableServ.js";

class TestCon extends Component {
  constructor() {
    super();
    this.state = {
      tableList: [1],
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
        // render: (text, record) => (
        //   <Space size="middle">
        //     <a>Invite {record.name}</a>
        //     <a>Delete</a>
        //   </Space>
        // ),
      },
    ];

    const data = [
      {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "developer"],
      },
      {
        key: "2",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["loser"],
      },
      {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"],
      },
    ];
    return (
      <div className={styles.root}>
        <Table rowKey="id" columns={columns} dataSource={this.state.tableList} />
      </div>
    );
  }
}
export default TestCon;
console.log();
