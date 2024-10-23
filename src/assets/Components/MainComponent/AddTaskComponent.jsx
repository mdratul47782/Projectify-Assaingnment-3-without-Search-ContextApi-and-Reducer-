export default function AddTaskComponent({ onCancel, onAddTask, taskToEdit }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const task = {
      id: taskToEdit?.id || Date.now(),
      taskName: e.target.taskName.value,
      description: e.target.description.value,
      dueDate: e.target.dueDate.value,
      category: e.target.category.value,
    };

    onAddTask(task);
  };

  return (
    <>
      {/* Full screen overlay for background blur */}
      <div className="fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      {/* Modal */}
      <div className="fixed inset-0 z-20 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg bg-gray-800 shadow-xl">
          <div className="p-6">
            <h2 className="mb-6 text-2xl font-bold text-green-400">
              {taskToEdit ? "Edit Task" : "Create Task"}
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Task Name */}
              <div className="mb-4">
                <label
                  htmlFor="taskName"
                  className="mb-1 block text-sm font-medium text-gray-300"
                >
                  Task Name
                </label>
                <input
                  type="text"
                  id="taskName"
                  name="taskName"
                  defaultValue={taskToEdit?.taskName || ""}
                  required
                  className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              {/* Category */}
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="mb-1 block text-sm font-medium text-gray-300"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  defaultValue={taskToEdit?.category || "todo"}
                  required
                  className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <option value="todo">To Do</option>
                  <option value="onprogress">On Progress</option>
                  <option value="done">Done</option>
                  <option value="revised">Revised</option>
                </select>
              </div>

              {/* Due Date */}
              <div className="mb-4">
                <label
                  htmlFor="dueDate"
                  className="mb-1 block text-sm font-medium text-gray-300"
                >
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  defaultValue={taskToEdit?.dueDate || ""}
                  required
                  className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="mb-1 block text-sm font-medium text-gray-300"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  defaultValue={taskToEdit?.description || ""}
                  className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={onCancel}
                  className="rounded-lg bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                >
                  {taskToEdit ? "Update Task" : "Add Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
