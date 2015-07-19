class IframesController < ApplicationController
  include ActionController::Helpers
  include ActionController::Cookies

  skip_before_action :verify_authenticity_token
  
  layout 'iframe'

  def iframe
    p '#'*80
    p 'parasmmmm'
    p "#{params.inspect}"
    @project = Project.find(params[:id])
    @bugs = @project.bugs
    @bug = @project.bugs.build
    render json: {
      html: render_to_string(action: 'iframe', :formats => [:html], locals: {project: @project, bugs: @bugs}, layout: false)
    }
  end

  def project_load_script
    # p '#'*80 
    # p 'request header'
    # p "#{request.referrer.inspect}"
    @project = Project.find(params[:id])
    js = @project.active ? "load_script.js.erb" : "period_expired.js.erb"
    # script = render_to_string(js) 

    # json = {"js" => script}.to_json
    # callback = params[:callback]
    # jsonp = callback + "(" + json + ")"
    # render :text => jsonp,  :content_type => "text/javascript"
    render :js => render_to_string(js)
  end

  def style
    css = File.read("public/mech-bug-tracker.css").to_s
    json = {"css" => css}.to_json
    callback = params[:callback]
    jsonp = callback + "(" + json + ")"
    render :text => jsonp,  :content_type => "text/javascript"
  end
end
