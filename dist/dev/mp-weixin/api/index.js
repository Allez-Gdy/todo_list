"use strict";
var utils_request = require("../utils/request.js");
let request = new utils_request.Request().http;
var api = {
  judgeCode: function(data) {
    return request({
      url: "/email/judgecode",
      method: "POST",
      data
    });
  },
  getemailcode: function(data) {
    console.log(data);
    return request({
      url: "/email/getemailcode",
      method: "GET",
      data
    });
  },
  register: function(data) {
    return request({
      url: "/user/register",
      method: "POST",
      data
    });
  },
  login: function(data) {
    return request({
      url: "/user/login",
      method: "POST",
      data
    });
  },
  findAll: function(data) {
    return request({
      url: "/matter/all",
      method: "POST",
      data
    });
  },
  findNoFinish: function(data) {
    return request({
      url: "/matter/allnofinish",
      method: "POST",
      data
    });
  },
  findFinish: function(data) {
    return request({
      url: "/matter/allfinish",
      method: "POST",
      data
    });
  },
  findSort: function(data) {
    return request({
      url: "/matter/allsort",
      method: "POST",
      data
    });
  },
  findSubtodo: function(data) {
    return request({
      url: "/matter/getsubtodo",
      method: "POST",
      data
    });
  },
  addTodo: function(data) {
    return request({
      url: "/matter/add",
      method: "POST",
      data
    });
  },
  updateTodo: function(data) {
    return request({
      url: "/matter/updatetodo",
      method: "POST",
      data,
      Headers: {
        "Content-Type": "application/json"
      }
    });
  },
  insterSubtodo: function(data) {
    return request({
      url: "/matter/insterSubtodo",
      method: "POST",
      data
    });
  },
  deleteSubTodo: function(data) {
    return request({
      url: "/matter/deletesubtodo",
      method: "GET",
      data
    });
  },
  updataTodoStatus: function(data) {
    return request({
      url: "/matter/updataTodoStatus",
      method: "POST",
      data
    });
  },
  updataSubTodoStatus: function(data) {
    return request({
      url: "/matter/updateSubTodoStatus",
      method: "POST",
      data
    });
  }
};
exports.api = api;
