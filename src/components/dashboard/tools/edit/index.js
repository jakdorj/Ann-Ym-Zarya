import { Button, Form, Input, InputNumber, Modal, Select, Upload, message } from "antd"
import { PlusOutlined } from '@ant-design/icons';
import dataJson from '../../../data/category.json';
import axios from "../../../axios-orders";
import { EditOutlined } from '@ant-design/icons';
import { useState } from "react";
const { TextArea } = Input;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const EditItem = (props) =>{ 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [getInfo, setInfo] = useState({});
    const [fileList, setFileList] = useState([]);
      
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [loadingS, setLoading] = useState(false);
    const [cateList, setCateList] = useState();

    const handleCancelImg = () => setPreviewOpen(false);
    const handlePreview = async (file) => { 
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewOpen(true);
      setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = (file) => {  
        setFileList(file.fileList) 
    };
    
    function getBasee64(img, callback) { 
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img); 
    }
      
    const uploadButton = (
      <div> <PlusOutlined /> <div style={{marginTop: 8}}>Зураг</div></div>
    );
    const showModal = () => { 
      console.log("props: ", props);
      if(props.info.img.length === 1){
        setFileList([
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            thumbUrl:  props.info.img[0],
          }, 
        ]);
      } else if(props.info.img.length === 2){
        console.log("2r dohi: ");
        setFileList([
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            thumbUrl:  props.info.img[0],
          }, 
          {
            uid: '-2',
            name: 'image2.png',
            status: 'done',
            thumbUrl:  props.info.img[1],
          }, 
        ]);
      }else if(props.info.img.length === 3){
        setFileList([
          {
              uid: '-1',
              name: 'image.png',
              status: 'done',
              thumbUrl:  props.info.img[0],
          }, 
          {
            uid: '-2',
            name: 'image2.png',
            status: 'done',
            thumbUrl:  props.info.img[1],
          }, 
          {
            uid: '-3',
            name: 'image3.png',
            status: 'done',
            thumbUrl:  props.info.img[2],
          }, 
        ]);
      }else if(props.info.img.length === 4){
        setFileList([
          {
              uid: '-1',
              name: 'image.png',
              status: 'done',
              thumbUrl:  props.info.img[0],
          }, 
          {
            uid: '-2',
            name: 'image2.png',
            status: 'done',
            thumbUrl:  props.info.img[1],
          }, 
          {
            uid: '-3',
            name: 'image3.png',
            status: 'done',
            thumbUrl:  props.info.img[2],
          }, 
          {
            uid: '-4',
            name: 'image4.png',
            status: 'done',
            thumbUrl:  props.info.img[3],
          }, 
        ]);
      }else if(props.info.img.length === 5){
        setFileList([
          {
              uid: '-1',
              name: 'image.png',
              status: 'done',
              thumbUrl:  props.info.img[0],
          }, 
          {
            uid: '-2',
            name: 'image2.png',
            status: 'done',
            thumbUrl:  props.info.img[1],
          }, 
          {
            uid: '-3',
            name: 'image3.png',
            status: 'done',
            thumbUrl:  props.info.img[2],
          }, 
          {
            uid: '-4',
            name: 'image4.png',
            status: 'done',
            thumbUrl:  props.info.img[3],
          }, 
          {
            uid: '-5',
            name: 'image4.png',
            status: 'done',
            thumbUrl:  props.info.img[4],
          }, 
        ]);
      }
      
      setInfo(props.info);
      setCateList(props.info);
      setIsModalOpen(true);
    }; 
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const onFinish = (values) => {   
      setLoading(true);
      const token = localStorage.getItem("idToken");
      const img = []; 
      fileList.forEach(element => {   
        if(element.originFileObj){ 
          getBasee64(element.originFileObj, imageUrl =>
            img.push(imageUrl), 
         );
        }else{ 
          img.push(element.thumbUrl)
        } 
      });

      setTimeout(() => { 
        const body = { 
          localId: localStorage.getItem("localId"),
          itemList: {
            catLabel: cateList.catLabel ? cateList.catLabel: cateList.label,
            catName: cateList.catLabel ? cateList.catName: cateList.value,
            quantity: values.quantity,
            color: values.color,
            evaluation: values.evaluation,
            description: values.description,
            id: values.id,
            price: values.price,
            size: values.size,
            title: values.title, 
            label: getInfo.catName,
            cnt: 1,
            img: img
          }
          
      }  
        axios.patch(`itemList/${props.data}.json?&auth=${token}`, body).then((res)=>{   
          if(res.data.name) 
            message.success("Амжилттай") 
            setLoading(false);
            props.getItemList();
            setIsModalOpen(false);
          
        }).catch((err)=>{  
            setLoading(false);
            message.error("Алдаа")
            setIsModalOpen(false);
        }) 
      }, 800); 
     
  
    };

    
  const onChangeSelect = (value, list) =>{ 
    // setCatLabel(list.label)
    console.log("value: ", list);
    setCateList(list);
  }
  const onSearch = (value) => {
    console.log('search:', value);
  };
    return<div>
       <Button type="primary" onClick={showModal} size="small" icon={<EditOutlined style={{display: "block"}}/>}></Button>
        <Modal title="Бараа засах" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form  size="middle" initialValues={{ remember: true,
                  title: getInfo.title, 
                  size: getInfo.size,
                  evaluation: getInfo.evaluation,
                  color: getInfo.color,
                  description: getInfo.description,
                  id: getInfo.id,
                  price: getInfo.price,
                  catLabel: getInfo.catLabel,
                  quantity: getInfo.quantity, 
                  catName: getInfo.catName, 
                  img:  getInfo.img ? getInfo.img[0] : "",
                }}  onFinish={onFinish} >
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-circle"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange} 
            >
              {fileList.length >= 5 ? null : uploadButton}
          </Upload> 
          <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancelImg}>
              <img alt="example"style={{width: '100%',}}src={previewImage}/>
          </Modal> 
            <Form.Item label="Id" name="id" rules={[{ required: true, message: 'Id гаа оруулна уу!'}]}>
              <Input placeholder="Id" />
            </Form.Item>
            <Form.Item label="Категори" name="catLabel" rules={[{ required: true, message: 'Id гаа оруулна уу!'}]}>
            <Select showSearch placeholder="Категори сонгох" style={{width: "100%"}} optionFilterProp="children" onChange={onChangeSelect} onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={dataJson.category.map((e)=>({value: e.value, label: e.label}))}/> 
            </Form.Item>
            
            <Form.Item label="Гарчиг" name="title" rules={[{ required: true, message: ' Гарчиг гаа оруулна уу!'}]}>
                <Input placeholder="Гарчиг" />
            </Form.Item> 
            <Form.Item label="Үнэ" name="price" rules={[{ required: true, message: ' Үнэ ээ оруулна уу!'}]}>
                <InputNumber  placeholder="Үнэ" formatter={(value) => `₮ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                              style={{width: "100%"}}/>
            </Form.Item>
            <Form.Item label="Тоо ширхэг" name="quantity" rules={[ { required: true, message: ' Тоо ширхэг ээ оруулна уу!'}]}>
              <InputNumber  style={{width: "100%"}}/>
            </Form.Item>  
            <Form.Item label="Үнэлгээ" name="evaluation" rules={[ { required: true, message: ' Үнэлгээ ээ оруулна уу!'}]}>
              <Input placeholder="evaluation" />
            </Form.Item> 
            <Form.Item label="Хэмжээ" name="size" rules={[ { required: true, message: ' Хэмжээ гээ оруулна уу!'}]}>
              <Input placeholder="Хэмжээ" />
            </Form.Item>  
            <Form.Item label="Өнгө" name="color" rules={[ { required: true, message: ' Өнгө өө оруулна уу!'}]}>
              <Input placeholder="Өнгө" />
            </Form.Item>  
            <Form.Item label="Дэлгэрэнгуй" name="description" rules={[ { required: true, message: 'Дэлгэрэнгуй мэдээлэлээ оруулна уу!'}]}>
              <TextArea placeholder="Дэлгэрэнгуй" showCount/>
            </Form.Item>  
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" style={{width: "100%"}} disabled={loadingS} loading={loadingS} size="large"> Хадгалах </Button> 
            </Form.Item>
        </Form>
        </Modal>
    </div>
}
export default EditItem;