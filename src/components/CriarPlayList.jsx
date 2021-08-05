import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import ListPlayList from './ListPlayList'


export default class CriarPlayList extends Component {

    state = {
        inputPlayList: ""
    }
    mudaInputPlaylist = (e) => {
        this.setState({inputPlayList : e.target.value})        
    }    
    executePost = async () => {
        const body = {
            name: this.state.inputPlayList
        }
        console.log('fazendo post')
        const response = await axios
                .post('https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists',body,
                {
                    headers:{
                        Authorization: "Rommel"
                    }, method:"POST"})
                .then((res) =>{
                    alert("PlayList Criada com succeso")
                    this.setState({inputPlayList: ""})
                   
                })
                .catch((err) => {
                    alert(err.response.data.message)
                    this.setState({inputPlayList: ""})
                })     


        console.log(response)         
    }
    render() {
        
       return (
        
            <div>
                <h1 className="tex-center">Criar Playlist</h1>
                <input 
                  placeholder="Insira playList" 
                  value={this.state.inputPlayList}      
                  onChange={this.mudaInputPlaylist}
                ></input>
                <button onClick={this.executePost}>Criar Playlist</button>
                <ListPlayList />
                
            </div>
        )
    }
}
