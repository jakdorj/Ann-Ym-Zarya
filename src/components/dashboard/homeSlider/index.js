import { Button, Image, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
// import AddDogModal from "./addDogModal";
import axios from "./../../../axios-orders";
import Add from "./add";
// import EditDog from "./editDog";
// import DeleteDog from "./delete";

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
    // title: e[1].values ? e[1].values.title : "",
    // img: e[1].values ? (e[1].values.img ? e[1].values.img[0] : "") : "",
    action: e,
    allData: e,
  }));
  const getData = () => {
    setLoadingTable(true);
    // const token = localStorage.getItem("idToken");

    axios
      .get(`homeSlider.json`)
      .then((res) => {
        console.log("homeSlider ===> ", res.data);
        // const data = Object.entries(res.data).reverse();
        setSilderData([]);
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
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      ...getColumnSearchProps("title"),
    },
    {
      title: "Жижиг гарчиг дээд",
      dataIndex: "smallTitleUp",
      key: "subTitle",
      ellipsis: true,
      width: "180px",
      ...getColumnSearchProps("pedId"),
    },
    {
      title: "Жижиг гарчиг доод",
      dataIndex: "smallTitleDown",
      key: "subTitle",
      ellipsis: true,
      width: "180px",
      ...getColumnSearchProps("pedId"),
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
      width: "120px",
      ellipsis: true,
      ...getColumnSearchProps("type"),
    },
    {
      title: "Үйлдэл",
      dataIndex: "allData",
      key: "allData",
      width: "100px",
      fixed: "right",
      render: (action) => (
        <div style={{ display: "flex", gap: "10px" }}>
          {/* <EditDog
            data={action[0]}
            getDogList={getDogList}
            info={action[1].values}
          />
          <DeleteDog data={action[0]} getDogList={getDogList} /> */}
        </div>
      ),
    },
  ];
  return (
    <div>
      <section>
        <Add getData={getData} />
        <Table
          columns={columns}
          bordered
          dataSource={data}
          scroll={{ y: 600, x: 1200 }}
          loading={loadingTable}
          pagination={{
            total: 0,
            showTotal: (total) => `Нийт: ${total} - Нохой`,
          }}
        />
      </section>
    </div>
  );
};
export default HomeSlider;
