
class Api::PortfoliosController < ApplicationController

  def create
    json = {}
    puts (params[:username])
    puts (params[:title])
    if (!!params[:title] && User.where(user_name: params[:username])[0])
      project = Project.new
      project.title = params[:title]
      project.user_id = User.where(user_name: params[:username])[0].id
      project.sub_heading = params[:subHeading]
      project.descriptions = params[:descriptions]
      project.url = params[:url]
      project.img_url = params[:imageUrl]
      project.github_url = params[:github_url]
      project.save
      json = {"message": "Website saved"}
    else
      json = {"error": "Error on adding website"}
    end



    render json: json
  end

  def show
    json = {}
    if (User.where(user_name: params[:username])[0])
      json = Project.where(user_id: User.where(user_name: params[:username])[0].id)

    else
      json = {"error": "Can not get list"}
    end

    render json: json
  end

end
