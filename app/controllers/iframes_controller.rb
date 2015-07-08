class IframesController < ApplicationController
  include ActionController::Helpers
  include ActionController::Cookies

  skip_before_action :verify_authenticity_token
  
  layout 'iframe'

  def iframe
    @project = Project.find(params[:id])
  end
end
