class BugsController < ApplicationController
	include ActionController::Helpers
  	include ActionController::Cookies
	
	# before_filter :authenticate_user!, :except => [:show, :index, :create, :new]  
	skip_before_action :verify_authenticity_token


	def create
		@bug = Bug.new(bug_params)
		if @bug.save
			render json: @bug, status: :created, location: @bug, callback: params[:callback] 
		else
			render json: @bug.errors, status: :unprocessable_entity, callback: params[:callback]
		end
	end
	def form
		html = File.read("public/mech-bug-tracker.html").to_s
		json = {"html" => html}.to_json
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
	private
		def bug_params
				params.require(:bug).permit(:project_id, :url, :browser, :status, 
					:params, :width, :height, :description, :os, :ua, 
					:browser_version)
		end

end
