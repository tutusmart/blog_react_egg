import {Avatar,Divider} from 'antd'
import '../static/style/components/author.css'

const Author =()=>{

    return (
        <div className="author-div comm-box">
            <div> <Avatar size={100} src="https://i2.hdslb.com/bfs/archive/4adbdb6043f054d904237fc5e1f391daade39a29.jpg@336w_190h.webp"  /></div>
            <div className="author-introduction">
                sdhfs的哥代购的价格的哥规格结核杆菌阖家团聚航天局然后他就让他
                <Divider>社交账号</Divider>
                <Avatar size={28} icon="github" className="account"  />
                <Avatar size={28} icon="qq"  className="account" />
                <Avatar size={28} icon="wechat"  className="account"  />

            </div>
        </div>
    )

}

export default Author