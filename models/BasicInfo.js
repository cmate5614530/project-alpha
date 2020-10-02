const mongoose = require('mongoose');

const BasicInfo = mongoose.Schema({
  site: { type: String, require: true },
  email: { type: String, require: true },
  email1: { type: String, require: true },
  phone: { type: String, require: true },
  officeHours: { type: String, require: true },
  address: { type: String, require: true },
  address1: { type: String, require: true },
  siteText:{ type: String},
  siteDesc:{ type: String},
  siteImg:{ type: String},
  contactText:{ type: String},
  contactDesc:{ type: String},
  quoteText: { type: String},
  quoteLink: { type: String},
  whatsapp: {type: String},
  updated: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('BasicInfo', BasicInfo);
