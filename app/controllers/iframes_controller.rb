class IframesController < ApplicationController
  include ActionController::Helpers
  include ActionController::Cookies

  skip_before_action :verify_authenticity_token
  
  layout 'iframe'

  def iframe
    # p '#'*80
    # p 'params'
    # p "#{params.inspect}"
    # p '#'*80
    # p 'request'
    # p "#{request.inspect}"
    @project = Project.find_by(dev_server_url: request.host)
    @bugs = @project.bugs
    render layout: false
    # render layout: false
    # respond_to do |format|
    #     format.html
    #     format.json { render json: @project }
    # end
    # render json: {
    #   content: render_to_string(partial: '/iframes/iframe.html.erb', :formats => [:html], locals: {project: @project, bugs: @bugs})
    # }
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
