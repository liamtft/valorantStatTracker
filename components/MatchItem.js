import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';

export default function MatchItem(props){

    return(
      <View style={{flexDirection: "row", borderColor: props.border, borderWidth: "1px", margin: "1px", backgroundColor: "#324047"}}>
        <View style={styles.icon}>
            <img src={props.agent} style={{paddingRight: "4px"}}></img>
        </View>
        <View style={styles.left}>
          <div>
            <Text style={styles.blue_team_text}>{props.leftrounds}</Text>
            <Text style={styles.stat_text}>{" : "}</Text>
            <Text style={styles.red_team_text}>{props.rightrounds}</Text>
          </div>
          <Text style={styles.map_text}>{props.mapName}</Text>
          <Text style={styles.stat_text}>{props.gamemode}</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.light_text}>{'K / D / A'}</Text>
          <Text style={styles.stat_text}>{props.kills + '/' + props.deaths + '/' + props.assists}</Text>
        </View>
    </View>
    )
}


const styles = StyleSheet.create({
    match_container_win: {
      backgroundColor: '#324047',
      border: '1px solid #369E7D',
      color: 'white',
      fontSize: '16px',
      fontWeight: 'bold',
    },
    match_container_loss: {
        backgroundColor: '#222',
        border: '1px solid #369E7D',
        flexDirection: "row",
        color: 'white',
        fontSize: '16px',
        fontWeight: 'bold',
    },
    left: {
      flex: 0.4,
    },
    right: {
      flex: 0.5,
      flexDirection: 'column-reverse',
      paddingBottom: '2px',
    },
    light_text: {
      fontFamily: 'Space Grotesk',
      fontWeight: '400',
      fontSize: '12px',
      lineHeight: '150.18%',
      /* identical to box height, or 18px */
      color: '#BDBDBD',
    },
    stat_text: {
      fontFamily: 'Space Grotesk',
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '150.18%',
      /* identical to box height, or 18px */
      color: '#FFFFFF',
    },
    map_text: {
      fontFamily: 'Space Grotesk',
      fontWeight: '600',
      fontSize: '20px',
      lineHeight: '100%',
      /* identical to box height, or 18px */
      color: '#FFFFFF',
      flexGrow: '3'
    },
    blue_team_text: {
      fontFamily: 'Space Grotesk',
      fontWeight: '600',
      fontSize: '20px',
      lineHeight: '150.18%',
      /* identical to box height, or 18px */
      color: '#2BCC4F',
    },
    red_team_text: {
      fontFamily: 'Space Grotesk',
      fontWeight: '600',
      fontSize: '20px',
      lineHeight: '150.18%',
      /* identical to box height, or 18px */
      color: '#CB3434',
    },
    icon: {
      width: '20%',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
    }
  });
  