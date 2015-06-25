var UserAjaxFeedback = function(){
  // page loads with alert element loaded, thus feedback showing is true -- in init() -- we toggleShow and remove and flip the boolean
  this.feedbackShowing = true;

  // callbacks defined in dashboard/userAjaxCallbacksRegistry.js
  this.callbacks = userAjaxCallbacks;
  
  this.colorTypes = {
    'success': 'alert-success',
    'failure': 'alert-danger'
  }
  this.currentColorType = '';
  this.$el = $('.alert');
  this.$heading = $('.alertContent strong');
  this.$content = $('.alertContent span');
  this.init();
}

UserAjaxFeedback.prototype = {
  init: function(){
    var self = this;
    if (self.feedbackShowing){
      self.toggleShow();     
    }

    $(document).on('ajax:success', function(e, data, status, xhr) {
      self.handleSuccess(JSON.parse(xhr.responseText));
    });
    return true;
  },
  pageReload: function(){
    this.assignEls();
    this.toggleShow(); 
  },
  assignEls: function(){
    console.log('reassigning elements');
    this.$el = $('.alert');
    this.$heading = $('.alertContent strong');
    this.$content = $('.alertContent span');
  },
  handleSuccess: function(rsp){
    // console.log(rsp);
    var self = this;

    if (rsp.callback){
      self.handleCallback(rsp);
    }
    var colorType, headingText, contentText;
    if (rsp.errors){
      console.log(rsp.errors);
      self.currentColorType = self.colorTypes['failure'];
      headingText = 'Oops! ';
      contentText = rsp.errors.join(', ');
    } else {
      self.currentColorType = self.colorTypes['success'];
      headingText = 'Successfully updated';
    }

    this.$heading.text(headingText);
    this.$content.text(contentText);

    this.$el.addClass(self.currentColorType);
    this.toggleShow();
  },
  toggleShow: function(){
    console.log('in toggleShow - is showing? ');
    var show = this.feedbackShowing;
    console.log(show);
    
    this.feedbackShowing = !this.feedbackShowing;
    if (this.feedbackShowing){
      console.log('toggled -- should see something');
      this.$el.show();
      this.setFadeTimer();
      this.feedbackShowing = false;
    } else {
      console.log('hiding, and reporting status of feedbackShowing');
      console.log(this.feedbackShowing);
      this.$el.hide();
    }
  },
  setFadeTimer: function(){
    var self = this;
    this.$el.fadeOut(2500, function(){
      self.clearOldAlert();
    });
  },
  clearOldAlert: function(){
    var self = this;
    this.$el.removeClass(self.currentColorType);
    this.$heading.text('');
    this.$content.text('');
  },
  handleCallback: function(rsp){
    console.log(rsp);
    var parseMe = rsp.callback.split('.');
    var page = parseMe[0], callback = parseMe[1];
    this.callbacks[page][callback]( rsp.html ? rsp.html : '');
  }
}