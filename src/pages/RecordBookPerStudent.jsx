import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Botao";
import Title from "../components/Title";
import apiAxios from "../services/api";
import { getUser } from "../services/auth";
import IconsTags from "../components/IconsTags";
import ArrowButton from "../components/ButtonArrow";

class RecordBookPerStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentName: "",
      tags: []
    };
    this.sendTags = this.sendTags.bind(this);
    this.handleTagSelected = this.handleTagSelected.bind(this);
  }

  componentDidMount = () => {
    this.getStudentInfo();
    const a = getUser();
  };

  getStudentInfo() {
    apiAxios
      .get(`/record/${this.props.match.params.idRecord}`)
      .then(record => this.setState({ studentName: record.data.student.name }))
      .catch(e => console.log(e));
  }
  componentDidUpdate =()=>{
    this.handleTagSelected();
  }

  handleTagSelected = value => {
    // let values = [...this.state.tags]
    const newValues = this.state.tags.push(value)
    debugger
    this.setState({ tags: newValues });
    // this.setState({ tags: values });
    console.log(this.state.tags);
  };

  sendTags() {
    apiAxios
      .patch(`/record/${this.props.match.params.idRecord}`, this.state.tags)
      .then(student => {
        console.log(student);
        this.setState({tags: []})
      })
      .catch(e => console.log(e));
  }

  previousStudent(){

  }

  render() {
    console.log(this.props);
    return (
      <div>
        <Title>{this.state.studentName}</Title>
        <div className="tags">
          <IconsTags
            method={this.handleTagSelected}
            text="Ausente"
            image_src="/images/tags/ausente.png"
            value='ausente'
          />
          <IconsTags
            method={this.handleTagSelected}
            text="Conversa Paralela"
            image_src="/images/tags/conversa_paralela.png"
          />
          <IconsTags
            method={this.handleTagSelected}
            text="Criatividade"
            image_src="/images/tags/criatividade.png"
          />
          <IconsTags
            method={this.handleTagSelected}
            text="Entender o problema"
            image_src="/images/tags/entender_problema.png"
          />
          <IconsTags
            method={this.handleTagSelected}
            text="Participação construtiva"
            image_src="/images/tags/participacao_construtiva.png"
          />
          <IconsTags
            method={this.handleTagSelected}
            text="Trabalho em equipe"
            image_src="/images/tags/trabalho_em_equipe.png"
          />
          <IconsTags
            method={this.handleTagSelected}
            text="Encadeamento de ideias"
            image_src="/images/tags/encadeamento_de_ideias.png"
          />
          <IconsTags
            method={this.handleTagSelected}
            text="Falta de engajamento"
            image_src="/images/tags/falta_de_engajamento.png"
          />
        </div>
        <>
          <ArrowButton method={this.previousStudent} />
          <Link
            to={`/project/${this.props.match.params.id}/RecordBook/${this.props.match.params.date}`}
          >
            <Button label={"Voltar a lista de estudantes"} />
          </Link>
          <ArrowButton method={this.nextStudent} />
        </>
      </div>
    );
  }
}
export default RecordBookPerStudent;
