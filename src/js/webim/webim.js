import api from '../../js/ajax';
import Vue from 'vue';
import WebIM from 'easemob-websdk';

export default{
    //      给环信服务器发送消息
    imgSendHX (that,ext, file, msg, tepId) {
        var self_ = that;
        var option = {
            apiUrl: self_.$webim.config.apiURL,
            file: file,
            to: self_.currentUser,                      // 接收消息对象
            ext: ext,
            roomType: false,
            chatType: 'singleChat',
            onFileUploadError: function () {      // 消息上传失败
                self_.loadingSrc = './src/assets/gantanhao.png'
            },
            onFileUploadComplete: function (a, b, c, d, e) {   // 消息上传成功
            },
            success: function (e, id) {                // 消息发送成功
                self_.loadingSrc = '';
                //                            消息发送成功，修改id
                for (var i = self_.msgList[self_.currentUser].length - 1; i >= 0; i--) {
                    if (self_.msgList[self_.currentUser][i].id == tepId) {
                        self_.msgList[self_.currentUser][i].template = false;
                        self_.msgList[self_.currentUser][i].id = id;
                    }
                }
            },
            flashUpload: self_.$webim.flashUpload
        };
        msg.set(option);
        self_.$im_conn.send(msg.body);
    },
    getWH (File, url, id, file, msg,that) {
    //        获取发送图片的宽高
        var _that = that;
        var self_ = this;
        var reader = new FileReader;
        reader.onload = function (evt) {
            var image = new Image();
            image.onload = function () {
                self_.savePic(self_.setExt(_that,'img', _that.width, _that.height, file, msg, id), this.width, this.height, url, id,_that)
            };
            image.src = evt.target.result;
        };
        reader.readAsDataURL(File.files[0]);
    },
    savePic (ext, width, height, url, id,that) {
    //保存图片消息
        var self_ = this;
        var message = {
            ext: ext,
            width: width,
            height: height,
            url: url,
            id: id,
            template: true,
            from: that.recevierUserId,
            to: that.currentUser
        }
        this.sessionListConduct(that,message);
        this.saveMsg(that,message);
    },
    sendImg (that) {
        // 发送图片
        var self_ = this;
        var _that = that;
        var sendPrivateImg = function () {
            var id = _that.$im_conn.getUniqueId();                   // 生成本地消息id
            var msg = new _that.$webim.message('img', id);        // 创建图片消息
            var input = document.querySelector('#images');  // 选择图片的input
            var file = _that.$webim.utils.getFileUrl(input);      // 将图片转化为二进制文件
            var allowType = {
                'jpg': true,
                'jpeg': true,
                'gif': true,
                'png': true,
                'bmp': true
            };
            if (file.filetype.toLowerCase() in allowType) {
                var tepId = Date.parse(new Date());
                self_.getWH(document.querySelector('#images'), file.url, tepId, file, msg, _that)
            }
        };
        sendPrivateImg();
    },
    goBottom(that) {
    //        滚动条自动滚到底部
        that.$nextTick(() => {
            var H = document.querySelector('.warp').scrollHeight;
            var warp = document.querySelector('.warp');
            warp.scrollTo(warp.scrollLeft, H);
        })
    },
    saveMsg(that,data) {
    //      将收到的消息存储起来
        //          拿到用户id
        if (data.to == that.recevierUserId) {//买家发送过来的消息
            var userId = data.from;
        } else {//其他端同步过来的消息
            var userId = data.to;
        }
        //         判断该用户是否存在
        if (!that.msgList[userId]) {//用户不存在
            that.msgList[userId] = [];
        }
        that.msgList[userId].push(data);
        //          保存消息后滚动条自动滚到底部
        // that.goBottom();
    },
    compare(arr, property) {
    //        对象数组按时间排序
        return arr.sort(function (a, b) {
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        }).reverse();
    },
    sessionListConduct(that,data) {
        var self = this;
        //收到消息 处理会话列表
        if (data.from == that.recevierUserId) {//其他端同步过来的消息
            var sessionId = data.to;
            var userName = data.ext.recevierUser.username;
            var headPic = data.ext.recevierUser.avatar;
        } else {//用户发送过来的消息
            var sessionId = data.from;
            var userName = data.ext.senderUser.username;
            var headPic = data.ext.senderUser.avatar;
        }
        //          判断列表中是否存在
        var unread = 1;
        var indexTem = null;
        that.sessionList.forEach(function (item, index) {
            if (item.sessionId == sessionId) {//会话列表已经存在这个用户
                unread = item.unread + 1;
                indexTem = index;
                return false;
            }
        })
        if (data.from == that.recevierUserId) {
            unread = 0;
        }
        var msg;
        if (data.ext.goods) {
            msg = '[商品链接]';
        } else {
            msg = data.data ? data.data : '[图片]';
        }
        let tempObj = {
            sessionId: sessionId,
            unread: unread,
            userName: userName,
            headPic: headPic,
            time: data.ext.time,
            msg: msg
        }
        if (indexTem == null) {//用户不存在
            that.sessionList.push(tempObj)
        } else {
            that.sessionList[indexTem].msg = tempObj.msg;
            that.sessionList[indexTem].unread = tempObj.unread;
            that.sessionList[indexTem].time = tempObj.time;
        }
        //按时间排列会话列表
        that.sessionList = self.compare(that.sessionList, 'time')
        self.goBottom(that);
    },
    sendMsg(that,val,text) {
        //      发送消息
        var self_ = this;
        var _that = that;
        var ext = self_.setExt(that,val);
        //            除去换行符
        if (that.textMsg.indexOf('\n') != -1) {
            that.textMsg = that.textMsg.replace('\n', '');
        }
        var sendPrivateText = function () {
            var id = _that.$im_conn.getUniqueId();                 // 生成本地消息id
            var msg = new _that.$webim.message('txt', id);      // 创建文本消息
            ext.id = id;
            msg.set({
                msg: _that.textMsg,                  // 消息内容
                to: _that.currentUser,                          // 接收消息对象（用户id）
                roomType: false,
                ext: ext,
                success: function (id, serverMsgId) {
                    //                            保存消息
                    var message = {
                        data: _that.textMsg,
                        from: _that.recevierUserId,
                        ext: ext,
                        id: serverMsgId,
                        to: _that.currentUser,
                        type: 'chat',
                    }
                    self_.sessionListConduct(_that, message);
                    that.currentMsgList.push(message);
                    _that.textMsg = '';
                },
                fail: function (e) {
                    console.log("Send private text error");

                }
            });
            msg.body.chatType = 'singleChat';
            _that.$im_conn.send(msg.body);
        }
        if (text=='text'){
            if (that.textMsg == '') {
                that.$message('文字不能为空')
                return 
            }else{
                sendPrivateText();
            }
        } else if (text == 'goods') {
            sendPrivateText();
        }       
    },
    setExt(that, type, width, height, file, msg, id){
        var self = this;
        /*设置消息体* */
        var senderUser = {
            avatar: that.storePic,
            userid: that.recevierUserId,
            username: that.nickname,
        }
        var recevierUser = {
            avatar: that.currentHeadPic,
            userid: that.currentUser,
            username: that.currentName,
        }
        if(typeof (type)=='object'){
            var goodObj = {
                prom: type.prom,
                prom_price: type.prom_price,
                original: type.original_img,
                original_img: type.original_img,
                goods_name: type.goods_name,
                goods_id: type.goods_id,
                goods_share_url: type.goods_share_url,
            }
            var ext = {//创建消息体
                recevierUser: recevierUser,
                senderUser: senderUser,
                time: parseInt(Date.parse(new Date()) / 1000),
                terminal: 's_w',
                goods: goodObj
            }
        } else {
            var ext = {//创建消息体
                recevierUser: recevierUser,
                senderUser: senderUser,
                time: parseInt(Date.parse(new Date()) / 1000),
                terminal: 's_w'
            }
            //图片加宽高
            if (type == 'img') {
                ext.imageSize = {
                    width: width,
                    height: height
                }
                //                消息体设置完成，给环信发送消息
                self.imgSendHX(that, ext, file, msg, id);
            }

        }
        return ext;
    },
    login_in(url,data,that){
        var self = this;
        /**  login */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
                var userData = result.user;
                that.recevierUserId = userData.username;
                that.nickname = userData.store_name;
            }
        })
    },
    orderChatStatus(url,that){
        var self = this;
        api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
                if(result.code==200){
                	var jsonData = result.data;
                	that.personalData = jsonData.personal;
                	that.storeData = jsonData.store;
                }
            }
        })
    },
    getStoreInfo(url,that){
        var self = this;
        /**  获取店铺信息  */
        api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
                if (result.code == '200') {
                    var jsonData = result.data;
                    that.storeName = jsonData.store_name;
                    that.storePassword = jsonData.store_password;
                    that.storePic = jsonData.store_logo;
                    that.nickname = jsonData.store_name;
                    that.storeId = jsonData.store_id;
                    var options = {
                        apiUrl: WebIM.config.apiURL,
                        user: 'store' + that.storeId,
                        pwd: that.storePassword,
                        // user: '13590440499',
                        // pwd: '123456jiang',1
                        appKey: WebIM.config.appkey,
                        success: function (token) {
                            var tokens = token.access_token;
                            that.recevierUserId = token.user.username;
                            var encryptUsername = 'store' + that.storeId;
                            WebIM.utils.setCookie('webim_' + encryptUsername, tokens, 1);
                            self.getList('Quickreply/getList', that);
                            self.chatInfo('Chat/getInfo', that);
                        },
                        error: function (xhr) {
                            console.log(xhr)
                        }
                    };
                    that.$im_conn.open(options);  
                }
            }
        })
    },    
    // Quickreply(url,data,that){
    //     /**  获取店铺信息  */
    //     api.commonAjax({
    //         method:"post",
    //         url:url,
    //         data:data,
    //         success:function(result){
    //             that.quickreply = result.result;
    //         }
    //     })
    // },
    chatInfo(url,that){
        /**  获取店铺信息  */
        api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
                if(result.code==200){
                    that.contactPeople = result.data;
                    that.sessionList = result.data;
                }else{
                    that.$message({
                        type:'info',
                        message:result.msg
                    })
                }
                // that.quickreply = result.result;
            }
        })
    },
    chatStatus(url,data,that){
        /**  获取店铺信息  */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
                if(result.code==200){
                }else{
                    that.$message({
                        type:'info',
                        message:result.msg
                    })
                }
                // that.quickreply = result.result;
            }
        })
    },
    chatStatusSearch(url,data,that){
        /**  获取店铺信息  */
       var self = this;
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
                if(result.code==200){
					if(result.data.chat_status==1){
						self.getStoreInfo('Chat/getStoreInfo',that);
						self.chatInfo('Chat/getInfo', that);
						var datas = {
							action:'edit',
							status:'2'
						}
						self.chatStatusSearch('store/chatStatus', datas,that);
					}
                }else{
                    that.$message({
                        type:'info',
                        message:result.msg
                    })
                }
                // that.quickreply = result.result;
            }
        })
    },
    getHistoryChat(url,data,that){
        /** chatQuery 获取聊天信息 拉取历史聊天记录 getHistoryChat */
        var self = this;
        let time = '';
        if (that.currentMsgList.length > 0) {
            time = that.currentMsgList[0].ext.time;
        }
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
                // that.currentMsgList = result.list;
                var result = result.data;
                if (result.pageNum){
                    //            记录当前盒子的高度
                    // self_.msgBoxHeight = document.querySelector('.chatMsgBox').scrollHeight;
                    that.msgList[that.currentUser] = result.list.concat(that.currentMsgList);
                    that.currentMsgList = that.msgList[that.currentUser];
                    that.pageNum = result.pageNum;
                    that.timestamp = result.list[0].ext.time;
                    self.goBottom(that)
                }
            }
        })
    },
    orderStoreQuery(url,data,that){
        /**  店铺订单 获取订单列表  */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
                if(result.code==200){
                    var jsonData = result.data;
                    that.orderStoreData = jsonData.data;
                    that.totalpage_store = jsonData.total_page;
                    that.currentpage_store = jsonData.current_page;
                }
            }
        }) 
    },
    goodsList(url,data,that,type){
        /**  获取订单列表 推荐   */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
                    that.recommendationData = jsonData.data;
                    that.totalpage_commond = jsonData.total_page;
                    that.currentpage_commond = jsonData.current_page;
                }else{
                    that.$message({
                        type: 'success',
                        message: result.msg
                    })
                }
            }
        }) 
    },
    orderData(url,data,that){
        /**  个人订单  状态获取商品列表  */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
                if(result.code==200){
                    var jsonData = result.data;
                    that.orderItem = jsonData.data;
                    that.totalpage_people = jsonData.total;
                    that.currentpage_people = jsonData.current_page;
                }else{
                    that.orderItem = [];
                    that.$message({
                        type: 'success',
                        message: result.msg
                    })
                }
            }
        })
    },
    addReplyData(url,data,that,type){
        var self = this;
        /** 添加编辑 快捷回复  */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
                var contentVal = data.content;
                if(result.code==200){
                    if (type == "edit") {
                        var idVal = data.id;
                        that.quickreply[that.keys].content = that.textareas;
                        that.dialogVisibleEdit = false; 
                    }else if(type=="add"){           
                        that.quickreply.unshift({id:'',content:contentVal});
                        that.dialogVisible = false;
                    }
                    that.$message({
                        type:'success',
                        message:result.msg
                    })
                }else{
                    that.$message(result.msg)
                }
            }
        })
    },
    deleteReplyData(url,data,that,count){
        /**  删除 快捷回复  */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
                if(result.code==200){
                    that.quickreply.splice(count,1);
                    that.$message({
                        type:'success',
                        message:result.msg
                    })
                }else{
                    that.$message(result.msg)
                }
            }
        })
    },
    getLogistics(url, data, that){
        /**  获取物流信息  */        
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if(result.code==200){
                    var logistics = result.result.logistics;
                    if (logistics.shipping_order==null){
                        that.$message("没有找到物流单号")
                    }else{
                        that.logisticsInfo.logistics_name = logistics.logistics_name;
                        that.logisticsInfo.logistics_mobile = logistics.logistics_mobile;
                        that.logisticsInfo.shipping_order = logistics.shipping_order;
                        that.dialogVisibleLogistics = true;
                    }
                }
            }
        })
    },
    getList(url, that) {
        /**  获取物流信息  */
        api.commonAjax({
            method: "post",
            url: url,
            success: function (result) {
                if(result.code==200){
                    that.quickreply = result.data;
                }
            }
        })
    },
    addContent(url, data, that, type) {
        /**  获取物流信息  */
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
            success: function (result) {
                if (result.code == 200) {
                    var contentVal = data.content;
                    if (type == "edit") {
                        that.quickreply[that.keys].content = that.textareas;
                        that.dialogVisibleEdit = false;
                    } else if (type == "add") {
                        var idVal = result.data.id;
                        that.quickreply.unshift({ id: idVal, content: contentVal });
                        that.dialogVisible = false;
                    }
                    that.$message({
                        type: 'success',
                        message: result.msg
                    })
                }else{
                    that.$message({
                        type:'info',
                        message:result.msg
                    })
                }
            }
        })
    }
}