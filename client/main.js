import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../lib/collections.js';
Template.mainbody.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.mainbody.helpers({
	myJumbo(){
		return userDB.find({});
	}
});

Template.mainbody.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});
Template.mainbody.events({
  'click .js-like'(event, instance) {
   console.log("You clicked like");
   var profID = this._id;
   var numlikes = userDB.findOne({_id: profID}).like;
   if (!numlikes) {
   	numlikes = 0;
   }
   numlikes = numlikes + 1;
  	console.log("You have",numlikes);
  	userDB.update({_id:profID}, {$set:{'like':numlikes}});
  },
  'click .js-dislike'(event, instance){
  	//alert("Clicked dislike");
  	console.log("You clicked dislike");
  	var profID = this._id;
		   var numdislike = userDB.findOne({_id: profID}).dislike;
		   if (!numdislike) {
		   	numdislike = 0;
		   }
		   numdislike = numdislike + 1;
		  	console.log("You have",numdislike);
		  	userDB.update({_id:profID}, {$set:{'dislike':numdislike}});
  },
  });

