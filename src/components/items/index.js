import { Button, Image, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import Add from "./add";
import Edit from "./edit";
import Delete from "./delete";
// import Paragraph from "antd/es/skeleton/Paragraph";

const Items = () => {
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
    // const token = localStorage.getItem("idToken");
    axios
      .get(`https://ann-yum-zarya-default-rtdb.firebaseio.com/items.json`)
      .then((res) => {
        if (res.data !== null) {
          const data = Object.entries(res.data).reverse();
          const result = [];
          data.forEach((element) => {
            result.push({ id: element[0], ...element[1]?.data });
          });
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
      title: "Барааны нэр",
      dataIndex: "name",
      key: "name",
      width: "100px",
      ellipsis: true,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Үнэ",
      dataIndex: "price",
      key: "price",
      width: "100px",
      ellipsis: true,
      ...getColumnSearchProps("price"),
    },
    {
      title: "Хөнгөлөлт",
      dataIndex: "discount",
      key: "discount",
      width: "100px",
      ellipsis: true,
      ...getColumnSearchProps("discount"),
    },
    {
      title: "Шинэ",
      dataIndex: "new",
      key: "new",
      width: "80px",
      ...getColumnSearchProps("new"),
      ellipsis: true,
      render: (a) => (
        <div style={{ display: "flex" }}>
          <div style={{ paddingLeft: "5px" }}>{a ? "shine" : ""}</div>
        </div>
      ),
    },
    // {
    //   title: "Категори",
    //   dataIndex: "category",
    //   key: "category",
    //   width: "80px",
    //   ellipsis: true,
    //   render: (a) => (
    //     <div style={{display: "flex"}}>
    //
    //       {/* <div style={{paddingLeft: "5px"}}>{a}</div> */}
    //     </div>
    //   ),
    // },
    {
      title: "Тоо ширхэг",
      dataIndex: "stock",
      key: "stock",
      width: "80px",
      ...getColumnSearchProps("stock"),
      ellipsis: true,
    },
    {
      title: "Бүтэн дэлгэрэнгүй",
      dataIndex: "fullDescription",
      key: "fullDescription",
      width: "80px",
      ...getColumnSearchProps("fullDescription"),
      ellipsis: true,
    },
    // {
    //   title: "Богино дэлгэрэнгүй",
    //   dataIndex: "shortDescription",
    //   key: "shortDescription",
    //   width: "80px",
    //   ...getColumnSearchProps("shortDescription"),
    //   ellipsis: true,
    // },
    // {
    //   title: "Нэмэлт мэдээлэл",
    //   dataIndex: "additionalInfo",
    //   key: "additionalInfo",
    //   width: "80px",
    //   ellipsis: true,
    //   render: (a) => (
    //     <div style={{display: "flex"}}>
    //       {/* <Paragraph copyable={{text: a }}></Paragraph> */}
    //       <div style={{paddingLeft: "5px"}}>xooson</div>
    //     </div>
    //   ),
    // },
    // {
    //   title: "Зураг",
    //   dataIndex: "images",
    //   key: "images",
    //   width: "80px",
    //   render: (img) => <div>{/* <Image src={img} width={50} /> */}</div>,
    //   ellipsis: true,
    // },
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
      render: (action) => (
        <div style={{ display: "flex", gap: "10px" }}>
          {/* <Edit data={action[0]} getItems={getItems} info={action[1].data} />
          <Delete data={action[0]} getItems={getItems} /> */}
        </div>
      ),
    },
  ];
  return (
    <div>
      <section>
        <div>
          <div>
            <Add getItems={getItems} />
            <Table
              columns={columns}
              bordered
              dataSource={getData ? getData : []}
              scroll={{ y: 600, x: 1200 }}
              loading={loadingTable}
              pagination={{
                total: 0,
                showTotal: (total) => `Нийт: ${total}`,
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
export default Items;
