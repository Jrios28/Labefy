import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'


const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;  
`

const CardPlayList = styled.div`
    border: 1px solid black;
    padding: 20px;
    margin: 10px;
    width: 300px;
    display: flex;
    justify-content: space-between;   
`

export default class ListPlayList extends Component {

    state = {
        playLists : [],
    }

    componentDidMount = () =>{
        this.pegarPlayLists()
    }

    pegarPlayLists = async () => {
        try {
            const res = await axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists", 
                                        {
                                        headers:{
                                            Authorization: "Rommel"
                                        }})
            this.setState({playLists : res.data.result.list})

        } catch (err) {
            alert ("Ocorreu um problema, tente novamente")
        }
    }

    eliminarPlayLists = (playlistId) => {
        const arrayPlayList = this.state.playLists.filter(playList => playList.id !== playlistId)

        axios
            .delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${playlistId}`,   
                                    {
                                    headers:{
                                        Authorization: "Rommel"
                                    }})
            .then((res)=> {
                if (window.confirm("Tem certeza que quer Eliminar esse playList?")) {
                        this.setState({playLists : arrayPlayList})
                        alert("PlayList eliminada com succeso")
                } else {
                    alert("PlayList não eliminado")
                }
            })
            .catch((err)=>{
                alert(err.response.data)
            })

    }
    
    render() {
        console.log(this.state.playLists)
        const componentPlayList = this.state.playLists.map((list)=>{
            return <CardPlayList key={list.id}> {list.name}
                                <button onClick={() => this.eliminarPlayLists(list.id)}>Eliminar</button>
                   </CardPlayList>
        })
        return (
            
            <div>
                <hr/>                
                   <h3>Lista de Playlists</h3>
                        <Content>
                            {componentPlayList}
                        </Content>              
            </div>
        )
    }
}
