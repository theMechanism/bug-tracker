class IframesController < ApplicationController
  include ActionController::Helpers
  include ActionController::Cookies

  skip_before_action :verify_authenticity_token
  
  layout 'iframe'

  def iframe
    p '#'*80
    p 'checkout request url'
    p "#{request.url.inspect}"
    p 'checkout request host from deployed domain'
    p "#{request.host.inspect}"
    
    @project = Project.find_by(dev_server_url: request.host)
    @bugs = @project.bugs
    respond_to do |format|
        format.html
        format.json { render json: @project }
    end
  end

  def project_load_script
    # p '#'*80 
    # p 'request header'
    # p "#{request.referrer.inspect}"
    @project = Project.find(params[:id])
    js = @project.active ? "load_script.js.erb" : "period_expired.js.erb"
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
