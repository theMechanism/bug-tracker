require 'spec_helper'

describe "iframe actions on test_page", type: :feature do
  before(:each) do |example|
    project = create(:project, :active)
    visit dashboard_test_page_path
    
    if example.metadata[:user_clicks_n_expands] 
      
      within_frame find('#mech-bug-iframe') do
        find("#mech-pull-tab div").click
      end
    end
  end

  describe "renders", :js => true do 
    it "iframe appears on page" do 
      
      
      within_frame find('#mech-bug-iframe') do
        find("#mech-pull-tab div")
        expect(page).to have_content 'Report A Bug!'
      end

    end
  end
  describe "behavior", :user_clicks_n_expands, :js => true do 
    
    it "user can submit legit bug, adds to DB" do 
      within_frame find('#mech-bug-iframe') do
        first_bug_count = Bug.count
        find('#mech-bug-report')
        fill_in('Name', :with => 'Fake Client')
        fill_in('Description', :with => 'oh my god this is teeeeerrrrriiiibbbblllleee')
        find('input[type="submit"]').click
        # wait_for_iframe_ajax
        # Timeout.timeout(1) do 
        #   p 'wait for submit to regiester'
        # end
        # wait_until(3) do
          # expect(page).to have_content('Thank')
        # end
        expect(page).to have_content('id')
        expect(Bug.count).to eq(first_bug_count + 1)
      end
    end

    it "prevents submission with incomplete user input" do
      within_frame find('#mech-bug-iframe') do
        find('#mech-bug-report')
        # doesn't fill in fields
        find('input[type="submit"]').click
        # find('.mech-bug-message')
        expect(page).to have_content("Description can't be blank")
      end
    end

    # it "user clicks 'View Bugs' and opens tab to log in" do 
    #   within_frame find('#mech-bug-iframe') do
    #     # for now -- as the iframe is not served by a controller with client specific content --
    #     # evenutally this link will be tailored for each client
    #     # upon this upgrade, upgrade the test
    #     # expect( find('#mech-bug-list')[:href]).to eq(root_url + 'client_url_placeholder')
        
    #     @login_window = window_opened_by do
    #       find('#mech-bug-list').click
    #     end
    #   end

    #   within_window @login_window do
    #     expect(find('.sign-in-submit').value).to eq('Sign in')
    #   end
    # end
  end

end