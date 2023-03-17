class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'

  # Add routes
  get '/tasks' do
    tasks = Task.all.order(:created_at)
    tasks.to_json
  end

  get '/steps' do
    steps = Step.all.order(:created_at)
    steps.to_json
  end

  post '/tasks' do
    message = Task.create(name: params[:name])
    message.to_json
  end

  post '/steps' do
    message = Step.create(name: params[:name])
    message.to_json
  end

  patch '/steps/:id' do
    message = Step.find(params[:id])
    message.update(name: params[:name])
    message.to_json
  end

  delete '/steps/:id' do
    message = Step.find(params[:id])
    message.destroy
    message.to_json
  end
end
