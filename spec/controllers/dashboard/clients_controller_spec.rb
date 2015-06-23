require 'spec_helper'

RSpec.describe Dashboard::ClientsController, :type => :controller do

  before do |example|
    unless example.metadata[:skip_login]
      sign_in create(:admin)
    end
    unless example.metadata[:no_create]
      @client = create(:client)
    end
  end

  describe "without current_admin", :skip_login, :no_create do 
    it 'redirects away from controller actions' do
      get :index
      expect(response).to redirect_to(new_admin_session_path)
    end
  end

  describe "GET index" do
    it "assigns @clients" do   
      get :index
      expect(assigns(:clients)).to eq([@client])
    end

    it "assigns @modal_urls" do 
      get :index
      expected_json = {
        new_client_project: new_dashboard_project_path,
        new_client: new_dashboard_client_path
      }.to_json
      expect(assigns(:modal_urls)).to eq(expected_json )
    end

    it "renders the index template" do
      get :index
      expect(response).to render_template("index")
      expect(response).to render_template(layout: 'dashboard')
    end
  end

  describe "GET new", :no_create do
    it 'renders form partial without layout' do 
      get :new
      expect(response).to render_template('new')
      expect(response).to render_template(layout: nil)
    end
    it 'assigns new @client' do 
      get :new
      expect(assigns(:client)).to be_a(Client)
    end
  end

  describe "GET edit" do
    it 'renders form partial without layout' do
      get :edit, id: @client.id
      expect(response).to render_template('edit')
      expect(response).to render_template(layout: nil)
    end
    it 'assigns @client' do 
      get :edit, id: @client.id
      expect(assigns(:client)).to eq(@client)
    end
  end

  describe "GET show" do 
    it 'renders template' do
      get :show, id: @client.id
      expect(response).to render_template('show')
      expect(response).to render_template(layout: 'dashboard')
    end
    it 'assigns @client' do 
      get :show, id: @client.id
      expect(assigns(:client)).to eq(@client)
    end
    it "assigns @modal_urls" do 
      get :show, id: @client.id
      expected_json = {
        new_client_project: new_dashboard_project_path,
        edit_client: edit_dashboard_client_path(@client)
      }.to_json
      expect(assigns(:modal_urls)).to eq(expected_json )
    end
  end

  describe "POST create", :no_create do
    before(:each) do
      @valid_attrs = attributes_for(:client)
      @client_count = Client.all.count
    end

    it 'valid client params, insantiates + adds to DB' do 
      post :create, client: @valid_attrs
      expect(Client.all.count).to eq(@client_count + 1)
    end
    it 'valid client params, returns json w redirect url for show page' do 
      post :create, client: @valid_attrs
      expected_json = {
        redirect_url: dashboard_client_path(Client.last)
      }.to_json
      expect(response.body).to eq(expected_json)
    end
    it 'invalid params, renders form w errors displayed, no change to Client.count' do 
      post :create, client: @valid_attrs.except(:name_of_co)

      expect(Client.all.count).to eq(@client_count)
      expect(response).to render_template('new')
      expect(response).to render_template(layout: nil)
    end
  end

  describe 'PUT update' do 
    before(:each) do 
      @update_params = {
        name_of_co: 'different name, so update'
      }
    end
    it 'valid params, updates client' do 
      put :update, {
        id: @client.id,
        client: @update_params
      }
      updated_name = Client.find(@client.id).name_of_co
      expect(updated_name).to eq(@update_params[:name_of_co])
    end
    it 'valid client params, returns json w redirect url for show page' do 
      put :update, {
        id: @client.id,
        client: @update_params
      }
      expected_json = {
        redirect_url: dashboard_client_path(@client)
      }.to_json
      expect(response.body).to eq(expected_json)
    end

    it 'invalid params, renders form w errors displayed, no change to Client.count' do 
      put :update, {
        id: @client.id,
        client: {name_of_co: ''}
      }
      unchanged_name = Client.find(@client.id).name_of_co
      expect(response).to render_template('edit')
      expect(response).to render_template(layout: nil)
      expect(unchanged_name).not_to be_empty
    end
  end

end












