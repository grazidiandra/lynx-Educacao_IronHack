import  React, {Fragment, Component} from 'react';
import {getUser} from "../services/auth";
import Nav from '../components/navbar'
import Logo from '../components/Logo'
import Detalhes from '../components/contaDetalhes'


class Conta extends Component{
  constructor(props){
    super(props)
    this.state = {
      tolken: [],
    }
  }

  componentDidMount() {
    this.setState({tolken: getUser()});
  }

  render(){
    console.log(this.state.tolken);
    return(
      <Fragment>
        <Logo />
        <Detalhes role={this.state.tolken.role} name={this.state.tolken.name}/>
        <Nav role={this.state.tolken.role} />
      </Fragment>
    );
  }

}

export default Conta;