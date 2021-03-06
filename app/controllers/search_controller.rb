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

  # Searching the site will
  # The Full Search function issues restful search requests to our ElasticSearch engine.
  # It's likely not perfect, and this is the first time I have used ES so forgive me if
  #  this is the wrong way to do this.
  # The bulk of the code below just forms the json query payload.  You can uncomment some
  #  of the commented out PUTS below to see the output in webrick and make sure it's right.
  # Comments, suggestions and feedback is welcome; Jason Ellis <jason@grok-interactive.com>
  def full_search

    # define the elasticsearch result "size" (limit)
    limit = params['limit'].to_i
    # define the elasticsearch result "from" (offset)
    offset = params['offset'].to_i
    # Pass through
    hack = params['hack']
    # Default output
    searchResults = ''
    # If we have filters, we need to parse them
    if params['filters'].present?
      filters = []
      # For each of the filters format them and stuff them into an array
      params['filters'].each do |key, filter|

        if [
            'properties.educationalAlignment.properties.targetName',
            'properties.inLanguage',
            'properties.isBasedOnUrl',
            'properties.thumbnailUrl',
            'properties.timeRequired',
            'properties.typicalAgeRange',
            'properties.url',
            'properties.useRightsUrl'
        ].include?(key)
          searchKey = "schema-org.#{key}.original"
          matchTerm = 'term'
        else
          searchKey = "schema-org.#{key}"
          matchTerm = 'match'
        end

        if filter.keys.count > 1
          # This is more complex because this filter type needs the keys or'd together
          orFilters = []
          filter.keys.each do |f|
            orFilters << { 'query' => { matchTerm => { searchKey => f.to_s } } }
          end
          filters << { 'or' => orFilters }
        else
          # This should be simple, there is only one of this filter key
          filters << { 'query' => { matchTerm => { searchKey => filter.keys.first.to_s } } }
        end
      end

      # If the query is present we need to match it
      if params['query'].present?
        query = { 'match' => { '_all' => params['query'] } }
        filter = { 'and' => filters }
        # If no query is present then we can wildcard against anything
      else
        query = { 'match_all' => {  } }
        filter = { 'and' => filters }
      end
      # if not filter is present then just match against query
    else
      query = { 'match' => { '_all' => params['query'] } }
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
        },
        "facets" => {
            "intendedEndUserRole" => {
                "terms" => {
                    "field" => "schema-org.properties.intendedEndUserRole.original",
                    "global" => true,
                    "all_terms" => true
                }
            },
            "typicalAgeRange" => {
                "terms" => {
                    "field" => "schema-org.properties.typicalAgeRange.original",
                    "global" => true,
                    "all_terms" => true
                }
            },
            "educationalUse" => {
                "terms" => {
                    "field" => "schema-org.properties.educationalUse.original",
                    "global" => true,
                    "all_terms" => true
                }
            },
            "interactivityType" => {
                "terms" => {
                    "field" => "schema-org.properties.interactivityType.original",
                    "global" => true,
                    "all_terms" => true
                }
            },
            "learningResourceType" => {
                "terms" => {
                    "field" => "schema-org.properties.learningResourceType.original",
                    "global" => true,
                    "all_terms" => true
                }
            },
            "mediaType" => {
                "terms" => {
                    "field" => "schema-org.properties.mediaType.original",
                    "global" => true,
                    "all_terms" => true
                }
            }
        }
    }

#puts "PAYLOAD"; puts Rails.configuration.elastic_search_url; puts payload.to_json

# Okay after all that mess, lets make the request
    request = RestClient::Request.new( :method => :get, :url => Rails.configuration.elastic_search_url, :payload => payload.to_json )
# Since this can error lets catch it
    begin
      searchResults = request.execute
      results = JSON.parse(searchResults)
      results[:hack] = hack

#puts "RESPONSE"; puts results.to_json

      respond_to do |format|
        format.json { render json: results }
      end
    rescue => e
      # @TODO Need to return the correct error type and then an error message to be shown to user.
      respond_to do |format|
        format.json { render json: searchResults }
      end
#puts "ERROR!"; puts e.response
    end

  end

end
