var UserAjaxFeedback = function(){
  this.feedbackShowing = true;
  this.colorTypes = {
    'success': 'alert-success',
    'failure': 'alert-danger'
  }
  this.currentColorType = '';
  this.$el = $('.alert');
  this.$heading = $('.alertContent strong');
  this.$content = $('.alertContent span');
}

UserAjaxFeedback.prototype = {
  init: function(){
    var self = this;
    self.toggleShow();
    $(document).on('ajax:success', function(e, data, status, xhr) {
      self.handleSuccess(JSON.parse(xhr.responseText));
    });
  },
  handleSuccess: function(rsp){
    var self = this;
    var colorType, headingText, contentText;
    console.log(rsp.errors);
    if (rsp.errors){
      self.currentColorType = self.colorTypes['failure'];
      headingText = 'Oops! ';
      contentText = rsp.errors.join(', ');
    } else {
      self.currentColorType = self.colorTypes['success'];
      headingText = 'Successfully updated';
    }

    this.$heading.text(headingText);
    this.$heading.after(contentText);

    this.$el.addClass(self.currentColorType);
    this.toggleShow();
  },
  toggleShow: function(){
    this.feedbackShowing = !this.feedbackShowing;
    if (this.feedbackShowing){
      this.$el.show();
      this.setFadeTimer();
      this.feedbackShowing = false;
    } else {
      this.$el.hide();
    }
  },
  setFadeTimer: function(){
    var self = this;
    console.log(self.currentColorType);
    this.$el.fadeOut(2500, function(){
      self.clearOldAlert();
    });
  },
  clearOldAlert: function(){
    this.$el.removeClass(self.currentColorType);
    this.$heading.text('');
    this.$content.text('');
  }
}