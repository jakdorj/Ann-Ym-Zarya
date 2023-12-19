import { Button, Form, Input, Modal, Select, Upload, message } from "antd";
import { useState } from "react";
import axios from "../../../../axios-orders";
import { PlusOutlined, InfoCircleOutlined } from "@ant-design/icons";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Add = ({ getData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const [btnLoad, setBtnLoad] = useState(false);

  const handleCancelImg = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = (file) => {
    setFileList(file.fileList);
  };

  function getBasee64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Зураг</div>
    </div>
  );
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    if (fileList.length === 0) {
      message.error("Зураг заавал оруулна уу!");
    } else {
      setBtnLoad(true);
      const token = localStorage.getItem("idToken");
      const img = [];
      fileList.forEach((element) => {
        getBasee64(element.originFileObj, (imageUrl) => img.push(imageUrl));
      });
      const body = {
        localId: localStorage.getItem("localId"),
        values: {
          titleMn: values.titleMn,
          titleEng: values.titleEng,
          subTitleMn: values.subTitleMn,
          subTitleEng: values.subTitleEng,
          buttonNameMn: values.buttonNameMn,
          buttonNameEng: values.buttonNameEng,
          type: values.type,
          first: values.first,
          img: img,
        },
      };
      setTimeout(() => {
        console.log("zurags: ", body);
        axios
          .post(`homeSlider.json?&auth=${token}`, body)
          .then((res) => {
            // if (res.data.name) message.success("Амжилттай");
            getData();
            setIsModalOpen(false);
          })
          .catch((err) => {
            message.error("Амжилтгүй");
            setIsModalOpen(false);
          })
          .finally(() => {
            setBtnLoad(false);
          });
      }, 800);
    }
  };
  const selHandleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={showModal}
        size="middle"
        style={{ marginBottom: "10px", marginLeft: "10px", marginTop: "10px" }}
      >
        + Баннер Нэмэх
      </Button>
      <Modal
        title="Баннер нэмэх"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          size="small"
          onFinish={onFinish}
          style={{ marginTop: "20px" }}
          labelAlign="left"
          labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 24,
          }}
          layout="horizontal"
        >
          <Upload
            listType="picture-circle"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancelImg}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
          <Form.Item
            label="Гарчиг"
            name="titleMn"
            rules={[{ required: true, message: "Гарчиг аа оруулна уу!" }]}
          >
            <Input placeholder="Гарчиг" allowClear size="small" />
          </Form.Item>
          <Form.Item
            label="Title"
            name="titleEng"
            rules={[{ required: true, message: "Гарчиг аа оруулна уу!" }]}
          >
            <Input placeholder="Title" allowClear size="small" />
          </Form.Item>
          <Form.Item
            label="Гарчиг/Дэд/"
            name="subTitleMn"
            tooltip={{
              title: "<br/> - текстийг доош нь унгана.",
              icon: <InfoCircleOutlined />,
            }}
            rules={[{ required: true, message: "Гарчиг/Дэд/ аа оруулна уу!" }]}
          >
            <Input placeholder="Гарчиг/Дэд/" allowClear />
          </Form.Item>

          <Form.Item
            label="Subtitle"
            name="subTitleEng"
            tooltip={{
              title: "<br/> - текстийг доош нь унгана.",
              icon: <InfoCircleOutlined />,
            }}
            rules={[{ required: true, message: "Гарчиг/Дэд/ аа оруулна уу!" }]}
          >
            <Input placeholder="Subtitle" allowClear />
          </Form.Item>
          {/* <Form.Item
            label="Гарчиг/Доод/"
            name="smallTitleDown"
            tooltip={{ title: "Заавал биш", icon: <InfoCircleOutlined /> }}
            rules={[
              { required: false, message: "Гарчиг/Доод/ аа оруулна уу!" },
            ]}
          >
            <Input placeholder="Гарчиг/Доод/" allowClear />
          </Form.Item> */}
          <Form.Item
            label="Товчлуур"
            name="buttonNameMn"
            rules={[{ required: true, message: "Товчлуур нэр ээ оруулна уу!" }]}
          >
            <Input placeholder="Товчлуур нэр" allowClear />
          </Form.Item>
          <Form.Item
            label="Button name"
            name="buttonNameEng"
            rules={[{ required: true, message: "Товчлуур нэр ээ оруулна уу!" }]}
          >
            <Input placeholder="Button name" allowClear />
          </Form.Item>
          <Form.Item name="type" label="Төрөл">
            <Select
              size="large"
              defaultValue="0"
              onChange={selHandleChange}
              options={[
                {
                  value: "0",
                  label: "Идэвхгүй",
                },
                {
                  value: "1",
                  label: "Идэвхтэй",
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="first" label="Хамгийн эхэнд">
            <Select
              size="large"
              defaultValue="B"
              options={[
                {
                  value: "B",
                  label: "Идэвхгүй",
                },
                {
                  value: "A",
                  label: "Идэвхтэй",
                },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "100%" }}
              loading={btnLoad}
            >
              {" "}
              Хадгалах{" "}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Add;
