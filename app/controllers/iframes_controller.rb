class IframesController < ApplicationController
  include ActionController::Helpers
  include ActionController::Cookies

  skip_before_action :verify_authenticity_token
  
  layout 'iframe'

  def iframe
    @project = Project.find(params[:id])
  end

  def project_load_script
    @project = Project.find(params[:id])
    js = @project.active ? "form.js.erb" : "period_expired.js.erb"
    script = render_to_string(js) 

    json = {"js" => script}.to_json
    callback = params[:callback]
    jsonp = callback + "(" + json + ")"
    render :text => jsonp,  :content_type => "text/javascript"
  end
  def style
    css = File.read("public/mech-bug-tracker.css").to_s
    json = {"css" => css}.to_json
    callback = params[:callback]
    jsonp = callback + "(" + json + ")"
    render :text => jsonp,  :content_type => "text/javascript"
  end
end
