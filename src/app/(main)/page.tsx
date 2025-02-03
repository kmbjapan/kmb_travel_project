import TaskCard from "@/components/TaskCard/TaskCard";
import UserPageTest from "@/containers/user/UserpageTest";
import { TaskDocument } from "@/models/task";
import Link from "next/link";
import { MdAddTask } from "react-icons/md";

export default async function MainPage() {
  return (
    <div className="text-gray-800 p-8 h-full overflow-y-auto pb-24">
      <header className="flex justify-between item-center">
        <h1 className="text-2xl font-bold flex items-center">
          旅行会社プロジェクト
        </h1>

        <Link
          href="/admin"
          className="flex items-center gap-1 font-semibold border px-4 py-2 rounded-full shadow-sm text-white bg-gray-800 hover:bg-gray-700"
        >
          ADMINページ{" "}
        </Link>
      </header>
      <div className="m-20 ">
        <UserPageTest />
      </div>
    </div>
  );
}

// すべてのタスクを取得
// const getAllTasks = async (): Promise<TaskDocument[]> => {
//   const response = await fetch(`${process.env.API_URL}/tasks`, {
//     cache: "no-store",
//   });

//   if (response.status !== 200) {
//     throw new Error();
//   }

//   const data = await response.json();
//   return data.tasks as TaskDocument[];
// };

// const allTasks = await getAllTasks();
// console.log(allTasks);
{
  /* <Link
          href="/new"
          className="flex items-center gap-1 font-semibold border px-4 py-2 rounded-full shadow-sm text-white bg-gray-800 hover:bg-gray-700"
        >
          <MdAddTask className="size-5" />
          <div>Add Task</div>
        </Link> */
}
{
  /* <div className="mt-8 flex flex-wrap gap-4">
        {allTasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div> */
}
