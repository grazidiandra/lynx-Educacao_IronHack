import React, { Component } from "react";
import Input from "../components/input";
import Button from "../components/Botao";
import TitleAndText from "../components/TitleAndText";
import apiAxios from "../services/api";
import Navbar from "../components/navbar";
import Logo from "../components/Logo";
import TextAreaProject from "../components/TextAreaProject";
import Loader from '../components/loader'

class EditProject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      teacher: [],
      grade: '',
      classRoom: '',
      description: '',
      subjects: [],
      image: '',
      teacherList: [],
      dropDownOptions: [
        { text: "Linguagens", value: "linguagens", name: "subjects" },
        { text: "Matemática", value: "math", name: "subjects" },
        { text: "Ciências da natureza", value: "natureza", name: "subjects" },
        { text: "Ciências humanas", value: "humanas", name: "subjects" },
      ],
      loader: true
    }
    this.getProjectInfo = this.getProjectInfo.bind(this)
    this.handleFormEdit = this.handleFormEdit.bind(this)
    this.handleAddproject = this.handleAddproject.bind(this)

  }

  componentDidMount = () => {
    this.getProjectInfo();
  }

  getProjectInfo = () => {
    apiAxios.get(`/project/${this.props.match.params.id}`)
      .then(project => {
        const { name, description, image } = project.data;
        this.setState({ name, description, image, loader: false })
      })
      .catch(e => console.log(e))
  }

  handleFormEdit = e => {
    this.setState({ [e.target.name]: e.target.value });
  };


  handleAddproject = (e) => {
    e.preventDefault();
    const { name, description } = this.state
    apiAxios
      .patch(`/project/${this.props.match.params.id}`, { name, description })
      .then(() => {
        this.setState({ name: '', description: '', image: '' })
        this.props.history.push("/projectEdited");
      })
      .catch(e => console.log(e))
  };

  render() {
    return (
      <div>
        <Logo />
        <span className='page-delAndEdit-container'>
          {this.state.loader === true ? null : <form className='page-add-container-user' onSubmit={this.handleAddproject} >
            <TitleAndText>EDITAR PROJETO</TitleAndText>
            <figure className='page-sucess-figure'>
              <img className='page-sucess-img' src='/images/ImagensAndBcg/edit-icon.png' alt='sucess' />
            </figure>
            {this.state.error && <p>{this.state.error}</p>}
            <Input
              type="text"
              placeholder="Nome do projeto"
              name="name"
              handleChange={this.handleFormEdit}
              value={this.state.name}
            />
            <TextAreaProject handleChange={this.handleFormEdit} name='description' placeholder="Descrição" value={this.state.description} />
            <Button type="submit" label={'Atualizar'} />
          </form> }
        </span>
        {this.state.loader === true ?<Loader />:null}
        <Navbar />
      </div>
    )
  };
}


export default EditProject;