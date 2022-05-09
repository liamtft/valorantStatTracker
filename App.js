import { StatusBar } from 'expo-status-bar';
import { render } from 'react-dom';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList, TextInput } from 'react-native';
import MatchItem from "./components/MatchItem"
import UserInput from "./components/UserInput"

const XXXXXaccounturl = "https://api.henrikdev.xyz/valorant/v1/account/Sang/ggg"
const XXXXlast5url = "https://api.henrikdev.xyz/valorant/v3/matches/na/Sang/ggg?filter=competitive"

export default class App extends React.Component {
  state = {
    name: 'Sang',
    tag: 'ggg',

    userData: { 'activity': 'Loading...'},
    rank: '',
    card: {'wide': 'test'},
    
    matchData: [
     
    ],
   
  }

  handleNameChanged(event) {
    var modifiedValue = event.target.value;
    this.setState({
      name: modifiedValue
    });
  }

  handleTagChanged(event) {
    var modifiedValue = event.target.value;
    this.setState({
      tag: modifiedValue
    });
  }

  handleSubmit(event) {
    event.preventDefault()
    const last5url = "https://api.henrikdev.xyz/valorant/v3/matches/na/" + this.state.name + "/" + this.state.tag + "?filter=competitive"
    const accounturl = "https://api.henrikdev.xyz/valorant/v1/account/" + this.state.name + "/" + this.state.tag
    this.getAccountData(accounturl)
    this.getMatchData(last5url)
  }

  getAccountData = (url) => {
    fetch(url, {method: 'GET'}).then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        userData: responseJson.data,
        card: responseJson.data.card.wide
      })
    })
    .catch((error) => {
      console.error(error)
    });
  }

  getMatchData = (url) => {
    fetch(url, {method: 'GET'}).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      for(let i = 0; i < 5; i++){
        for(let j = 0; j < 10; j++)
        if(responseJson.data[i].players.all_players[j].name == this.state.name){
            
            var leftrounds = 0
            var rightrounds = 0
            var winbool = null
            var border = ""

            if(responseJson.data[i].players.all_players[j].team == 'Blue'){
              leftrounds = responseJson.data[i].teams.blue.rounds_won
              rightrounds = responseJson.data[i].teams.blue.rounds_lost
              if (responseJson.data[i].teams.blue.has_won = true) {
                border = "#0BC31D"
              } else {
                border = "#CB3434"
              }
            }
            if (responseJson.data[i].players.all_players[j].team == 'Red'){
              rightrounds = responseJson.data[i].teams.blue.rounds_won
              leftrounds = responseJson.data[i].teams.blue.rounds_lost
              if (responseJson.data[i].teams.blue.has_won == true) {
                border = "#CB3434"
              } else {
                border = "#0BC31D"
              }
            }

            console.log(responseJson.data[i].players.all_players[j].team)
            console.log(responseJson.data[i].teams.blue.has_won)
            console.log(border)

            this.setState({ matchData: [...this.state.matchData, 
              {kills: responseJson.data[i].players.all_players[j].stats.kills, 
              deaths: responseJson.data[i].players.all_players[j].stats.deaths,
              assists: responseJson.data[i].players.all_players[j].stats.assists,
              agent: responseJson.data[i].players.all_players[j].assets.agent.small,

              team: responseJson.data[i].players.all_players[j].team,
              win: winbool,
              leftrounds: leftrounds,
              rightrounds: rightrounds,
              border: border,
              
              mapName: responseJson.data[i].metadata.map,
              gamemode: responseJson.data[i].metadata.mode,
              }]
            })
            this.setState({ rank: responseJson.data[i].players.all_players[j].currenttier_patched})
        }
      }
    })
    .catch((error) => {
      console.error(error)
    });
  }


  render() {
    return (
    <View style={styles.container}>
      <form onSubmit={this.handleSubmit.bind(this)} action="#">
        <input type="text" value={this.state.name} onChange={this.handleNameChanged.bind(this)}/>
        <input type="text" value={this.state.tag} onChange={this.handleTagChanged.bind(this)}/>
        <input type="submit" value="Enter"/>
      </form>
      <View>
        <img style={{boxShadow: 4}}src={this.state.card}></img>
        <View style={{paddingLeft: '12px'}}>
          <Text style={{fontFamily: "Space Grotesk", fontSize: '40px', fontWeight: 'bold', color: 'white'}}>{this.state.name + '#' + this.state.tag}</Text>
          <Text style={{fontFamily: "Space Grotesk", fontSize: '16px', color: 'white'}}>{this.state.rank}</Text>
          <Text style={{fontFamily: "Space Grotesk", fontSize: '16px', color: 'white'}}>{'Last Update: ' + this.state.userData['last_update']}</Text>
          {/* <Text style={{fontFamily: "Space Grotesk", fontSize: '16px', color: 'white'}}>{this.state.userData['region']}</Text>      */}
        </View>
        {this.state.matchData.map(game => (
          <MatchItem
            mapName={game.mapName} 
            gamemode={game.gamemode} 
            kills={game.kills} 
            deaths={game.deaths} 
            assists={game.assists} 
            agent={game.agent}
            team={game.team}
            blue_team_boolean={game.blue_team_boolean}
            leftrounds={game.leftrounds}
            rightrounds={game.rightrounds}
            border = {game.border}
          />
        ))}
      </View>
    </View>
    ); 
  }
}

const styles = StyleSheet.create({
  container: {
   fontFamily: 'Space Grotesk',
   backgroundColor: '#272727',
   color: 'white',
   flex: 1
  },
  match_container: {
    backgroundColor: '#324047',
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
    backgroundImage: 'url("https://static.wikia.nocookie.net/valorant/images/b/b0/Omen_icon.png")',
  }
});
