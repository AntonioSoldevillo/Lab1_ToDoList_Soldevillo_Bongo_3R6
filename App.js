import { Keyboard, TextInput, Platform, KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Task from '../OurAppp/components/Task';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (task) {
      setTaskItems([...taskItems, task]);
      setTask(null);
    }
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  const editTask = (index, newText) => {
    let itemsCopy = [...taskItems];
    itemsCopy[index] = newText;
    setTaskItems(itemsCopy);
  };

  const filteredTasks = taskItems.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <View style={styles.container}>
      
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>To Do List</Text>

        
        <TextInput
          style={styles.searchBar}
          placeholder="Search tasks"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />

        <View style={styles.items}>
          {filteredTasks.map((item, index) => (
            <Task
              key={index}
              index={index}
              text={item}
              onDelete={completeTask}
              onEdit={editTask}
            />
          ))}
        </View>
      </View>

      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Add a task"
          value={task}
          onChangeText={text => setTask(text)}
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBF3C9',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchBar: {
    marginTop: 10, 
    marginBottom: 20,
    padding: 8,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  items: {
    marginTop: 10,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {},
});
