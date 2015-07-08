class BugsController < ApplicationController
	include ActionController::Helpers
  	include ActionController::Cookies

	# before_filter :authenticate_user!, :except => [:show, :index, :create, :new]
	skip_before_action :verify_authenticity_token

	def index

	end

	def show
		@bug = Bug.find(params[:id])
	end

	def create
		@bug = Bug.new(bug_params)
		if @bug.save
			render json: @bug
			# redirect_to @bug, location: @bug, callback: params[:callback]
			 # BugMailer.submit_email(@bug).deliver
		else
			render json: @bug.errors.full_messages
		end
	end
	def form
		p '#'*80
		p 'in bugs controller'
		p "#{params.inspect}"
		# mech-bug-tracker.js
		# html = File.read("public/mech-bug-tracker.html").to_s
		@project = Project.find(params[:id])
		p '#'*80
		p 'project?'
		p "#{@project.inspect}"
		js = render_to_string("form.js.erb") #File.read("public/mech-bug-tracker.js").to_s

		json = {"js" => js}.to_json
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
				params.require(:bug).permit(:project_id, :name, :url, :browser, :status,
					:params, :width, :height, :description, :os, :ua,
					:browser_version)
		end

end
