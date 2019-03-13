var mongoose = require('mongoose')
mongoose.Promise = global.Promise;
// 连接数据库
mongoose.connect('mongodb://localhost/test', { useMongoClient: true })

var Schema = mongoose.Schema
function nowtime(){
  var date = new Date
  var cha = date.getTimezoneOffset()
  var m = date.getTime()
  date=date.setTime(m-cha*60000)
  return date
}
var stockSchema = new Schema({
  labnickname:{
    type: String,
    required: true
  },
  kind: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: false,
    default:99999
  },
  created_time: {
    type: Date,
    // 注意：这里不要写 Date.now() 因为会即刻调用
    // 这里直接给了一个方法：Date.now
    // 当你去 new Model 的时候，如果你没有传递 create_time ，则 mongoose 就会调用 default 指定的Date.now 方法，使用其返回值作为默认值
    default: nowtime()
  },
  last_modified_time: {
    type: Date,
    default: nowtime()
  }
})

module.exports = mongoose.model('Stock', stockSchema)