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
	
	private
		def bug_params
				params.require(:bug).permit(:project_id, :name, :url, :browser, :status,
					:params, :width, :height, :description, :os, :ua,
					:browser_version)
		end

end
