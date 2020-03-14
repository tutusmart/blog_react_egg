import React, { useState, useEffect } from 'react'
import { List, Row, Col, Modal, Button ,Card, Input, Spin, message} from 'antd';

import 'antd/dist/antd.css';
import '../static/css/Login.css';
import servicePath from '../config/apiUrl'
import axios from 'axios'

function AddType(props) {
    const [visible, setvisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [typeName, setTypeName] = useState('')  //markdown的编辑内容
    const [list, setList] = useState([])
    useEffect(() => {
        getTypeInfo();
    }, [])

    const updateType = () =>{

    }

    const delType = ()=>{

    }

    const handleOk = ()=>{
        axios({
            method: 'post',
            url: servicePath.addType,
            data:{
                typeName : typeName,
                icon:"default"
            },
            header: { 'Access-Control-Allow-Origin': '*' },
            withCredentials: true
        }).then(res => {
            setvisible(false);
            getTypeInfo();
        })
    }

    const handleCancel = ()=>{
        setvisible(false);
    }

    const showModel = ()=>{
        setvisible(true);
    }
    const changeTypeName = (e)=>{
        setTypeName(e.target.value);
    }

    //从中台得到文章类别信息
    const getTypeInfo = () => {
        axios({
            method: 'get',
            url: servicePath.getTypeInfo,
            header: { 'Access-Control-Allow-Origin': '*' },
            withCredentials: true
        }).then(res => {
            if (res.data.data === "没有登录") {
                localStorage.removeItem('openId')
                props.history.push('/')
            } else {
                setList(res.data.data);
            }
        })
    }

    return (
        <div>
             <Row gutter={18}>
                <Col span={18} style={{padding:"10px"}}>
                    <Button size="large" onClick={()=>{showModel()}}>添加类别</Button>
                </Col>
                <Modal
                    title="添加类别"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    >
                    <p><Input value={typeName} onChange={changeTypeName} placeholder="输入类别" /></p>
                </Modal>
            </Row>
            <List
                header={
                    <Row className="list-div">
                        <Col span={8}>
                            <b>类别</b>
                        </Col>
                        <Col span={4}>
                            <b>修改时间</b>
                        </Col>
                        <Col span={4}>
                            <b>操作</b>
                        </Col>
                    </Row>
                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={8}>
                                {item.typeName}
                            </Col>
                            <Col span={4}>
                                {item.addTime}
                            </Col>
                           

                            <Col span={4}>
                                <Button type="primary" onClick={()=>{updateType(item.id)}}>修改</Button>&nbsp;
                                <Button onClick={() => { delType(item.id) }} > 删除 </Button>
                            </Col>
                        </Row>

                    </List.Item>
                )}
            />

        </div>
    )
}


export default AddType
