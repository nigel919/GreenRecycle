// page/user/balance/balance.js
const util = require('../../../../util/util.js')
var idinfolist = [
    { "code": "结果", "text": '' },
    { "code": "省", "text": '' },
    { "code": "市", "text": '' },
    { "code": "县", "text": ''},
    { "code": "性别", "text": ''},
    { "code": "出生年月", "text": ''},
    { "code": "地址", "text": ''}
   ]
Page({

    /**
     * 页面的初始数据
     */
    data: {
        listData: idinfolist,  
        inputValue: '', //用于显示输入语句
        searchinput: '', //用户输入的查询语
        cashrecord:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getCashRecord('testid987')
        //this.addCashRecord()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    addCashRecord(){
      
      wx.cloud.init({
        env: 'cloud1-7go51v8te374de35',
      })
      const db = wx.cloud.database()
      const _ = db.command
      db.collection('record_getcash')
      .add({
        data:{
          cash:190,
          date:util.formatDateTime(new Date()),
          role:3,
          wechatid:'testid987'
        },
        success: function(res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res)
        },
        fail: console.error,
        complete: console.log
      })
    },
    getCashRecord(wechatid){
      var _this = this
        console.log('wechatid:',wechatid)
        wx.cloud.init({
            env: 'cloud1-7go51v8te374de35',
          })
          const db = wx.cloud.database()
          const _ = db.command
          db.collection('record_getcash')
          .where({
             wechatid: wechatid
          })
          .field({
            _id:0,
            date:1,
            cash:1
          })
          .get({
            success: function(res) {
                console.log(res.data)
                _this.setData({
                  cashrecord:res.data
                })
              },
              fail:function(err){
                console.log(err)
              }
            })
    }
})