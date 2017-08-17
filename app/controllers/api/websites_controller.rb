require "uri"
class Api::WebsitesController < ApplicationController

  def create_page_object(url)
    begin
      page = Nokogiri::HTML(open(url))
    rescue
      puts "page not loaded"
      nil
    end
  end

  def fetchUrl

    # puts(!!params[:url] =~ URI::regexp(%w(http https)))


    if (doc = create_page_object(params[:url]))
      json = {}
      puts(params[:url])
      # raise "error"
      if (doc.xpath("//title").first)
        json["title"] = doc.xpath("//title").first.text
      end
      doc.xpath("//meta").each do |meta|
        if (meta.attributes["property"])
          if (meta.attributes["property"].value == "og:title")
            json["subHeading"] = meta.attributes["content"].value
          end
          if (meta.attributes["property"].value == "og:image")
            json["imageUrl"] = meta.attributes["content"].value
          end
          if (meta.attributes["property"].value == "og:description")
            json["description"] = meta.attributes["content"].value
          end
        end
      end
    else
      json = {"error": "page not loaded"}
    end

    render json: json
  end

end
