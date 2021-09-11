import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  function handleAddTask(newTaskTitle: string) {

    const taskFindByTitle = tasks.find(task => task.title === newTaskTitle);
    
    taskFindByTitle 
    ? Alert.alert("Você não pode cadastrar uma task com o mesmo nome")
    : setTasks([
        ...tasks, 
        {
          id: new Date().getTime(),
          title: newTaskTitle,
          done: false
        }
      ]);
  }

  function handleToggleTaskDone(id: number) {
    const taskFindById = tasks.find(task => task.id === id);
    
    if(taskFindById){
      const updatedTasks = tasks.map(task => task.id === id 
      ? { ...task, done: !task.done }
      : { ...task });

      setTasks(updatedTasks)
    }

    return
  }

  function handleRemoveTask(id: number) {

    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Operação de exclusão cancelada pelo usuário"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () =>  setTasks(oldState => oldState.filter(
                            tasks => tasks.id !== id
                          ))
        }
      ]
    );
  }

  function handleTaskEdit(taskId: number, taskNewTitle: string){

    const taskFindById = tasks.find(task => task.id === taskId);
    
    if(taskFindById){
      const updatedTasks = tasks.map(task => task.id === taskId 
      ? { ...task, title: taskNewTitle }
      : { ...task });

      setTasks(updatedTasks)
    }

    return
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleTaskEdit}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})