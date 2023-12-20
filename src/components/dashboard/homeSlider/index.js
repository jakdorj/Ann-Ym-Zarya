import { Button, Image, Input, Space, Table, Tabs, Tag } from "antd";
import Highlighter from "react-highlight-words";
import { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import axios from "./../../../axios-orders";
import Add from "./add";
import Delete from "./delete";
import Edit from "./edit";

const HomeSlider = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [getSliderData, setSilderData] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  useEffect(() => {
    const localId = localStorage.getItem("localId");
    if (localId) {
      getData();
    }
  }, []);
  const data = getSliderData.map((e, i) => ({
    key: i,
    titleMn: e[1].values ? e[1].values.titleMn : "",
    titleEng: e[1].values ? e[1].values.titleEng : "",
    buttonNameMn: e[1].values ? e[1].values.buttonNameMn : "",
    buttonNameEng: e[1].values ? e[1].values.buttonNameEng : "",
    first: e[1].values ? (e[1].values.first ? e[1].values.first : "") : "",
    subTitleMn: e[1].values
      ? e[1].values.subTitleMn
        ? e[1].values.subTitleMn
        : ""
      : "",
    subTitleEng: e[1].values
      ? e[1].values.subTitleEng
        ? e[1].values.subTitleEng
        : ""
      : "",
    type: e[1].values ? (e[1].values.type ? e[1].values.type : "") : "",
    img: e[1].values ? (e[1].values.img ? e[1].values.img[0] : "") : "",
    action: e,
    allData: e,
  }));
  const getData = () => {
    setLoadingTable(true);
    // const token = localStorage.getItem("idToken");

    axios
      .get(`homeSlider.json`)
      .then((res) => {
        const data = Object.entries(res.data).reverse();
        setSilderData(data);
      })
      .catch((err) => {
        console.log("err: ", err);
      })
      .finally(() => {
        setLoadingTable(false);
      });
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "№",
      dataIndex: "key",
      key: "key",
      width: "50px",
      ellipsis: true,
    },
    {
      title: "Гарчиг",
      dataIndex: "titleMn",
      key: "titleMn",
      ellipsis: true,
      width: "180px",
      ...getColumnSearchProps("titleMn"),
    },
    {
      title: "Title",
      dataIndex: "titleEng",
      key: "titleEng",
      ellipsis: true,
      width: "180px",
      ...getColumnSearchProps("titleEng"),
    },
    {
      title: "Гарчиг /Дэд/",
      dataIndex: "subTitleMn",
      key: "subTitleMn",
      ellipsis: true,
      width: "180px",
      ...getColumnSearchProps("subTitleMn"),
    },
    {
      title: "SubTitle",
      dataIndex: "subTitleEng",
      key: "subTitleEng",
      ellipsis: true,
      width: "180px",
      ...getColumnSearchProps("subTitleEng"),
    },
    {
      title: "Товчлуур",
      dataIndex: "buttonNameMn",
      key: "buttonNameMn",
      ellipsis: true,
      width: "180px",
      ...getColumnSearchProps("buttonNameMn"),
    },
    {
      title: "Button name",
      dataIndex: "buttonNameEng",
      key: "buttonNameEng",
      ellipsis: true,
      width: "180px",
      ...getColumnSearchProps("buttonNameEng"),
    },
    {
      title: "Зураг",
      dataIndex: "img",
      key: "img",
      width: "180px",
      render: (img) => (
        <div>
          <Image src={img} width={50} />
        </div>
      ),
      ellipsis: true,
    },
    {
      title: "Төрөл",
      dataIndex: "type",
      key: "type",
      width: "100px",
      ellipsis: true,
      fixed: "right",
      render: (type) => (
        <div>
          {" "}
          {type === "1" ? (
            <Tag color="#87d068">Идэвхтэй</Tag>
          ) : (
            <Tag color="red">Идэвхгүй</Tag>
          )}
        </div>
      ),
    },
    {
      title: "Хамгийн эхэнд",
      dataIndex: "first",
      key: "first",
      width: "100px",
      ellipsis: true,
      fixed: "right",
      render: (type) => (
        <div>
          {" "}
          {type === "A" ? (
            <Tag color="#87d068">Идэвхтэй</Tag>
          ) : (
            <Tag color="red">Идэвхгүй</Tag>
          )}
        </div>
      ),
    },
    {
      title: "Үйлдэл",
      dataIndex: "allData",
      key: "allData",
      width: "100px",
      fixed: "right",
      render: (action) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Edit data={action[0]} getData={getData} info={action[1].values} />
          <Delete data={action[0]} getData={getData} />
        </div>
      ),
    },
  ];
  const tabItems = [
    {
      key: "1",
      label: "Home banner",
      children: (
        <>
          <Add getData={getData} />
          <Table
            columns={columns}
            bordered
            dataSource={data}
            scroll={{ y: 600, x: 1200 }}
            loading={loadingTable}
            pagination={{
              total: 0,
              showTotal: (total) => `Нийт: ${total}`,
            }}
          />
        </>
      ),
    },
    {
      key: "2",
      label: "Grid Banner home",
      // children: <GridBannerHomeTab />,
      children: "",
    },
  ];
  const onChange = (key) => {
    // console.log(key);
  };
  return (
    <div>
      <section>
        <Tabs defaultActiveKey="1" items={tabItems} onChange={onChange} />
      </section>
    </div>
  );
};
export default HomeSlider;
