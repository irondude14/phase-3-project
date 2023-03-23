class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'

  ## Routes for Tasks

  #Fetching Tasks and associated Steps

  get '/tasks' do
    tasks = Task.includes(:steps).all
    tasks.to_json(include: :steps)
  end

  #Creating new Task

  post '/tasks' do
    task = Task.create(name: params[:name])
    task.to_json
  end

  #Creating new associated Step

  post '/tasks/:id' do
    task = Task.find_by(params[:id])
    step = task.steps.create(name: params[:name])
    step.to_json
  end

  #Changing name of the Task

  patch '/tasks/:id' do
    task = Task.find_by(params[:id])
    task.update(name: params[:name])
    task.to_json
  end

  #Deleteing Task

  delete '/tasks/:id' do
    task = Task.find_by(params[:id])
    task.steps.each(&:destroy)
    task.destroy
    status 204
  end

  ## Routes for Steps

  patch '/steps/:id/name' do
    step = Step.find_by(params[:id])
    step.update(name: params[:name])
    step.to_json
  end

  patch '/steps/:id/done' do
    step = Step.find_by(params[:id])
    step.update(done: params[:done])
    step.to_json
  end

  delete '/steps/:id' do
    step = Step.find_by(params[:id])
    step.destroy
    step.to_json
  end
end
