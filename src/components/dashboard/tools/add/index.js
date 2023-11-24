import { Button, Form, Input, InputNumber, Modal, Select, Upload, message  } from "antd";  
import { useEffect, useState } from "react";
import axios from "../../../axios-orders";
import { PlusOutlined } from '@ant-design/icons';
import dataJson from "../../../data/category.json"
const { TextArea } = Input;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
 
const Add = (props) =>{
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState(''); 
    const [fileList, setFileList] = useState([]);

    const [btnLoad, setBtnLoad] = useState(false);
    const [catLabel, setCatLabel] = useState("");
    useEffect(()=>{ 
    },[])
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
      
    const uploadButton = (<div><PlusOutlined /><div style={{marginTop: 8}}>Зураг</div></div>);
    const showModal = () => {
      setIsModalOpen(true);
    }; 
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const onFinish = (values) => {     
    if(fileList.length === 0){
      message.error("Зураг заавал оруулна уу!")
    }else{ 
      setBtnLoad(true); 
      const token = localStorage.getItem("idToken");
      const img = []; 
      fileList.forEach(element => { 
         getBasee64(element.originFileObj, imageUrl =>
           img.push(imageUrl), 
        );
      }); 
        const body = {
            localId: localStorage.getItem("localId"),
            itemList:{
                    title: values.title,
                    evaluation: values.evaluation,
                    size: values.size,
                    quantity: values.quantity,
                    color: values.color, 
                    description: values.description, 
                    id: values.id,
                    price: values.price,  
                    img: img,
                    catName: values.catName,
                    catLabel: catLabel,
                    cnt: 1
            } 
        }   
        console.log("body: ", body);
        setTimeout(()=>{
          axios.post(`itemList.json?&auth=${token}`, body).then((res)=>{
            if(res.data.name)
            setBtnLoad(false)
            message.success("Амжилттай")   
        }).catch((err)=>{  
          setBtnLoad(false)
        }).finally(()=>{
          setBtnLoad(false);
          props.getItemList();
          setIsModalOpen(false);
        })
        },800) 
    } 
    };
    const onChangeSelect = (value, list) =>{ 
      setCatLabel(list.label)
    }
    const onSearch = (value) => {
      console.log('search:', value);
    };
    return<div>
       <Button type="primary" onClick={showModal} size="large" style={{marginBottom: "10px", marginLeft: "10px", marginTop: "10px"}}>
            + Нэмэх
      </Button> 
      <Modal title="Бараа нэмэх" open={isModalOpen} onCancel={handleCancel} footer={null}>
      <Form size="middle"  initialValues={{ remember: true, }}  onFinish={onFinish} style={{marginTop: "20px"}}>
          <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-circle"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange} 
            >
              {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancelImg}>
              <img alt="example"style={{width: '100%',}}src={previewImage}/>
          </Modal> 
          <Form.Item label="ID" name="id" rules={[{ required: true, message: 'Ped ID оруулна уу!'}]}>
              <Input placeholder="ID" allowClear/>
          </Form.Item>
          <Form.Item label="Категори"  name="catName" rules={[{ required: true, message: 'Категори оруулна уу!'}]}>
            
          <Select showSearch placeholder="Категори сонгох" optionFilterProp="children" onChange={onChangeSelect} onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={dataJson.category.map((e)=>({value: e.value, label: e.label}))}/>
          </Form.Item>
          <Form.Item label="Гарчиг" name="title" rules={[{ required: true, message: 'Гарчиг аа оруулна уу!'}]}>
              <Input placeholder="Гарчиг" allowClear/>
          </Form.Item> 
          <Form.Item label="Үнэ" name="price" rules={[{ required: true, message: 'Үнэ ээ оруулна уу!'}]}> 
              <InputNumber defaultValue={10000}  formatter={(value) => `₮ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 
                          style={{width: "100%"}}/>
          </Form.Item>
          <Form.Item label="Үнэлгээ" name="evaluation" rules={[ { required: true, message: 'Нас аа оруулна уу!'}]}>
              <InputNumber placeholder="Үнэлгээ" style={{width: "100%"}}/>
          </Form.Item>  
          <Form.Item label="Тоо ширхэг" name="quantity" rules={[ { required: true, message: 'Нас аа оруулна уу!'}]}>
              <InputNumber placeholder="Тоо ширхэг" style={{width: "100%"}}/>
          </Form.Item>   
          <Form.Item label="Хэмжээ" name="size" rules={[ { required: true, message: 'Хэмжээ ээ оруулна уу!'}]}>
              <Input placeholder="Хэмжээ" allowClear/>
          </Form.Item>    
          <Form.Item label="Өнгө" name="color" rules={[ { required: true, message: 'Өнгө өө оруулна уу!'}]}>
              <Input placeholder="Өнгө" allowClear/>
          </Form.Item>  
          <Form.Item label="Дэлгэрэнгуй" name="description" rules={[ { required: true, message: 'Дэлгэрэнгуй мэдээлэл ээ оруулна уу!'}]}>
              <TextArea placeholder="Дэлгэрэнгуй" showCount allowClear />
          </Form.Item> 
          <Form.Item>
              <Button size="large" type="primary" htmlType="submit" className="login-form-button" style={{width: "100%"}} loading={btnLoad} disabled={btnLoad}> Хадгалах </Button> 
          </Form.Item>
      </Form>
      </Modal>
    </div>
}
export default Add;