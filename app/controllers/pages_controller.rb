require 'rest-client'
require 'json'
require 'webshot'
require 'nokogiri'
require 'open-uri'

class PagesController < ApplicationController

  CLIENT_ID = "72621fc9b05a6e32648c"
  CLIENT_SECRET = "c74bf06fb84f93c01709a12973fcd08a9bb02b5c"

  def authenticated?
    session[:access_token]
  end

  def user_exists?
    !!User.where(user_name: session[:user_name])[0]
  end



  def index
    # if !authenticated?
      @client_id = CLIENT_ID
    # else
    #   redirect_to "/profile/#{session[:user_name]}"
    # end
    doc = Nokogiri::HTML(open('https://arcane-wildwood-56545.herokuapp.com/'))
    # puts(doc.xpath("//meta")
    # raise "error"
    doc.xpath("//meta").each do |meta|
      if (meta.attributes["property"])
        if (meta.attributes["property"].value == "og:title")
          puts("title #{meta.attributes["content"].value}")
        end
      end
    end
  end

  def home

    # get temporary GitHub code...
    session_code = request.env['rack.request.query_hash']['code']

    # ... and POST it back to GitHub
    result = RestClient.post('https://github.com/login/oauth/access_token',
    {:client_id => CLIENT_ID,
      :client_secret => CLIENT_SECRET,
      :code => session_code},
      :accept => :json)

      # extract the token and granted scopes
      access_token = JSON.parse(result)['access_token']

      session[:access_token] = access_token


      scopes = JSON.parse(result)['scope'].split(',')
      has_user_email_scope = scopes.include? 'user:email'

      # fetch user information
      auth_result = JSON.parse(RestClient.get('https://api.github.com/user',
      {:params => {:access_token => access_token}}))

      # if the user authorized it, fetch private emails
      if has_user_email_scope
        auth_result['private_emails'] =
        JSON.parse(RestClient.get('https://api.github.com/user/emails',
        {:params => {:access_token => access_token}}))
      end


      if !user_exists?
        user = User.new
        user.user_name = session[:user_name]
        user.save
      end

      session[:user_name] = auth_result["login"]
      redirect_to "/profile/#{session[:user_name]}"
    end

    def profile
      if (params[:user_id] != session[:user_name])
        session[:user_name] = nil
        session[:user_id] = nil
        redirect_to "/"
      end
    end



  end
