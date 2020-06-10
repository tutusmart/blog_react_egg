import '../static/style/pages/index.css'
import React, { useState } from 'react'
import { Row, Col, List, Icon ,Pagination} from 'antd'
import axios from 'axios'
import Head from 'next/head'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import Link from 'next/link'
import servicePath from '../config/apiUrl'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

const pageSize = 10;
const Home = (data) => {

  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize: false,
    xhtml: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });
  const onChange =  (e) => {
    axios(servicePath.getArticleList + "?pageSize="+ pageSize + "&current=" + e).then(
      (res) => {
        setMylist(res.data.data.list);
        setTotal(res.data.data.total);
      }
    )
  }
  //---------主要代码-------------start
  const [mylist, setMylist] = useState(data.list);
  // const [current, setCurrent] = useState(data.current);
  const [total, setTotal] = useState(data.total);

  console.log(total);
  
  //---------主要代码-------------end
  return (
    <>
      <Head>
        <title>首页</title>
        <link rel="icon" href="../static/bitbug_favicon.ico" type="image/x-icon"></link>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>

            <List
              header={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>

                  <div className="list-title">
                    <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span><Icon type="calendar" /> {item.addTime}</span>
                    <span><Icon type="folder" /> {item.typeName}</span>
                    <span><Icon type="fire" /> {item.view_count}人</span>
                  </div>
                  <div className="list-context" dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}></div>
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

Home.getInitialProps = async (c) => {
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleList + "?pageSize="+ pageSize + "&current=" + 1).then(
      (res) => {
        resolve(res.data.data) 
      }
    )
  })
  return await promise
}


export default Home
