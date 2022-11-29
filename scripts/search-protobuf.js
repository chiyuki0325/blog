/* global hexo */
'use strict';

var pathFn = require('path');
var protobuf = require('protobufjs');

hexo.extend.generator.register('protobuf', async function (locals) {
  var posts = locals.posts.sort('-date');

  var res = new Array();
  var index = 0;
  var data;

  var root = protobuf.Root.fromJSON({
    "nested": {
      "Results": {
        "fields": {
          "posts": {
            "rule": "repeated",
            "type": "Post",
            "id": 1
          }
        },
        "nested": {
          "Post": {
            "fields": {
              "title": {
                "rule": "required",
                "type": "string",
                "id": 2
              },
              "url": {
                "rule": "required",
                "type": "string",
                "id": 3
              },
              "content": {
                "rule": "required",
                "type": "string",
                "id": 4
              },
              "tags": {
                "rule": "repeated",
                "type": "string",
                "id": 5
              },
              "categories": {
                "rule": "repeated",
                "type": "string",
                "id": 6
              }
            }
          }
        }
      }
    }
  })

  var Results = root.lookupType('Results');
  var Post = root.lookupType('Post');

  posts.each(function (post) {
    if (post.indexing != undefined && !post.indexing) return;
    var temp_post = new Object()
    if (post.title) {
      temp_post.title = post.title
    }
    if (post.path) {
      temp_post.url = '/' + post.path
    }
    if (post._content) {
      temp_post.content = post._content
    }
    if (post.tags && post.tags.length > 0) {
      var tags = [];
      post.tags.forEach(function (tag) {
        tags.push(tag.name);
      });
      temp_post.tags = tags
    }
    if (post.categories && post.categories.length > 0) {
      var categories = [];
      post.categories.forEach(function (cate) {
        categories.push(cate.name);
      });
      temp_post.categories = categories
    }
    res[index] = Post.create(temp_post);
    index += 1;
  });

  var results = Results.create({ 'posts': res });

  return {
    path: 'search.protobuf',
    data: Results.encode(results).finish()
  };
});
