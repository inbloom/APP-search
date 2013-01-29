###############################################################################
# Copyright 2012-2013 inBloom, Inc. and its affiliates.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
###############################################################################

class SearchController < ApplicationController

  def full_search
    # define the elasticsearch result "size" (limit)
    limit = params['limit']
    # define the elasticsearch result "from" (offset)
    offset = params['offset']
    # Default output
    searchResults = ''
    # Search Engine (should put this in the config)
    url = 'http://esearch.agilix.com:9200/lr/lr/_search'

    # If we have filters, we need to parse them
    if params['filters'].present?

      filters = []
      # For each of the filters format them and stuff them into an array
      params['filters'].each do |key, filter|
        if filter.keys.count > 1
          # This is more complex because this filter type needs the keys or'd together
          # @TODO Handle the or'ing of multiple filters together
        else
          # This should be simple, there is only one of this filter key
          filters << { 'query' => { 'match' => { key => filter.keys.first.to_s } } }
        end
      end

      # If the query is present we need to match it
      if params['query'].present?
        query = { 'match' => { '_all' => params['query'] } }
        filter = { 'limit' => { 'value' => 100 }, 'and' => filters }
      # If no query is present then we can wildcard against anything
      else
        query = { 'wildcard' => { '_all' => '?' } }
        filter = { 'limit' => { 'value' => 100 }, 'and' => filters }
      end

    # if not filter is present then just match against query
    else
      query = { 'match' => { '_all' => params['query'] } }
      filter = { 'limit' => { 'value' => 100 } }
    end

    # Build the payload from the various parts
    payload = {
        'size' => limit,
        'from' => offset,
        'query' => {
            'filtered' => {
                'query' => query,
                'filter' => filter
            }
        }
    }

    # puts "PAYLOAD"; puts payload.to_json

    # Okay after all that mess, lets make the request
    request = RestClient::Request.new( :method => :get, :url => url, :payload => payload.to_json )

    # Since this can error lets catch it
    begin
      searchResults = request.execute
      respond_to do |format|
        format.json { render json: searchResults }
      end
      #puts "RESPONSE"; puts searchResults
    rescue => e
      # @TODO Need to return the correct error type and then an error message to be shown to user.
      respond_to do |format|
        format.json { render json: searchResults }
      end
      #puts "ERROR!"; puts e.response
    end

  end

end
