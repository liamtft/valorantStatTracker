import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';

export default function UserInput(){
       return (
         <View>
           <form>
             <label htmlFor="username">username</label>
             <input
               type="text"
               name="username"
               value={this.state.username}
               onChange={this.handleChange}
             />
    
             <label htmlFor="password">password</label>
             <input
               type="password"
               name="password"
               value={this.state.password}
               onChange={this.handleChange}
             />
           </form>
    
           <h3>Your username is: {this.state.username}</h3>
         </View>
       );
}