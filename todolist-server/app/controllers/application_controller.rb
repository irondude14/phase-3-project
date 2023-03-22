class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'

  # Routes for Tasks

  get '/tasks' do
    tasks = Task.includes(:steps).all
    tasks.to_json(include: :steps)
  end

  post '/tasks' do
    task = Task.create(name: params[:name])
    task.to_json
  end

  post '/tasks' do
    task = Task.find(params[:id])
    tasl.steps.create(name: params[:name], done: params[:done])
    task.to_json
  end

  delete '/tasks/:id' do
    task = Task.find(params[:id])
    task.steps.each(&:destroy)
    task.destroy
    status 204
  end

  # Routes for Steps

  post '/steps' do
    step =
      Step.create(
        name: params[:name],
        done: params[:done],
        task_id: params[:task_id],
      )
    step.to_json
  end

  patch '/steps/:id/name' do
    step = Step.find(params[:id])
    step.update(name: params[:name])
    step.to_json
  end

  patch '/steps/:id/done' do
    step = Step.find(params[:id])
    step.update(done: params[:done])
    step.to_json
  end

  delete '/steps/:id' do
    step = Step.find(params[:id])
    step.destroy
    step.to_json
  end
end
