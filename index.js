//1 switch between main to category screen
const menuBtn = document.querySelector(".menu-btn");
const backBtn = document.querySelector(".back-btn");
const screenWrapper = document.querySelector(".main");
const toggleScreen = () => {
    screenWrapper.classList.toggle("show-category");
  };
  menuBtn.addEventListener("click", toggleScreen);
  backBtn.addEventListener("click", toggleScreen);

//2 pop up form for add add to do
const addTaskBtn = document.querySelector(".add-task-btn");
const addTaskWrapper = document.querySelector(".add-task");
  const toggleAddTaskForm = () => {
    addTaskWrapper.classList.toggle("active");
    addTaskBtn.classList.toggle("active");
  };
addTaskBtn.addEventListener("click", toggleAddTaskForm);


let categories = [
    {
      title: "Personal"
    },
    {
      title: "Work"
    },
    {
      title: "Shopping"
    },
    {
      title: "Coding"
    
    },
    {
      title: "Health"
    },
    {
      title: "Education"
    }
];
  
  let tasks = [
    {
      id: 1,
      task: "Go to market",
      category: "Shopping",
      completed: false,
    },
    {
      id: 2,
      task: "Read a chapter of a book",
      category: "Personal",
      completed: false,
    },
    {
      id: 3,
      task: "Prepare presentation for meeting",
      category: "Work",
      completed: false,
    },
    {
      id: 4,
      task: "Complete coding challenge",
      category: "Coding",
      completed: false,
    },
    {
      id: 5,
      task: "Take a 30-minute walk",
      category: "Health",
      completed: false,
    },
    {
      id: 6,
      task: "Do a 20-minute HIIT workout",
      category: "Fitness",
      completed: false,
    },
    {
      id: 7,
      task: "Watch an educational video online",
      category: "Education",
      completed: false,
    },
    {
      id: 8,
      task: "Review monthly budget",
      category: "Shopping",
      completed: false,
    },
    {
      id: 9,
      task: "Buy groceries for the week",
      category: "Shopping",
      completed: false,
    },
    {
      id: 10,
      task: "Write in a journal",
      category: "Personal",
      completed: false,
    },
    {
      id: 11,
      task: "Send follow-up emails",
      category: "Work",
      completed: false,
    },
    {
      id: 12,
      task: "Work on a coding side project",
      category: "Coding",
      completed: false,
    },
    {
      id: 13,
      task: "Try a new healthy recipe",
      category: "Health",
      completed: false,
    },
    {
      id: 14,
      task: "Attend a yoga class",
      category: "Fitness",
      completed: false,
    },
    {
      id: 15,
      task: "Read an article about a new topic",
      category: "Education",
      completed: false,
    },
    {
      id: 16,
      task: "Set up automatic bill payments",
      category: "Personal",
      completed: false,
    },
      {
      id: 17,
      task: "Buy new clothes",
      category: "Shopping",
      completed: false,
    },
    {
      id: 18,
      task: "Meditate for 10 minutes",
      category: "Personal",
      completed: false,
    },
    {
      id: 19,
      task: "Prepare agenda for team meeting",
      category: "Work",
      completed: false,
    },
    {
      id: 20,
      task: "Debug a software issue",
      category: "Coding",
      completed: false,
    },
    {
      id: 21,
      task: "Try a new recipe for lunch",
      category: "Health",
      completed: false,
    },
    {
      id: 22,
      task: "Go for a run",
      category: "Fitness",
      completed: false,
    },
    {
      id: 23,
      task: "Learn a new language online",
      category: "Education",
      completed: false,
    },
    {
      id: 24,
      task: "Read about history",
      category: "Education",
      completed: false,
    },
 
 ];

//3 category section render dynamically
let selectedCategory = categories[0];
const categoriesContainer = document.querySelector(".categories");
const categoryTitle =document.querySelector(".category-title")
const numTasks = document.querySelector(".category-tasks");
const totalTasks = document.getElementById("total-tasks")

const updateTotals = () => {
    const categoryTasks = tasks.filter(
      (task) =>
        task.category.toLowerCase() === selectedCategory.title.toLowerCase()
    );
    numTasks.innerHTML = `${categoryTasks.length} Tasks`;
    totalTasks.innerHTML = tasks.length;
  };

const renderCategories = () => {
    categoriesContainer.innerHTML = "";
    categories.forEach((category) => {
      const categoryTasks = tasks.filter(
        (task) => task.category.toLowerCase() === category.title.toLowerCase()
      );
      const div = document.createElement("div");
      div.classList.add("category");
      div.addEventListener("click", () => {
        screenWrapper.classList.toggle("show-category");
        selectedCategory = category;
        categoryTitle.innerHTML = category.title;
        updateTotals();
        renderTasks();
      });
      div.innerHTML = `                    
                    <h1>${category.title}</h1>
                    <p>${categoryTasks.length} Tasks</p>                               
      `;
  
      categoriesContainer.appendChild(div);
    });
};
renderCategories();
updateTotals();


//4 render pre-define task by saving on local storage
const saveLocal = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const getLocal = () => {
  const tasksLocal = JSON.parse(localStorage.getItem("tasks"));
  if (tasksLocal) {
    tasks = tasksLocal;
  }
};

const tasksContainer = document.querySelector(".tasks");

const renderTasks = () => {
  tasksContainer.innerHTML = "";
  const categoryTasks = tasks.filter(
    (task) =>
      task.category.toLowerCase() === selectedCategory.title.toLowerCase()
  );
  if (categoryTasks.length === 0) {
    tasksContainer.innerHTML = `<p class="no-tasks">No tasks added for this category</p>`;
  } else {
    categoryTasks.forEach((task) => {
      const div = document.createElement("div");
      div.classList.add("task-wrapper");
      const label = document.createElement("label");
      label.classList.add("task");
      label.setAttribute("for", task.id);
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = task.id;
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => {
        const index = tasks.findIndex((t) => t.id === task.id);
        tasks[index].completed = !tasks[index].completed;
        saveLocal();
      });
      div.innerHTML = `
      <div class="delete">
           <i class="fa-solid fa-trash-can"></i>
              </div>
              `;
      label.innerHTML = `             
              <p>${task.task}</p>
        `;
      label.prepend(checkbox);
      div.prepend(label);
      tasksContainer.appendChild(div);

      const deleteBtn = div.querySelector(".delete");
      deleteBtn.addEventListener("click", () => {
        const index = tasks.findIndex((t) => t.id === task.id);
        tasks.splice(index, 1);
        saveLocal();
        renderTasks();
      });
    });

    renderCategories();
    updateTotals();
  }
};
getLocal();
renderTasks();

//5 add category in option form
const categorySelect = document.getElementById("category-select");
categories.forEach((category) => {
  const option = document.createElement("option");
  option.value = category.title.toLowerCase();
  option.textContent = category.title;
  categorySelect.appendChild(option);
});

//6 add task in todo
const addBtn = document.querySelector(".add-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const taskInput = document.getElementById("task-input");

const addTask = (e) => {
  e.preventDefault();
  const task = taskInput.value;
  const category = categorySelect.value;

  if (task === "") {
    alert("Please enter a task");
  } else {
    const newTask = {
      id: tasks.length + 1,
      task,
      category,
      completed: false,
    };
    taskInput.value = "";
    tasks.push(newTask);
    saveLocal();
    toggleAddTaskForm();
    renderTasks();
  }
};
addBtn.addEventListener("click", addTask);
cancelBtn.addEventListener("click", toggleAddTaskForm);



