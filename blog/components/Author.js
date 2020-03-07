import {Avatar,Divider} from 'antd'
import '../static/style/components/author.css'

const Author =()=>{
    return (
        <div className="author-div comm-box">
            <div> <Avatar size={100} src="https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1776348617,1397701647&fm=179&w=121&h=140&img.JPEG"  /></div>
            <div className="author-introduction">
                此地维权无门，此时无能为力，此心随波逐流。
                <Divider>社交账号</Divider>
                <Avatar size={28} icon="github" className="account"  />
                <Avatar size={28} icon="qq"  className="account" />
                <Avatar size={28} icon="wechat"  className="account"  />
            </div>
        </div>
    )
}

export default Author
