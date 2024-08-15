import { Button, Image, Input, Space, Table, Tabs } from "antd";
import Highlighter from "react-highlight-words";
import { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import axios from "../../axios-orders";
import Add from "./add";
import Edit from "./edit";
import Delete from "./delete";
import CategoryComponent from "../category-component";
import Details from "./details";
// import Paragraph from "antd/es/skeleton/Paragraph";

const OrderHistory = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [getData, setData] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);

  useEffect(() => {
    const localId = localStorage.getItem("localId");
    if (localId) {
      getItems();
    }
  }, []);
  const getItems = () => {
    setLoadingTable(true);
    axios
      .get(`orderHistory.json`)
      .then((res) => {
        if (res.data !== null) {
          const data = Object.entries(res.data).reverse();
          const result = [];
          data.forEach((element) => {
            result.push({ id: element[0], ...element[1] });
          });
          console.log("result: ", result);
          setData(result);
        }
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
      width: "5px",
      render: (text, record, index) => index + 1,
      ellipsis: true,
    },
    {
      title: "Огноо",
      dataIndex: "date",
      key: "date",
      width: "100px",
      ellipsis: true,
      ...getColumnSearchProps("date"),
    },
    {
      title: "Захиалгач нэр",
      dataIndex: "username",
      key: "username",
      width: "100px",
      ellipsis: true,
      ...getColumnSearchProps("username"),
    },
    {
      title: "Захиалгын дугаар",
      dataIndex: "orderNumber",
      key: "orderNumber",
      width: "100px",
      ellipsis: true,
      ...getColumnSearchProps("orderNumber"),
    },
    // {
    //   title: "Зураг",
    //   dataIndex: "image",
    //   key: "image",
    //   width: "80px",
    //   render: (img) => (
    //     <div>
    //       <Image src={img[0]} width={50} />{" "}
    //     </div>
    //   ),
    // },
    {
      title: "Е-мэйл",
      dataIndex: "email",
      key: "email",
      width: "100px",
      ellipsis: true,
      ...getColumnSearchProps("orderNumber"),
    },
    {
      title: "Утас",
      dataIndex: "phone",
      key: "phone",
      width: "100px",
      ellipsis: true,
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Үнэ",
      dataIndex: "price",
      key: "price",
      width: "150px",
      ellipsis: true,
      ...getColumnSearchProps("price"),
      sorter: (a, b) => a.price.length - b.price.length,
      sortDirections: ["descend", "ascend"],
      render: (a) => (
        <div style={{ display: "flex" }}>
          {/* <Paragraph copyable={{text: a }}></Paragraph> */}
          <div style={{ paddingLeft: "5px" }}>{a}</div>
        </div>
      ),
    },
    {
      title: "Үйлдэл",
      dataIndex: "allData",
      key: "allData",
      width: "100px",
      render: (action, data) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Delete data={data.id} getItems={getItems} />
          <Details data={data?.orders?.updateData} />
        </div>
      ),
    },
  ];
  return (
    <div>
      <section>
        <Table
          columns={columns}
          bordered
          dataSource={getData ? getData : []}
          scroll={{ y: 600, x: 800 }}
          loading={loadingTable}
          pagination={{
            total: 0,
            showTotal: (total) => `Нийт: ${total}`,
          }}
        />
      </section>
    </div>
  );
};
export default OrderHistory;
