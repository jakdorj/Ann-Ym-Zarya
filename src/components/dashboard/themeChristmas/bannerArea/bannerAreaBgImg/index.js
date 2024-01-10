import {Button, Modal, Upload, message} from "antd";
import {useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const BABI = ({item, setItem, imgNumber}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [bgImg, setBgImg] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const handleOk = () => {
    if (fileList.length === 0) {
      return message.error("Зураг заавал оруулна уу!");
    } else {
      if (imgNumber === 1) {
        setItem({...item, itemOneImg: bgImg});
        setIsModalOpen(false);
      } else if (imgNumber === 2) {
        setItem({...item, itemTwoImg: bgImg});
        setIsModalOpen(false);
      } else if (imgNumber === 3) {
        setItem({...item, itemThreeImg: bgImg});
        setIsModalOpen(false);
      }
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  function getBasee64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }
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

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{marginTop: 8}}>Зураг</div>
    </div>
  );
  const handleChange = (file) => {
    setFileList(file.fileList);
    getBasee64(file.fileList[0].originFileObj, (imageUrl) => {
      setBgImg(imageUrl);
    });
  };
  const showModal = () => {
    // tabValue: 1 = english | 2 = mongol
    // updateChristmas: true = update | false = save
    setIsModalOpen(true);
  };
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        + Зураг
      </Button>
      <Modal
        title="Зураг солих"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
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
          <img alt="example" style={{width: "100%"}} src={previewImage} />
        </Modal>
      </Modal>
    </div>
  );
};

export default BABI;
