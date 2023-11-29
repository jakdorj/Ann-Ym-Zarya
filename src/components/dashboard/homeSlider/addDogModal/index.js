import { Button, Form, Input, InputNumber, Modal, Upload, message } from "antd";
import { useState } from "react";
import axios from "../../../../axios-orders";
import { PlusOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const AddDogModal = (props) => {
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
          title: values.title,
          age: values.age,
          size: values.size,
          birth: values.birth,
          color: values.color,
          country: values.country,
          description: values.description,
          gender: values.gender,
          pedId: values.pedId,
          price: values.price,
          type: values.type,
          img: img,
        },
      };
      setTimeout(() => {
        axios
          .post(`dogList.json?&auth=${token}`, body)
          .then((res) => {
            if (res.data.name) message.success("Амжилттай");
            props.getDogList();
            setIsModalOpen(false);
            //   props.getRegistrationList()
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

  return (
    <div>
      <Button
        type="primary"
        onClick={showModal}
        size="large"
        style={{ marginBottom: "10px", marginLeft: "10px", marginTop: "10px" }}
      >
        + Нохой нэмэх
      </Button>
      <Modal
        title="Нохой нэмэх"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          size="middle"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ marginTop: "20px" }}
        >
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-circle"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
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
            label="Pet ID"
            name="pedId"
            rules={[{ required: true, message: "Ped ID оруулна уу!" }]}
          >
            <Input placeholder="Pet ID" allowClear />
          </Form.Item>
          <Form.Item
            label="Гарчиг"
            name="title"
            rules={[{ required: true, message: "Гарчиг аа оруулна уу!" }]}
          >
            <Input placeholder="Гарчиг" allowClear />
          </Form.Item>
          <Form.Item
            label="Төрсөн он"
            name="birth"
            rules={[{ required: true, message: "Төрсөн он оо оруулна уу!" }]}
          >
            <Input placeholder="Төрсөн он" allowClear />
          </Form.Item>
          <Form.Item
            label="Үнэ"
            name="price"
            rules={[{ required: true, message: "Үнэ ээ оруулна уу!" }]}
          >
            <InputNumber
              defaultValue={10000}
              formatter={(value) =>
                `₮ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label="Нас"
            name="age"
            rules={[{ required: true, message: "Нас аа оруулна уу!" }]}
          >
            <InputNumber placeholder="Нас" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Хүйс"
            name="gender"
            rules={[{ required: true, message: "Хүйс ээ оруулна уу!" }]}
          >
            <Input placeholder="Хүйс" allowClear />
          </Form.Item>
          <Form.Item
            label="Хэмжээ"
            name="size"
            rules={[{ required: true, message: "Хэмжээ ээ оруулна уу!" }]}
          >
            <Input placeholder="Хэмжээ" allowClear />
          </Form.Item>
          <Form.Item
            label="Төрөл"
            name="type"
            rules={[{ required: true, message: "Төрөл өө оруулна уу!" }]}
          >
            <Input placeholder="Төрөл" allowClear />
          </Form.Item>

          <Form.Item
            label="Өнгө"
            name="color"
            rules={[{ required: true, message: "Өнгө өө оруулна уу!" }]}
          >
            <Input placeholder="Өнгө" allowClear />
          </Form.Item>
          <Form.Item
            label="Хот"
            name="country"
            rules={[{ required: true, message: "Хот оо оруулна уу!" }]}
          >
            <Input placeholder="Хот" allowClear />
          </Form.Item>
          <Form.Item
            label="Дэлгэрэнгуй"
            name="description"
            rules={[
              {
                required: true,
                message: "Дэлгэрэнгуй мэдээлэл ээ оруулна уу!",
              },
            ]}
          >
            <TextArea placeholder="Дэлгэрэнгуй" showCount allowClear />
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
export default AddDogModal;
