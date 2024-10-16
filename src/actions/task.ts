'use server';

import { Task, TaskModel } from "@/models/task";
import { connectDb } from "@/utils/database";
import { redirect } from "next/navigation";

export interface FormState {
    error: string;
}

export const createTask = async (state: FormState, formData: FormData) => {
    const newTask: Task = {
        title: formData.get('title') as string, 
        description: formData.get('description') as string, 
        dueDate: formData.get('dueDate') as string, 
        isCompleted: false,
    }

    try {
        // TODO: SPRINGを利用して作成したAPIを呼出ししてみる
        console.log('タスクの作成に成功しました');
        console.log(newTask);
        await connectDb();
        await TaskModel.create(newTask);
    } catch (error) {
        state.error = 'タスクの作成に失敗しました';
        return state;
    }

    redirect('/');
}

export const updateTask = async (id:string, state: FormState, formData: FormData) => {
    const updateTask: Task = {
        title: formData.get('title') as string, 
        description: formData.get('description') as string, 
        dueDate: formData.get('dueDate') as string, 
        isCompleted: Boolean(formData.get('isCompleted')),
    }

    try {
        await connectDb();
        await TaskModel.updateOne({_id: id}, updateTask);
    } catch (error) {
        state.error = 'タスクの更新に失敗しました';
        return state;
    }

    redirect('/');
}

export const deleteTask = async (id:string, state: FormState) => {
    try {
        await connectDb();
        await TaskModel.deleteOne({_id: id});
    } catch (error) {
        state.error = 'タスクの削除に失敗しました';
        return state;
    }

    redirect('/');
}