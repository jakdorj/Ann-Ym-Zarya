import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Upload,
  message,
  notification,
} from "antd";
import { useEffect, useState } from "react";

import axios from "axios";
import {
  MinusCircleOutlined,
  PlusOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { label } from "yet-another-react-lightbox/core";

const { TextArea } = Input;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Add = ({ getItems, category }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [btnLoad, setBtnLoad] = useState(false);
  const handleCancelImg = () => setPreviewOpen(false);
  const [api, contextHolder] = notification.useNotification();
  const [isWideScreen, setIsWideScreen] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

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
    setBtnLoad(false);
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
        data: { ...values, image: img },
      };

      if (body.data.order === undefined || body.data.order === false) {
        delete body.data.order;
      }

      if (body.data.variation === undefined || body.data.variation === "") {
        delete body.data.variation;
      } else {
        let totalNumber = body.data.variation?.reduce((total, item) => {
          return (
            total +
            item.size.reduce((sum, size) => sum + parseInt(size.stock, 10), 0)
          );
        }, 0);

        if (body.data.stock !== totalNumber) {
          api["error"]({
            message: "Барааны нийт тоо ширхэг таарахгүй байна",
            description: (
              <div>
                <div>
                  {" "}
                  Барааны нийт тоо ширхэг өнгөний тоо ширхэгтэй таарахгүй байна
                </div>
                <div style={{ color: "green" }}>Нийт: {totalNumber} </div>
              </div>
            ),
          });
          return;
        }
      }

      setTimeout(() => {
        axios
          .post(
            `https://ann-yum-zarya-default-rtdb.firebaseio.com/items.json?&auth=${token}`,
            body
          )
          .then((res) => {
            if (res.data.name) message.success("Амжилттай");
            getItems();
          })
          .catch((err) => {
            if (err.response.data.error === "Permission denied") {
              api["error"]({
                message: "Системээс гараад дахин нэврэнэ үү!",
                description: (
                  <div>
                    Нэвтрэх хүчинтэй хугацаа дууссан тул системээс гараад дахин
                    нэврэнэ үү!
                  </div>
                ),
              });
            }
          })
          .finally(() => {
            setIsModalOpen(false);
            setBtnLoad(false);
          });
      }, 800);
    }
  };

  const options = category.map((e) => ({
    value: e.name,
    label: e.name,
  }));

  const onFinishFailed = (param) => {
    api["error"]({
      message: "Заавал бөглөнө үү",
      description: (
        <div>
          {param.errorFields?.map((e) => (
            <div> {e?.errors[0]} </div>
          ))}
        </div>
      ),
    });
  };
  return (
    <div>
      {contextHolder}
      <Button
        type="primary"
        onClick={showModal}
        size="middle"
        style={{ marginBottom: "10px", marginLeft: "10px", marginTop: "10px" }}
      >
        + Бараа нэмэх
      </Button>
      <Modal
        title="Нэмэх"
        open={isModalOpen}
        onCancel={handleCancel}
        width={isWideScreen ? "50%" : "100%"}
        footer={null}
      >
        <Form
          disabled={btnLoad}
          size="middle"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ marginTop: "20px" }}
        >
          <ImgCrop aspect={3 / 4} rotationSlider>
            <Upload
              listType="picture-circle"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 7 ? null : uploadButton}
            </Upload>
          </ImgCrop>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancelImg}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>

          <Form.Item
            label="Барааны нэр"
            name="name"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            rules={[{ required: true, message: "Барааны нэр ээ оруулна уу!" }]}
            style={{ marginTop: "20px" }}
          >
            <Input placeholder="Барааны нэр" allowClear />
          </Form.Item>
          <Row gutter={4}>
            <Col>
              <Form.Item
                label="Үнэ"
                name="price"
                rules={[{ required: true, message: "Үнэ ээ оруулна уу!" }]}
                labelCol={{ span: 11 }}
                wrapperCol={{ span: 14 }}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  defaultValue={1000}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
                  placeholder="Үнэ"
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                label="Хөнгөлөлт"
                name="discount"
                labelCol={{ span: 14 }}
                // wrapperCol={{span: 8}}
                rules={[{ required: false }]}
              >
                <InputNumber
                  defaultValue={0}
                  max={99}
                  placeholder="Хөнгөлөлт"
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                label="Тоо ширхэг"
                name="stock"
                labelCol={{ span: 16 }}
                // wrapperCol={{span: 12}}
                rules={[{ required: true, message: "Тоо ширхэг оруулна уу!" }]}
              >
                <InputNumber placeholder="Тоо ширхэг" allowClear />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={40}>
            <Col>
              <Form.Item
                label="*"
                name="order"
                valuePropName="checked"
                labelCol={{ span: 23 }}
                wrapperCol={{ span: 8 }}
                rules={[{ required: false }]}
              >
                <Checkbox>Захиалга</Checkbox>
              </Form.Item>
            </Col>
            {/* <Col>
              <Form.Item
                label="*"
                name="new"
                valuePropName="checked"
                labelCol={{ span: 23 }}
                wrapperCol={{ span: 10 }}
                rules={[{ required: false }]}
              >
                <Checkbox>Шинэ</Checkbox>
              </Form.Item>
            </Col> */}
          </Row>

          {/* 
          <Form.Item
            label=""
            name="Категори"
            valuePropName="checked"
            labelCol={{span: 4}}
            wrapperCol={{span: 20}}
            rules={[{required: false, message: "Категори оруулна уу!"}]}
          >
            <Input />
          </Form.Item> */}

          <Form.Item
            name="category"
            label="Категори"
            rules={[
              {
                required: true,
                message: "Категори оруулна уу!",
              },
            ]}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <Select
              mode="tags"
              options={options}
              placeholder="Категори сонгоно уу"
            ></Select>
          </Form.Item>

          <Form.List name="additionalInfo">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key}>
                    <Row gutter={22}>
                      <Col span={10}>
                        <Form.Item
                          {...restField}
                          label="Гарчиг"
                          labelCol={{ span: 8 }}
                          wrapperCol={{ span: 22 }}
                          name={[name, "label"]}
                          rules={[{ required: true, message: "Missing key" }]}
                        >
                          <Input
                            placeholder="Гарчиг"
                            className="w-full"
                            allowClear
                          />
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          {...restField}
                          label="Утга"
                          labelCol={{ span: 8 }}
                          wrapperCol={{ span: 22 }}
                          name={[name, "value"]}
                          rules={[{ required: true, message: "Missing key" }]}
                        >
                          <Input
                            placeholder="Утга"
                            className="w-full"
                            allowClear
                          />
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Col>
                    </Row>
                  </div>
                ))}
                <Form.Item
                  wrapperCol={{
                    xl: { span: 18, offset: 6 },
                    xs: { span: 20, offset: 0 },
                  }}
                >
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Нэмэлт мэдээлэл
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.List name="variation">
            {(fields, { add, remove }) => (
              <div
                style={{
                  display: "flex",
                  rowGap: 16,
                  flexDirection: "column",
                  marginLeft: "20px",
                }}
              >
                {fields.map((field) => (
                  <Card
                    size="small"
                    title={`Өнгө ${field.name + 1}`}
                    key={field.key}
                    extra={
                      <CloseOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    }
                  >
                    <Form.Item label="Өнгө" name={[field.name, "color"]}>
                      <Input />
                    </Form.Item>

                    {/* Nest Form.List */}
                    <Form.Item label="size">
                      <Form.List name={[field.name, "size"]}>
                        {(subFields, subOpt) => (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              rowGap: 16,
                            }}
                          >
                            {subFields.map((subField) => (
                              <Space key={subField.key}>
                                <Form.Item
                                  noStyle
                                  name={[subField.name, "name"]}
                                >
                                  <Input placeholder="Хэмжээ" />
                                </Form.Item>
                                <Form.Item
                                  noStyle
                                  name={[subField.name, "stock"]}
                                >
                                  <InputNumber placeholder="Тоо ширхэг" />
                                </Form.Item>
                                <CloseOutlined
                                  onClick={() => {
                                    subOpt.remove(subField.name);
                                  }}
                                />
                              </Space>
                            ))}
                            <Button
                              type="dashed"
                              onClick={() => subOpt.add()}
                              block
                            >
                              + Хэмжээ нэмэх
                            </Button>
                          </div>
                        )}
                      </Form.List>
                    </Form.Item>
                  </Card>
                ))}

                <Button type="dashed" onClick={() => add()} block>
                  + Өнгө нэмэх
                </Button>
              </div>
            )}
          </Form.List>
          <Form.Item
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 20 }}
            label="Богино дэлгэрэнгуй"
            name="shortDescription"
            style={{ marginTop: "30px" }}
            rules={[
              {
                required: true,
                message: "Богино дэлгэрэнгуй мэдээлэл ээ оруулна уу!",
              },
            ]}
          >
            <TextArea
              placeholder="дэлгэрэнгуй"
              showCount
              allowClear
              style={{ height: "100px" }}
            />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 20 }}
            label="Бүтэн дэлгэрэнгуй"
            name="fullDescription"
            rules={[
              {
                required: true,
                message: "Дэлгэрэнгуй мэдээлэл ээ оруулна уу!",
              },
            ]}
          >
            <TextArea
              placeholder="дэлгэрэнгуй"
              showCount
              allowClear
              style={{ height: "200px" }}
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
