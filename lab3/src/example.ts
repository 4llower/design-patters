import { Task } from './Task';
import { Project } from './Project';
import { Developer } from './Developer';
import { TaskStatus } from './types';

const project = new Project('P1', 'Website Redesign');

const task1 = new Task('T1', 'Design Homepage');
const task2 = new Task('T2', 'Implement Navigation');
const task3 = new Task('T3', 'Create Contact Form');

project.addTask(task1);
project.addTask(task2);
project.addTask(task3);

const john = new Developer('John');
const alice = new Developer('Alice');

task1.addObserver(john);
task2.addObserver(alice);
task3.addObserver(john);

task1.setAssignee('John');
task2.setAssignee('Alice');
task3.setAssignee('John');


// simulate some task updates
console.log('Initial project summary:');
console.log(project.getSummary());

console.log('\nUpdating task statuses...');
task1.setStatus(TaskStatus.InProgress);
task2.setStatus(TaskStatus.Done);
task3.setStatus(TaskStatus.Assigned);

console.log('\nUpdated project summary:');
console.log(project.getSummary());

console.log('\nMarking project as done...');
project.setStatus(TaskStatus.Done);

console.log('\nFinal project summary:');
console.log(project.getSummary()); 