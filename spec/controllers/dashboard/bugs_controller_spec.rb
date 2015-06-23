require 'spec_helper'

RSpec.describe Dashboard::BugsController, :type => :controller do

  before do |example|
    unless example.metadata[:skip_login]
      sign_in create(:admin)
    end
    if example.metadata[:create]
      @bug = create(:bug)
    end
  end

  describe "without current_admin", :skip_login do 
    it 'redirects away from controller actions' do
      get :index
      expect(response).to redirect_to(new_admin_session_path)
    end
  end

  describe 'GET new' do 
    it 'renders partial template w/out layout' do 
      get :new, use_route: 'dashboard'
      expect(response).to render_template('new')
      expect(response).to render_template(layout: nil)
    end
    it 'assigns new Bug' do 
      get :new, use_route: 'dashboard'
      expect(assigns(:bug)).to be_a(Bug)
    end
  end

  describe 'GET show', :create do 
    before(:each) do 
      get :show, id: @bug.id
    end
    it 'renders template' do 
      expect(response).to render_template('show')
      expect(response).to render_template(layout: 'dashboard')
    end
    it 'assigns @bug' do 
      expect(assigns(:bug)).to eq(@bug)
    end
    it 'assigns @project' do 
      expect(assigns(:project)).to eq(@bug.project)
    end
    it 'assigns @admin' do 
      expect(assigns(:admin)).to eq(@bug.admin)
    end
    it 'assigns @comments' do
      @bug.comments.create(content: 'this is a comment')
      expect(assigns(:comments)).to eq(@bug.comments.order(:created_at))
    end
    it 'assigns @comment' do 
      expect(assigns(:comment)).to be_a(Comment)
    end
  end

  describe 'POST create' do 
    it '' do 

    end
  end

  describe 'PUT update' do 
    it '' do 

    end
  end

end



@bug
@project 
@admin
@comments
@comment