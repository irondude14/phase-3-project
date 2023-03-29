class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'

  ## Routes for Tasks

  #Fetching Tasks and associated Steps

  get '/tasks' do
    tasks = Task.includes(:steps).all
    tasks.to_json(include: :steps)
  end

  get '/tasks/:id' do
    task = Task.includes(:steps).find(params[:id])
    task.to_json(include: :steps)
  end

  #Creating new Task

  post '/tasks' do
    task = Task.create(name: params[:name])
    task.to_json
  end

  #Creating new associated Step

  post '/tasks/:id' do
    task = Task.find(params[:id])
    step = task.steps.create(name: params[:name])
    step.to_json
  end

  #Changing name of the Task

  patch '/tasks/:id' do
    task = Task.find(params[:id])
    task.update(name: params[:name])
    task.to_json(include: :steps)
  end

  #Deleteing Task

  delete '/tasks/:id' do
    task = Task.find(params[:id])
    task.steps.destroy_all
    task.destroy
    status 204
  end

  ## Routes for Steps

  patch '/steps/:id' do
    step = Step.find(params[:id])
    step.name = params[:name] if params.key?('name')
    step.done = params[:done] if params.key?('done')
    step.to_json if step.save
  end

  delete '/steps/:id' do
    step = Step.find(params[:id])
    step.destroy
    step.to_json
  end
end
