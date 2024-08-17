import { Button, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "../../../axios-orders";

const Delete = (props) => {
  const deleteFunc = () => {
    axios
      .delete(`orderHistory/${props.data}.json `)
      .then((res) => {
        message.success("Амжилттай устлаа.");
        props.getItems();
      })
      .catch((err) => {
        props.getItems();
      });
  };

  return (
    <div>
      <Popconfirm title="Устгахдаа итгэлтэй байна уу?" onConfirm={deleteFunc}>
        <Button
          type="primary"
          size="small"
          icon={<DeleteOutlined style={{ display: "block" }} />}
          danger
        ></Button>
      </Popconfirm>
    </div>
  );
};
export default Delete;
