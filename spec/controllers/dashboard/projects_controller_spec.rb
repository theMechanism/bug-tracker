require 'spec_helper'

RSpec.describe Dashboard::ProjectsController, :type => :controller do

  before do |example|
    unless example.metadata[:skip_login]
      sign_in create(:admin)
    end
    unless example.metadata[:no_create]
      @project = create(:project)
    end
  end

  describe 'admin not signed in', :skip_login do 
    it 'redirects to admin login' do 
      get :index
      expect(response).to redirect_to(new_admin_session_path)
    end
  end

  describe 'GET index' do
    it 'renders index page' do
      get :index
      expect(response).to render_template("index")
      expect(response).to render_template(layout: 'dashboard')
    end
    it 'assigns @projects' do
      get :index
      expect(assigns(:projects)).to eq([@project])
    end
  end

  describe 'GET new' do
    it 'renders' do 

    end
  end

end











