import { Button, Form, Input, Modal, message, notification } from "antd";
import { useEffect, useState } from "react";
import axios from "../../../axios-orders";

const Add = ({ getItems }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [btnLoad, setBtnLoad] = useState(false);
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

  const onFinish = (values) => {
    setBtnLoad(true);
    const token = localStorage.getItem("idToken");

    const body = {
      localId: localStorage.getItem("localId"),
      data: { ...values },
    };
    setTimeout(() => {
      axios
        .post(`category.json?&auth=${token}`, body)
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
  };
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
        onClick={() => setIsModalOpen(true)}
        size="middle"
        style={{ marginBottom: "10px", marginLeft: "10px", marginTop: "10px" }}
      >
        + Категори нэмэх
      </Button>
      <Modal
        title="Нэмэх"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
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
          <Form.Item
            label="Категори нэр"
            name="name"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            rules={[{ required: true, message: "Категори нэр ээ оруулна уу!" }]}
            style={{ marginTop: "20px" }}
          >
            <Input placeholder="Барааны нэр" allowClear />
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
