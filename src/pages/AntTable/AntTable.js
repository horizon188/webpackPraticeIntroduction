import React, { Component } from "react";
import styles from "./AntTable.css"; //导入
import { Table, Tag, Space, Drawer, Col, Row, Button, Modal, Form, Select, Input } from "antd";
import Serv from "./AntTableServ.js";
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
class TestCon extends Component {
  constructor() {
    super();
    this.state = {
      tableList: [],
      visible: false,
      curFooter: {},
      isModalVisible: false
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
  async addMenu(param) {
    let params={
      name:param.name,
      flavor:param.flavor,
      pic:'https://alifile.hqjy.com/hq/classfile/2021-6-2/08fa60d0-d631-420d-b55e-eecdc81b92efvSVsHsK-g98BQkoFuEd5QogAAAAAAAAAAQ.jpg'
    }
    let res = await Serv.addMenu(params);

    if ("" + res.code === "200") {
      this.getTableList();
      this.setState({
        isModalVisible: false
      })
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
  async delete(record) {
    let params={
      key:record.key,
    }
    let res = await Serv.deleteMenu(params);

    if ("" + res.code === "200") {
      this.getTableList();
    }
  }

  render() {
    let { tableList, visible, curFooter, isModalVisible } = this.state;
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
        key: "flavor",
        dataIndex: "flavor",
        render: (tags) => {
          let obj = {
            1: '清淡',
            2: '香辣',
            3: '酸甜',
          }
          let text = obj[tags]
          return (
            <Tag key={tags}>
              {text}
            </Tag>
          )
        }
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
            编辑
            </a>
            <a  onClick={() => {
                this.delete(record);
              }}>删除</a>
          </Space>
        ),
      },
    ];
    const showModal = () => {
      this.setState({
        isModalVisible: true
      })
    };

    const handleOk = () => {
      this.setState({
        isModalVisible: false
      })
    };

    const handleCancel = () => {
      this.setState({
        isModalVisible: false
      })
    };

    // const [form] = Form.useForm();

    const onGenderChange = (value) => {

    };

    const onFinish = async (values) => {
      try {
      let res = await this.addMenu(values)
       
      } catch (error) {
        
      }

      console.log(values);
    };

    const onReset = () => {
      form.resetFields();
    };


    console.log(curFooter);
    return (
      <div className={styles.root}>
        <div className={styles.area_btn}>
          <Button type="primary" onClick={showModal}>新增</Button>
        </div>
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
          destroyOnClose={true}
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
        <Modal title="新增" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Form {...layout} name="control-hooks" onFinish={onFinish}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="flavor"
              label="口味"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Select a option and change input text above"
                onChange={onGenderChange}
                allowClear
              >
                <Option value="1">清淡</Option>
                <Option value="2">香辣</Option>
                <Option value="3">酸甜</Option>
              </Select>
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
            >
              {({ getFieldValue }) =>
                getFieldValue('gender') === 'other' ? (
                  <Form.Item
                    name="customizeGender"
                    label="Customize Gender"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                ) : null
              }
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
        </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
        </Button>
            </Form.Item>
          </Form>

        </Modal>
      </div>
    );
  }
}
export default TestCon;
