# Creating some tasks

Task.create(name: 'Cook dinner')
Task.create(name: 'Finish project')

Step.create(name: 'Buy groceries', done: false, task_id: 1)
Step.create(name: 'Look up the recipe', done: false, task_id: 1)

Step.create(name: 'Write the project', done: false, task_id: 2)
Step.create(name: 'Debug the project', done: false, task_id: 2)
