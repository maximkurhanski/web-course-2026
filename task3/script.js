let tasks = [];
let currentFilter = 'all';
let nextId = 1;

const form = document.getElementById('add-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
const counter = document.getElementById('counter');
const filters = document.getElementById('filters');

function render() {
  const visible = tasks.filter(task => {
    if (currentFilter === 'active') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true;
  });

  list.innerHTML = '';

  visible.map(createTaskElement).forEach(el => list.appendChild(el));

  const done = tasks.filter(t => t.completed).length;
  counter.textContent = `Осталось: ${tasks.length - done}, Выполнено: ${done}`;
}

function createTaskElement(task) {
  const li = document.createElement('li');
  li.className = 'task' + (task.completed ? ' completed' : '');
  li.dataset.id = task.id;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', () => toggleTask(task.id));

  const span = document.createElement('span');
  span.className = 'task__text';
  span.textContent = task.text;

  const del = document.createElement('button');
  del.type = 'button';
  del.className = 'task__delete';
  del.textContent = 'Удалить';
  del.addEventListener('click', () => deleteTask(task.id));

  li.append(checkbox, span, del);
  return li;
}

function addTask(text) {
  tasks.push({ id: nextId++, text, completed: false });
  render();
}

function toggleTask(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  render();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) {
    alert('Введите текст задачи');
    return;
  }
  addTask(text);
  input.value = '';
  input.focus();
});

filters.addEventListener('click', e => {
  const btn = e.target.closest('.filter');
  if (!btn) return;
  currentFilter = btn.dataset.filter;
  document.querySelectorAll('.filter').forEach(b => b.classList.toggle('active', b === btn));
  render();
});

render();