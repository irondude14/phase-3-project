class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'

  # Routes for Tasks

  get '/tasks' do
    tasks = Task.all.order(:created_at)
    tasks.to_json
  end

  post '/tasks' do
    task = Task.create(name: params[:name])
    task.to_json
  end

  delete '/tasks/:id' do
    task = Task.find(params[:id])
    task.step.each(&:destroy)
    task.to_json
  end

  # Routes for Steps

  get '/steps' do
    steps = Step.all.order(:created_at)
    steps.to_json
  end

  post '/steps' do
    step =
      Step.create(
        name: params[:name],
        done: params[:done],
        task_id: params[:task_id],
      )
    step.to_json
  end

  patch '/steps/:id' do
    step = Step.find(params[:id])
    step.update(name: params[:name])
    step.to_json
  end

  delete '/steps/:id' do
    step = Step.find(params[:id])
    step.destroy
    step.to_json
  end
end
