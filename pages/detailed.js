import React, { useState } from "react";
import Head from "next/head";
import {Row, Col ,Affix, Icon ,Breadcrumb  } from 'antd'
import ReactMarkdown from 'react-markdown'
import Header from "../components/Header";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import "../static/style/pages/detailed.css";
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import axios from "axios"

let markdown='# P01:课程介绍和环境搭建\n' +
  '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
  '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
   '**这是加粗的文字**\n\n' +
  '>>> cccccccccc\n\n'+
  '# p06:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p07:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '``` var a=11; ```'
const Detailed = (data) => {
  console.log(data)
  
  return (  
  <>
    <Head>
    <title>博客详细页</title>
    </Head>
    <Header />
    <Row className="comm-main" type="flex" justify="center">
      <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
        <div>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/">首页</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>视频列表</Breadcrumb.Item>
              <Breadcrumb.Item>xxxx</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div>
            <div className="detailed-title">
              {data.introduce}
            </div>

            <div className="list-icon center">
              <span>
                <Icon type="calendar" /> 
              </span>
              <span>
                <Icon type="folder" /> {data.type}
              </span>
              <span>
                <Icon type="fire" /> {data.view_count}
              </span>
            </div>

            <div className="detailed-content" >
                <ReactMarkdown 
                  source={data.article_content} 
                  escapeHtml={false}  
                />
            </div>
          </div>
        </div>
      </Col>

      <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
        <Author />
        <Advert />
        <Affix offsetTop={5}>
          <div className="detailed-nav comm-box">
            <div className="nav-title">文章目录</div>
            <MarkNav
              className="article-menu"
              source={markdown}
              ordered={false}
            />
        </div>
      </Affix>
      </Col>
    </Row>
    <Footer />
  </>
  );
};

Detailed.getInitialProps = async(context)=>{
  
  console.log(context.query.id)
  let id =context.query.id
  const promise = new Promise((resolve)=>{
    axios('http://127.0.0.1:7001/default/getArticleById/'+id).then(
      (res)=>{
        resolve(res.data.data[0])
      }
    )
  })

  return await promise
}

export default Detailed;
