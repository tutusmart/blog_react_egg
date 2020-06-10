import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Row, Col, List, Icon, Breadcrumb ,Pagination} from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/comm.css'

import '../static/style/pages/list.css'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import Link from 'next/link'
const pageSize = 10;
const MyList = (data) => {
  const [mylist, setMylist] = useState(data.list);
  const [total, setTotal] = useState(data.total);
  /** 触发视图刷新方法 不可注视 */
  useEffect(() => {
    setMylist(data.list);
    console.log(data.total);
    
    setTotal(data.total);
  })
  const onChange =  (e) => {
    console.log(data.url.query.id);
    axios(servicePath.getArticleList + data.url.query.id + "?pageSize="+ pageSize + "&current=" + e).then(
      (res) => {
        console.log(res);
        setMylist(res.data.data.list);
        setTotal(res.data.data.total);
      }
    )
  }
 
  

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>视频列表</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <List
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={(item,key) => (
                <List.Item key={key}>
                  <div className="list-title">
                    <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span><Icon type="calendar" />{item.addTime}</span>
                    <span><Icon type="folder" /> {item.typeName}</span>
                    <span><Icon type="fire" />  {item.view_count}人</span>
                  </div>
                  <div className="list-context">{item.introduce}</div>
                </List.Item>
              )}
            />
            
          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Row className="tw-mrt30" type="flex" justify="center">
        <Pagination onChange={onChange} total={total} pageSize={pageSize}/>
      </Row>
      <Footer />

    </>
  )

}


MyList.getInitialProps = async (context) => {
  let id = context.query.id
  console.log(id);
  const promise = new Promise((resolve) => {
    axios(servicePath.getListById + id + "?pageSize="+ pageSize + "&current=" + 1).then(
      (res) => {
        resolve(res.data.data) 
      }
    )
  })
  return await promise
}

export default MyList
