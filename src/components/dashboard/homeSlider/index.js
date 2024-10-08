import { Button, Image, Input, message, Space, Table, Tabs, Tag } from "antd";
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
  const getData = () => {
    setLoadingTable(true);
    // const token = localStorage.getItem("idToken");

    axios
      .get(`homeSlider.json`)
      .then((res) => {
        if (res.data !== null) {
          const data = Object.entries(res.data).reverse();
          const result = [];
          data.forEach((element) => {
            result.push({ id: element[0], ...element[1]?.data });
          });
          setSilderData(result);
        }
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
      width: "15px",
      render: (text, record, index) => index + 1,
    },
    // {
    //   title: "Гарчиг",
    //   dataIndex: "title",
    //   key: "title",
    //   ellipsis: true,
    //   width: "180px",
    //   ...getColumnSearchProps("title"),
    // },
    // {
    //   title: "Гарчиг /Дэд/",
    //   dataIndex: "subTitle",
    //   key: "subTitle",
    //   ellipsis: true,
    //   width: "180px",
    //   ...getColumnSearchProps("subTitle"),
    // },
    // {
    //   title: "Товчлуур",
    //   dataIndex: "buttonName",
    //   key: "buttonName",
    //   ellipsis: true,
    //   width: "180px",
    //   ...getColumnSearchProps("buttonName"),
    // },
    {
      title: "Зураг",
      dataIndex: "img",
      key: "img",
      width: "100px",
      render: (img) => (
        <div>
          <Image src={img} width={150} />
        </div>
      ),
      ellipsis: true,
    },
    {
      title: "Төрөл",
      dataIndex: "type",
      key: "type",
      width: "30px",
      ellipsis: true,
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
      width: "30px",
      ellipsis: true,
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
      width: "30px",
      render: (action, data) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Edit data={data.id} getData={getData} info={data} />
          <Delete data={data.id} getData={getData} />
        </div>
      ),
    },
  ];
  const tabItems = [
    {
      key: "1",
      label: "Баннер",
      children: (
        <>
          <Add getData={getData} />
          <Table
            columns={columns}
            bordered
            dataSource={getSliderData}
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
