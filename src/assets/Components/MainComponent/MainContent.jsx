import { useState } from "react";
import AddComponent from "./AddComponent";
import AddTaskComponent from "./AddTaskComponent";
import DoneList from "./DoneList";
import Header from "./Header";
import OnProgressList from "./OnProgressList";
import RevisedList from "./Revised";
import TodoList from "./TodoList";

export default function MainContent() {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [tasks, setTasks] = useState({
    todo: [],
    onprogress: [],
    done: [],
    revised: [],
  });
  
  const [sortOrder, setSortOrder] = useState({
    todo: 'asc',
    onprogress: 'asc',
    done: 'asc',
    revised: 'asc'
  });

  // Add or Update Task
  const handleAddTask = (task) => {
    setTasks((prevTasks) => {
      if (taskToEdit) {
        const prevCategory = taskToEdit.category;
        const updatedTasks = { ...prevTasks };

        if (task.category !== prevCategory) {
          updatedTasks[prevCategory] = updatedTasks[prevCategory].filter(
            (t) => t.id !== taskToEdit.id
          );
        }

        updatedTasks[task.category] = updatedTasks[task.category].map((t) =>
          t.id === taskToEdit.id ? task : t
        );

        return updatedTasks;
      } else {
        return {
          ...prevTasks,
          [task.category]: [...prevTasks[task.category], task],
        };
      }
    });
    setIsAddingTask(false);
    setTaskToEdit(null);
  };

  const handleDeleteTask = (taskId, category) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [category]: prevTasks[category].filter((task) => task.id !== taskId),
    }));
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setIsAddingTask(true);
  };

  const handleAddClick = () => {
    setIsAddingTask(true);
    setTaskToEdit(null);
  };

  const handleCancelClick = () => {
    setIsAddingTask(false);
    setTaskToEdit(null);
  };

  // Sort tasks by date for specific category
  const handleFilterTasks = (category) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [category]: [...prevTasks[category]].sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return sortOrder[category] === 'asc' ? dateA - dateB : dateB - dateA;
      }),
    }));

    // Toggle the sort order for the specific category
    setSortOrder((prevSortOrder) => ({
      ...prevSortOrder,
      [category]: prevSortOrder[category] === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <main className="relative flex-1 overflow-y-auto overflow-x-hidden">
      <Header />
      <div className={`${isAddingTask ? "blur-md" : ""}`}>
        <div className="mx-auto max-w-7xl p-6">
          <AddComponent onAddClick={handleAddClick} />

          <div className="-mx-2 mb-6 flex flex-wrap">
            <TodoList
              tasks={tasks.todo}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
              onFilterTasks={() => handleFilterTasks("todo")} // Filter for todo
            />
            <OnProgressList
              tasks={tasks.onprogress}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
              onFilterTasks={() => handleFilterTasks("onprogress")} // Filter for onprogress
            />
            <DoneList
              tasks={tasks.done}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
              onFilterTasks={() => handleFilterTasks("done")} // Filter for done
            />
            <RevisedList
              tasks={tasks.revised}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
              onFilterTasks={() => handleFilterTasks("revised")} // Filter for revised
            />
          </div>
        </div>
      </div>
      {isAddingTask && (
        <div>
          <AddTaskComponent
            onCancel={handleCancelClick}
            onAddTask={handleAddTask}
            taskToEdit={taskToEdit}
          />
        </div>
      )}
    </main>
  );
}
