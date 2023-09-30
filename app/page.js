"use client"
import React, { useState } from 'react';

const Page = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [mainTask, setMainTask] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    setTitle('');
    setDesc('');
    setMainTask([...mainTask, { title, desc }]);
  };

  const completeHandler = (i) => {
    // Move the task from mainTask to completedTasks
    const completedTask = mainTask[i];
    setCompletedTasks([...completedTasks, completedTask]);

    // Remove the task from mainTask
    const copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  };

  const deleteHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  };

  const clearData = () => {
    setTitle('');
    setDesc('');
    setMainTask([]);
    setCompletedTasks([]);
  };

  let renderTask = <h2>No Task Available</h2>;
  let renderCompleted = null;

  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        <li key={i} className='flex items-center justify-around mb-5'>
          <div className='flex items-center justify-between mb-5 w-2/3'>
            <h5 className='text-xl font-semibold'>{t.title}</h5>
            <h6 className='text-xxl font-semibold'>{t.desc}</h6>
          </div>
          <div className='flex items-center justify-evenly mb-5 w-1/3'>
            <button
              className='bg-green-400 text-white px-4 py-2 rounded font-bold'
              onClick={() => completeHandler(i)}
            >
              Complete
            </button>
            <button
              onClick={() => deleteHandler(i)}
              className='bg-red-400 text-white px-4 py-2 rounded font-bold'
            >
              Delete
            </button>
          </div>
        </li>
      );
    });
  }

  if (completedTasks.length > 0) {
    renderCompleted = (
      <div className='p-8 bg-green-300'>

        <h2 className='text-white text-2xl font-bold'>Completed Tasks</h2>
        <ul>
          {completedTasks.map((t, i) => (
            <li className='text-xl font-semibold py-2' key={i}>{t.title}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <>
      <h1 className='bg-black text-white p-5 text-5xl font-bold text-center'>
        Todo List
      </h1>
      <div className='flex'>
        <form onSubmit={submitHandler}>
          <input
            type='text'
            placeholder='Enter Title Here'
            className='text-2xl border-zinc-800 border-4 m-8 px-4 py-2'
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <input
            type='text'
            placeholder='Enter Description Here'
            className='text-2xl border-zinc-800 border-4 m-8 px-4 py-2'
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />

          <button className='bg-black text-white px-2 py-3 m-5 text-2xl font-bold rounded'>
            Add Task
          </button>
        </form>
        <button
          onClick={clearData}
          className='bg-red-400 text-white px-4  m-5 text-2xl font-bold rounded'
        >
          Clear
        </button>
      </div>
      <hr />
      <div className='p-8 bg-slate-200'>
        <ul>{renderTask}</ul>
      </div>
      <div>{renderCompleted}</div>
    </>
  );
};

export default Page;
