/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';


var User = require('../api/user/user.model');
var Post = require('../api/user/post.model');


User.find({}).remove(function() {

  User.create({
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  });

  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  },function(err, user){

    Post.find({}).remove(function(){
      Post.create({
        _user: user._id,
        text: 'first post',
        link: 'www.google.com'
      }, {
        _user: user._id,
        text: 'second post',
        link: 'www.facebook.com'
      }, function() {
        console.log('finished populating post');

      });

    });
  });
});
