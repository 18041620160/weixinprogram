// pages/detail/detail.js
let datas = require('../../datas/list-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
     detailObj:{},
     index:null,
     isCollection:false, 
     isShare:false,
     isMusic:false
  },
  handleCollection(){
     let isCollection=!this.data.isCollection;
     this.setData({
       isCollection
     })
     let title=isCollection?'收藏成功':'取消收藏';
     wx.showToast({
       title,
       icon:'success'
     })
     wx.getStorage({
       key: 'isCollection',
       success(res){
         console.log(res)
         let {index}=this.data;
         let obj = res.data;
         console.log(obj,typeof obj)
         obj[index]=isCollection;
         wx.setStorage({
           key: 'isCollection',
           data:obj
         })
       

       },
     })
  },
  
  handleMusic(){
    let {isMusic}=this.data
    console.log(isMusic)
    this.setData({
      isMusic:!isMusic
    })
    console.log(this.data.isMusic)
    let index=this.data.index
     isMusic=this.data.isMusic
    console.log(datas.list_data[index],index)
    if(isMusic){
      console.log(isMusic)
      let { dataUrl, title } = datas.list_data[index].music
      console.log(title,dataUrl)
      wx.playBackgroundAudio({
        dataUrl,
        title
      })
    }
     else{
       console.log('暂停')
      wx.pauseBackgroundAudio()
     }

  },
  handleShare(){
    wx.showActionSheet({
      itemList:['分享到朋友圈','分享到qq空间','分享到微博']
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log(datas)
     console.log(options)
     let index=options.index;
     this.setData({
       detailObj:datas.list_data[index],
       index
     
     })
     console.log(this.data.index)
     console.log(this.data.detailObj)
     let detailStorge=wx.getStorageSync('isCollection');
     if(!detailStorge){
       wx.setStorageSync('isCollection',{})
     }
      
     this.setData({
       isCollection:detailStorge[index]
     })
     
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})