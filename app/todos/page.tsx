"use client";
import AddTodoModal from "@/components/addTodoModal";
import Header from "@/components/header";
import CheckGreen from "@/components/svg/checkGreen";
import TaskModal from "@/components/taskModal";
import todoIcons from "@/components/todoIcons";
import { todosFatch } from "@/utils/fatch/todo/todosFatch";
import { AddButtonHandle } from "@/utils/handles/AddButtonHandle";
import { DoneHandle } from "@/utils/handles/DoneHandle";
import { useState, useEffect } from "react";
import { BiExpandVertical } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";

export interface ITask {
  id: number;
  title: string;
  color: string;
  icon: keyof typeof todoIcons | undefined;
}

const Todos = () => {
  const [taskType, setTaskType] = useState<"Add" | "Edit">();
  const [showModal, setShowModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTodoInput, setNewTodoInput] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [task, setTask] = useState<ITask>();
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [expandedTodo, setExpandedTodo] = useState<number | null>(null);

  const addTodoHandle = ({ task }: { task: ITask }) => {
    if (showModal) {
      setTask(undefined);
      setShowModal(false);
    } else {
      if (task) setTask(task);
      setShowModal(true);
    }
  };
  const addButtonHandle = AddButtonHandle({
    newTodoInput,
    task,
    subTitle,
    setTodos,
    todos,
    tasks,
    setShowModal,
    setNewTodoInput,
    setSubTitle,
  });

  const doneHandle = DoneHandle({ todos, setTodos });

  const toggleExpand = (id: number) => {
    setExpandedTodo(expandedTodo === id ? null : id);
  };

  // 처음 todo 데이터 가져오기
  useEffect(() => {
    todosFatch({ setTodos, setTask: setTasks });
  }, []);

  useEffect(() => {
    console.log("todos", todos);
    console.log("task", tasks);
  }, [todos, tasks]);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <div className="w-full flex flex-col items-center ">
        {/* modal */}
        {showModal && (
          <AddTodoModal
            task={task}
            setShowModal={setShowModal}
            setNewTodoInput={setNewTodoInput}
            setSubTitle={setSubTitle}
            addButtonHandle={addButtonHandle}
            setTaskType={setTaskType}
            setShowTaskModal={setShowTaskModal}
          />
        )}
        {showTaskModal && (
          <TaskModal
            setTask={setTask}
            setShowTodoModal={setShowModal}
            setShowTaskModal={setShowTaskModal}
            setTasks={setTasks}
            taskType={taskType}
            task={task}
          />
        )}

        <div className="w-full px-12">
          <Header />
          <div className="max-w-[56rem] flex flex-col items-center mx-auto">
            {/* mobile */}
            <div className="w-full lg:hidden text-left m-8">
              <h1 className="text-5xl font-bold mb-4">My Todos</h1>
            </div>
            {/* Desktop */}
            <div className="hidden lg:flex w-full justify-between font-extrabold mt-32 mb-12">
              <h1 className="text-5xl font-bold mb-4">My Todos</h1>
              {/* <div
                onClick={() => setShowModal(!showModal)}
                className="inline text-center px-12 py-2 bg-blue-500 text-white text-[1.5rem] font-normal rounded-md"
              >
                Add new task
              </div> */}
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full text-white gap-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => {
                    addTodoHandle({ task });
                  }}
                >
                  <div
                    style={{ backgroundColor: task.color }}
                    className={`h-14 relative hover:ring-4 rounded-lg w-14 sm:w-full pl-16 py-4 cursor-pointer text-white text-[1.1rem]`}
                  >
                    <div className="hidden sm:flex">{task.title}</div>
                    <div className="absolute top-1/2 -translate-y-1/2 left-5">
                      <div className="text-3xl rounded-full flex justify-center items-center">
                        {task.icon && todoIcons[task.icon]}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div
                className="text-5xl cursor-pointer"
                onClick={() => {
                  setTaskType("Add");
                  setShowTaskModal(true);
                }}
              >
                <div className="border p-1 w-14 h-14 flex justify-center items-center rounded-lg">
                  <FaPlus size={22} />
                </div>
              </div>
            </div>
            <div className="h-[70vh] w-full flex flex-col items-center">
              <div className="h-full w-full flex items-center">
                <div className="w-full text-[2rem] flex flex-col gap-4">
                  {todos?.map((todo, index) => {
                    return (
                      <div key={index} className="relative">
                        <div
                          onClick={() => doneHandle(todo.id)}
                          style={{
                            backgroundColor: `${
                              tasks.filter(
                                (task) => task.id === todo.taskId
                              )?.[0]?.color
                            }`,
                          }}
                          className={`relative bg-gray-900 ${
                            expandedTodo === todo.id
                              ? "rounded-t"
                              : "rounded-lg"
                          }  w-full pl-16 py-4 cursor-pointer text-white text-[1.1rem] ${
                            todo.isDone && "line-through text-opacity-30"
                          }`}
                        >
                          {todo.title}
                          <div className="absolute top-1/2 -translate-y-1/2 left-5">
                            {todo.isDone ? <CheckGreen size={28} /> : null}
                          </div>
                        </div>
                        {todo.subTitle && (
                          <BiExpandVertical
                            size={22}
                            fill="#249900"
                            className={`absolute right-8 ${
                              expandedTodo === todo.id
                                ? "bottom-5"
                                : "top-1/2 -translate-y-1/2"
                            }  text-green-400 cursor-pointer transition-max-height duration-400 ease-in-out`}
                            onClick={() => toggleExpand(todo.id)}
                          />
                        )}
                        {todo.subTitle && (
                          <div
                            className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
                              expandedTodo === todo.id ? "max-h-32" : "max-h-0"
                            }`}
                          >
                            <div className="p-4 pl-16 text-gray-300 bg-gray-800 rounded-b-lg text-[0.8rem] mt-1">
                              {todo.subTitle}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="lg:hidden">
                {/* <div
                  onClick={() => setShowModal(!showModal)}
                  className="inline text-center px-12 py-2 bg-blue-500 text-white text-[1.5rem] font-normal rounded-md"
                >
                  Add new task
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todos;
