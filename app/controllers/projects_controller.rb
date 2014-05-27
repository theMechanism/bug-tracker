class ProjectsController < ApplicationController
	before_filter :authenticate_user!, 
              :only => [:show]
	def index
	end
	def show
	end
	def new
	end
	def create
	end
	def edit
	end
	def update
	end
end
