require 'spec_helper'

describe "iframe actions on test_page", type: :feature do
  before(:each) do
    # sign_in create(:admin)
    create(:project)
  end

  describe "renders iframe to page", :js => true do 
    it "appears" do 
      visit dashboard_test_page_path
      
      within_frame find('#mech-bug-iframe') do
        expect(page).to have_content 'Report A Bug!'
      end

    end
  end

end