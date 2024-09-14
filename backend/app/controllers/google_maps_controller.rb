class GoogleMapsController < ApplicationController
  def search_location
    results = Geocoder.search(params[:place_name])
    if results.present?
      location = results.first.coordinates
      render json: { lat: location[0], lng: location[1] }
    else
      render json: { error: '位置が見つかりませんでした' }, status: :not_found
    end
  end

  def reverse_geocode
    results = Geocoder.search([params[:lat], params[:lng]]).first
    if results
      render json: { address: results.data["address"] }
    else
      render json: { error: '位置が見つかりませんでした' }, status: :not_found
    end
  end
end
