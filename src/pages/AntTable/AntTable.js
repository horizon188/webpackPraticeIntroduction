import React, { Component } from "react";
import styles from "./AntTable.css"; //导入
import { Table, Tag, Space, Drawer, Col, Row } from "antd";
import Serv from "./AntTableServ.js";

class TestCon extends Component {
  constructor() {
    super();
    this.state = {
      tableList: [],
      visible: false,
      curFooter: {},
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
  onClose(record) {
    let obj = {
      visible: !this.state.visible,
    };
    if (record) {
      this.setState(
        {
          visible: !this.state.visible,
        },
        () => {
          this.setState({
            curFooter: record,
          });
        }
      );
    } else {
      this.setState({
        visible: !this.state.visible,
      });
    }
  }

  render() {
    let { tableList, visible, curFooter } = this.state;
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
          return <img width="50" src={text}></img>;
        },
      },
      {
        title: "口味",
        key: "tags",
        dataIndex: "tags",
        render: (tags) => (
          <div>
            {tags &&
              tags.map((tag) => {
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
            <a
              onClick={() => {
                this.onClose(record);
              }}
            >
              detail
            </a>
            <a>Delete</a>
          </Space>
        ),
      },
    ];
    console.log(curFooter);
    return (
      <div className={styles.root}>
        <Table
          rowKey={(record) => record.key}
          columns={columns}
          dataSource={tableList}
        />
        <Drawer
          title={curFooter.name}
          placement="right"
          width={750}
          closable={false}
          onClick={() => {
            this.onClose();
          }}
          visible={visible}
        >
          <Row>
            <Col span={12}>
              <h2>口味：{curFooter.tags && curFooter.tags[0]}</h2>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <h2>图片：</h2>
              <img width={640} height={640} src={curFooter.pic}></img>
            </Col>
          </Row>
        </Drawer>
      </div>
    );
  }
}
export default TestCon;
