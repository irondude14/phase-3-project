# Creating some tasks

Task.create(name: 'Cook dinner')
Task.create(name: 'Finish project')

Step.create(name: 'Buy groceries', done: false, task_id: 1)
Step.create(name: 'Look up the reciepe', done: false, task_id: 1)
Step.create(name: 'Cook a dish', done: false, task_id: 1)

Step.create(name: 'Write a blog', done: false, task_id: 2)
Step.create(name: 'Think of a project idea', done: false, task_id: 2)
Step.create(name: 'Code the project', done: false, task_id: 2)
Step.create(name: 'Debug the project', done: false, task_id: 2)
