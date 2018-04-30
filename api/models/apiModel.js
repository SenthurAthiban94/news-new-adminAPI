'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TopSites = new Schema({
  title: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  description: {
    type: String,
    default:""
  },
  traffic:{
      type: Number,
      default:0
  },
  contentLink:{
        type: String
  },
  contentImageUrl:{
      type:String
  },
  dateTracked:{
      type:Date
  },
  created_date: {
    type: Date,
    default: Date.now
  }
//   status: {
//     type: [{
//       type: String,
//       enum: ['pending', 'ongoing', 'completed']
//     }],
//     default: ['pending']
//   }
});

module.exports = mongoose.model('SitesList', TopSites);