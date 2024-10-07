import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

const Task = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskText, setTaskText] = useState(props.text);

  const handleSave = () => {
    if (taskText.trim() === '') {
      return; 
    }
    props.onEdit(props.index, taskText); 
    setIsEditing(false);
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity style={styles.square}></TouchableOpacity>

        {isEditing ? (
          <TextInput
            style={styles.itemText}
            value={taskText}
            onChangeText={setTaskText}
            onSubmitEditing={handleSave} 
            autoFocus 
          />
        ) : (
          <Text style={styles.itemText}>{props.text}</Text>
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={isEditing ? handleSave : () => setIsEditing(true)}>
          <Text style={styles.editText}>{isEditing ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.onDelete(props.index)}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#32CD32',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
  },
  actions: {
    flexDirection: 'row',
  },
  editText: {
    color: 'blue',
    marginRight: 15,
  },
  deleteText: {
    color: 'red',
  },
});

export default Task;
