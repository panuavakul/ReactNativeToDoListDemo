//@flow

import React, { Component } from 'react';
import { AppRegistry, Text, View, ListView, StyleSheet, TextInput, Button} from 'react-native';

const styles = StyleSheet.create({
  cell: {
    height: 50,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchArea: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    height: 50,
    flex: 1,
    paddingHorizontal: 5,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E'
  }
})

class ListViewDemo extends Component {
  state: {
    inputText: string,
    dataSource: ListView.DataSource,
    todoList: Array<string>
  }

  constructor() {
    console.log("Constructor");
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const todoList = ['Buy Nintendo Switch', 'Buy Zelda']
    this.state = {
      inputText: '',
      dataSource: ds.cloneWithRows(todoList),
      todoList: todoList
    };
  }

  render() {
    return (
      <View style={{marginTop: 20}}>
        <ListView
          dataSource={this.state.dataSource}
          renderHeader={() => <View style={styles.searchArea}>
              <TextInput
                ref={(component) => this._textInput = component}
                style={styles.input}
                placeholder="Add Todo here..."
                onChangeText={(text) => this.setState({inputText: text})}
              />
              <Button
                onPress={() => {
                  this.state.todoList.push(this.state.inputText)
                  this.setState({todoList: this.state.todoList});
                  this.setState({dataSource: this.state.dataSource.cloneWithRows(this.state.todoList)});
                  this._textInput.setNativeProps({text: ''});
                }}
                title="ADD"
                color="#841584"
              />
            </View>
          }
          renderRow={
            (rowData) => <View style={styles.cell}>
              <Text style={{fontSize:16}}>{rowData}</Text>
            </View>
          }
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('ToDoListDemo', () => ListViewDemo);
