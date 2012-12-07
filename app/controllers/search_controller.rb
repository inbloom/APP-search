class SearchController < ApplicationController

  # This initial search method just does the raw keyword search and returns the ENTIRE results.
  # All filtering is done on the client side..  This is ONLY for 12/12 release as it will not scale.
  def full_search
    # The object we return to the UI, if any
    response = []
    # Get our query
    query = params['query']
    unless query.empty?
      # Do a search using the wild card
      searchResults = LriHelper::wildcard_search query
      # If its not empty only return what we directly need
      unless searchResults['response'].empty?
        searchResults['response'].each { |r|
          unless r['props'].empty?
            response << {
                'title' => Rack::Utils.unescape(r['props']['urn:lri:property_type:name'].to_s),
                'url' => Rack::Utils.unescape(r['props']['urn:lri:property_type:url'].to_s),
            }
          end
        }
      end
    end

    respond_to do |format|
      format.json { render json: response }
    end

  end

end
