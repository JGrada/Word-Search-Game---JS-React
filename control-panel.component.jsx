import React from "react";
import "./control-panel.css";
import GamePanel from "../game-panel/game-panel.component";

function ControlPanel(props) {
  const { gameStarted, selectedLevel, onGameStart, onLevelChange, timer, palavrasUser, setPalavrasUser, points } = props;
  const gameStartedClass = gameStarted ? " gameStarted" : "";

  

  function adicionaPalavra(){
    
    setPalavrasUser([...palavrasUser, document.getElementById("palavra").value.toUpperCase()]);
    
  }

  
   

  return(
    <section id="panel-control">
      <form  className="form" onSubmit={event => event.preventDefault()}>
        <fieldset className="form-group">
          <label htmlFor="btLevel">Level:</label>
          <select id="btLevel" defaultValue="0" onChange={onLevelChange}>
            <option value="0">Chose...</option>
            <option value="1">Basic</option>
            <option value="2">Medium</option>
            <option value="3">Advanced</option>
          </select>
          <br></br>
          <br></br>
          <label for="novaPalavra">Insert a new word</label><br></br>
          <input type="text" id="palavra" name="novaPalavra" placeholder="Ex: Application" /><br></br>
          <button type = "button" id="novaPalavra" onClick={adicionaPalavra}>Insert word</button>
        </fieldset>
        <button type="button" id="btPlay" disabled={selectedLevel=== "0"} onClick={onGameStart}>
          {gameStarted ? "Stop game" : "Start game"}
        </button>
      </form>
      <div className="form-metadata">
        <p id="message" role="alert" className="hide">Start game</p>
        <dl className={`list-item left${gameStartedClass}`}>
          <dt>Time</dt>
          <dd id="gameTime">{timer}</dd>
        </dl>
        <dl className={`list-item right${gameStartedClass}`}>
          
        </dl>
        <dl className={`list-item left${gameStartedClass}`}>
          <dt>Score:</dt>
          <dd id="points">{points}</dd>
        </dl>
        <div id="top10" className={`right`}>
          
        </div>
      </div>
    </section>
  );

}

export default ControlPanel;