/*
* @Author: buyi
* @Date:   2016-07-12 10:09:36
* @Last Modified by:   buyi
* @Last Modified time: 2016-07-12 10:50:04
*/

'use strict';

var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');

// 建立 express 实例
var app = express();

app.get('/', function (req, res) {
   // 用 superagent 去抓取 https://cnodejs.org/ 的内容
  superagent.get('https://cnodejs.org/')
    .end(function (err, sres) {
      // 常规的错误处理
      if (err) {
        return next(err);
      }
      // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
      // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
      // 剩下就都是 jquery 的内容了
      var $ = cheerio.load(sres.text);
      var items = [];
      var user;
      $('#topic_list .topic_title').each(function (idx, element) {

      	//有两个class的情况 .XXX.YYY
        $('#topic_list .user_avatar.pull-left img').each(function (idx, element) {
        		// res.send("test2");
        	   var $element = $(element);
        	   user = $element.attr('title');
        	   // res.send($element.attr('href'));
        });

        var $element = $(element);
        items.push({
          title: $element.attr('title'),
          href: $element.attr('href'),
          user: user
        });
      });


	
      res.send(items);
    });
});

app.listen(3000, function (req, res) {
  console.log('app is running at port 3000');
});
