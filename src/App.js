import {useState} from 'react';
import './App.css';
import getTopics from './services/getTopics.js';
import Topics from './components/topics.js';
import styled from 'styled-components';

function App() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([])
  const [topicSelected, setTopicSelected] = useState([])

  const StyTopic = styled.div`
    padding-left: 30px;
    padding-right: 15px;
    display: inline-block;
    text-align: left;
    float: left;
  `;

  const StyButton = styled.button`
    margin: 30px 0px;
    height: 30px;
    width: 80px;
    background-color: #245bf6;
    color: white;
    border: none;
  `;

  const fetchTopics = (e, top = 'react', callback) => {
    getTopics(top).then(res => {
      if(callback){
        callback(res.data.topic.relatedTopics)
      } else {
        setData(res.data.topic.relatedTopics);
      }
    })
  }

  const click = e => {
    const [topic,index,indexSelected] = e.target.getAttribute('value').split('/');
    if(parseInt(index) === 0){
      fetchTopics(null, topic, (data) => setSelected([data]));
      setTopicSelected([indexSelected]);
    } else {
      if(parseInt(index) <= selected.length){
        const newTopics = selected.slice(0,index);
        const newSelected = topicSelected.slice(0,index);
        fetchTopics(null, topic, (data) => setSelected([...newTopics, data]));
        setTopicSelected([...newSelected, indexSelected]);
      }
    }
    
  }

  return (
    <div className="App">
      <StyButton onClick={fetchTopics}>Start</StyButton>
      <div>
        <StyTopic><Topics clicked={topicSelected[0]} data={data} click={click} index={0}></Topics></StyTopic>
        {selected.map((topSel, i) => {
          return (<StyTopic><Topics clicked={topicSelected[i+1]} data={topSel} click={click} index={i+1}></Topics></StyTopic>)
        })}
      </div>
    </div>
  );
}

export default App;
