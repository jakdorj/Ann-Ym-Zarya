import { Button, Popconfirm, message } from "antd"
import { DeleteOutlined } from '@ant-design/icons';
import axios from "../../../axios-orders";  

const DeleteItem = (props) =>{  
  const deleteFunc = () =>{  
      const token = localStorage.getItem("idToken"); 
      axios.delete(`itemList/${props.data}.json?&auth=${token}`).then((res)=>{  
        message.success("Амжилттай устлаа") 
        props.getItemList();
      }).catch((err)=>{ 
          props.getItemList();
      }) 
  }
    return<div> 
        <Popconfirm title="Устгахдаа итгэлтэй байна уу?" onConfirm={deleteFunc}>
          <Button type="primary" size="small" icon={<DeleteOutlined style={{display: "block"}}/>} danger></Button>
        </Popconfirm>
    </div>
}
export default DeleteItem;