import { Button, Image, Input, Space, Table, Tabs } from "antd";
import Highlighter from "react-highlight-words";
import { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import axios from "../../axios-orders";
import Add from "./add";
import Edit from "./edit";
import Delete from "./delete";
import CategoryComponent from "../category-component";
// import Paragraph from "antd/es/skeleton/Paragraph";

const Items = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [getData, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);

  useEffect(() => {
    const localId = localStorage.getItem("localId");
    if (localId) {
      getItems();
      getCategory();
    }
  }, []);
  const getCategory = () => {
    axios
      .get(`category.json`)
      .then((res) => {
        if (res.data !== null) {
          const data = Object.entries(res.data).reverse();
          const result = [];
          data.forEach((element) => {
            result.push({ id: element[0], ...element[1]?.data });
          });
          setCategory(result);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };
  const getItems = () => {
    setLoadingTable(true);
    axios
      .get(`items.json`)
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
      width: "50px",
      ellipsis: true,
      ...getColumnSearchProps("price"),
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["descend", "ascend"],
      render: (a) => (
        <div style={{ display: "flex" }}>
          {/* <Paragraph copyable={{text: a }}></Paragraph> */}
          <div style={{ paddingLeft: "5px" }}>
            {a?.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "₮"}
          </div>
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
      width: "70px",
      ellipsis: true,
      ...getColumnSearchProps("stock"),
      sorter: (a, b) => a.stock - b.stock,
      sortDirections: ["descend", "ascend"],
      render: (a) => (
        <div style={{ display: "flex" }}>
          {/* <Paragraph copyable={{text: a }}></Paragraph> */}
          <div style={{ paddingLeft: "5px" }}>{a}</div>
        </div>
      ),
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
    {
      title: "Зураг",
      dataIndex: "image",
      key: "image",
      width: "40px",
      render: (img) => (
        <div>
          <Image src={img[0]} width={50} />{" "}
        </div>
      ),
      ellipsis: true,
    },

    {
      title: "Үйлдэл",
      dataIndex: "allData",
      key: "allData",
      width: "50px",
      render: (action, data) => (
        <div style={{ display: "flex", gap: "10px" }}>
          {/*   <Edit data={action[0]} getItems={getItems} info={action[1].data} /> */}
          <Delete data={data?.id} getItems={getItems} />
        </div>
      ),
    },
  ];
  const tabItems = [
    {
      key: "1",
      label: "Бараа нэмэх",
      children: (
        <>
          <Add getItems={getItems} category={category} />
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
        </>
      ),
    },
    {
      key: "2",
      label: "Категори нэмэх",
      children: <CategoryComponent />,
    },
  ];
  const onChange = (key) => {
    // console.log(key);
  };

  return (
    <div>
      <section>
        <div>
          <Tabs defaultActiveKey="1" items={tabItems} onChange={onChange} />
        </div>
      </section>
    </div>
  );
};
export default Items;
