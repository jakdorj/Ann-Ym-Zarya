import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Upload,
  message,
} from "antd";
import {useState} from "react";
import axios from "../../../../axios-orders";
import {PlusOutlined, InfoCircleOutlined} from "@ant-design/icons";
const {TextArea} = Input;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Add = ({getData}) => {
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
      <div style={{marginTop: 8}}>Зураг</div>
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
          smallTitleUp: values.smallTitleUp,
          smallTitleDown: values.smallTitleDown,
          type: values.type,
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
        size="large"
        style={{marginBottom: "10px", marginLeft: "10px", marginTop: "10px"}}
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
          size="large"
          initialValues={{remember: true, type: "0"}}
          onFinish={onFinish}
          style={{marginTop: "20px"}}
        >
          <Upload
            listType="picture-circle"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 4 ? null : uploadButton}
          </Upload>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancelImg}
          >
            <img alt="example" style={{width: "100%"}} src={previewImage} />
          </Modal>
          <Form.Item
            label="Гарчиг"
            name="title"
            rules={[{required: true, message: "Гарчиг аа оруулна уу!"}]}
          >
            <Input placeholder="Гарчиг" allowClear size="small" />
          </Form.Item>

          <Form.Item
            label="Гарчиг/Дээд/"
            name="smallTitleUp"
            rules={[{required: true, message: "Гарчиг/Дээд/ аа оруулна уу!"}]}
          >
            <Input placeholder="Гарчиг/Дээд/" allowClear />
          </Form.Item>

          <Form.Item
            label="Гарчиг/Доод/"
            name="smallTitleDown"
            tooltip={{title: "Заавал биш", icon: <InfoCircleOutlined />}}
            rules={[{required: false, message: "Гарчиг/Доод/ аа оруулна уу!"}]}
          >
            <Input placeholder="Гарчиг/Доод/" allowClear />
          </Form.Item>
          <Form.Item name="type" label="Төрөл">
            <Select
              defaultValue="0"
              style={{
                width: 120,
              }}
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
          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{width: "100%"}}
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
