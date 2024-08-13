import { Button, Form, Input, Modal, Select, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "../../../../axios-orders";
import { EditOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const Edit = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getInfo, setInfo] = useState({});
  const [fileList, setFileList] = useState([]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

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
      <div
        style={{
          marginTop: 8,
        }}
      >
        Зураг
      </div>
    </div>
  );
  const showModal = () => {
    if (props.info.img.length === 1) {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          thumbUrl: props.info.img[0],
        },
      ]);
    }
    setInfo(props.info);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    const token = localStorage.getItem("idToken");
    const img = [];
    fileList.forEach((element) => {
      if (element.originFileObj) {
        getBasee64(element.originFileObj, (imageUrl) => img.push(imageUrl));
      } else {
        img.push(element.thumbUrl);
      }
    });
    setTimeout(() => {
      const body = {
        localId: localStorage.getItem("localId"),
        data: {
          // title: values.title,
          type: values.type,
          // subTitle: values.subTitle,
          // buttonName: values.buttonName,
          first: values.first,
          img: img,
        },
      };
      axios
        .patch(`homeSlider/${props.data}.json?&auth=${token}`, body)
        .then((res) => {
          if (res.data.name) message.success("Success");
          props.getData();
        })
        .catch((err) => {
          if (err.response.data.error === "Permission denied")
            return message.error("Системээс гараад дахин нэврэнэ үү!");
        })
        .finally(() => {
          setIsModalOpen(false);
        });
    }, 800);
  };
  return (
    <div>
      <Button
        type="primary"
        onClick={showModal}
        size="small"
        icon={<EditOutlined style={{ display: "block" }} />}
      ></Button>
      <Modal
        title="Баннер засах"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          size="middle"
          labelAlign="left"
          labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
            // title: getInfo.title,
            // subTitle: getInfo.subTitle,
            // buttonName: getInfo.buttonName,
            first: getInfo.first,
            type: getInfo.type,
            img: getInfo.img ? getInfo.img[0] : "",
          }}
          onFinish={onFinish}
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
          {/* <Form.Item
            label="Гарчиг"
            name="title"
            rules={[{ required: true, message: "Гарчиг аа оруулна уу!" }]}
          >
            <Input placeholder="Гарчиг" allowClear size="small" />
          </Form.Item>
          <Form.Item
            label="Гарчиг/Дэд/"
            name="subTitle"
            tooltip={{
              title: "<br/> - текстийг доош нь унгана.",
              icon: <InfoCircleOutlined />,
            }}
            rules={[{ required: true, message: "Гарчиг/Дэд/ аа оруулна уу!" }]}
          >
            <Input placeholder="Гарчиг/Дэд/" allowClear />
          </Form.Item>
          <Form.Item
            label="Товчлуур"
            name="buttonName"
            rules={[{ required: true, message: "Товчлуур нэр ээ оруулна уу!" }]}
          >
            <Input placeholder="Товчлуур нэр" allowClear />
          </Form.Item> */}
          <Form.Item name="type" label="Төрөл">
            <Select
              size="large"
              defaultValue="0"
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
              defaultValue="A"
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
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "100%" }}
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
export default Edit;
