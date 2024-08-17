import { Button, Image, Input, Modal, Space, Table } from "antd";
import { useEffect, useRef, useState } from "react";

import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { EyeFilled } from "@ant-design/icons";

const Details = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleChange = (e) => {
      setIsWideScreen(e.matches);
    };
    handleChange(mediaQuery);
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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
            Хайх
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Цэвэрлэх
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
      width: "70px",
      ellipsis: true,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Зураг",
      dataIndex: "image",
      key: "image",
      width: "50px",
      render: (img) => (
        <div>
          <Image src={img[0]} width={50} />{" "}
        </div>
      ),
      ellipsis: true,
    },
    {
      title: "Тоо ширхэг",
      dataIndex: "quantity",
      key: "quantity",
      width: "70px",
      ellipsis: true,
      ...getColumnSearchProps("quantity"),
    },
    {
      title: "Үнэ",
      dataIndex: "price",
      key: "price",
      width: "50px",
      ellipsis: true,
      ...getColumnSearchProps("price"),
      sorter: (a, b) => a.price.length - b.price.length,
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
    {
      title: "Хөнгөлөлт",
      dataIndex: "discount",
      key: "discount",
      width: "70px",
      ellipsis: true,
      ...getColumnSearchProps("discount"),
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
  ];
  return (
    <div>
      <Button
        onClick={showModal}
        type="primary"
        size="small"
        icon={<EyeFilled style={{ display: "block" }} />}
      ></Button>
      <Modal
        title="Дэлгэрэнгүй мэдээлэл"
        open={isModalOpen}
        onCancel={handleCancel}
        width={isWideScreen ? "50%" : "100%"}
        footer={null}
      >
        <Table
          columns={columns}
          bordered
          dataSource={data ? data : []}
          scroll={{ y: 800, x: 600 }}
          pagination={{
            total: 0,
            showTotal: (total) => `Нийт: ${total}`,
          }}
        />
      </Modal>
    </div>
  );
};
export default Details;
