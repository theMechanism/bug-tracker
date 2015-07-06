require 'spec_helper'

describe "iframe actions on test_page" do
  before(:each) do
    # sign_in create(:admin)
    create(:project)
  end

  describe "eats a burger" do 

    it "masticates" do 
      visit dashboard_test_page_path
      expect(1).to eq(1)
    end
  end

end